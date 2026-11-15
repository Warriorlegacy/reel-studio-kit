// Cross-platform setup for the local faster-whisper caption alignment tools.
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const toolsDir = path.join(root, "tools");
const venvDir = path.join(toolsDir, ".venv");
const isWindows = process.platform === "win32";

const run = (command, args) => {
  const result = spawnSync(command, args, { cwd: toolsDir, stdio: "inherit" });
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status ?? 1);
};

if (spawnSync("ffmpeg", ["-version"], { stdio: "ignore" }).status !== 0) {
  console.error("ffmpeg is required. Install it and rerun npm run setup:captions.");
  process.exit(1);
}

let pythonCommand;
let pythonArgs = [];
if (isWindows) {
  pythonCommand = "py";
  pythonArgs = ["-3.11"];
  const probe = spawnSync(pythonCommand, [...pythonArgs, "--version"], { encoding: "utf8" });
  if (probe.status !== 0) {
    // Python installed by uv can be listed by the Windows launcher without
    // accepting the generic -3.11 selector. Resolve its actual executable.
    const listed = spawnSync("py", ["-0p"], { encoding: "utf8" });
    const runtime = (listed.stdout || "").split(/\r?\n/)
      .map((line) => line.match(/^\s*-V:[^\s]*3\.11[^\s]*\s+(.+?python\.exe)\s*$/i)?.[1]?.trim())
      .find(Boolean);
    if (!runtime || spawnSync(runtime, ["--version"], { encoding: "utf8" }).status !== 0) {
      console.error("Python 3.11 is required on Windows. Install it with the Python launcher, then rerun npm run setup:captions.");
      process.exit(1);
    }
    pythonCommand = runtime;
    pythonArgs = [];
  }
} else {
  pythonCommand = ["python3.13", "python3.12", "python3.11"].find((command) =>
    spawnSync(command, ["--version"], { stdio: "ignore" }).status === 0
  );
  if (!pythonCommand) {
    console.error("Python 3.11, 3.12, or 3.13 is required. Install one, then rerun npm run setup:captions.");
    process.exit(1);
  }
}

run(pythonCommand, [...pythonArgs, "-m", "venv", venvDir]);
const venvPython = isWindows
  ? path.join(venvDir, "Scripts", "python.exe")
  : path.join(venvDir, "bin", "python");

run(venvPython, ["-m", "pip", "install", "--quiet", "--upgrade", "pip"]);
run(venvPython, ["-m", "pip", "install", "--quiet", "-r", path.join(toolsDir, "captions", "requirements.txt")]);

if (!fs.existsSync(venvPython)) {
  console.error("Caption environment was not created at " + venvPython);
  process.exit(1);
}
console.log("Caption tools are ready. The first sync downloads the Whisper model.");
