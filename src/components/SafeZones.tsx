import React from "react";
import { AbsoluteFill, useVideoConfig } from "remotion";
import { safeForComposition } from "../layout";

const zone: React.CSSProperties = {
  position: "absolute",
  background: "rgba(255, 40, 40, 0.28)",
  color: "#fff",
  fontFamily: "monospace",
  fontSize: 28,
  fontWeight: 700,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  textShadow: "0 1px 3px rgba(0,0,0,0.6)",
};

/** Debug overlay: red = Instagram UI may cover this. Green outline = safe box. Never in the final render. */
export const SafeZones: React.FC = () => {
  const { width, height } = useVideoConfig();
  const safe = safeForComposition(width, height);
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <div style={{ ...zone, left: 0, top: 0, width, height: safe.top }}>top {safe.top}px</div>
      <div style={{ ...zone, left: 0, top: height - safe.bottom, width, height: safe.bottom }}>
        bottom {safe.bottom}px
      </div>
      <div style={{ ...zone, right: 0, top: safe.top, width: safe.right, height: height - safe.top - safe.bottom, writingMode: "vertical-rl" }}>
        right {safe.right}px
      </div>
      <div
        style={{
          position: "absolute",
          left: safe.left,
          top: safe.top,
          width: width - safe.left - safe.right,
          height: height - safe.top - safe.bottom,
          border: "4px dashed rgba(20, 200, 90, 0.9)",
          boxSizing: "border-box",
        }}
      />
    </AbsoluteFill>
  );
};
