"use babel";
// @flow

export type Point = {
  column: number,
  row: number,
};

export type Range = {
  start: Point,
  end: Point,
};

export type TextChange = {
  oldText: string,
  newTest: string,
  oldRange: Range,
  newRange: Range,
};

export type AtomEditorSaveEvent = {
  path: string,
};

export type AtomEditorChangeEvent = {
  changes: Array<TextChange>,
};

export type AtomEditorOpenEvent = {
  textEditor: atom$TextEditor,
  pane: atom$Pane,
  index: number,
};

export type AtomEditorAnyEvent =
  | AtomEditorSaveEvent
  | AtomEditorOpenEvent
  | AtomEditorChangeEvent;

export type MoleculeAtomEditorEvent = {
  type: string,
  path: string,
  event: AtomEditorAnyEvent,
};
