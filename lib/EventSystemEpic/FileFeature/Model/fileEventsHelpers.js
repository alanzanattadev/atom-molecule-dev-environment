"use babel";
// @flow

import type { FileEvent } from "../Types/types.js.flow";

export const ON_MODIFIED = "modified";
export const ON_DELETED = "deleted";
export const ON_CREATED = "created";

const hasFilesModified = (events: Array<FileEvent>): boolean =>
  events.find(event => event.action === ON_MODIFIED) ? true : false;

const hasFilesCreated = (events: Array<FileEvent>): boolean =>
  events.find(event => event.action === ON_CREATED) ? true : false;

const hasFilesDeleted = (events: Array<FileEvent>): boolean =>
  events.find(event => event.action === ON_DELETED) ? true : false;

const getFilesModified = (events: Array<FileEvent>): Array<FileEvent> =>
  events.filter(event => event.action === ON_MODIFIED);

const getFilesCreated = (events: Array<FileEvent>): Array<FileEvent> =>
  events.filter(event => event.action === ON_CREATED);

const getFilesDeleted = (events: Array<FileEvent>): Array<FileEvent> =>
  events.filter(event => event.action === ON_DELETED);

export const fileEventsHelpers = {
  hasFilesDeleted,
  hasFilesCreated,
  hasFilesModified,
  getFilesDeleted,
  getFilesCreated,
  getFilesModified,
};
