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

  const json = JSON.stringify(out);

  fs.mkdirSync("build", { recursive: true });
  fs.writeFileSync("build/index.js", `exports.nameSynonyms = ${json};\n`);
  fs.writeFileSync("build/index.es.mjs", `export const nameSynonyms = ${json};\n`);
  fs.writeFileSync(
    "build/index.d.ts",
    "export declare const nameSynonyms: Record<string, string[]>;\n",
  );
};

loadSource();
