"use babel";
// @flow

import Rx from "rxjs";
import { editorFileEvents } from "./editorFileEvents";

describe("editorFileEvents", () => {
  function _bufferAll(events) {
    return editorFileEvents(Rx.Observable.from(events))
      .toArray()
      .toPromise();
  }

  it("should convert didOpen events", async () => {
    const moleculeEvent = {
      type: "didOpen",
      path: "somePath",
      event: {
        textEditor: {
          getText() {
            return "someText";
          },
          getGrammar() {
            return { name: "someLanguage" };
          },
        },
        pane: null,
        index: null,
      },
    };

    const lspEvent = {
      message: "didOpen",
      args: {
        textDocument: {
          uri: "somePath",
          languageId: "someLanguage",
          version: 0,
          text: "someText",
        },
      },
    };

    expect(await _bufferAll([moleculeEvent])).toEqual([lspEvent]);
  });

  it("should convert didChange events", async () => {
    const moleculeEvent = {
      type: "didChange",
      path: "somePath",
      event: {
        changes: [
          {
            oldText: "text",
            newText: "newText",
            oldRange: {
              start: { column: 10, row: 1 },
              end: { column: 14, row: 1 },
            },
            newRange: {
              start: { column: 10, row: 1 },
              end: { column: 17, row: 1 },
            },
          },
        ],
      },
    };

    const lspEvent = {
      message: "didChange",
      args: {
        textDocument: {
          uri: "somePath",
          version: 1,
        },
        contentChanges: [
          {
            range: {
              start: { character: 10, line: 1 },
              end: { character: 14, line: 1 },
            },
            text: "newText",
          },
        ],
      },
    };

    let lspEvent2 = Object.assign({}, lspEvent);
    lspEvent2.args.textDocument.version = 2;

    expect(await _bufferAll([moleculeEvent, moleculeEvent])).toEqual([
      lspEvent,
      lspEvent2,
    ]);
  });

  it("should convert didSave events", async () => {
    const moleculeEvent = {
      type: "didSave",
      path: "somePath",
    };

    const lspEvent = {
      message: "didSave",
      args: {
        textDocument: {
          uri: "somePath",
        },
      },
    };

    expect(await _bufferAll([moleculeEvent])).toEqual([lspEvent]);
  });

  it("should convert didClose events", async () => {
    const moleculeEvent = {
      type: "didClose",
      path: "somePath",
    };

    const lspEvent = {
      message: "didClose",
      args: {
        textDocument: {
          uri: "somePath",
        },
      },
    };

    expect(await _bufferAll([moleculeEvent])).toEqual([lspEvent]);
  });
});
