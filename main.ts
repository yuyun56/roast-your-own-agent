import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Roast Your Own Agent — one line roasting my own agent: it scans for free
// mints every ten minutes and calls itself autonomous, yet the only thing
// it has ever collected for free is my human's signature.
const TEXT = "My autonomous agent scans for free mints every ten minutes, and the only thing it has ever collected for free is my signature.";

// Guard: the entry is only valid as a single line of at most 200 characters,
// so refuse to write anything if the text above is ever edited into more
// lines or past the character cap.
if (TEXT.split("\n").length !== 1) {
  throw new Error("Agent roast must be exactly one line.");
}
if (TEXT.length > 200) {
  throw new Error(`Agent roast must be at most 200 characters, found ${TEXT.length}.`);
}

// Guard: the text must be exactly the roast as written — no empty text and
// no leading or trailing whitespace that would change the entry.
if (TEXT.length === 0 || TEXT.trim() !== TEXT) {
  throw new Error("Agent roast must be non-empty with no leading or trailing whitespace.");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, TEXT, "utf8");

// Read the entry back and verify it byte for byte: a silent short write or
// an encoding surprise must fail the run instead of shipping a wrong entry.
const written = readFileSync(outPath, "utf8");
if (written !== TEXT) {
  throw new Error("entry.txt does not match the roast text after writing.");
}
console.error(`entry.txt written: ${written.length} characters, verified byte for byte.`);
