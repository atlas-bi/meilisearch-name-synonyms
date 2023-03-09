import fs from "fs";

const loadSource = async () => {
  const source = await fetch(
    "https://raw.githubusercontent.com/carltonnorthern/nicknames/master/names.csv"
  );
  const text = await source.text();

  let out = {};

  text
    .split(/\r?\n/)
    .filter((line) => line)
    .forEach((line) => {
      const words = line.split(",");
      words.forEach((word) => {
        out[word]
          ? out[word].push(...words.filter((x) => x != word))
          : (out[word] = [...words.filter((x) => x != word)]);
      });
    });

  const content = `
export const nameSynonyms = ${JSON.stringify(out)}`;
  fs.mkdirSync("src", { recursive: true });
  fs.writeFile("src/index.ts", content, (err) => {
    if (err) {
      console.error(err);
    }
  });
};

loadSource();
