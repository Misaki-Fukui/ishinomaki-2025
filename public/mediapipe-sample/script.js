import { PoseLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";

let video = null;
let canvasElement = null;
let canvasCtx = null;
let handStatus = null;
let poseLabel = null;
let poseLandmarker = null;
let webcamRunning = false;
let lastVideoTime = -1;
let animationFrameId = null;
let activeStream = null;
let isInitializing = false;
let lastEmittedGesture = null;

if (typeof globalThis.detectedPose !== "string") {
    globalThis.detectedPose = "unknown";
}

const GESTURE_HISTORY_LENGTH = 6;
const gestureHistory = [];
const DEFAULT_STATUS_MESSAGE = "上半身をカメラに映して大きなポーズを取ってください";
const NO_CAMERA_SUPPORT_MESSAGE = "ブラウザがカメラAPIに対応していません。HTTPS(またはlocalhost)で最新ブラウザをご利用ください。";
const DEFAULT_LABEL_TEXT = "ポーズ: -";
const MIN_HISTORY_FOR_DECISION = 3;
const GESTURE_STABLE_RATIO = 0.6;
const GESTURE_HOLD_MS = 1600;
const GESTURE_LABEL_STYLES = {
    banzai: {
        text: "バンザイ",
        color: "#34d399",
        shadow: "0 10px 22px rgba(52, 211, 153, 0.35)",
        opacity: 1
    },
    t_pose: {
        text: "Tポーズ",
        color: "#60a5fa",
        shadow: "0 10px 22px rgba(96, 165, 250, 0.35)",
        opacity: 1
    },
    cross_arms: {
        text: "クロスポーズ",
        color: "#f472b6",
        shadow: "0 10px 22px rgba(244, 114, 182, 0.35)",
        opacity: 1
    },
    unknown: {
        text: "-",
        color: "#9ca3af",
        shadow: "0 6px 16px rgba(17, 24, 39, 0.25)",
        opacity: 0.65
    }
};

let lastStableGesture = null;
let lastStableTimestamp = 0;

// デバッグログ関数
function debugLog(message) {
    const timestamp = new Date().toISOString().substring(11, 19);
    console.log(`[${timestamp}] ${message}`);
}

function emitPoseChange(gesture) {
    const normalized = typeof gesture === "string" && gesture.trim().length > 0 ? gesture : "unknown";

    if (lastEmittedGesture === normalized) {
        return;
    }

    lastEmittedGesture = normalized;
    globalThis.detectedPose = normalized;

    if (typeof window !== "undefined" && typeof window.dispatchEvent === "function") {
        window.dispatchEvent(
            new CustomEvent("motioncaptureposechange", {
                detail: { gesture: normalized },
            })
        );
    }
}

// ステップ1: カメラとキャンバス初期化
function getUserMedia(constraints) {
    if (navigator.mediaDevices && typeof navigator.mediaDevices.getUserMedia === "function") {
        return navigator.mediaDevices.getUserMedia(constraints);
    }

    const legacyGetUserMedia =
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia;

    if (legacyGetUserMedia) {
        return new Promise((resolve, reject) => {
            legacyGetUserMedia.call(navigator, constraints, resolve, reject);
        });
    }

    return Promise.reject(new Error(NO_CAMERA_SUPPORT_MESSAGE));
}

async function initCamera() {
    debugLog('=== カメラ初期化開始 ===');

    try {
        if (!video || !canvasElement) {
            throw new Error("モーションキャプチャ用のDOM要素が見つかりません");
        }

        const stream = await getUserMedia({
            video: {
                width: 640,
                height: 480,
                facingMode: 'user'
            }
        });

        activeStream = stream;
        video.srcObject = stream;

        await new Promise((resolve) => {
            video.onloadedmetadata = () => {
                debugLog(`✓ ビデオロード完了: ${video.videoWidth}x${video.videoHeight}`);

                // キャンバスサイズ設定
                canvasCtx = canvasElement.getContext('2d');
                if (!canvasCtx) {
                    throw new Error("キャンバスコンテキストを初期化できません");
                }

                canvasElement.width = video.videoWidth;
                canvasElement.height = video.videoHeight;

                resolve();
            };
        });

        await video.play();
        webcamRunning = true;
        debugLog('✓ カメラ初期化完了');
        return true;

    } catch (error) {
        debugLog(`カメラ初期化エラー: ${error.message}`);
        if (handStatus) {
            handStatus.innerText = `カメラエラー: ${error.message}`;
            handStatus.style.color = '#FF0000';
        }
        throw error;
    }
}

// ステップ2: MediaPipe Pose Landmarker初期化
async function initPoseLandmarker() {
    debugLog('=== MediaPipe Pose Landmarker初期化開始 ===');

    try {
        if (handStatus) {
            handStatus.innerText = "AIモデルを読み込み中...";
        }

        if (poseLandmarker) {
            poseLandmarker.close();
            poseLandmarker = null;
        }

        // FilesetResolverでWasmファイルのパスを設定
        const vision = await FilesetResolver.forVisionTasks(
            "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
        );

        debugLog('✓ FilesetResolver作成完了');

        // PoseLandmarkerを作成
        poseLandmarker = await PoseLandmarker.createFromOptions(vision, {
            baseOptions: {
                modelAssetPath: "https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task",
                delegate: "GPU"
            },
            runningMode: "VIDEO",
            numPoses: 1,
            minPoseDetectionConfidence: 0.5,
            minPosePresenceConfidence: 0.5,
            minTrackingConfidence: 0.5
        });

        debugLog('✓ PoseLandmarker作成完了');
        if (handStatus) {
            handStatus.innerText = "準備完了";
        }

    } catch (error) {
        debugLog(`PoseLandmarker初期化エラー: ${error.message}`);
        console.error('詳細エラー:', error);
        throw error;
    }
}

// 33個のランドマーク名
const LANDMARK_NAMES = [
    'nose', 'left_eye_inner', 'left_eye', 'left_eye_outer',
    'right_eye_inner', 'right_eye', 'right_eye_outer',
    'left_ear', 'right_ear', 'mouth_left', 'mouth_right',
    'left_shoulder', 'right_shoulder', 'left_elbow', 'right_elbow',
    'left_wrist', 'right_wrist', 'left_pinky', 'right_pinky',
    'left_index', 'right_index', 'left_thumb', 'right_thumb',
    'left_hip', 'right_hip', 'left_knee', 'right_knee',
    'left_ankle', 'right_ankle', 'left_heel', 'right_heel',
    'left_foot_index', 'right_foot_index'
];

// MediaPipeの接続情報（骨格）
const POSE_CONNECTIONS = [
    [0, 1], [1, 2], [2, 3], [3, 7], // 左目
    [0, 4], [4, 5], [5, 6], [6, 8], // 右目
    [9, 10], // 口
    [11, 12], // 肩
    [11, 13], [13, 15], [15, 17], [15, 19], [15, 21], [17, 19], // 左腕
    [12, 14], [14, 16], [16, 18], [16, 20], [16, 22], [18, 20], // 右腕
    [11, 23], [12, 24], [23, 24], // 胴体
    [23, 25], [25, 27], [27, 29], [27, 31], [29, 31], // 左脚
    [24, 26], [26, 28], [28, 30], [28, 32], [30, 32]  // 右脚
];

function isLandmarkVisible(landmark) {
    return landmark && (landmark.visibility ?? 0) > 0.6;
}

function recordGesture(gesture) {
    gestureHistory.push(gesture);
    if (gestureHistory.length > GESTURE_HISTORY_LENGTH) {
        gestureHistory.shift();
    }
}

function getStableGesture() {
    const historyLength = gestureHistory.length;
    if (historyLength === 0) {
        return null;
    }
    const counts = gestureHistory.reduce((acc, key) => {
        if (key !== "unknown") {
            acc[key] = (acc[key] || 0) + 1;
        }
        return acc;
    }, {});

    const entries = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    if (entries.length === 0) {
        return null;
    }

    const [gesture, count] = entries[0];
    const threshold = Math.max(MIN_HISTORY_FOR_DECISION, Math.ceil(historyLength * GESTURE_STABLE_RATIO));
    return count >= threshold ? gesture : null;
}

function clearGestureHistory() {
    gestureHistory.length = 0;
}

function classifyGesture(landmarks) {
    const nose = landmarks[0];
    const leftShoulder = landmarks[11];
    const rightShoulder = landmarks[12];
    const leftElbow = landmarks[13];
    const rightElbow = landmarks[14];
    const leftWrist = landmarks[15];
    const rightWrist = landmarks[16];

    if (!isLandmarkVisible(leftShoulder) || !isLandmarkVisible(rightShoulder)) {
        return "unknown";
    }

    const leftArmVisible = isLandmarkVisible(leftElbow) && isLandmarkVisible(leftWrist);
    const rightArmVisible = isLandmarkVisible(rightElbow) && isLandmarkVisible(rightWrist);

    const horizontalDistance = (a, b) => Math.abs(a.x - b.x);
    const verticalDistance = (a, b) => Math.abs(a.y - b.y);
    const distance2D = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);

    const shoulderY = (leftShoulder.y + rightShoulder.y) / 2;
    const torsoWidth = Math.abs(leftShoulder.x - rightShoulder.x);

    const leftHandRaised = leftArmVisible && leftWrist.y < leftShoulder.y - 0.08 && leftElbow.y < leftShoulder.y - 0.05;
    const rightHandRaised = rightArmVisible && rightWrist.y < rightShoulder.y - 0.08 && rightElbow.y < rightShoulder.y - 0.05;
    const wristsAboveHead = isLandmarkVisible(nose) &&
        leftArmVisible && rightArmVisible &&
        leftWrist.y < nose.y && rightWrist.y < nose.y;

    if (leftHandRaised && rightHandRaised && wristsAboveHead) {
        return "banzai";
    }

    if (leftArmVisible && rightArmVisible) {
        const leftHorizontalReach = horizontalDistance(leftWrist, leftShoulder);
        const rightHorizontalReach = horizontalDistance(rightWrist, rightShoulder);
        const leftWristAligned = verticalDistance(leftWrist, leftShoulder) < 0.07;
        const rightWristAligned = verticalDistance(rightWrist, rightShoulder) < 0.07;

        const armsWideEnough = leftHorizontalReach > torsoWidth * 0.9 && rightHorizontalReach > torsoWidth * 0.9;

        if (leftWristAligned && rightWristAligned && armsWideEnough) {
            return "t_pose";
        }

        const leftToRightShoulder = distance2D(leftWrist, rightShoulder);
        const rightToLeftShoulder = distance2D(rightWrist, leftShoulder);
        const wristsCloseTogether = distance2D(leftWrist, rightWrist) < torsoWidth * 0.6;
        const wristsAboveTorso = leftWrist.y < shoulderY + 0.12 && rightWrist.y < shoulderY + 0.12;

        if (wristsAboveTorso &&
            wristsCloseTogether &&
            leftToRightShoulder < torsoWidth * 1.1 &&
            rightToLeftShoulder < torsoWidth * 1.1) {
            return "cross_arms";
        }
    }

    return "unknown";
}

function updatePoseLabelText(gesture) {
    if (!poseLabel) {
        return;
    }

    const { text, color, shadow, opacity } = GESTURE_LABEL_STYLES[gesture] || GESTURE_LABEL_STYLES.unknown;
    const labelText = gesture === "unknown" ? DEFAULT_LABEL_TEXT : `ポーズ: ${text}`;
    poseLabel.innerText = labelText;
    poseLabel.style.color = color;
    poseLabel.style.boxShadow = shadow;
    poseLabel.style.opacity = opacity;
}

function applyGestureStatus(gesture, poseCount) {
    if (!handStatus) {
        updatePoseLabelText(gesture);
        return;
    }

    const setStatus = (message, color) => {
        handStatus.innerText = message;
        handStatus.style.color = color;
        handStatus.style.fontSize = '24px';
    };

    switch (gesture) {
        case "banzai":
            setStatus("バンザイを認識しました！", "#34d399");
            break;
        case "t_pose":
            setStatus("Tポーズを認識しました！", "#60a5fa");
            break;
        case "cross_arms":
            setStatus("クロスポーズを認識しました！", "#f472b6");
            break;
        case "unknown":
        default:
            if (poseCount === 0) {
                setStatus(DEFAULT_STATUS_MESSAGE, "#FF6600");
            } else {
                setStatus("ポーズを解析中…大きく動いてください", "#FFFFFF");
            }
            break;
    }

    updatePoseLabelText(gesture);
}

function resetHandStatus() {
    clearGestureHistory();
    if (handStatus) {
        handStatus.innerText = DEFAULT_STATUS_MESSAGE;
        handStatus.style.color = '#FF6600';
        handStatus.style.fontSize = '24px';
    }
    updatePoseLabelText("unknown");
    lastStableGesture = null;
    lastStableTimestamp = 0;
    emitPoseChange("unknown");
}

function updateGestureDisplay(currentGesture, poseCount) {
    recordGesture(currentGesture);
    const now = performance.now();
    const stableGesture = getStableGesture();

    if (stableGesture) {
        lastStableGesture = stableGesture;
        lastStableTimestamp = now;
    }

    const holdActive = lastStableGesture && (now - lastStableTimestamp) <= GESTURE_HOLD_MS;

    if (!holdActive && !stableGesture) {
        lastStableGesture = null;
        lastStableTimestamp = 0;
    }

    const gestureToShow = stableGesture || (holdActive ? lastStableGesture : "unknown");
    applyGestureStatus(gestureToShow || "unknown", poseCount);
    emitPoseChange(gestureToShow || "unknown");
}

// ポーズ検出と描画
async function detectPose() {
    if (!webcamRunning || !poseLandmarker || !video || !canvasElement || !canvasCtx) {
        return;
    }

    const currentTime = performance.now();

    // 新しいフレームの場合のみ処理
    if (video.currentTime !== lastVideoTime) {
        lastVideoTime = video.currentTime;

        // ポーズ検出を実行
        const results = poseLandmarker.detectForVideo(video, currentTime);

        // キャンバスクリア
        canvasCtx.save();
        canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);

        const poseCount = results.landmarks ? results.landmarks.length : 0;

        if (poseCount === 1) {
            const primaryLandmarks = results.landmarks[0];

            // 骨格を描画
            drawSkeleton(primaryLandmarks);

            // ランドマークを描画
            drawLandmarks(primaryLandmarks);

            const gesture = classifyGesture(primaryLandmarks);
            updateGestureDisplay(gesture, poseCount);
        } else if (poseCount > 1) {
            const primaryLandmarks = results.landmarks[0];
            drawSkeleton(primaryLandmarks);
            drawLandmarks(primaryLandmarks);

            clearGestureHistory();
            if (handStatus) {
                handStatus.innerText = "1人だけ映してください";
                handStatus.style.color = '#FFA500';
                handStatus.style.fontSize = '24px';
            }
            updatePoseLabelText("unknown");
            lastStableGesture = null;
            lastStableTimestamp = 0;

            emitPoseChange("unknown");
        } else {
            resetHandStatus();
        }
        canvasCtx.restore();
    }

    animationFrameId = requestAnimationFrame(detectPose);
}

// ランドマーク描画
function drawLandmarks(landmarks) {
    landmarks.forEach((landmark, index) => {
        const x = landmark.x * canvasElement.width;
        const y = landmark.y * canvasElement.height;
        const visibility = landmark.visibility || 1;

        if (visibility > 0.5) {
            // 外側の円（グロー効果）
            canvasCtx.beginPath();
            canvasCtx.arc(x, y, 12, 0, 2 * Math.PI);
            canvasCtx.fillStyle = 'rgba(0, 255, 0, 0.3)';
            canvasCtx.fill();

            // 内側の円
            canvasCtx.beginPath();
            canvasCtx.arc(x, y, 8, 0, 2 * Math.PI);
            canvasCtx.fillStyle = visibility > 0.8 ? '#00FF00' : '#88FF88';
            canvasCtx.fill();

            // ランドマーク番号を表示（デバッグ用、小さく）
            canvasCtx.fillStyle = '#FFFFFF';
            canvasCtx.font = '10px Arial';
            canvasCtx.fillText(index.toString(), x + 10, y);
        }
    });
}

// 骨格描画
function drawSkeleton(landmarks) {
    POSE_CONNECTIONS.forEach(([indexA, indexB]) => {
        const landmarkA = landmarks[indexA];
        const landmarkB = landmarks[indexB];

        const visibilityA = landmarkA.visibility || 1;
        const visibilityB = landmarkB.visibility || 1;

        if (visibilityA > 0.5 && visibilityB > 0.5) {
            const xA = landmarkA.x * canvasElement.width;
            const yA = landmarkA.y * canvasElement.height;
            const xB = landmarkB.x * canvasElement.width;
            const yB = landmarkB.y * canvasElement.height;

            canvasCtx.beginPath();
            canvasCtx.moveTo(xA, yA);
            canvasCtx.lineTo(xB, yB);
            canvasCtx.strokeStyle = '#FF0000';
            canvasCtx.lineWidth = 4;
            canvasCtx.shadowBlur = 8;
            canvasCtx.shadowColor = '#FF0000';
            canvasCtx.stroke();
            canvasCtx.shadowBlur = 0;
        }
    });
}

// メイン初期化処理
function assignElements() {
    video = document.getElementById('webcam');
    canvasElement = document.getElementById('output_canvas');
    handStatus = document.getElementById('hand_status');
    poseLabel = document.getElementById('pose_label');

    if (!video || !canvasElement || !handStatus || !poseLabel) {
        debugLog('必要なDOM要素が見つからないため、初期化を保留します');
        return false;
    }

    canvasCtx = canvasElement.getContext('2d');
    if (!canvasCtx) {
        debugLog('キャンバスコンテキストの初期化に失敗しました');
        return false;
    }

    return true;
}

async function dispose() {
    debugLog('=== モーションキャプチャのリソースを開放します ===');

    webcamRunning = false;

    if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
    }

    if (poseLandmarker) {
        try {
            poseLandmarker.close();
        } catch (error) {
            console.warn('PoseLandmarkerの開放に失敗しました', error);
        }
        poseLandmarker = null;
    }

    if (activeStream) {
        activeStream.getTracks().forEach((track) => {
            try {
                track.stop();
            } catch (error) {
                console.warn('メディアトラックの停止に失敗しました', error);
            }
        });
        activeStream = null;
    }

    if (video) {
        try {
            video.pause();
        } catch (error) {
            console.warn('ビデオの一時停止に失敗しました', error);
        }
        video.onloadedmetadata = null;
        video.srcObject = null;
    }

    lastVideoTime = -1;
    clearGestureHistory();
    lastStableGesture = null;
    lastStableTimestamp = 0;

    video = null;
    canvasElement = null;
    canvasCtx = null;
    handStatus = null;
    poseLabel = null;

    emitPoseChange("unknown");

    return true;
}

async function initialize() {
    if (isInitializing) {
        debugLog('初期化処理が進行中のためスキップします');
        return false;
    }

    isInitializing = true;
    debugLog('=== アプリケーション初期化開始 ===');

    try {
        await dispose();

        if (!assignElements()) {
            return false;
        }

        // ステップ1: カメラ初期化
        updatePoseLabelText("unknown");
        if (handStatus) {
            handStatus.innerText = "カメラを起動中...";
            handStatus.style.color = '#FF6600';
        }
        await initCamera();

        // ステップ2: PoseLandmarker初期化
        await initPoseLandmarker();

        // ステップ3: 検出開始
        debugLog('✓ ポーズ検出開始');
        detectPose();

        debugLog('✓ アプリケーション初期化完了');
        return true;

    } catch (error) {
        debugLog(`初期化失敗: ${error.message}`);
        if (handStatus) {
            handStatus.innerText = `エラー: ${error.message}`;
            handStatus.style.color = '#FF0000';
        }
        console.error('詳細エラー:', error);
        return false;
    } finally {
        isInitializing = false;
    }
}

globalThis.initializeMotionCapture = initialize;
globalThis.disposeMotionCapture = dispose;

// ページロード時に初期化
//window.addEventListener('DOMContentLoaded', initialize);

//初期化タイミング遅延
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initialize);
} else {
  // すでに読み込み済み（Next.jsのSPA遷移・hydrate後など）
  initialize();
}
