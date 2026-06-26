import { execFileSync } from "node:child_process";
import fs from "node:fs";

const loadSource = async () => {
  const source = await fetch(
    "https://raw.githubusercontent.com/carltonnorthern/nicknames/master/names.csv",
  );
  const text = await source.text();
  const out = {};

  text
    .split(/\r?\n/)
    .filter((line) => line)
    .forEach((line) => {
      const words = line.split(",");
      words.forEach((word) => {
        const synonyms = words.filter((x) => x !== word);
        if (out[word]) {
          out[word].push(...synonyms);
        } else {
          out[word] = [...synonyms];
        }
      });
    });

  const content = `export const nameSynonyms = ${JSON.stringify(out, null, 2)};\n`;
  fs.mkdirSync("src", { recursive: true });
  fs.writeFileSync("src/index.ts", content);
  execFileSync("npx", ["biome", "format", "--write", "src/index.ts"], { stdio: "inherit" });
};

loadSource();
