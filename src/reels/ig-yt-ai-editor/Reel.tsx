import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { brand as baseBrand, type Brand } from "../../brand";
import { ReelFrame, SceneBlock, Karaoke, Title } from "../../components";
import { CAPTION_BOTTOM, SAFE_BOX } from "../../layout";
import { timing } from "../../timing";
import words from "../../../public/reels/ig-yt-ai-editor/captions.words.json";

const darkBrand: Brand = {
  ...baseBrand,
  colors: { bg: "#0D0D0D", surface: "#1A1A1A", text: "#FFFFFF", accent: "#FF3B30", accent2: "#00E5FF" },
  font: "Inter",
  radius: 16,
  shadow: false,
  handle: "@signhify.studio",
};

export const t = timing(words as any);
export const AUDIO = "reels/ig-yt-ai-editor/vo.wav";
export const durationInFrames = t.duration(0.8, 30);

const at = (token: string, fallback: number, occurrence = 0) => t.atText(token, fallback, occurrence);
const S = {
  hook: [0, at("Punchline", 4)],
  problem: [at("Punchline", 4), at("Fix", 12)],
  fix: [at("Fix", 12), at("Try", 20)],
  cta: [at("Try", 20), t.duration(0.8, 30)],
} as const;

const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
const appear = (frame: number, start: number, span = 10) => interpolate(frame, [start, start + span], [0, 1], clamp);

const Slam: React.FC<{ children: React.ReactNode; start: number; color?: string; size?: number }> = ({ children, start, color = "#FFFFFF", size = 96 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = spring({ frame: frame - start, fps, config: { damping: 12, stiffness: 220 } });
  const scale = interpolate(progress, [0, 1], [1.6, 1], clamp);
  const opacity = appear(frame, start, 6);
  return (
    <div style={{ opacity, transform: `scale(${scale})`, color, fontSize: size, fontWeight: 900, lineHeight: 1.05, letterSpacing: -2, textTransform: "uppercase" }}>
      {children}
    </div>
  );
};

const Line: React.FC<{ children: React.ReactNode; start: number; color?: string; size?: number; delay?: number }> = ({ children, start, color = "#FFFFFF", size = 44, delay = 0 }) => {
  const frame = useCurrentFrame();
  const opacity = appear(frame, start + delay, 8);
  const y = interpolate(appear(frame, start + delay, 8), [0, 1], [24, 0], clamp);
  return <div style={{ opacity, transform: `translateY(${y}px)`, color, fontSize: size, fontWeight: 700, lineHeight: 1.2 }}>{children}</div>;
};

const Waveform: React.FC<{ cut?: boolean; color?: string }> = ({ cut = false, color = "#00E5FF" }) => {
  const frame = useCurrentFrame();
  const bars = Array.from({ length: 28 });
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6, height: 120 }}>
      {bars.map((_, i) => {
        const h = cut && i > 12 && i < 17 ? 6 : 20 + Math.abs(Math.sin((frame + i * 4) * 0.15)) * 70;
        return <div key={i} style={{ width: 10, height: h, background: cut && i > 12 && i < 17 ? "#333" : color, borderRadius: 4 }} />;
      })}
    </div>
  );
};

export const Reel: React.FC<any> = ({ brand = darkBrand, debugSafeZones, probe }) => {
  const frame = useCurrentFrame();
  return (
    <ReelFrame brand={brand} audio={AUDIO} debugSafeZones={debugSafeZones} probe={probe}>
      <SceneBlock name="hook" from={S.hook[0]} to={S.hook[1]}>
        <div data-el="diagram" data-kind="content" style={{ position: "absolute", left: SAFE_BOX.x, top: 300, width: SAFE_BOX.width }}>
          <Slam start={S.hook[0] + 2} color="#FF3B30" size={88}>PAUSE CUT</Slam>
          <div style={{ marginTop: 40 }}><Waveform cut color="#FF3B30" /></div>
          <div style={{ marginTop: 40 }}><Line start={S.hook[0] + 18} color="#FFFFFF" size={40}>YouTube ka AI editor ab pause bhi cut kar deta hai.</Line></div>
        </div>
      </SceneBlock>

      <SceneBlock name="problem" from={S.problem[0]} to={S.problem[1]}>
        <div data-el="diagram" data-kind="content" style={{ position: "absolute", left: SAFE_BOX.x, top: 320, width: SAFE_BOX.width }}>
          <Slam start={S.problem[0] + 2} color="#FFFFFF" size={72}>PUNCHLINE GAYA</Slam>
          <div style={{ marginTop: 40 }}><Line start={S.problem[0] + 16} color="#AAAAAA" size={40}>AI samajhta nahi ki pause kab zaroori hai.</Line></div>
          <div style={{ marginTop: 20 }}><Line start={S.problem[0] + 30} color="#FF3B30" size={36}>Har baar nahi, par ek baar zaroor hoga.</Line></div>
        </div>
      </SceneBlock>

      <SceneBlock name="fix" from={S.fix[0]} to={S.fix[1]}>
        <div data-el="diagram" data-kind="content" style={{ position: "absolute", left: SAFE_BOX.x, top: 280, width: SAFE_BOX.width }}>
          <Slam start={S.fix[0] + 2} color="#00E5FF" size={80}>FIX</Slam>
          <div style={{ marginTop: 40, padding: 24, background: "#1A1A1A", borderRadius: 16, border: "1px solid #333" }}>
            <Line start={S.fix[0] + 14} color="#00E5FF" size={34}>"keep natural pauses and emotional beats"</Line>
          </div>
          <div style={{ marginTop: 40 }}><Waveform color="#00E5FF" /></div>
          <div style={{ marginTop: 30 }}><Line start={S.fix[0] + 40} color="#FFFFFF" size={36}>Phir AI cut karega sirf extra silence.</Line></div>
        </div>
      </SceneBlock>

      <SceneBlock name="cta" from={S.cta[0]} to={S.cta[1]}>
        <div data-el="diagram" data-kind="content" style={{ position: "absolute", left: SAFE_BOX.x, top: 420, width: SAFE_BOX.width, textAlign: "center" }}>
          <Slam start={S.cta[0] + 2} color="#FF3B30" size={64}>TRY KARO</Slam>
          <div style={{ marginTop: 30 }}><Line start={S.cta[0] + 16} color="#FFFFFF" size={40}>Apne Shorts pe. Comment karo kaam aaya ya nahi.</Line></div>
        </div>
      </SceneBlock>

      <div style={{ position: "absolute", left: SAFE_BOX.x, width: SAFE_BOX.width, bottom: CAPTION_BOTTOM + 4 }}>
        <Karaoke words={words as any} perChunk={4} size={40} keywords={["pause", "cut", "AI", "fix", "Shorts"]} />
      </div>
    </ReelFrame>
  );
};