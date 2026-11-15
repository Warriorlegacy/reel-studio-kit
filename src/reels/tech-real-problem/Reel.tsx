import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { brand as baseBrand, type Brand } from "../../brand";
import { ReelFrame, SceneBlock, Karaoke, type ReelProps } from "../../components";
import { CAPTION_BOTTOM, SAFE_BOX } from "../../layout";
import { timing } from "../../timing";
import words from "../../../public/reels/tech-real-problem/captions.words.json";

const darkBrand: Brand = {
  ...baseBrand,
  colors: { bg: "#0D0D0D", surface: "#1A1A1A", text: "#FFFFFF", accent: "#00FF88", accent2: "#FFD60A" },
  font: "NotoSansDevanagari",
  radius: 18,
  shadow: false,
};

export const t = timing(words);
export const AUDIO = "reels/tech-real-problem/vo.wav";
export const durationInFrames = t.duration(0.8, 44);

const at = (token: string, fallback: number, occurrence = 0) => t.atText(token, fallback, occurrence);
const S = {
  hook: [0, at("Authenticator", 4.4)],
  secret: [at("Authenticator", 4.4), at("Internet", 19.4)],
  myth: [at("Internet", 19.4), at("Try", 31.8)],
  close: [at("Try", 31.8), t.duration(0.8, 44)],
} as const;

const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
const appear = (frame: number, start: number, span = 12) => interpolate(frame, [start, start + span], [0, 1], clamp);

const Heading: React.FC<{ primary: string; accent?: string }> = ({ primary, accent }) => (
  <div data-el="headline" data-kind="content" style={{ position: "absolute", left: SAFE_BOX.x, top: 230, width: SAFE_BOX.width, fontFamily: "Noto Sans Devanagari, sans-serif" }}>
    {accent ? <div style={{ color: darkBrand.colors.accent, fontSize: 26, fontWeight: 700, marginBottom: 8, letterSpacing: 1 }}>{accent}</div> : null}
    <div style={{ color: darkBrand.colors.text, fontSize: 74, fontWeight: 800, lineHeight: 1.08, letterSpacing: -2 }}>{primary}</div>
  </div>
);

const CodeDigits: React.FC<{ frame: number; seed: number }> = ({ frame, seed }) => {
  const step = Math.floor(frame / 30) + seed;
  const digits = String((step * 271828 + 123456) % 1000000).padStart(6, "0");
  return (
    <div style={{ fontFamily: "monospace", fontSize: 62, fontWeight: 800, color: darkBrand.colors.accent, letterSpacing: 6, textAlign: "center" }}>
      {digits.slice(0, 3)} {digits.slice(3)}
    </div>
  );
};

const Phone: React.FC<{ frame: number; showCode: boolean }> = ({ frame, showCode }) => {
  const pulse = 0.6 + Math.sin(frame / 8) * 0.2;
  return (
    <svg width="260" height="420" viewBox="0 0 260 420" style={{ filter: "drop-shadow(0 0 24px rgba(0,255,136,0.25))" }}>
      <rect x="18" y="12" width="224" height="396" rx="34" fill="#111" stroke="#333" strokeWidth="6" />
      <rect x="32" y="44" width="196" height="332" rx="20" fill="#0A0A0A" />
      <rect x="100" y="24" width="60" height="8" rx="4" fill="#222" />
      <circle cx="130" cy="392" r="14" fill="#222" />
      {showCode ? (
        <g>
          <text x="130" y="190" textAnchor="middle" fill="#888" fontSize="16" fontFamily="sans-serif">AUTH CODE</text>
          <text x="130" y="240" textAnchor="middle" fill="#00FF88" fontSize="46" fontWeight="800" fontFamily="monospace">
            <CodeDigits frame={frame} seed={0} />
          </text>
          <text x="130" y="280" textAnchor="middle" fill="#555" fontSize="14" fontFamily="sans-serif">refresh in 30s</text>
          <circle cx="130" cy="320" r="12" fill="none" stroke="#00FF88" strokeWidth="3" opacity={pulse} />
        </g>
      ) : (
        <text x="130" y="210" textAnchor="middle" fill="#444" fontSize="18" fontFamily="sans-serif">no network</text>
      )}
    </svg>
  );
};

const Card: React.FC<{ children: React.ReactNode; style?: React.CSSProperties; atFrame: number; frame: number }> = ({ children, style, atFrame, frame }) => {
  const progress = spring({ frame: frame - atFrame, fps: 30, config: { damping: 16, stiffness: 120 } });
  return (
    <div data-el="headline" data-kind="content" style={{ opacity: appear(frame, atFrame), transform: `translateY(${(1 - progress) * 30}px) scale(${0.9 + progress * 0.1})`, background: darkBrand.colors.surface, border: "1px solid #333", borderRadius: 20, padding: 24, boxSizing: "border-box", ...style }}>
      {children}
    </div>
  );
};

const Chip: React.FC<{ label: string; active?: boolean }> = ({ label, active }) => (
  <div style={{ display: "inline-block", padding: "10px 18px", borderRadius: 99, background: active ? darkBrand.colors.accent : "#222", color: active ? "#000" : "#AAA", fontSize: 22, fontWeight: 700, marginRight: 10, marginBottom: 10 }}>
    {label}
  </div>
);

export const Reel: React.FC<ReelProps> = ({ brand = darkBrand, debugSafeZones, probe }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <ReelFrame brand={brand} audio={AUDIO} debugSafeZones={debugSafeZones} probe={probe}>
      <SceneBlock name="hook" from={S.hook[0]} to={S.hook[1]}>
        <Heading primary="Tech ka real life problem" accent="MYTH vs FACT" />
        <div data-el="diagram" data-kind="content" style={{ position: "absolute", left: SAFE_BOX.x, top: 560, width: SAFE_BOX.width, display: "flex", justifyContent: "center" }}>
          <Phone frame={frame} showCode={false} />
        </div>
        <div style={{ position: "absolute", left: SAFE_BOX.x, top: 1050, width: SAFE_BOX.width, textAlign: "center", color: darkBrand.colors.accent2, fontSize: 34, fontWeight: 700, ...{ opacity: appear(frame, 60) } }}>
          Internet off, phir bhi code?
        </div>
      </SceneBlock>

      <SceneBlock name="secret" from={S.secret[0]} to={S.secret[1]}>
        <Heading primary="Secret key + time = code" accent="KAISE KAAM KARTA HAI" />
        <div style={{ position: "absolute", left: SAFE_BOX.x, top: 540, width: SAFE_BOX.width, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Phone frame={frame} showCode={true} />
          <div style={{ width: 420, display: "flex", flexDirection: "column", gap: 14 }}>
            <Card atFrame={S.secret[0] + 6} frame={frame} style={{ width: "100%" }}>
              <div style={{ color: darkBrand.colors.accent, fontSize: 22, fontWeight: 700, marginBottom: 6 }}>1. Secret key</div>
              <div style={{ color: "#AAA", fontSize: 20 }}>pehli setup pe mile</div>
            </Card>
            <Card atFrame={S.secret[0] + 24} frame={frame} style={{ width: "100%" }}>
              <div style={{ color: darkBrand.colors.accent, fontSize: 22, fontWeight: 700, marginBottom: 6 }}>2. Current time</div>
              <div style={{ color: "#AAA", fontSize: 20 }}>phone ka clock</div>
            </Card>
            <Card atFrame={S.secret[0] + 42} frame={frame} style={{ width: "100%" }}>
              <div style={{ color: darkBrand.colors.accent, fontSize: 22, fontWeight: 700, marginBottom: 6 }}>3. 30s naya code</div>
              <div style={{ color: "#AAA", fontSize: 20 }}>offline bhi milega</div>
            </Card>
          </div>
        </div>
        <div style={{ position: "absolute", left: SAFE_BOX.x, top: 1080, width: SAFE_BOX.width, display: "flex", flexWrap: "wrap" }}>
          <Chip label="secret key" active />
          <Chip label="time" active />
          <Chip label="6-digit code" active />
          <Chip label="30s refresh" />
        </div>
      </SceneBlock>

      <SceneBlock name="myth" from={S.myth[0]} to={S.myth[1]}>
        <Heading primary="Myth vs Fact" accent="JO LOG SOCHTE HAIN" />
        <div style={{ position: "absolute", left: SAFE_BOX.x, top: 540, width: SAFE_BOX.width, display: "flex", gap: 18 }}>
          <Card atFrame={S.myth[0] + 4} frame={frame} style={{ flex: 1, minHeight: 260, borderColor: "#FF4444" }}>
            <div style={{ color: "#FF4444", fontSize: 24, fontWeight: 800, marginBottom: 10 }}>MYTH</div>
            <div style={{ color: darkBrand.colors.text, fontSize: 28, fontWeight: 600, lineHeight: 1.3 }}>OTP always needs network</div>
          </Card>
          <Card atFrame={S.myth[0] + 24} frame={frame} style={{ flex: 1, minHeight: 260, borderColor: darkBrand.colors.accent }}>
            <div style={{ color: darkBrand.colors.accent, fontSize: 24, fontWeight: 800, marginBottom: 10 }}>FACT</div>
            <div style={{ color: darkBrand.colors.text, fontSize: 28, fontWeight: 600, lineHeight: 1.3 }}>Only first pairing needs network</div>
          </Card>
        </div>
        <div style={{ position: "absolute", left: SAFE_BOX.x, top: 900, width: SAFE_BOX.width }}>
          <Card atFrame={S.myth[0] + 44} frame={frame} style={{ width: "100%" }}>
            <div style={{ color: darkBrand.colors.accent2, fontSize: 26, fontWeight: 700, marginBottom: 8 }}>TRY KARO</div>
            <div style={{ color: darkBrand.colors.text, fontSize: 26, lineHeight: 1.4 }}>Flight mode on → app kholo → code dekho</div>
          </Card>
        </div>
      </SceneBlock>

      <SceneBlock name="close" from={S.close[0]} to={S.close[1]}>
        <Heading primary="Plane pe ho? Code ready hoga" accent="COMMENT KARO" />
        <div style={{ position: "absolute", left: SAFE_BOX.x, top: 620, width: SAFE_BOX.width, display: "flex", justifyContent: "center", gap: 24 }}>
          <div style={{ padding: "22px 40px", borderRadius: 16, background: darkBrand.colors.accent, color: "#000", fontSize: 34, fontWeight: 800 }}>FLIGHT</div>
          <div style={{ padding: "22px 40px", borderRadius: 16, background: "#222", color: "#FFF", fontSize: 34, fontWeight: 800 }}>ONLINE</div>
        </div>
        <div style={{ position: "absolute", left: SAFE_BOX.x, top: 820, width: SAFE_BOX.width, textAlign: "center", color: "#888", fontSize: 26 }}>
          kaunsa try karoge?
        </div>
      </SceneBlock>

      <div style={{ position: "absolute", left: SAFE_BOX.x, width: SAFE_BOX.width, bottom: CAPTION_BOTTOM }}>
        <Karaoke words={words} perChunk={4} keywords={["OTP", "code", "network"]} />
      </div>
    </ReelFrame>
  );
};
