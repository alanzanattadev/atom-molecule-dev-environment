'use babel'
// @flow
import type {FileStatus, File} from "../Types/types.js.flow";

function getStatusFromModifier(modifier: string): FileStatus {
  switch(modifier) {
    case 'M': return 'modified';
    case '??': return 'added';
    case 'D': return 'removed';
    default: return 'versionned';
  }
};

export function getStatusesFromStatusOutput(output: string): Array<File> {
  return output
           .split('\n')
           .filter(line => line != "")
           .map(line => line.trim().split(/\s+/))
           .filter(words => words.filter(word => word != ''))
           .filter(words => words.length > 1)
           .map(words => ({
             modifier: words[0],
             path: words[1],
           }))
           .map(status => ({
             status: getStatusFromModifier(status.modifier),
             path: status.path,
           }));
};
