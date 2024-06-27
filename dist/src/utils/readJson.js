import { readFileSync } from "node:fs";
export var moviesJson = function() {
    var result = readFileSync("src/utils/movies.json", "utf-8");
    return JSON.parse(result);
};

//# sourceMappingURL=readJson.js.map