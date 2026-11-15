// Animated systems explainer: two appointment requests, one slot, one decision.
// Scene cuts and every major state change are aligned to Hindi voice timings.
import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import { brand as myBrand } from "../../brand";
import { useBrand } from "../../brand-context";
import { EndCard, Karaoke, ReelFrame, SceneBlock, Title, type ReelProps } from "../../components";
import { CAPTION_BOTTOM, SAFE, SAFE_BOX } from "../../layout";
import { timing } from "../../timing";
import words from "../../../public/reels/durable-booking-race/captions.words.json";

export const t = timing(words);
export const AUDIO = "reels/durable-booking-race/vo.wav";
export const durationInFrames = t.duration();

const S = {
  hook: [0, t.at(12)],
  collision: [t.at(12), t.at(27)],
  key: [t.at(27), t.at(34)],
  route: [t.at(34), t.at(47)],
  interleave: [t.at(47), t.at(62)],
  transaction: [t.at(62), t.at(75)],
  winner: [t.at(75), t.at(88)],
  split: [t.at(88), t.at(94)],
  cta: [t.at(94), t.duration()],
} as const;

const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
const ramp = (frame: number, from: number, to: number, a = 0, b = 1) =>
  interpolate(frame, [from, Math.max(from + 1, to)], [a, b], { ...clamp, easing: Easing.out(Easing.cubic) });
const pulse = (frame: number, offset = 0) => 0.5 + 0.5 * Math.sin((frame - offset) / 8);

const Headline: React.FC<{ text: string; highlight?: string; at: number; size?: number }> = ({ text, highlight, at, size = 82 }) => (
  <div style={{ position: "absolute", left: SAFE_BOX.x, top: SAFE.top + 22, width: SAFE_BOX.width }}>
    <Title text={text} highlight={highlight} at={at} size={size} showHandle={false} />
  </div>
);

const Stage: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div data-el="diagram" data-kind="content" style={{ position: "absolute", left: SAFE_BOX.x, top: 500, width: SAFE_BOX.width, height: 620 }}>
    {children}
  </div>
);

const FlowArrows: React.FC<{
  paths: { id: string; d: string; at: number; duration?: number }[];
  color?: string;
}> = ({ paths, color }) => {
  const frame = useCurrentFrame();
  const b = useBrand();
  const stroke = color ?? b.colors.accent;
  return (
    <svg aria-hidden="true" viewBox="0 0 900 620" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible", pointerEvents: "none" }}>
      <defs>
        {paths.map((p) => (
          <marker key={p.id} id={`arrow-${p.id}`} markerWidth="12" markerHeight="12" refX="9" refY="5" orient="auto" markerUnits="strokeWidth">
            <path d="M0,0 L0,10 L10,5 z" fill={stroke} />
          </marker>
        ))}
      </defs>
      {paths.map((p) => (
        <path
          key={p.id}
          d={p.d}
          fill="none"
          stroke={stroke}
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray="1"
          pathLength="1"
          strokeDashoffset={1 - ramp(frame, p.at, p.at + (p.duration ?? 20))}
          markerEnd={`url(#arrow-${p.id})`}
          opacity={0.82}
        />
      ))}
    </svg>
  );
};

const StatusPill: React.FC<{ text: string; color: string; glow?: number; small?: boolean }> = ({ text, color, glow = 0, small = false }) => (
  <div style={{ display: "inline-flex", alignItems: "center", gap: small ? 8 : 12, padding: small ? "10px 13px" : "13px 19px", borderRadius: 99, color, border: `2px solid ${color}44`, background: `${color}12`, boxShadow: glow ? `0 0 ${8 + glow * 24}px ${color}55` : "none", fontSize: small ? 22 : 29, lineHeight: 1, fontWeight: 850, letterSpacing: 0.5, whiteSpace: "nowrap" }}>
    <span style={{ width: 12, height: 12, borderRadius: 99, background: color, boxShadow: `0 0 0 5px ${color}22` }} />{text}
  </div>
);

const SlotCard: React.FC<{ left: number; top: number; width?: number; status?: string; statusColor?: string; glow?: number; compact?: boolean }> = ({ left, top, width = 480, status = "AVAILABLE", statusColor, glow = 0, compact = false }) => {
  const b = useBrand();
  const color = statusColor ?? (status === "BOOKED" ? b.colors.accent2 : b.colors.accent);
  return (
    <div style={{ position: "absolute", left, top, width, padding: compact ? "23px 26px" : "28px 32px", boxSizing: "border-box", borderRadius: 30, background: b.colors.surface, border: `2px solid ${color}44`, boxShadow: `0 24px 50px rgba(18,24,40,.12), 0 0 ${glow * 22}px ${color}22`, fontFamily: b.fontFamily }}>
      <div style={{ color: b.colors.text, opacity: 0.52, fontSize: 21, fontWeight: 750, letterSpacing: 1.2 }}>APPOINTMENT SLOT · 01</div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 18, gap: 12 }}>
        <div style={{ color: b.colors.text, fontSize: compact ? 48 : 58, fontWeight: 850, lineHeight: 1 }}>09:30</div>
        <StatusPill text={status} color={color} glow={glow} small={compact} />
      </div>
      {!compact && <div style={{ marginTop: 18, color: b.colors.text, opacity: 0.48, fontSize: 25, fontWeight: 650 }}>TODAY <span style={{ color: b.colors.accent2 }}>•</span> LAST AVAILABLE</div>}
    </div>
  );
};

const RequestCard: React.FC<{ left: number; top: number; label: string; sub?: string; color?: string; status?: string; opacity?: number; shiftX?: number }> = ({ left, top, label, sub = "Book 09:30", color, status, opacity = 1, shiftX = 0 }) => {
  const b = useBrand();
  const ink = color ?? b.colors.accent;
  return (
    <div style={{ position: "absolute", left, top, width: 250, minHeight: 116, boxSizing: "border-box", padding: "18px 20px", borderRadius: 24, background: b.colors.surface, border: `2px solid ${ink}66`, boxShadow: "0 16px 38px rgba(18,24,40,.11)", fontFamily: b.fontFamily, opacity, transform: `translateX(${shiftX}px)` }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, color: ink, fontWeight: 850, fontSize: 29, lineHeight: 1.1 }}>
        <span style={{ display: "inline-block", width: 14, height: 14, borderRadius: 99, background: ink }} />{label}
      </div>
      <div style={{ color: b.colors.text, opacity: 0.58, fontSize: 20, fontWeight: 650, marginTop: 9, maxWidth: 210, overflowWrap: "anywhere", lineHeight: 1.15 }}>{status ?? sub}</div>
    </div>
  );
};

const KeyChip: React.FC<{ left: number; label: string; value: string; active: number }> = ({ left, label, value, active }) => {
  const b = useBrand();
  return (
    <div style={{ position: "absolute", left, top: 95, width: 210, height: 140, padding: 20, boxSizing: "border-box", borderRadius: 24, background: b.colors.surface, border: `2px solid ${b.colors.accent}${active > 0.6 ? "CC" : "33"}`, boxShadow: active > 0.6 ? `0 14px 32px ${b.colors.accent}22` : "0 10px 24px rgba(18,24,40,.06)", transform: `translateY(${(1 - active) * 16}px) scale(${0.96 + active * 0.04})`, opacity: 0.5 + active * 0.5, fontFamily: b.fontFamily }}>
      <div style={{ color: b.colors.text, opacity: 0.5, fontSize: 24, fontWeight: 750, textTransform: "uppercase", letterSpacing: 1.2 }}>{label}</div>
      <div style={{ color: b.colors.text, fontSize: 35, lineHeight: 1.1, marginTop: 12, fontWeight: 850 }}>{value}</div>
    </div>
  );
};

const ObjectCard: React.FC<{ left: number; top: number; width?: number; title?: string; subtitle?: string; tint?: string; pulseAt?: number }> = ({ left, top, width = 310, title = "DURABLE OBJECT", subtitle = "slot coordinator", tint, pulseAt }) => {
  const b = useBrand();
  const frame = useCurrentFrame();
  const breathing = pulseAt === undefined ? 0 : pulse(frame, pulseAt);
  const color = tint ?? b.colors.accent2;
  return (
    <div style={{ position: "absolute", left, top, width, padding: "27px 23px", boxSizing: "border-box", borderRadius: 28, background: b.colors.surface, border: `2px solid ${color}88`, boxShadow: `0 18px ${40 + breathing * 10}px ${color}${breathing ? "30" : "18"}`, transform: `scale(${1 + breathing * 0.018})`, textAlign: "center", fontFamily: b.fontFamily }}>
      <div style={{ margin: "0 auto 14px", width: 50, height: 50, borderRadius: 16, display: "grid", placeItems: "center", background: `${color}18`, color, fontSize: 29, fontWeight: 900 }}>DO</div>
      <div style={{ color: b.colors.text, fontSize: 26, fontWeight: 850, letterSpacing: 0.35, whiteSpace: "nowrap" }}>{title}</div>
      <div style={{ color: b.colors.text, opacity: 0.55, fontSize: 24, marginTop: 8, fontWeight: 650 }}>{subtitle}</div>
    </div>
  );
};

const Label: React.FC<{ left: number; top: number; text: string; color?: string; size?: number; width?: number; align?: "left" | "center" | "right" }> = ({ left, top, text, color, size = 29, width = 300, align = "left" }) => {
  const b = useBrand();
  return <div style={{ position: "absolute", left, top, width, color: color ?? b.colors.text, fontFamily: b.fontFamily, fontWeight: 800, fontSize: size, lineHeight: 1.15, textAlign: align, letterSpacing: 0.25 }}>{text}</div>;
};

export const Reel: React.FC<ReelProps> = ({ brand = myBrand, debugSafeZones, probe }) => {
  const frame = useCurrentFrame();
  const b = brand;
  const availableGlow = pulse(frame, t.at(0));
  const arrivalA = ramp(frame, t.at(12), t.at(12) + 20);
  const arrivalB = ramp(frame, t.at(22), t.at(22) + 20);
  const transactionBreath = pulse(frame, t.at(62));
  const reserved = frame >= t.at(78);
  const blocked = frame >= t.at(81);
  const red = "#E74C3C";

  return (
    <ReelFrame brand={b} audio={AUDIO} debugSafeZones={debugSafeZones} probe={probe}>
      <SceneBlock name="hook" from={S.hook[0]} to={S.hook[1]}>
        <Headline text="एक slot. दो bookings?" highlight="दो bookings?" at={t.at(0)} size={82} />
        <Stage>
          <div style={{ position: "absolute", left: 190, top: 125, width: 520, height: 250, borderRadius: 38, border: `3px solid ${b.colors.accent}${Math.round(40 + availableGlow * 70).toString(16)}`, transform: `scale(${1 + availableGlow * 0.015})`, opacity: 0.55 + availableGlow * 0.25 }} />
          <SlotCard left={190} top={145} width={520} glow={availableGlow} />
          <Label left={248} top={410} text="एक ही slot बचा है" color={b.colors.accent2} width={420} size={31} align="center" />
          <div style={{ position: "absolute", left: 462, top: 485, width: 3, height: 62, background: `${b.colors.accent}55` }} />
        </Stage>
      </SceneBlock>

      <SceneBlock name="collision" from={S.collision[0]} to={S.collision[1]}>
        <Headline text="दोनों को AVAILABLE" highlight="AVAILABLE" at={t.at(12)} size={80} />
        <Stage>
          <FlowArrows paths={[
            { id: "collision-a", d: "M 240 105 C 315 115, 330 210, 405 245", at: t.at(12), duration: 22 },
            { id: "collision-b", d: "M 660 445 C 590 435, 570 335, 500 300", at: t.at(22), duration: 22 },
          ]} />
          <RequestCard left={0} top={48} label="REQUEST A" status="09:30 · claim" opacity={arrivalA} shiftX={-42 * (1 - arrivalA)} />
          <RequestCard left={600} top={414} label="REQUEST B" status="09:30 · claim" color={b.colors.accent2} opacity={arrivalB} shiftX={40 * (1 - arrivalB)} />
          <SlotCard left={240} top={210} width={420} compact glow={pulse(frame, t.at(19))} />
        </Stage>
      </SceneBlock>

      <SceneBlock name="stable-key" from={S.key[0]} to={S.key[1]}>
        <Headline text="पहले सही key" highlight="key" at={t.at(27)} />
        <Stage>
          <KeyChip left={0} label="clinic" value="04" active={ramp(frame, t.at(30), t.at(30) + 12)} />
          <KeyChip left={230} label="staff" value="03" active={ramp(frame, t.at(31), t.at(31) + 12)} />
          <KeyChip left={460} label="date" value="15 NOV" active={ramp(frame, t.at(32), t.at(32) + 12)} />
          <KeyChip left={690} label="time" value="09:30" active={ramp(frame, t.at(33), t.at(33) + 12)} />
          <FlowArrows paths={[{ id: "key-assembly", d: "M 110 260 C 190 315, 300 330, 450 355", at: t.at(34), duration: 18 }]} />
          <div style={{ position: "absolute", left: 35, top: 365, width: 830, padding: "26px 18px", boxSizing: "border-box", borderRadius: 24, background: b.colors.text, color: "#FFFFFF", textAlign: "center", fontFamily: "monospace", fontSize: 31, fontWeight: 750, letterSpacing: 0.1, boxShadow: "0 22px 46px rgba(18,24,40,.18)" }}>
            slotKey = clinic + staff + date + time
          </div>
          <Label left={170} top={480} text="एक logical slot → एक stable ID" color={b.colors.accent2} width={560} size={27} align="center" />
        </Stage>
      </SceneBlock>

      <SceneBlock name="route-to-one" from={S.route[0]} to={S.route[1]}>
        <Headline text="एक slot, एक फैसला" highlight="एक फैसला" at={t.at(34)} />
        <Stage>
          <FlowArrows paths={[
            { id: "route-a", d: "M 235 120 C 300 150, 345 230, 410 285", at: t.at(40), duration: 18 },
            { id: "route-b", d: "M 665 120 C 600 150, 555 230, 490 285", at: t.at(40), duration: 18 },
          ]} />
          <RequestCard left={0} top={50} label="REQUEST A" status="same ID" />
          <RequestCard left={650} top={50} label="REQUEST B" status="same ID" color={b.colors.accent2} />
          <ObjectCard left={300} top={270} width={300} subtitle="one coordinator · one slot" pulseAt={t.at(44)} />
          <Label left={245} top={492} text="दोनों requests उसी object तक" color={b.colors.accent} width={410} size={28} align="center" />
        </Stage>
      </SceneBlock>

      <SceneBlock name="await-interleave" from={S.interleave[0]} to={S.interleave[1]}>
        <Headline text="await में interleave" highlight="await" at={t.at(47)} />
        <Stage>
          <Label left={0} top={50} text="REQUEST A" color={b.colors.accent} size={26} width={170} />
          <div style={{ position: "absolute", left: 170, top: 38, width: 700, height: 118, borderRadius: 24, background: b.colors.surface, border: `2px solid ${b.colors.accent}55`, display: "flex", alignItems: "center", justifyContent: "space-evenly", boxShadow: "0 14px 30px rgba(18,24,40,.08)" }}>
            <StatusPill text="READ" color={b.colors.accent} glow={pulse(frame, t.at(49))} />
            <div style={{ color: b.colors.text, opacity: 0.4, fontSize: 34 }}>→</div>
            <StatusPill text="await fetch()" color={red} glow={pulse(frame, t.at(53))} />
            <div style={{ color: b.colors.text, opacity: 0.4, fontSize: 34 }}>→</div>
            <StatusPill text="RESERVE" color={b.colors.accent2} />
          </div>
          <div style={{ position: "absolute", left: 425, top: 168, width: 190, height: 125, borderLeft: `4px dashed ${red}88`, borderBottom: `4px dashed ${red}88`, borderRadius: "0 0 0 20px" }} />
          <RequestCard left={0} top={385} label="REQUEST B" status="runs during await" color={b.colors.accent2} opacity={ramp(frame, t.at(57), t.at(57) + 18)} shiftX={-36 * (1 - ramp(frame, t.at(57), t.at(57) + 18))} />
          <div style={{ position: "absolute", left: 310, top: 400, padding: "22px 28px", borderRadius: 22, background: `${red}12`, border: `2px solid ${red}44`, color: red, fontSize: 31, fontWeight: 850, fontFamily: "sans-serif" }}>A रुका है · B चल सकती है</div>
          <Label left={225} top={535} text="single-threaded ≠ no async interleaving" color={b.colors.text} size={26} width={600} align="center" />
        </Stage>
      </SceneBlock>

      <SceneBlock name="atomic-reservation" from={S.transaction[0]} to={S.transaction[1]}>
        <Headline text="reserve को atomic रखो" highlight="atomic" at={t.at(62)} size={78} />
        <Stage>
          <div style={{ position: "absolute", left: 85, top: 75, width: 730, height: 275, boxSizing: "border-box", padding: "22px 26px", borderRadius: 30, border: `3px solid ${b.colors.accent2}99`, background: `${b.colors.accent2}${Math.round(10 + transactionBreath * 36).toString(16).padStart(2, "0")}`, boxShadow: `0 0 36px ${b.colors.accent2}1C` }}>
            <div style={{ color: b.colors.accent2, fontSize: 25, fontWeight: 900, letterSpacing: 2, textAlign: "center" }}>STORAGE TRANSACTION · ATOMIC</div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 46 }}>
              {[
                { label: "READ", at: t.at(63) }, { label: "CHECK", at: t.at(65) }, { label: "RESERVE", at: t.at(68) },
              ].map((step, i) => {
                const active = frame >= step.at;
                return <React.Fragment key={step.label}>
                  <div style={{ minWidth: 165, padding: "23px 14px", boxSizing: "border-box", borderRadius: 20, textAlign: "center", background: active ? b.colors.surface : "#FFFFFF77", border: `2px solid ${active ? b.colors.accent2 : b.colors.text + "22"}`, color: active ? b.colors.accent2 : b.colors.text, fontSize: 29, fontWeight: 900, boxShadow: active ? `0 10px 28px ${b.colors.accent2}22` : "none" }}>{step.label}</div>
                  {i < 2 && <div style={{ color: b.colors.text, opacity: 0.42, fontSize: 32, fontWeight: 800 }}>→</div>}
                </React.Fragment>;
              })}
            </div>
            <div style={{ position: "absolute", left: 105, right: 105, bottom: 24, height: 7, borderRadius: 99, background: `${b.colors.accent2}24` }} />
            <div style={{ position: "absolute", left: 103 + ramp(frame, t.at(62), t.at(75)) * 520, bottom: 16, width: 22, height: 22, borderRadius: 99, background: b.colors.accent2, boxShadow: `0 0 0 8px ${b.colors.accent2}22, 0 0 22px ${b.colors.accent2}88` }} />
          </div>
          <div style={{ position: "absolute", left: 220, top: 405, width: 460, padding: "21px 24px", boxSizing: "border-box", borderRadius: 22, background: b.colors.surface, border: `2px dashed ${b.colors.accent}88`, color: b.colors.text, textAlign: "center", fontSize: 29, fontWeight: 800, boxShadow: "0 12px 26px rgba(18,24,40,.06)" }}>
            unrelated network call · बाहर
          </div>
          <Label left={205} top={526} text="storage में read → check → reserve साथ commit" color={b.colors.text} size={25} width={500} align="center" />
        </Stage>
      </SceneBlock>

      <SceneBlock name="one-wins" from={S.winner[0]} to={S.winner[1]}>
        <Headline text="दूसरी request रुकेगी" highlight="रुकेगी" at={t.at(75)} size={78} />
        <Stage>
          <FlowArrows paths={[
            { id: "winner-a", d: "M 240 118 C 300 150, 335 210, 410 260", at: t.at(75), duration: 18 },
            { id: "winner-b", d: "M 655 420 C 590 390, 560 335, 500 310", at: t.at(81), duration: 18 },
          ]} />
          <RequestCard left={0} top={46} label="REQUEST A" status={reserved ? "CONFIRMED ✓" : "reserving…"} color={b.colors.accent2} />
          <RequestCard left={650} top={410} label="REQUEST B" status={blocked ? "ALREADY BOOKED" : "waiting…"} color={blocked ? "#D94A3D" : b.colors.accent} />
          <SlotCard left={230} top={215} width={440} compact status={reserved ? "BOOKED" : "AVAILABLE"} statusColor={reserved ? b.colors.accent2 : b.colors.accent} glow={reserved ? pulse(frame, t.at(78)) : 0} />
          <Label left={275} top={450} text="एक confirm · zero double-booking" color={b.colors.accent2} width={350} size={27} align="center" />
        </Stage>
      </SceneBlock>

      <SceneBlock name="wrong-key-splits" from={S.split[0]} to={S.split[1]}>
        <Headline text="गलत key? race वापस" highlight="race" at={t.at(88)} size={80} />
        <Stage>
          <FlowArrows color={red} paths={[
            { id: "split-a", d: "M 220 120 C 225 210, 205 245, 190 310", at: t.at(90), duration: 12 },
            { id: "split-b", d: "M 680 120 C 675 210, 700 245, 710 310", at: t.at(90), duration: 12 },
          ]} />
          <RequestCard left={0} top={38} label="REQUEST A" status="staff-03 · 09:30" color={b.colors.accent} />
          <RequestCard left={650} top={38} label="REQUEST B" status="staff-3 · 9:30" color={b.colors.accent2} />
          <ObjectCard left={38} top={300} width={360} title="COORDINATOR A" subtitle="key: staff-03 / 09:30" tint={red} />
          <ObjectCard left={502} top={300} width={360} title="COORDINATOR B" subtitle="key: staff-3 / 9:30" tint={red} />
          <div style={{ position: "absolute", left: 275, top: 500, width: 350, padding: "17px 18px", boxSizing: "border-box", borderRadius: 18, background: `${red}14`, color: red, border: `2px solid ${red}55`, fontSize: 27, fontWeight: 900, textAlign: "center" }}>2 IDs → 2 coordinators</div>
        </Stage>
      </SceneBlock>

      <SceneBlock name="cta" from={S.cta[0]} to={S.cta[1]}>
        <div style={{ position: "absolute", left: SAFE_BOX.x, top: 500, width: SAFE_BOX.width }}>
          <EndCard keyword="FLOW" lead="Checklist चाहिए?" sub="Pinned comment देखो" at={t.at(94)} />
        </div>
      </SceneBlock>

      <div style={{ position: "absolute", left: SAFE_BOX.x, width: SAFE_BOX.width, bottom: CAPTION_BOTTOM }}>
        <Karaoke words={words} perChunk={4} keywords={["FLOW", "BOOKED", "transaction", "AVAILABLE", "race"]} size={54} />
      </div>
    </ReelFrame>
  );
};
