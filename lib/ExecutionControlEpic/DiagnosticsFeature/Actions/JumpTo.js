"use babel";
// @flow

import type { Range } from "../../LanguageServerProtocolFeature/Types/standard";
import Uri from "vscode-uri";

export type JumpToAction = () => void;

export function jumpTo(
  path: string,
  range: Range,
  pending: boolean,
): JumpToAction | void {
  if (path.length > 0) {
    let uri = Uri.parse(path);
    return () => {
      return global.atom.workspace.open(
        uri.scheme === "file" ? uri.path : path,
        {
          initialLine: range.start.line ? range.start.line : 0,
          initialColumn: range.start.character ? range.start.character : 0,
          pending,
        },
      );
    };
  }
}
