import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { brand as baseBrand, type Brand } from "../../brand";
import { ReelFrame, SceneBlock, Karaoke, type ReelProps } from "../../components";
import { timing } from "../../timing";
import words from "../../../public/reels/youtube-ai-editor/captions.words.json";

const landscapeBrand: Brand = {
  ...baseBrand,
  colors: { bg: "#F8F6F0", surface: "#FFFEFA", text: "#1B1916", accent: "#C84E2F", accent2: "#287A55" },
  font: "NotoSansDevanagari",
  radius: 18,
  shadow: false,
  handle: "The Engineer’s Cut",
};

export const t = timing(words);
export const AUDIO = "reels/youtube-ai-editor/vo.wav";
export const durationInFrames = t.duration(1.1, 180);

const at = (token: string, fallback: number, occurrence = 0) => t.atText(token, fallback, occurrence);
const S = {
  hook: [0, at("YouTube", 8, 0)],
  announcement: [at("YouTube", 8, 0), at("YouTube", 14, 1)],
  assistant: [at("YouTube", 14, 1), at("लंबे", 22)],
  actions: [at("लंबे", 22), at("same", 33)],
  exampleBad: [at("same", 24), at("बेहतर", 38)],
  exampleGood: [at("बेहतर", 38), at("YouTube", 56, 3)],
  creatorReview: [at("YouTube", 56, 3), at("Studio", 63)],
  studio: [at("Studio", 63), at("मेरी", 75)],
  close: [at("मेरी", 73), t.duration(1.1, 100)],
} as const;

const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
const fade = (frame: number, start: number, span = 16) => interpolate(frame, [start, start + span], [0, 1], clamp);

const Header: React.FC<{ title: string; kicker?: string }> = ({ title, kicker = "The Engineer’s Cut · Hindi tech" }) => (
  <div style={{ position: "absolute", left: 128, top: 82, width: 1664, fontFamily: "Noto Sans Devanagari, sans-serif" }}>
    <div style={{ color: "#625D54", fontSize: 22, fontWeight: 600, marginBottom: 12 }}>{kicker}</div>
    <div style={{ color: landscapeBrand.colors.text, fontSize: 62, lineHeight: 1.1, fontWeight: 700 }}>{title}</div>
  </div>
);

const Paper: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => (
  <div style={{ boxSizing: "border-box", background: landscapeBrand.colors.surface, border: "2px solid #1B19161C", borderRadius: 18, boxShadow: "0 16px 36px rgba(35,29,20,.08)", ...style }}>{children}</div>
);

const Clip: React.FC<{ label: string; width: number; kind?: "quiet" | "selected" | "done"; small?: string }> = ({ label, width, kind = "quiet", small }) => {
  const background = kind === "selected" ? "#C84E2F" : kind === "done" ? "#287A55" : "#EAE5DB";
  const color = kind === "quiet" ? "#1B1916" : "#FFFFFF";
  return (
    <div style={{ width, minWidth: width, height: 94, boxSizing: "border-box", padding: "15px 16px", borderRadius: 12, background, color, display: "flex", flexDirection: "column", justifyContent: "center", border: kind === "quiet" ? "1px solid #1B191614" : "none" }}>
      <div style={{ fontSize: 23, fontWeight: 700, lineHeight: 1.1 }}>{label}</div>
      {small ? <div style={{ marginTop: 7, fontSize: 16, opacity: 0.8 }}>{small}</div> : null}
    </div>
  );
};

const Track: React.FC<{ mode: "raw" | "suggested" | "review"; progress: number; width?: number }> = ({ mode, progress, width = 1180 }) => {
  const pauseKind = mode === "raw" ? "selected" : mode === "suggested" ? "quiet" : "done";
  const playhead = 68 + Math.min(1, Math.max(0, progress)) * Math.max(0, width - 128);
  return (
    <div style={{ position: "relative", width, paddingTop: 42 }}>
      <div style={{ position: "absolute", top: 0, left: 0, color: "#625D54", fontSize: 19, fontWeight: 600 }}>{mode === "raw" ? "RAW CLIPS" : mode === "suggested" ? "AI SUGGESTION" : "CREATOR REVIEW"}</div>
      <div style={{ position: "relative", display: "flex", alignItems: "center", gap: 12 }}>
        <Clip label="Hook" small="question" width={190} kind="quiet" />
        <Clip label={mode === "suggested" ? "cut?" : "pause"} small={mode === "raw" ? "2 seconds" : mode === "suggested" ? "suggested" : "kept for reveal"} width={mode === "suggested" ? 110 : 190} kind={pauseKind} />
        <Clip label="Reveal" small="answer" width={225} kind={mode === "review" ? "done" : "quiet"} />
        <Clip label="Close" small="last shot" width={190} kind="quiet" />
      </div>
      <div style={{ position: "relative", height: 42, marginTop: 24, borderTop: "2px solid #1B19161E" }}>
        <div style={{ position: "absolute", left: 0, top: 10, color: "#625D54", fontSize: 16 }}>music</div>
        <div style={{ position: "absolute", left: 90, right: 0, top: 17, height: 5, background: "#D9D2C7", borderRadius: 4 }} />
        <div style={{ position: "absolute", left: 90, width: 338, top: 17, height: 5, background: "#C84E2F", borderRadius: 4, opacity: mode === "raw" ? 0.55 : 1 }} />
      </div>
      <div style={{ position: "absolute", left: playhead, top: 24, width: 3, height: 148, background: "#1B1916", opacity: 0.75 }} />
    </div>
  );
};

const Prompt: React.FC<{ text: string; label?: string; accent?: boolean; width?: number }> = ({ text, label = "आपका prompt", accent = false, width = 470 }) => (
  <Paper style={{ width, padding: 25, borderColor: accent ? "#C84E2F88" : "#1B19161C" }}>
    <div style={{ color: accent ? "#C84E2F" : "#625D54", fontSize: 18, fontWeight: 600, marginBottom: 12 }}>{label}</div>
    <div style={{ color: "#1B1916", fontSize: 28, lineHeight: 1.35, fontWeight: 600 }}>{text}</div>
  </Paper>
);

const Section: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div data-el="diagram" data-kind="content" style={{ position: "absolute", left: 128, top: 320, width: 1664, height: 480 }}>
    {children}
  </div>
);

const Pop: React.FC<{ children: React.ReactNode; at: number; style?: React.CSSProperties }> = ({ children, at, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = spring({ frame: frame - at, fps, config: { damping: 18, stiffness: 100 } });
  return <div style={{ opacity: fade(frame, at), transform: `translateY(${(1 - progress) * 18}px)`, ...style }}>{children}</div>;
};

export const Reel: React.FC<ReelProps> = ({ brand = landscapeBrand, debugSafeZones, probe }) => {
  const frame = useCurrentFrame();
  const motion = frame % 180;
  const playProgress = (motion / 180) % 1;
  return (
    <ReelFrame brand={brand} audio={AUDIO} debugSafeZones={debugSafeZones} probe={probe}>
      <SceneBlock name="hook" from={S.hook[0]} to={S.hook[1]}>
        <Header title="Punchline किसने काटी?" />
        <Section>
          <Paper style={{ position: "absolute", left: 0, top: 55, width: 1080, padding: 27 }}>
            <Track mode="raw" progress={playProgress} width={1000} />
          </Paper>
          <div style={{ position: "absolute", left: 1155, top: 70 }}>
            <Prompt text="सारे pauses काटो" label="AI को कहा" accent width={450} />
          </div>
          <div style={{ position: "absolute", left: 1155, top: 260, width: 450, color: "#625D54", fontSize: 25, lineHeight: 1.4 }}>
            Reveal भी कट गया. अब कहानी कौन बचाएगा?
          </div>
        </Section>
      </SceneBlock>

      <SceneBlock name="announcement" from={S.announcement[0]} to={S.announcement[1]}>
        <Header title="YouTube ने AI editor announce किया" kicker="Creator update · 2026" />
        <Section>
          <Paper style={{ position: "absolute", left: 180, top: 55, width: 1300, padding: 46, textAlign: "center" }}>
            <div style={{ color: "#C84E2F", fontSize: 40, fontWeight: 700 }}>Gemini वाला conversational editor</div>
            <div style={{ marginTop: 30, color: "#1B1916", fontSize: 34 }}>Shorts · YouTube Create</div>
            <div style={{ marginTop: 22, color: "#625D54", fontSize: 25 }}>पहले draft. फिर chat में बदलाव बताओ.</div>
          </Paper>
        </Section>
      </SceneBlock>

      <SceneBlock name="assistant" from={S.assistant[0]} to={S.assistant[1]}>
        <Header title="एक chat, पहला cut" kicker="Shorts · YouTube Create" />
        <Section>
          <Paper style={{ position: "absolute", left: 0, top: 45, width: 1080, padding: 27 }}>
            <Track mode="suggested" progress={playProgress} width={1000} />
          </Paper>
          <div style={{ position: "absolute", left: 1155, top: 58 }}>
            <Prompt text="इन clips का order बदलो" label="Assistant को कहो" accent width={450} />
          </div>
          <div style={{ position: "absolute", left: 1155, top: 275, width: 450, color: "#625D54", fontSize: 25, lineHeight: 1.4 }}>
            पहले draft दिखेगा. फिर तुम इसे edit करोगे.
          </div>
        </Section>
      </SceneBlock>

      <SceneBlock name="three-tasks" from={S.actions[0]} to={S.actions[1]}>
        <Header title="तीन काम, एक simple prompt" kicker="Editing का पहला draft" />
        <Section>
          <div style={{ position: "absolute", left: 20, top: 115, display: "flex", alignItems: "stretch", gap: 28 }}>
            <Pop at={at("लंबे", 22)}>
              <Paper style={{ width: 500, minHeight: 205, padding: 30 }}>
                <div style={{ color: "#C84E2F", fontSize: 20, fontWeight: 700 }}>01 · TRIM</div>
                <div style={{ marginTop: 24, fontSize: 32, fontWeight: 700 }}>लंबे gaps हटाओ</div>
              </Paper>
            </Pop>
            <Pop at={at("clips", 24)}>
              <Paper style={{ width: 500, minHeight: 205, padding: 30 }}>
                <div style={{ color: "#C84E2F", fontSize: 20, fontWeight: 700 }}>02 · REORDER</div>
                <div style={{ marginTop: 24, fontSize: 32, fontWeight: 700 }}>clips का order बदलो</div>
              </Paper>
            </Pop>
            <Pop at={at("music", 26)}>
              <Paper style={{ width: 500, minHeight: 205, padding: 30 }}>
                <div style={{ color: "#287A55", fontSize: 20, fontWeight: 700 }}>03 · SYNC</div>
                <div style={{ marginTop: 24, fontSize: 32, fontWeight: 700 }}>music beat पर मिलाओ</div>
              </Paper>
            </Pop>
          </div>
          <div style={{ position: "absolute", left: 280, top: 375, width: 1100, color: "#625D54", textAlign: "center", fontSize: 26 }}>
            Suggestion मिले. देखो, फिर prompt बदलो या manual edit करो.
          </div>
        </Section>
      </SceneBlock>

      <SceneBlock name="example-bad" from={S.exampleBad[0]} to={S.exampleBad[1]}>
        <Header title="हर pause dead नहीं" kicker="एक joke का आसान example" />
        <Section>
          <Paper style={{ position: "absolute", left: 0, top: 55, width: 1080, padding: 28 }}>
            <Track mode="suggested" progress={playProgress} width={1000} />
          </Paper>
          <div style={{ position: "absolute", left: 1155, top: 60 }}>
            <Prompt text="सारे pauses काटो" label="पहला prompt" accent width={450} />
          </div>
          <div style={{ position: "absolute", left: 0, top: 335, display: "flex", alignItems: "center", gap: 18 }}>
            <Paper style={{ padding: "18px 24px", fontSize: 23, color: "#625D54" }}>Question</Paper>
            <div style={{ fontSize: 30, color: "#C84E2F" }}>→</div>
            <Paper style={{ padding: "18px 24px", fontSize: 23, color: "#A34330" }}>Pause cut</Paper>
            <div style={{ fontSize: 30, color: "#C84E2F" }}>→</div>
            <Paper style={{ padding: "18px 24px", fontSize: 23, color: "#625D54" }}>Punchline missing</Paper>
          </div>
        </Section>
      </SceneBlock>

      <SceneBlock name="example-good" from={S.exampleGood[0]} to={S.exampleGood[1]}>
        <Header title="बस prompt को specific करो" kicker="Reveal बचा रहे, extra gap कटे" />
        <Section>
          <Paper style={{ position: "absolute", left: 0, top: 50, width: 1080, padding: 28 }}>
            <Track mode="review" progress={playProgress} width={1000} />
          </Paper>
          <div style={{ position: "absolute", left: 1155, top: 50 }}>
            <Prompt text="लंबे dead gaps trim करो. Reveal से पहले वाला pause रहने दो." label="बेहतर prompt" accent width={450} />
          </div>
          <div style={{ position: "absolute", left: 0, top: 335, display: "flex", alignItems: "center", gap: 22 }}>
            <Paper style={{ padding: "18px 24px", fontSize: 23 }}>बात साफ़?</Paper>
            <Paper style={{ padding: "18px 24px", fontSize: 23, borderColor: "#287A5566" }}>Punchline land?</Paper>
            <Paper style={{ padding: "18px 24px", fontSize: 23 }}>आवाज़ सुनाई दे?</Paper>
          </div>
        </Section>
      </SceneBlock>

      <SceneBlock name="creator-review" from={S.creatorReview[0]} to={S.creatorReview[1]}>
        <Header title="AI का पहला cut final नहीं" kicker="Suggestion और manual edit के बीच switch कर सकते हो" />
        <Section>
          <div style={{ position: "absolute", left: 130, top: 125, display: "flex", alignItems: "center", gap: 45 }}>
            <Paper style={{ width: 520, padding: 38, textAlign: "center" }}>
              <div style={{ color: "#C84E2F", fontSize: 26, fontWeight: 700 }}>AI suggestion</div>
              <div style={{ marginTop: 22, fontSize: 32 }}>लंबा pause trim करो</div>
            </Paper>
            <div style={{ color: "#625D54", fontSize: 40 }}>→</div>
            <Paper style={{ width: 620, padding: 38, textAlign: "center", borderColor: "#287A5566" }}>
              <div style={{ color: "#287A55", fontSize: 26, fontWeight: 700 }}>Creator review</div>
              <div style={{ marginTop: 22, fontSize: 32 }}>Reveal बचा? आवाज़ साफ़?</div>
            </Paper>
          </div>
        </Section>
      </SceneBlock>

      <SceneBlock name="studio-tools" from={S.studio[0]} to={S.studio[1]}>
        <Header title="Editing और Studio अलग हैं" kicker="दो tools, दो अलग काम" />
        <Section>
          <Paper style={{ position: "absolute", left: 20, top: 55, width: 730, padding: 34, minHeight: 310 }}>
            <div style={{ fontSize: 30, fontWeight: 700, color: "#C84E2F" }}>Editing assistant</div>
            <div style={{ marginTop: 22, fontSize: 26, lineHeight: 1.45 }}>Pause trim · clip order · music sync</div>
            <div style={{ marginTop: 18, fontSize: 21, color: "#625D54" }}>Shorts और YouTube Create</div>
          </Paper>
          <div style={{ position: "absolute", left: 790, top: 185, color: "#625D54", fontSize: 38 }}>→</div>
          <Paper style={{ position: "absolute", left: 890, top: 55, width: 730, padding: 34, minHeight: 310 }}>
            <div style={{ fontSize: 30, fontWeight: 700, color: "#287A55" }}>YouTube Studio</div>
            <div style={{ marginTop: 22, fontSize: 26, lineHeight: 1.45 }}>Draft feedback · thumbnail ideas · testing</div>
            <div style={{ marginTop: 18, fontSize: 21, color: "#625D54" }}>Rollout / availability can vary</div>
          </Paper>
          <div style={{ position: "absolute", left: 20, top: 415, color: "#625D54", fontSize: 21 }}>
            Check your Studio for what is live on your account.
          </div>
        </Section>
      </SceneBlock>

      <SceneBlock name="close" from={S.close[0]} to={S.close[1]}>
        <Header title="AI पहला cut देता है" kicker="कहानी का फैसला तुम्हारा" />
        <Section>
          <div style={{ position: "absolute", left: 20, top: 90, display: "flex", alignItems: "center", gap: 28 }}>
            <Paper style={{ width: 420, padding: 38, fontSize: 32, fontWeight: 700, textAlign: "center" }}>AI: repeat task</Paper>
            <div style={{ fontSize: 36, color: "#C84E2F" }}>→</div>
            <Paper style={{ width: 340, padding: 38, fontSize: 32, fontWeight: 700, textAlign: "center" }}>तुम: review</Paper>
            <div style={{ fontSize: 36, color: "#C84E2F" }}>→</div>
            <Paper style={{ width: 460, padding: 38, fontSize: 32, fontWeight: 700, textAlign: "center", borderColor: "#287A5566" }}>तुम: keep / change</Paper>
          </div>
          <div style={{ position: "absolute", left: 120, top: 320, width: 1420, color: "#C84E2F", textAlign: "center", fontSize: 32, fontWeight: 700 }}>
            AI से first cut लोगे, या खुद edit करोगे?
          </div>
          <div style={{ position: "absolute", left: 350, top: 395, width: 960, color: "#625D54", textAlign: "center", fontSize: 24 }}>
            Comment “FIRST CUT” या “MANUAL”
          </div>
        </Section>
      </SceneBlock>

      <div style={{ position: "absolute", left: 128, right: 128, bottom: 116 }}>
        <Karaoke words={words} perChunk={5} size={42} keywords={["AI", "Gemini", "creator", "pause", "first", "cut"]} />
      </div>
    </ReelFrame>
  );
};
