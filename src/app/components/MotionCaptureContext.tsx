"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

type MotionCaptureContextValue = {
  pose: string;
};

const MotionCaptureContext = createContext<MotionCaptureContextValue | undefined>(
  undefined,
);

export function MotionCaptureProvider({ children }: { children: ReactNode }) {
  const [pose, setPose] = useState<string>("unknown");
  const poseRef = useRef(pose);

  useEffect(() => {
    poseRef.current = pose;
  }, [pose]);

  useEffect(() => {
    const handlePoseChange = (event: Event) => {
      const customEvent = event as CustomEvent<{ gesture?: string }>;
      const nextPose =
        typeof customEvent.detail?.gesture === "string"
          ? customEvent.detail.gesture
          : "unknown";

      if (poseRef.current !== nextPose) {
        poseRef.current = nextPose;
        setPose(nextPose);
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("motioncaptureposechange", handlePoseChange as EventListener);

      const initialPose = (window as { detectedPose?: string }).detectedPose;
      if (typeof initialPose === "string" && poseRef.current !== initialPose) {
        poseRef.current = initialPose;
        setPose(initialPose);
      }
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener(
          "motioncaptureposechange",
          handlePoseChange as EventListener,
        );
      }
    };
  }, []);

  return (
    <MotionCaptureContext.Provider value={{ pose }}>
      {children}
    </MotionCaptureContext.Provider>
  );
}

export function useMotionCapturePose() {
  const context = useContext(MotionCaptureContext);
  if (!context) {
    throw new Error(
      "useMotionCapturePose must be used within a MotionCaptureProvider",
    );
  }

  return context.pose;
}
