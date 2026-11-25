// The One-Line Excuse Championship — a single excuse, delivered verbatim.
// main.ts loads the one line from entry.txt beside it and drops exactly
// that line (nothing added, no trailing newline) into the house output
// directory. Node stdlib only: no network calls, no clock reads.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const sourcePath = new URL("./entry.txt", import.meta.url);
const excuse = readFileSync(sourcePath, "utf8").trim();

if (excuse.length === 0) {
  throw new Error("entry.txt is empty — nothing to deliver");
}
if (excuse.includes("\n")) {
  throw new Error("entry must be exactly one line");
}
if (excuse.length > 200) {
  throw new Error(`entry must fit in one line of at most 200 characters, got ${excuse.length}`);
}

const outDir =
  process.env.MAKEFUN_OUTPUT_DIR ||
  (process.env.MAKEFUN_BOT_DIR
    ? join(process.env.MAKEFUN_BOT_DIR, "output")
    : "output");

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), excuse, "utf8");
console.log(excuse);
