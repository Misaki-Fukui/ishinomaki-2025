"use client";

import { useEffect } from "react";

type MotionCaptureEmbedProps = {
  className?: string;
};

const IMPORT_MAP_DATA_ATTRIBUTE = "motion-capture-importmap";
const MODULE_PROMISE_KEY = "__motionCaptureModulePromise";

function ensureImportMap() {
  if (typeof document === "undefined") {
    return;
  }

  if (document.querySelector(`script[data-${IMPORT_MAP_DATA_ATTRIBUTE}]`)) {
    return;
  }

  const importMap = document.createElement("script");
  importMap.type = "importmap";
  importMap.setAttribute(`data-${IMPORT_MAP_DATA_ATTRIBUTE}`, "true");
  importMap.textContent = JSON.stringify({
    imports: {
      "@mediapipe/tasks-vision":
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/vision_bundle.mjs",
    },
  });

  document.head.appendChild(importMap);
}

export default function MotionCaptureEmbed({
  className,
}: MotionCaptureEmbedProps) {
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    ensureImportMap();

    let cancelled = false;
    let retryTimer: number | null = null;

    const runInitialize = () => {
      if (cancelled) {
        return;
      }

      const init = (window as unknown as {
        initializeMotionCapture?: () => Promise<boolean> | boolean;
      }).initializeMotionCapture;

      if (typeof init !== "function") {
        return false;
      }

      const result = init();

      if (result && typeof (result as Promise<boolean>).then === "function") {
        (result as Promise<boolean>).then((success) => {
          if (!cancelled && success === false) {
            retryTimer = window.setTimeout(runInitialize, 250);
          }
        });
      } else if (result === false) {
        retryTimer = window.setTimeout(runInitialize, 250);
      }

      return true;
    };

    const loadModule = () => {
      const globalWindow = window as unknown as Record<string, unknown>;
      const existingPromise = globalWindow[MODULE_PROMISE_KEY] as
        | Promise<unknown>
        | undefined;

      if (existingPromise) {
        return existingPromise;
      }

      const modulePromise = import(
        /* webpackIgnore: true */ "/mediapipe-sample/script.js"
      );
      globalWindow[MODULE_PROMISE_KEY] = modulePromise;
      return modulePromise;
    };

    loadModule()
      .then(() => {
        if (!runInitialize()) {
          retryTimer = window.setTimeout(runInitialize, 250);
        }
      })
      .catch((error) => {
        console.error("モーションキャプチャの読み込みに失敗しました", error);
      });

    return () => {
      cancelled = true;

      if (retryTimer !== null) {
        window.clearTimeout(retryTimer);
      }

      const dispose = (window as unknown as {
        disposeMotionCapture?: () => Promise<boolean> | boolean;
      }).disposeMotionCapture;

      if (typeof dispose === "function") {
        try {
          dispose();
        } catch (error) {
          console.warn("モーションキャプチャの終了処理に失敗しました", error);
        }
      }
    };
  }, []);

  return (
    <div
      className={[
        "relative w-full max-w-sm overflow-visible rounded-3xl border border-dashed border-violet-200 bg-neutral-900/80 p-4 shadow-lg backdrop-blur",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/10 bg-black">
        <div
          id="pose_label"
          className="absolute left-1/2 top-4 z-20 -translate-x-1/2 rounded-full bg-neutral-900/80 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-white shadow"
        >
          ポーズ: -
        </div>

        <video
          id="webcam"
          autoPlay
          playsInline
          muted
          className="absolute inset-0 h-full w-full object-cover [transform:scaleX(-1)]"
        />

        <canvas
          id="output_canvas"
          className="absolute inset-0 h-full w-full [transform:scaleX(-1)]"
        />

        <div
          id="hand_status"
          className="absolute bottom-4 left-1/2 z-20 w-[90%] -translate-x-1/2 rounded-full bg-white/10 px-4 py-2 text-center text-sm font-semibold text-white shadow backdrop-blur"
        >
          上半身をカメラに映してください
        </div>
      </div>
    </div>
  );
}
