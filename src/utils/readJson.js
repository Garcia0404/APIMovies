import { readFileSync } from "node:fs"
export const moviesJson = () => {
  const result = readFileSync("src/utils/movies.json","utf-8")
  return JSON.parse(result)
}
