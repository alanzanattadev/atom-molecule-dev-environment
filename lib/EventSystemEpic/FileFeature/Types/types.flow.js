"use babel";
// @flow

import type { Package } from "../../../ProjectSystemEpic/PackageFeature/Types/types.js";

export type WatchMode = "created" | "deleted" | "modified";

export type WatchPath = Function;

export type WatchFilesAPI = {
  toolPackages: Array<Package>,
};

export type FileEvent = {
  action: WatchMode,
  path: string,
  oldPath?: string,
};

export type WatchFilesController = {
  settings: {
    paths: Array<string>,
    fileFilter: RegExp,
  },
  onFilesChanged(
    events: Array<FileEvent>,
    fileEventsHelpers: FileEventsHelpers,
  ): void,
};

export type FileEventsHelpers = {
  hasFilesDeleted(events: Array<FileEvent>): boolean,
  hasFilesCreated(events: Array<FileEvent>): boolean,
  hasFilesModified(events: Array<FileEvent>): boolean,
  getFilesDeleted(events: Array<FileEvent>): Array<FileEvent>,
  getFilesCreated(events: Array<FileEvent>): Array<FileEvent>,
  getFilesModified(events: Array<FileEvent>): Array<FileEvent>,
};
