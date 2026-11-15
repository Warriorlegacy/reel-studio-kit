import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { brand as baseBrand, type Brand } from "../../brand";
import { ReelFrame, SceneBlock, Karaoke, type ReelProps } from "../../components";
import { CAPTION_BOTTOM, SAFE_BOX } from "../../layout";
import { timing } from "../../timing";
import words from "../../../public/reels/ig-image-gif/captions.words.json";

const paperBrand: Brand = {
  ...baseBrand,
  colors: { bg: "#F8F6F0", surface: "#FFFEFA", text: "#1B1916", accent: "#C84E2F", accent2: "#287A55" },
  font: "NotoSansDevanagari",
  radius: 22,
  shadow: false,
};

export const t = timing(words);
export const AUDIO = "reels/ig-image-gif/vo.wav";
export const durationInFrames = t.duration(0.8, 46);

const at = (token: string, fallback: number, occurrence = 0) => t.atText(token, fallback, occurrence);
const S = {
  hook: [0, at("OpenAI", 6)],
  feature: [at("OpenAI", 6), at("मान", 11)],
  prompt: [at("मान", 11), at("Example", 18)],
  example: [at("Example", 18), at("बस", 27)],
  loop: [at("बस", 27), at("ध्यान", 33)],
  close: [at("ध्यान", 33), t.duration(0.8, 46)],
} as const;

const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
const appear = (frame: number, start: number, span = 14) => interpolate(frame, [start, start + span], [0, 1], clamp);

const Heading: React.FC<{ primary: string; secondary?: string }> = ({ primary, secondary }) => {
  const b = paperBrand;
  return (
    <div style={{ position: "absolute", left: SAFE_BOX.x + 10, top: 250, width: SAFE_BOX.width - 20, fontFamily: "Noto Sans Devanagari, sans-serif" }}>
      {secondary ? <div style={{ color: b.colors.accent, fontSize: 27, fontWeight: 600, marginBottom: 10 }}>{secondary}</div> : null}
      <div style={{ color: b.colors.text, fontSize: 76, fontWeight: 700, lineHeight: 1.12, letterSpacing: -1.5 }}>{primary}</div>
    </div>
  );
};

const Card: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => (
  <div style={{ boxSizing: "border-box", background: paperBrand.colors.surface, border: "2px solid #1B19161C", borderRadius: 24, boxShadow: "0 18px 42px rgba(35, 29, 20, 0.09)", ...style }}>{children}</div>
);

const Cup: React.FC<{ frame: number; moving?: boolean; scale?: number }> = ({ frame, moving = true, scale = 1 }) => {
  const phase = (frame / 72) * Math.PI * 2;
  const steamShift = moving ? -Math.abs(Math.sin(phase)) * 18 : 0;
  const steamOpacity = moving ? 0.6 + Math.sin(phase) * 0.2 : 0.65;
  return (
    <svg width={360 * scale} height={300 * scale} viewBox="0 0 360 300" role="img" aria-label="Cup with rising steam">
      <g transform={`translate(0 ${steamShift})`} opacity={steamOpacity} fill="none" stroke="#C84E2F" strokeWidth="8" strokeLinecap="round">
        <path d="M133 100 C108 77 161 61 136 35" />
        <path d="M183 100 C158 75 210 57 184 29" />
        <path d="M232 100 C211 79 256 61 237 42" />
      </g>
      <path d="M85 120 H270 L251 232 Q246 258 220 258 H138 Q112 258 106 232 Z" fill="#E8D4B8" stroke="#1B1916" strokeWidth="8" />
      <path d="M270 145 H294 Q326 145 326 181 Q326 216 286 216 H258" fill="none" stroke="#1B1916" strokeWidth="12" strokeLinecap="round" />
      <ellipse cx="177" cy="120" rx="92" ry="17" fill="#5E4838" stroke="#1B1916" strokeWidth="8" />
      <path d="M125 277 H238" stroke="#1B1916" strokeWidth="8" strokeLinecap="round" />
      <circle cx="181" cy="188" r="8" fill="#C84E2F" />
    </svg>
  );
};

const FrameDots: React.FC<{ active: number }> = ({ active }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
    {[0, 1, 2].map((dot) => <div key={dot} style={{ width: 15, height: 15, borderRadius: 99, background: dot === active ? "#C84E2F" : "#1B191625" }} />)}
  </div>
);

const GifCard: React.FC<{ frame: number; moving: boolean; label: string; size?: number }> = ({ frame, moving, label, size = 1 }) => (
  <Card style={{ width: 385 * size, height: 425 * size, padding: 22 * size, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between" }}>
    <div style={{ width: "100%", display: "flex", justifyContent: "space-between", color: "#625D54", fontSize: 19 * size, fontWeight: 600 }}>
      <span>{label}</span><span>{moving ? "03 / 09" : "01 / 09"}</span>
    </div>
    <Cup frame={frame} moving={moving} scale={size * 0.78} />
    <FrameDots active={moving ? Math.floor((frame % 72) / 24) : 0} />
  </Card>
);

const Tag: React.FC<{ title: string; value: string; index: string; active?: boolean }> = ({ title, value, index, active = false }) => (
  <div style={{ width: 260, minHeight: 190, padding: 22, boxSizing: "border-box", borderRadius: 20, background: active ? "#C84E2F" : "#FFFEFA", color: active ? "#FFFFFF" : "#1B1916", border: active ? "2px solid #C84E2F" : "2px solid #1B19161C", boxShadow: "0 10px 25px rgba(35,29,20,.07)" }}>
    <div style={{ fontFamily: "monospace", fontSize: 17, opacity: 0.74 }}>{index}</div>
    <div style={{ fontSize: 31, fontWeight: 700, marginTop: 16 }}>{title}</div>
    <div style={{ fontSize: 23, lineHeight: 1.3, marginTop: 7, opacity: 0.86 }}>{value}</div>
  </div>
);

const Stage: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div data-el="diagram" data-kind="content" style={{ position: "absolute", left: SAFE_BOX.x, top: 610, width: SAFE_BOX.width, height: 710 }}>
    {children}
  </div>
);

export const Reel: React.FC<ReelProps> = ({ brand = paperBrand, debugSafeZones, probe }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const entrance = (start: number) => {
    const progress = spring({ frame: frame - start, fps, config: { damping: 18, stiffness: 100 } });
    return { opacity: appear(frame, start), transform: `translateY(${(1 - progress) * 24}px)` } as React.CSSProperties;
  };
  const wave = frame % 72;
  return (
    <ReelFrame brand={brand} audio={AUDIO} debugSafeZones={debugSafeZones} probe={probe}>
      <SceneBlock name="hook" from={S.hook[0]} to={S.hook[1]}>
        <Heading primary="GIF बनेगी. Loop smooth?" secondary="एक आखिरी frame का खेल" />
        <Stage>
          <div style={{ position: "absolute", left: 12, top: 38, width: 875, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <GifCard frame={wave} moving={false} label="पहली frame" />
            <div style={{ width: 64, textAlign: "center", color: paperBrand.colors.accent, fontSize: 44, fontWeight: 700 }}>→</div>
            <GifCard frame={wave} moving={true} label="loop preview" />
          </div>
          <div style={{ position: "absolute", top: 510, left: 175, width: 610, textAlign: "center", color: paperBrand.colors.text, fontSize: 30, fontWeight: 600, ...entrance(S.hook[0] + 32) }}>
            आखिरी pose पहली जैसी रखो
          </div>
        </Stage>
      </SceneBlock>

      <SceneBlock name="feature" from={S.feature[0]} to={S.feature[1]}>
        <Heading primary="तस्वीर में हल्की motion" secondary="OpenAI Images 2.6 · GIF" />
        <Stage>
          <div style={{ position: "absolute", left: 70, top: 80 }}><GifCard frame={wave} moving={false} label="still image" size={0.9} /></div>
          <div style={{ position: "absolute", left: 430, top: 225, width: 60, textAlign: "center", color: paperBrand.colors.accent, fontSize: 42 }}>→</div>
          <div style={{ position: "absolute", left: 520, top: 80 }}><GifCard frame={wave} moving={true} label="looping GIF" size={0.9} /></div>
          <div style={{ position: "absolute", left: 155, top: 555, width: 640, textAlign: "center", color: paperBrand.colors.text, fontSize: 29, fontWeight: 600 }}>
            एक छोटा repeating animation
          </div>
        </Stage>
      </SceneBlock>

      <SceneBlock name="prompt" from={S.prompt[0]} to={S.prompt[1]}>
        <Heading primary="Prompt में 3 बातें" secondary="बस इतना साफ़ लिखो" />
        <Stage>
          <div style={{ position: "absolute", top: 150, left: 28, display: "flex", gap: 20 }}>
            <Tag index="01" title="क्या हिले?" value="कप से भाप" active />
            <Tag index="02" title="कैसे हिले?" value="धीरे ऊपर उठे" />
            <Tag index="03" title="कहाँ लौटे?" value="पहली pose पर" />
          </div>
          <Card style={{ position: "absolute", top: 415, left: 60, width: 810, padding: 22, color: "#625D54", fontSize: 26, lineHeight: 1.4 }}>
            “कप से भाप धीरे ऊपर उठे, कैमरा स्थिर रहे…”
          </Card>
        </Stage>
      </SceneBlock>

      <SceneBlock name="example" from={S.example[0]} to={S.example[1]}>
        <Heading primary="कैमरा स्थिर. भाप चलती है." secondary="एक simple example" />
        <Stage>
          <div style={{ position: "absolute", left: 70, top: 80 }}><GifCard frame={wave} moving={true} label="1.8 sec loop" size={1.12} /></div>
          <Card style={{ position: "absolute", left: 520, top: 130, width: 370, padding: 30 }}>
            <div style={{ fontSize: 27, color: "#625D54", fontWeight: 600 }}>Loop prompt</div>
            <div style={{ marginTop: 24, fontSize: 31, lineHeight: 1.35, fontWeight: 600 }}>भाप ऊपर जाए</div>
            <div style={{ marginTop: 18, height: 2, background: "#1B19161B" }} />
            <div style={{ marginTop: 18, fontSize: 31, lineHeight: 1.35, fontWeight: 600 }}>कैमरा स्थिर रहे</div>
            <div style={{ marginTop: 18, height: 2, background: "#1B19161B" }} />
            <div style={{ marginTop: 18, fontSize: 31, lineHeight: 1.35, fontWeight: 600, color: paperBrand.colors.accent }}>पहली shape पर लौटे</div>
          </Card>
        </Stage>
      </SceneBlock>

      <SceneBlock name="loop-check" from={S.loop[0]} to={S.loop[1]}>
        <Heading primary="यहीं loop का test" secondary="End pose पहली frame से मिलाओ" />
        <Stage>
          <Card style={{ position: "absolute", left: 40, top: 120, width: 360, height: 340, padding: 20, textAlign: "center" }}>
            <Cup frame={wave} moving={false} scale={0.74} />
            <div style={{ color: "#A34330", fontSize: 27, fontWeight: 700 }}>शुरुआत</div>
          </Card>
          <div style={{ position: "absolute", left: 416, top: 235, width: 64, textAlign: "center", color: paperBrand.colors.accent, fontSize: 42 }}>↔</div>
          <Card style={{ position: "absolute", left: 500, top: 120, width: 360, height: 340, padding: 20, textAlign: "center" }}>
            <Cup frame={wave} moving={true} scale={0.74} />
            <div style={{ color: paperBrand.colors.accent2, fontSize: 27, fontWeight: 700 }}>वापस यहीं</div>
          </Card>
          <div style={{ position: "absolute", left: 145, top: 500, width: 700, color: paperBrand.colors.text, textAlign: "center", fontSize: 31, fontWeight: 600 }}>
            नहीं मिला? फिर से generate करके देखो
          </div>
        </Stage>
      </SceneBlock>

      <SceneBlock name="close" from={S.close[0]} to={S.close[1]}>
        <Heading primary="तुम क्या animate करोगे?" secondary="GIF छोटा loop है · final check ज़रूर" />
        <Stage>
          <div style={{ position: "absolute", left: 315, top: 75, ...entrance(S.close[0]) }}>
            <GifCard frame={wave} moving={true} label="तुम्हारा idea" size={1.14} />
          </div>
          <div style={{ position: "absolute", left: 215, top: 560, width: 620, textAlign: "center", color: paperBrand.colors.accent, fontSize: 38, fontWeight: 700 }}>
            Comment “GIF”
          </div>
        </Stage>
      </SceneBlock>

      <div style={{ position: "absolute", left: SAFE_BOX.x, width: SAFE_BOX.width, bottom: CAPTION_BOTTOM + 4 }}>
        <Karaoke words={words} perChunk={4} size={44} keywords={["GIF", "loop", "Images", "frame", "smooth"]} />
      </div>
    </ReelFrame>
  );
};
