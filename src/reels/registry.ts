// Every reel the studio and the renderer know about. `npm run new -- <id>` adds a line here.
import type React from "react";
import type { ReelProps } from "../components";
import type { Word } from "../timing";
import { PRESETS } from "../presets";
import * as demo from "./demo/Reel";
import * as r_durable_booking_race from "./durable-booking-race/Reel";
import * as r_ig_image_gif from "./ig-image-gif/Reel";
import * as r_youtube_ai_editor from "./youtube-ai-editor/Reel";
import * as r_ig_yt_ai_editor from "./ig-yt-ai-editor/Reel";
import * as r_authenticator_airplane from "./authenticator-airplane/Reel";
import * as r_authenticator_airplane_yt from "./authenticator-airplane-yt/Reel";
import * as r_internet_5min from "./internet-5min/Reel";
import * as r_qr_safe_scan from "./qr-safe-scan/Reel";
import * as r_battery_survive from "./battery-survive/Reel";
import * as r_dark_mode_myth from "./dark-mode-myth/Reel";
import * as r_ai_photo_edit from "./ai-photo-edit/Reel";
import * as r_tech_real_problem from "./tech-real-problem/Reel";
import * as r_system_30_sec from "./system-30-sec/Reel";
import * as r_ai_tool_limit from "./ai-tool-limit/Reel";
// <new-reel-imports>

export type ReelEntry = {
  id: string;
  Component: React.FC<ReelProps>;
  durationInFrames: number;
  width?: number;
  height?: number;
  /** Extra compositions of the same reel with other props, e.g. another avatar style or brand preset. */
  variants?: { suffix: string; props: ReelProps }[];
};

export const REELS: ReelEntry[] = [
  {
    id: "Demo",
    Component: demo.Reel,
    durationInFrames: demo.durationInFrames,
    variants: [
      { suffix: "Illustrated", props: { avatar: "illustrated" } },
      { suffix: "Pixel", props: { avatar: "pixel" } },
      { suffix: "BoldDark", props: { brand: PRESETS.boldDark } },
      { suffix: "SoftPastel", props: { brand: PRESETS.softPastel } },
    ],
  },
  { id: "durable-booking-race", Component: r_durable_booking_race.Reel, durationInFrames: r_durable_booking_race.durationInFrames },
  { id: "ig-image-gif", Component: r_ig_image_gif.Reel, durationInFrames: r_ig_image_gif.durationInFrames },
  { id: "youtube-ai-editor", Component: r_youtube_ai_editor.Reel, durationInFrames: r_youtube_ai_editor.durationInFrames, width: 1920, height: 1080 },
  { id: "ig-yt-ai-editor", Component: r_ig_yt_ai_editor.Reel, durationInFrames: r_ig_yt_ai_editor.durationInFrames },
  { id: "authenticator-airplane", Component: r_authenticator_airplane.Reel, durationInFrames: r_authenticator_airplane.durationInFrames },
  { id: "authenticator-airplane-yt", Component: r_authenticator_airplane_yt.Reel, durationInFrames: r_authenticator_airplane_yt.durationInFrames, width: 1920, height: 1080 },
  { id: "internet-5min", Component: r_internet_5min.Reel, durationInFrames: r_internet_5min.durationInFrames, width: 1920, height: 1080 },
  { id: "qr-safe-scan", Component: r_qr_safe_scan.Reel, durationInFrames: r_qr_safe_scan.durationInFrames },
  { id: "battery-survive", Component: r_battery_survive.Reel, durationInFrames: r_battery_survive.durationInFrames },
  { id: "dark-mode-myth", Component: r_dark_mode_myth.Reel, durationInFrames: r_dark_mode_myth.durationInFrames },
  { id: "ai-photo-edit", Component: r_ai_photo_edit.Reel, durationInFrames: r_ai_photo_edit.durationInFrames },
  { id: "tech-real-problem", Component: r_tech_real_problem.Reel, durationInFrames: r_tech_real_problem.durationInFrames },
  { id: "system-30-sec", Component: r_system_30_sec.Reel, durationInFrames: r_system_30_sec.durationInFrames },
  { id: "ai-tool-limit", Component: r_ai_tool_limit.Reel, durationInFrames: r_ai_tool_limit.durationInFrames },
  { id: "qr-safe-scan", Component: r_qr_safe_scan.Reel, durationInFrames: r_qr_safe_scan.durationInFrames },
  { id: "battery-survive", Component: r_battery_survive.Reel, durationInFrames: r_battery_survive.durationInFrames },
  { id: "dark-mode-myth", Component: r_dark_mode_myth.Reel, durationInFrames: r_dark_mode_myth.durationInFrames },
  { id: "ai-photo-edit", Component: r_ai_photo_edit.Reel, durationInFrames: r_ai_photo_edit.durationInFrames },
  { id: "tech-real-problem", Component: r_tech_real_problem.Reel, durationInFrames: r_tech_real_problem.durationInFrames },
  { id: "system-30-sec", Component: r_system_30_sec.Reel, durationInFrames: r_system_30_sec.durationInFrames },
  { id: "ai-tool-limit", Component: r_ai_tool_limit.Reel, durationInFrames: r_ai_tool_limit.durationInFrames },
  // <new-reel-entries>
];

export type { Word };

