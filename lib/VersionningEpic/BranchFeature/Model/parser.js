"use babel";
// @flow
import type { Branch, Remote } from "../Types/types.js.flow";

export function getBranchesFromBranchOutput(output: string): Array<Branch> {
  return output
    .split("\n")
    .filter(line => line != "")
    .map(line => line.trim().split(/\s+/))
    .map(words => words.filter(word => word.length > 0 && word != ""))
    .filter(words => words.length > 0)
    .map(words => ({
      current: words[0] == "*",
      name: words[0] == "*" ? words[1] : words[0]
    }));
}

export function getRemotesFromRemoteOutput(output: string): Array<Remote> {
  return output
    .split("\n")
    .map(line => line.trim())
    .filter(line => line != "" && line.length > 0)
    .map(line => ({
      name: line
    }));
}
