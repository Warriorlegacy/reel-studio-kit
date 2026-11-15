import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { brand as baseBrand, type Brand } from "../../brand";
import { ReelFrame, SceneBlock, Karaoke, type ReelProps } from "../../components";
import { timing } from "../../timing";
import words from "../../../public/reels/authenticator-airplane-yt/captions.words.json";

const landscapeBrand: Brand = {
  ...baseBrand,
  colors: { bg: "#0D0D0D", surface: "#1A1A1A", text: "#FFFFFF", accent: "#00FF88", accent2: "#FFD60A" },
  font: "NotoSansDevanagari",
  radius: 18,
  shadow: false,
  handle: "The Engineer’s Cut",
};

export const t = timing(words);
export const AUDIO = "reels/authenticator-airplane-yt/vo.wav";
export const durationInFrames = t.duration(1.0, 30);

const at = (token: string, fallback: number, occurrence = 0) => t.atText(token, fallback, occurrence);
const S = {
  hook: [0, at("Authenticator", 2)],
  secret: [at("Authenticator", 2), at("Pehli", 12)],
  offline: [at("Pehli", 12), at("Try", 20)],
  close: [at("Try", 20), t.duration(1.0, 30)],
} as const;

const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
const appear = (frame: number, start: number, span = 14) => interpolate(frame, [start, start + span], [0, 1], clamp);

const Heading: React.FC<{ primary: string; accent?: string }> = ({ primary, accent }) => (
  <div data-el="headline" data-kind="content" style={{ position: "absolute", left: 120, top: 90, width: 1680, fontFamily: "Noto Sans Devanagari, sans-serif" }}>
    {accent ? <div style={{ color: landscapeBrand.colors.accent, fontSize: 24, fontWeight: 700, marginBottom: 8, letterSpacing: 1 }}>{accent}</div> : null}
    <div style={{ color: landscapeBrand.colors.text, fontSize: 64, fontWeight: 800, lineHeight: 1.1, letterSpacing: -1.5 }}>{primary}</div>
  </div>
);

const Phone: React.FC = () => (
  <div data-el="diagram" data-kind="content" style={{ position: "absolute", left: 120, top: 220, width: 520, height: 600, background: "#111", borderRadius: 36, border: "2px solid #333", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 18 }}>
    <div style={{ color: "#888", fontSize: 22 }}>AUTH CODE</div>
    <div style={{ color: landscapeBrand.colors.accent, fontSize: 58, fontWeight: 800, fontFamily: "monospace", letterSpacing: 6 }}>4 8 2 9 1 7</div>
    <div style={{ color: "#555", fontSize: 18 }}>refresh in 30s</div>
    <div style={{ color: "#FFD60A", fontSize: 20, fontWeight: 700 }}>no network needed</div>
  </div>
);

const Card: React.FC<{ children: React.ReactNode; style?: React.CSSProperties; atFrame: number; frame: number }> = ({ children, style, atFrame, frame }) => {
  const progress = spring({ frame: frame - atFrame, fps: 30, config: { damping: 16, stiffness: 120 } });
  return (
    <div data-el="card" data-kind="content" style={{ opacity: appear(frame, atFrame), transform: `translateY(${(1 - progress) * 24}px)`, background: landscapeBrand.colors.surface, border: "1px solid #333", borderRadius: 20, padding: 28, boxSizing: "border-box", ...style }}>
      {children}
    </div>
  );
};

export const Reel: React.FC<ReelProps> = ({ brand = landscapeBrand, debugSafeZones, probe }) => {
  const frame = useCurrentFrame();
  return (
    <ReelFrame brand={brand} audio={AUDIO} debugSafeZones={debugSafeZones} probe={probe}>
      <SceneBlock name="hook" from={S.hook[0]} to={S.hook[1]}>
        <Heading primary="Flight mode on, phir bhi OTP?" accent="MYTH vs FACT" />
        <Phone />
        <div style={{ position: "absolute", left: 700, top: 320, width: 1100, color: landscapeBrand.colors.text, fontSize: 34, fontWeight: 600, lineHeight: 1.4 }}>
          Authenticator app airplane mode mein bhi kaam karta hai. Kyunki OTP internet se nahi aata.
        </div>
      </SceneBlock>

      <SceneBlock name="secret" from={S.secret[0]} to={S.secret[1]}>
        <Heading primary="Secret key + time = code" accent="KAISE KAAM KARTA HAI" />
        <Phone />
        <div style={{ position: "absolute", left: 700, top: 280, width: 1100, display: "flex", flexDirection: "column", gap: 18 }}>
          <Card atFrame={S.secret[0] + 6} frame={frame} style={{ width: "100%" }}>
            <div style={{ color: landscapeBrand.colors.accent, fontSize: 26, fontWeight: 700, marginBottom: 6 }}>1. Secret key</div>
            <div style={{ color: "#AAA", fontSize: 22 }}>pehli setup pe mile</div>
          </Card>
          <Card atFrame={S.secret[0] + 24} frame={frame} style={{ width: "100%" }}>
            <div style={{ color: landscapeBrand.colors.accent, fontSize: 26, fontWeight: 700, marginBottom: 6 }}>2. Current time</div>
            <div style={{ color: "#AAA", fontSize: 22 }}>phone ka clock</div>
          </Card>
          <Card atFrame={S.secret[0] + 42} frame={frame} style={{ width: "100%" }}>
            <div style={{ color: landscapeBrand.colors.accent, fontSize: 26, fontWeight: 700, marginBottom: 6 }}>3. 30s naya code</div>
            <div style={{ color: "#AAA", fontSize: 22 }}>offline bhi milega</div>
          </Card>
        </div>
      </SceneBlock>

      <SceneBlock name="offline" from={S.offline[0]} to={S.offline[1]}>
        <Heading primary="Pehli pairing ke baad offline" accent="MYTH BUSTED" />
        <div style={{ position: "absolute", left: 120, top: 280, width: 1680, display: "flex", gap: 24 }}>
          <Card atFrame={S.offline[0] + 4} frame={frame} style={{ flex: 1, minHeight: 220 }}>
            <div style={{ color: "#FF4444", fontSize: 26, fontWeight: 800, marginBottom: 10 }}>MYTH</div>
            <div style={{ color: landscapeBrand.colors.text, fontSize: 30, fontWeight: 600 }}>OTP always needs network</div>
          </Card>
          <Card atFrame={S.offline[0] + 24} frame={frame} style={{ flex: 1, minHeight: 220 }}>
            <div style={{ color: landscapeBrand.colors.accent, fontSize: 26, fontWeight: 800, marginBottom: 10 }}>FACT</div>
            <div style={{ color: landscapeBrand.colors.text, fontSize: 30, fontWeight: 600 }}>Only first pairing needs network</div>
          </Card>
        </div>
        <div style={{ position: "absolute", left: 120, top: 560, width: 1680 }}>
          <Card atFrame={S.offline[0] + 44} frame={frame} style={{ width: "100%" }}>
            <div style={{ color: landscapeBrand.colors.accent2, fontSize: 28, fontWeight: 700, marginBottom: 8 }}>TRY KARO</div>
            <div style={{ color: landscapeBrand.colors.text, fontSize: 28, lineHeight: 1.4 }}>Flight mode on → app kholo → code dekho</div>
          </Card>
        </div>
      </SceneBlock>

      <SceneBlock name="close" from={S.close[0]} to={S.close[1]}>
        <Heading primary="Plane pe ho? Code ready hoga" accent="COMMENT KARO" />
        <div style={{ position: "absolute", left: 120, top: 320, width: 1680, display: "flex", gap: 24 }}>
          <div style={{ padding: "24px 48px", borderRadius: 16, background: landscapeBrand.colors.accent, color: "#000", fontSize: 36, fontWeight: 800 }}>FLIGHT</div>
          <div style={{ padding: "24px 48px", borderRadius: 16, background: "#222", color: "#FFF", fontSize: 36, fontWeight: 800 }}>ONLINE</div>
        </div>
        <div style={{ position: "absolute", left: 120, top: 460, width: 1680, color: "#888", fontSize: 28 }}>kaunsa try karoge?</div>
      </SceneBlock>

      <div style={{ position: "absolute", left: 120, width: 1680, bottom: 96 }}>
        <Karaoke words={words} perChunk={5} keywords={["OTP", "code", "network"]} />
      </div>
    </ReelFrame>
  );
};
