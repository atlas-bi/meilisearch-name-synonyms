# Meilisearch Name Synonyms

This is an importable list of nicknames to be used as a [meilisearch](https://docs.meilisearch.com/learn/getting_started/quick_start.html) [synonym list](https://docs.meilisearch.com/learn/configuration/synonyms.html#synonyms).

## Installing

```bash
npm i meilisearch-name-synonyms
```

## Usage

Assuming you have a search index for people:

```js
import { MeiliSearch } from "meilisearch";
import { nameSynonyms } from "meilisearch-name-synonyms";

const client = new MeiliSearch({ host: "http://localhost:7700" });

const userIndex = client.index("users");

await userIndex.updateSynonyms(nameSynonyms);

/// or if you need to add in a few more
await userIndex.updateSynonyms({ ...nameSynonyms, superman: ["wow"] });
```

## Sources

Name list is provided by https://github.com/carltonnorthern/nicknames/blob/master/names.csv and licensed under [Apache-2.0](https://github.com/carltonnorthern/nicknames/blob/master/License.txt)
