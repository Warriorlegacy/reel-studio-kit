import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { brand as baseBrand, type Brand } from "../../brand";
import { ReelFrame, SceneBlock, Karaoke, type ReelProps } from "../../components";
import { timing } from "../../timing";
import words from "../../../public/reels/internet-5min/captions.words.json";

const landscapeBrand: Brand = {
  ...baseBrand,
  colors: { bg: "#0D0D0D", surface: "#1A1A1A", text: "#FFFFFF", accent: "#00FF88", accent2: "#FFD60A" },
  font: "NotoSansDevanagari",
  radius: 18,
  shadow: false,
  handle: "The Engineer’s Cut",
};

export const t = timing(words);
export const AUDIO = "reels/internet-5min/vo.wav";
export const durationInFrames = t.duration(1.0, 230);

const at = (token: string, fallback: number, occurrence = 0) => t.atText(token, fallback, occurrence);
const S = {
  intro: [0, at("Pehle", 8)],
  what: [at("Pehle", 8), at("Jab", 16)],
  packet: [at("Jab", 16), at("Router", 26)],
  router: [at("Router", 26), at("ISP", 34)],
  isp: [at("ISP", 34), at("backbone", 44)],
  backbone: [at("backbone", 44), at("Key", 56)],
  keys: [at("Key", 56), at("TCP", 72)],
  tcp: [at("TCP", 72), at("HTTP", 84)],
  http: [at("HTTP", 84), at("Servers", 96)],
  servers: [at("Servers", 96), at("Latency", 112)],
  latency: [at("Latency", 112), at("CDN", 126)],
  cdn: [at("CDN", 126), at("Wi-Fi", 140)],
  wifi: [at("Wi-Fi", 140), at("Security", 156)],
  security: [at("Security", 156), at("Common", 172)],
  myths: [at("Common", 172), at("Summary", 190)],
  summary: [at("Summary", 190), at("Ab", 210)],
  close: [at("Ab", 210), t.duration(1.0, 230)],
} as const;

const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
const appear = (frame: number, start: number, span = 16) => interpolate(frame, [start, start + span], [0, 1], clamp);

const Heading: React.FC<{ primary: string; accent?: string }> = ({ primary, accent }) => (
  <div data-el="headline" data-kind="content" style={{ position: "absolute", left: 120, top: 80, width: 1680, fontFamily: "Noto Sans Devanagari, sans-serif" }}>
    {accent ? <div style={{ color: landscapeBrand.colors.accent, fontSize: 24, fontWeight: 700, marginBottom: 8, letterSpacing: 1 }}>{accent}</div> : null}
    <div style={{ color: landscapeBrand.colors.text, fontSize: 60, fontWeight: 800, lineHeight: 1.1, letterSpacing: -1.5 }}>{primary}</div>
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

const Bullet: React.FC<{ text: string; atFrame: number; frame: number }> = ({ text, atFrame, frame }) => {
  const progress = spring({ frame: frame - atFrame, fps: 30, config: { damping: 18, stiffness: 140 } });
  return (
    <div data-el="bullet" data-kind="content" style={{ opacity: appear(frame, atFrame), transform: `translateX(${(1 - progress) * 40}px)`, color: landscapeBrand.colors.text, fontSize: 30, fontWeight: 600, marginBottom: 14, lineHeight: 1.3 }}>
      • {text}
    </div>
  );
};

export const Reel: React.FC<ReelProps> = ({ brand = landscapeBrand, debugSafeZones, probe }) => {
  const frame = useCurrentFrame();
  return (
    <ReelFrame brand={brand} audio={AUDIO} debugSafeZones={debugSafeZones} probe={probe}>
      <SceneBlock name="intro" from={S.intro[0]} to={S.intro[1]}>
        <Heading primary="Internet kaise kaam karta hai?" accent="5 MINUTE EXPLAINER" />
        <div style={{ position: "absolute", left: 120, top: 260, width: 1680, color: "#AAA", fontSize: 32, lineHeight: 1.5 }}>
          Ek message tumhare phone se duusre phone tak kaise pahunchta hai?
        </div>
      </SceneBlock>

      <SceneBlock name="what" from={S.what[0]} to={S.what[1]}>
        <Heading primary="Internet = global network" accent="PEHLE SAMJHO" />
        <div style={{ position: "absolute", left: 120, top: 260, width: 1680 }}>
          <Bullet text="Millions of computers aur servers connected" atFrame={S.what[0] + 6} frame={frame} />
          <Bullet text="Data packets travel karte hain roads pe" atFrame={S.what[0] + 24} frame={frame} />
          <Bullet text="Jaise giant road network" atFrame={S.what[0] + 42} frame={frame} />
        </div>
      </SceneBlock>

      <SceneBlock name="packet" from={S.packet[0]} to={S.packet[1]}>
        <Heading primary="Packet = chhota data bundle" accent="JAB TUM SEND DABATE HO" />
        <div style={{ position: "absolute", left: 120, top: 260, width: 1680 }}>
          <Bullet text="Text chhota data packet ban jata hai" atFrame={S.packet[0] + 6} frame={frame} />
          <Bullet text="Packet mein destination address hota hai" atFrame={S.packet[0] + 24} frame={frame} />
          <Bullet text="Jaise letter pe address" atFrame={S.packet[0] + 42} frame={frame} />
        </div>
      </SceneBlock>

      <SceneBlock name="router" from={S.router[0]} to={S.router[1]}>
        <Heading primary="Router = traffic police" accent="PEHLE STOP" />
        <div style={{ position: "absolute", left: 120, top: 260, width: 1680 }}>
          <Bullet text="Phone se router tak packet" atFrame={S.router[0] + 6} frame={frame} />
          <Bullet text="Router decide karta hai best path" atFrame={S.router[0] + 24} frame={frame} />
          <Bullet text="Ghar ka traffic controller" atFrame={S.router[0] + 42} frame={frame} />
        </div>
      </SceneBlock>

      <SceneBlock name="isp" from={S.isp[0]} to={S.isp[1]}>
        <Heading primary="ISP = Internet Service Provider" accent="NEXT HOP" />
        <div style={{ position: "absolute", left: 120, top: 260, width: 1680 }}>
          <Bullet text="Jio, Airtel, etc." atFrame={S.isp[0] + 6} frame={frame} />
          <Bullet text="Packet ko next hop tak bhejta hai" atFrame={S.isp[0] + 24} frame={frame} />
          <Bullet text="Local to global bridge" atFrame={S.isp[0] + 42} frame={frame} />
        </div>
      </SceneBlock>

      <SceneBlock name="backbone" from={S.backbone[0]} to={S.backbone[1]}>
        <Heading primary="Backbone = undersea cables" accent="DUNIYA KO JODTA HAI" />
        <div style={{ position: "absolute", left: 120, top: 260, width: 1680 }}>
          <Bullet text="Fiber optics, satellites" atFrame={S.backbone[0] + 6} frame={frame} />
          <Bullet text="Destination country tak pahunchta hai" atFrame={S.backbone[0] + 24} frame={frame} />
          <Bullet text="Whole journey milliseconds" atFrame={S.backbone[0] + 42} frame={frame} />
        </div>
      </SceneBlock>

      <SceneBlock name="keys" from={S.keys[0]} to={S.keys[1]}>
        <Heading primary="Key concepts" accent="IP, DNS, PROTOCOL" />
        <div style={{ position: "absolute", left: 120, top: 260, width: 1680 }}>
          <Bullet text="IP address = unique device address" atFrame={S.keys[0] + 6} frame={frame} />
          <Bullet text="DNS = google.com to IP" atFrame={S.keys[0] + 24} frame={frame} />
          <Bullet text="Protocol = rules of communication" atFrame={S.keys[0] + 42} frame={frame} />
        </div>
      </SceneBlock>

      <SceneBlock name="tcp" from={S.tcp[0]} to={S.tcp[1]}>
        <Heading primary="TCP vs UDP" accent="RELIABILITY vs SPEED" />
        <div style={{ position: "absolute", left: 120, top: 260, width: 1680 }}>
          <Bullet text="TCP reliable, ordered, re-send" atFrame={S.tcp[0] + 6} frame={frame} />
          <Bullet text="UDP fast, no guarantee" atFrame={S.tcp[0] + 24} frame={frame} />
          <Bullet text="Video calls, gaming use UDP" atFrame={S.tcp[0] + 42} frame={frame} />
        </div>
      </SceneBlock>

      <SceneBlock name="http" from={S.http[0]} to={S.http[1]}>
        <Heading primary="HTTP vs HTTPS" accent="SECURITY" />
        <div style={{ position: "absolute", left: 120, top: 260, width: 1680 }}>
          <Bullet text="HTTPS encrypted, secure" atFrame={S.http[0] + 6} frame={frame} />
          <Bullet text="Lock icon browser mein" atFrame={S.http[0] + 24} frame={frame} />
          <Bullet text="Always prefer HTTPS" atFrame={S.http[0] + 42} frame={frame} />
        </div>
      </SceneBlock>

      <SceneBlock name="servers" from={S.servers[0]} to={S.servers[1]}>
        <Heading primary="Servers & Cloud" accent="WHERE WEBSITES LIVE" />
        <div style={{ position: "absolute", left: 120, top: 260, width: 1680 }}>
          <Bullet text="Websites servers pe hosted" atFrame={S.servers[0] + 6} frame={frame} />
          <Bullet text="Server 24/7 online" atFrame={S.servers[0] + 24} frame={frame} />
          <Bullet text="Cloud = rented servers" atFrame={S.servers[0] + 42} frame={frame} />
        </div>
      </SceneBlock>

      <SceneBlock name="latency" from={S.latency[0]} to={S.latency[1]}>
        <Heading primary="Latency, Bandwidth, Ping" accent="SPEED TERMS" />
        <div style={{ position: "absolute", left: 120, top: 260, width: 1680 }}>
          <Bullet text="Latency = delay" atFrame={S.latency[0] + 6} frame={frame} />
          <Bullet text="Bandwidth = speed" atFrame={S.latency[0] + 24} frame={frame} />
          <Bullet text="Ping = round-trip time" atFrame={S.latency[0] + 42} frame={frame} />
        </div>
      </SceneBlock>

      <SceneBlock name="cdn" from={S.cdn[0]} to={S.cdn[1]}>
        <Heading primary="CDN = Content Delivery Network" accent="FASTER LOAD" />
        <div style={{ position: "absolute", left: 120, top: 260, width: 1680 }}>
          <Bullet text="Files copies near you" atFrame={S.cdn[0] + 6} frame={frame} />
          <Bullet text="Netflix, YouTube use CDN" atFrame={S.cdn[0] + 24} frame={frame} />
          <Bullet text="Less latency, faster page" atFrame={S.cdn[0] + 42} frame={frame} />
        </div>
      </SceneBlock>

      <SceneBlock name="wifi" from={S.wifi[0]} to={S.wifi[1]}>
        <Heading primary="Wi-Fi vs Mobile data" accent="BOTH INTERNET" />
        <div style={{ position: "absolute", left: 120, top: 260, width: 1680 }}>
          <Bullet text="Wi-Fi router se" atFrame={S.wifi[0] + 6} frame={frame} />
          <Bullet text="Mobile data tower se" atFrame={S.wifi[0] + 24} frame={frame} />
          <Bullet text="Both internet pe connected" atFrame={S.wifi[0] + 42} frame={frame} />
        </div>
      </SceneBlock>

      <SceneBlock name="security" from={S.security[0]} to={S.security[1]}>
        <Heading primary="Security basics" accent="FIREWALL, VPN, ENCRYPTION" />
        <div style={{ position: "absolute", left: 120, top: 260, width: 1680 }}>
          <Bullet text="Firewall filters traffic" atFrame={S.security[0] + 6} frame={frame} />
          <Bullet text="VPN tunnel, IP hide" atFrame={S.security[0] + 24} frame={frame} />
          <Bullet text="Encryption data protect" atFrame={S.security[0] + 42} frame={frame} />
        </div>
      </SceneBlock>

      <SceneBlock name="myths" from={S.myths[0]} to={S.myths[1]}>
        <Heading primary="Common myths busted" accent="MYTH vs FACT" />
        <div style={{ position: "absolute", left: 120, top: 260, width: 1680 }}>
          <Bullet text="Internet = Wi-Fi? Nahi" atFrame={S.myths[0] + 6} frame={frame} />
          <Bullet text="Faster plan = faster site? Depends" atFrame={S.myths[0] + 24} frame={frame} />
          <Bullet text="5G = always better? Coverage matters" atFrame={S.myths[0] + 42} frame={frame} />
        </div>
      </SceneBlock>

      <SceneBlock name="summary" from={S.summary[0]} to={S.summary[1]}>
        <Heading primary="Summary" accent="PHONE → ROUTER → ISP → BACKBONE" />
        <div style={{ position: "absolute", left: 120, top: 260, width: 1680 }}>
          <Bullet text="Packets, IP, DNS, protocols" atFrame={S.summary[0] + 6} frame={frame} />
          <Bullet text="Latency, bandwidth, CDN" atFrame={S.summary[0] + 24} frame={frame} />
          <Bullet text="Servers, security, myths" atFrame={S.summary[0] + 42} frame={frame} />
        </div>
      </SceneBlock>

      <SceneBlock name="close" from={S.close[0]} to={S.close[1]}>
        <Heading primary="Internet magic nahi, engineering hai" accent="COMMENT KARO" />
        <div style={{ position: "absolute", left: 120, top: 300, width: 1680, color: "#888", fontSize: 30 }}>
          Kaunsa part sabse interesting laga?
        </div>
      </SceneBlock>

      <div style={{ position: "absolute", left: 120, width: 1680, bottom: 96 }}>
        <Karaoke words={words} perChunk={6} keywords={["internet", "packet", "router"]} />
      </div>
    </ReelFrame>
  );
};
