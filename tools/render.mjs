// Usage: npm run render -- <CompositionId> [out.mp4]
//   npm run render -- Demo                -> out/Demo.mp4
//   npm run render -- my-reel out/my.mp4
// Retries with your installed Google Chrome if Remotion's own browser cannot start.
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { browserFlag, fallbackBrowser } from "./browser.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const [id, outArg] = process.argv.slice(2);
if (!id) { console.error("Usage: npm run render -- <CompositionId> [out.mp4]"); process.exit(1); }
const out = outArg || `out/${id}.mp4`;
fs.mkdirSync(path.dirname(path.join(root, out)), { recursive: true });
const remotionCli = path.join(root, "node_modules", "@remotion", "cli", "remotion-cli.js");

const run = (browser) =>
  spawnSync(process.execPath, [remotionCli, "render", id, out, "--crf=18", ...(browser ? [`--browser-executable=${browser}`] : [])], { cwd: root, stdio: "inherit" });

let r = run(browserFlag());
if (r.error) {
  console.error("Could not start the local Remotion CLI:", r.error.message);
  process.exit(1);
}
if (r.status !== 0 && !browserFlag() && fallbackBrowser()) {
  console.log("\nRetrying with your installed Chrome...\n");
  r = run(fallbackBrowser());
}
if (r.error) {
  console.error("Could not start the local Remotion CLI:", r.error.message);
  process.exit(1);
}
process.exit(r.status ?? 1);
