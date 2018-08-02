"use babel";
// @flow

export type EventType =
  | "initialize"
  | "initialized"
  | "shutdown"
  | "exit"
  | "$/cancelRequest"
  | "window/showMessage"
  | "window/showMessageRequest"
  | "window/logMessage"
  | "telemetry/event"
  | "client/registerCapability"
  | "client/unregisterCapability"
  | "workspace/didChangeConfiguration"
  | "workspace/didChangeWatchedFiles"
  | "workspace/symbol"
  | "workspace/executeCommand"
  | "workspace/applyEdit"
  | "textDocument/publishDiagnostics"
  | "textDocument/didOpen"
  | "textDocument/didChange"
  | "textDocument/willSave"
  | "textDocument/willSaveWaitUntil"
  | "textDocument/didSave"
  | "textDocument/didClose"
  | "textDocument/completion"
  | "completionItem/resolve"
  | "textDocument/hover"
  | "textDocument/signatureHelp"
  | "textDocument/references"
  | "textDocument/documentHighlight"
  | "textDocument/documentSymbol"
  | "textDocument/formatting"
  | "textDocument/rangeFormatting"
  | "textDocument/onTypeFormatting"
  | "textDocument/definition"
  | "textDocument/codeAction"
  | "textDocument/codeLens"
  | "codeLens/resolve"
  | "textDocument/documentLink"
  | "documentLink/resolve"
  | "textDocument/rename";

export type Message = {
  jsonrpc: string,
};

export type RequestMessage = Message & {
  /**
   * The request id.
   */
  id: number | string,

  /**
   * The method to be invoked.
   */
  method: string,

  /**
   * The method's params.
   */
  params?: any,
};

export type ResponseMessage = Message & {
  /**
   * The request id.
   */
  id: number | string | null,

  /**
   * The result of a request. This can be omitted in
   * the case of an error.
   */
  result?: any,

  /**
   * The error object in case a request fails.
   */
  error?: ResponseError<any>,
};

export type ResponseError<D> = {
  /**
   * A number indicating the error type that occurred.
   */
  code: number,

  /**
   * A string providing a short description of the error.
   */
  message: string,

  /**
   * A Primitive or Structured value that contains additional
   * information about the error. Can be omitted.
   */
  data?: D,
};

export type ErrorCodes = number;
// Defined by JSON RPC
export const ParseError: number = -32700;
export const InvalidRequest: number = -32600;
export const MethodNotFound: number = -32601;
export const InvalidParams: number = -32602;
export const InternalError: number = -32603;
export const serverErrorStart: number = -32099;
export const serverErrorEnd: number = -32000;
export const ServerNotInitialized: number = -32002;
export const UnknownErrorCode: number = -32001;

// Defined by the protocol.
export const RequestCancelled: number = -32800;

export type NotificationMessage = Message & {
  /**
   * The method to be invoked.
   */
  method: string,

  /**
   * The notification's params.
   */
  params?: any,
};

export type CancelParams = {
  /**
   * The request id to cancel.
   */
  id: number | string,
};

export type DocumentUri = string;

export const EOL: Array<string> = ["\n", "\r\n", "\r"];

export type Position = {
  /**
   * Line position in a document (zero-based).
   */
  line: number,

  /**
   * Character offset on a line in a document (zero-based).
   */
  character: number,
};

export type Range = {
  /**
   * The range's start position.
   */
  start: Position,

  /**
   * The range's end position.
   */
  end: Position,
};

export type Location = {
  uri: DocumentUri,
  range: Range,
};

export type Diagnostic = {
  /**
   * The range at which the message applies.
   */
  range: Range,

  /**
   * The diagnostic's severity. Can be omitted. If omitted it is up to the
   * client to interpret diagnostics as error, warning, info or hint.
   */
  severity?: number,

  /**
   * The diagnostic's code. Can be omitted.
   */
  code?: number | string,

  /**
   * A human-readable string describing the source of this
   * diagnostic, e.g. 'typescript' or 'super lint'.
   */
  source?: string,

  /**
   * The diagnostic's message.
   */
  message: string,
};

export type DiagnosticSeverity = number;
/**
 * Reports an error.
 */
export const DiagnosticSeverityError = 1;
/**
 * Reports a warning.
 */
export const DiagnosticSeverityWarning = 2;
/**
 * Reports an information.
 */
export const DiagnosticSeverityInformation = 3;
/**
 * Reports a hint.
 */
export const DiagnosticSeverityHint = 4;

export type Command = {
  /**
   * Title of the command, like `save`.
   */
  title: string,
  /**
   * The identifier of the actual command handler.
   */
  command: string,
  /**
   * Arguments that the command handler should be
   * invoked with.
   */
  arguments?: any[],
};

export type TextEdit = {
  /**
   * The range of the text document to be manipulated. To insert
   * text into a document create a range where start === end.
   */
  range: Range,

  /**
   * The string to be inserted. For delete operations use an
   * empty string.
   */
  newText: string,
};

export type TextDocumentEdit = {
  /**
   * The text document to change.
   */
  textDocument: VersionedTextDocumentIdentifier,

  /**
   * The edits to be applied.
   */
  edits: Array<TextEdit>,
};

export type WorkspaceEdit = {
  /**
   * Holds changes to existing resources.
   */
  changes?: { [uri: string]: Array<TextEdit> },

  /**
   * An array of `TextDocumentEdit`s to express changes to n different text documents
   * where each text document edit addresses a specific version of a text document.
   * Whether a client supports versioned document edits is expressed via
   * `WorkspaceClientCapabilities.workspaceEdit.documentChanges`.
   */
  documentChanges?: Array<TextDocumentEdit>,
};

export type TextDocumentIdentifier = {
  /**
   * The text document's URI.
   */
  uri: DocumentUri,
};

export type TextDocumentItem = {
  /**
   * The text document's URI.
   */
  uri: DocumentUri,

  /**
   * The text document's language identifier.
   */
  languageId: string,

  /**
   * The version number of this document (it will increase after each
   * change, including undo/redo).
   */
  version: number,

  /**
   * The content of the opened text document.
   */
  text: string,
};

export type VersionedTextDocumentIdentifier = TextDocumentIdentifier & {
  /**
   * The version number of this document.
   */
  version: number,
};

export type TextDocumentPositionParams = {
  /**
   * The text document.
   */
  textDocument: TextDocumentIdentifier,

  /**
   * The position inside the text document.
   */
  position: Position,
};

export type DocumentFilter = {
  /**
   * A language id, like `typescript`.
   */
  language?: string,

  /**
   * A Uri [scheme](#Uri.scheme), like `file` or `untitled`.
   */
  scheme?: string,

  /**
   * A glob pattern, like `*.{ts,js}`.
   */
  pattern?: string,
};

export type DocumentSelector = Array<DocumentFilter>;

export type Trace = "off" | "messages" | "verbose";

export type InitializeParams = {
  /**
   * The process Id of the parent process that started
   * the server. Is null if the process has not been started by another process.
   * If the parent process is not alive then the server should exit (see exit notification) its process.
   */
  processId: ?number,

  /**
   * The rootPath of the workspace. Is null
   * if no folder is open.
   *
   * @deprecated in favour of rootUri.
   */
  rootPath?: ?string,

  /**
   * The rootUri of the workspace. Is null if no
   * folder is open. If both `rootPath` and `rootUri` are set
   * `rootUri` wins.
   */
  rootUri: ?DocumentUri,

  /**
   * User provided initialization options.
   */
  initializationOptions?: any,

  /**
   * The capabilities provided by the client (editor or tool)
   */
  capabilities: ClientCapabilities,

  /**
   * The initial trace setting. If omitted trace is disabled ('off').
   */
  trace?: Trace,
};

/**
 * Workspace specific client capabilities.
 */

export type WorkspaceClientCapabilities = {
  /**
   * The client supports applying batch edits to the workspace by supporting
   * the request 'workspace/applyEdit'
   */
  applyEdit?: boolean,

  /**
   * Capabilities specific to `WorkspaceEdit`s
   */
  workspaceEdit?: {
    /**
     * The client supports versioned document changes in `WorkspaceEdit`s
     */
    documentChanges?: boolean,
  },

  /**
   * Capabilities specific to the `workspace/didChangeConfiguration` notification.
   */
  didChangeConfiguration?: {
    /**
     * Did change configuration notification supports dynamic registration.
     */
    dynamicRegistration?: boolean,
  },

  /**
   * Capabilities specific to the `workspace/didChangeWatchedFiles` notification.
   */
  didChangeWatchedFiles?: {
    /**
     * Did change watched files notification supports dynamic registration.
     */
    dynamicRegistration?: boolean,
  },

  /**
   * Capabilities specific to the `workspace/symbol` request.
   */
  symbol?: {
    /**
     * Symbol request supports dynamic registration.
     */
    dynamicRegistration?: boolean,
  },

  /**
   * Capabilities specific to the `workspace/executeCommand` request.
   */
  executeCommand?: {
    /**
     * Execute command supports dynamic registration.
     */
    dynamicRegistration?: boolean,
  },
};

/**
 * Text document specific client capabilities.
 */
export type TextDocumentClientCapabilities = {
  synchronization?: {
    /**
     * Whether text document synchronization supports dynamic registration.
     */
    dynamicRegistration?: boolean,

    /**
     * The client supports sending will save notifications.
     */
    willSave?: boolean,

    /**
     * The client supports sending a will save request and
     * waits for a response providing text edits which will
     * be applied to the document before it is saved.
     */
    willSaveWaitUntil?: boolean,

    /**
     * The client supports did save notifications.
     */
    didSave?: boolean,
  },

  /**
   * Capabilities specific to the `textDocument/completion`
   */
  completion?: {
    /**
     * Whether completion supports dynamic registration.
     */
    dynamicRegistration?: boolean,

    /**
     * The client supports the following `CompletionItem` specific
     * capabilities.
     */
    completionItem?: {
      /**
       * Client supports snippets as insert text.
       *
       * A snippet can define tab stops and placeholders with `$1`, `$2`
       * and `${3:foo}`. `$0` defines the final tab stop, it defaults to
       * the end of the snippet. Placeholders with equal identifiers are linked,
       * that is typing in one will update others too.
       */
      snippetSupport?: boolean,
    },
  },

  /**
   * Capabilities specific to the `textDocument/hover`
   */
  hover?: {
    /**
     * Whether hover supports dynamic registration.
     */
    dynamicRegistration?: boolean,
  },

  /**
   * Capabilities specific to the `textDocument/signatureHelp`
   */
  signatureHelp?: {
    /**
     * Whether signature help supports dynamic registration.
     */
    dynamicRegistration?: boolean,
  },

  /**
   * Capabilities specific to the `textDocument/references`
   */
  references?: {
    /**
     * Whether references supports dynamic registration.
     */
    dynamicRegistration?: boolean,
  },

  /**
   * Capabilities specific to the `textDocument/documentHighlight`
   */
  documentHighlight?: {
    /**
     * Whether document highlight supports dynamic registration.
     */
    dynamicRegistration?: boolean,
  },

  /**
   * Capabilities specific to the `textDocument/documentSymbol`
   */
  documentSymbol?: {
    /**
     * Whether document symbol supports dynamic registration.
     */
    dynamicRegistration?: boolean,
  },

  /**
   * Capabilities specific to the `textDocument/formatting`
   */
  formatting?: {
    /**
     * Whether formatting supports dynamic registration.
     */
    dynamicRegistration?: boolean,
  },

  /**
   * Capabilities specific to the `textDocument/rangeFormatting`
   */
  rangeFormatting?: {
    /**
     * Whether range formatting supports dynamic registration.
     */
    dynamicRegistration?: boolean,
  },

  /**
   * Capabilities specific to the `textDocument/onTypeFormatting`
   */
  onTypeFormatting?: {
    /**
     * Whether on type formatting supports dynamic registration.
     */
    dynamicRegistration?: boolean,
  },

  /**
   * Capabilities specific to the `textDocument/definition`
   */
  definition?: {
    /**
     * Whether definition supports dynamic registration.
     */
    dynamicRegistration?: boolean,
  },

  /**
   * Capabilities specific to the `textDocument/codeAction`
   */
  codeAction?: {
    /**
     * Whether code action supports dynamic registration.
     */
    dynamicRegistration?: boolean,
  },

  /**
   * Capabilities specific to the `textDocument/codeLens`
   */
  codeLens?: {
    /**
     * Whether code lens supports dynamic registration.
     */
    dynamicRegistration?: boolean,
  },

  /**
   * Capabilities specific to the `textDocument/documentLink`
   */
  documentLink?: {
    /**
     * Whether document link supports dynamic registration.
     */
    dynamicRegistration?: boolean,
  },

  /**
   * Capabilities specific to the `textDocument/rename`
   */
  rename?: {
    /**
     * Whether rename supports dynamic registration.
     */
    dynamicRegistration?: boolean,
  },
};

export type ClientCapabilities = {
  /**
   * Workspace specific client capabilities.
   */
  workspace?: WorkspaceClientCapabilities,

  /**
   * Text document specific client capabilities.
   */
  textDocument?: TextDocumentClientCapabilities,

  /**
   * Experimental client capabilities.
   */
  experimental?: any,
};

export type InitializeResult = {
  /**
   * The capabilities the language server provides.
   */
  capabilities: ServerCapabilities,
};

/**
 * If the protocol version provided by the client can't be handled by the server.
 * @deprecated This initialize error got replaced by client capabilities. There is
 * no version handshake in version 3.0x
 */
export const UnknownProtocolVersion: number = 1;

export type InitializeError = {
  /**
   * Indicates whether the client execute the following retry logic:
   * (1) show the message provided by the ResponseError to the user
   * (2) user selects retry or cancel
   * (3) if user selected retry the initialize method is sent again.
   */
  retry: boolean,
};

/**
 * Defines how the host (editor) should sync document changes to the language server.
 */
export type TextDocumentSyncKind = number;

/**
 * Documents should not be synced at all.
 */
export const TextDocumentSyncKindNone = 0;

/**
 * Documents are synced by always sending the full content
 * of the document.
 */
export const TextDocumentSyncKindFull = 1;

/**
 * Documents are synced by sending the full content on open.
 * After that only incremental updates to the document are
 * send.
 */
export const TextDocumentSyncKindIncremental = 2;

/**
 * Completion options.
 */
export type CompletionOptions = {
  /**
   * The server provides support to resolve additional
   * information for a completion item.
   */
  resolveProvider?: boolean,

  /**
   * The characters that trigger completion automatically.
   */
  triggerCharacters?: Array<string>,
};

/**
 * Signature help options.
 */
export type SignatureHelpOptions = {
  /**
   * The characters that trigger signature help
   * automatically.
   */
  triggerCharacters?: Array<string>,
};

/**
 * Code Lens options.
 */
export type CodeLensOptions = {
  /**
   * Code lens has a resolve provider as well.
   */
  resolveProvider?: boolean,
};

/**
 * Format document on type options
 */
export type DocumentOnTypeFormattingOptions = {
  /**
   * A character on which formatting should be triggered, like `}`.
   */
  firstTriggerCharacter: string,

  /**
   * More trigger characters.
   */
  moreTriggerCharacter?: Array<string>,
};

/**
 * Document link options
 */
export type DocumentLinkOptions = {
  /**
   * Document links have a resolve provider as well.
   */
  resolveProvider?: boolean,
};

/**
 * Execute command options.
 */
export type ExecuteCommandOptions = {
  /**
   * The commands to be executed on the server
   */
  commands: Array<string>,
};

/**
 * Save options.
 */
export type SaveOptions = {
  /**
   * The client is supposed to include the content on save.
   */
  includeText?: boolean,
};

export type TextDocumentSyncOptions = {
  /**
   * Open and close notifications are sent to the server.
   */
  openClose?: boolean,
  /**
   * Change notifications are sent to the server. See TextDocumentSyncKind.None, TextDocumentSyncKind.Full
   * and TextDocumentSyncKindIncremental.
   */
  change?: number,
  /**
   * Will save notifications are sent to the server.
   */
  willSave?: boolean,
  /**
   * Will save wait until requests are sent to the server.
   */
  willSaveWaitUntil?: boolean,
  /**
   * Save notifications are sent to the server.
   */
  save?: SaveOptions,
};

export type ServerCapabilities = {
  /**
   * Defines how text documents are synced. Is either a detailed structure defining each notification or
   * for backwards compatibility the TextDocumentSyncKind number.
   */
  textDocumentSync?: TextDocumentSyncOptions | number,
  /**
   * The server provides hover support.
   */
  hoverProvider?: boolean,
  /**
   * The server provides completion support.
   */
  completionProvider?: CompletionOptions,
  /**
   * The server provides signature help support.
   */
  signatureHelpProvider?: SignatureHelpOptions,
  /**
   * The server provides goto definition support.
   */
  definitionProvider?: boolean,
  /**
   * The server provides find references support.
   */
  referencesProvider?: boolean,
  /**
   * The server provides document highlight support.
   */
  documentHighlightProvider?: boolean,
  /**
   * The server provides document symbol support.
   */
  documentSymbolProvider?: boolean,
  /**
   * The server provides workspace symbol support.
   */
  workspaceSymbolProvider?: boolean,
  /**
   * The server provides code actions.
   */
  codeActionProvider?: boolean,
  /**
   * The server provides code lens.
   */
  codeLensProvider?: CodeLensOptions,
  /**
   * The server provides document formatting.
   */
  documentFormattingProvider?: boolean,
  /**
   * The server provides document range formatting.
   */
  documentRangeFormattingProvider?: boolean,
  /**
   * The server provides document formatting on typing.
   */
  documentOnTypeFormattingProvider?: DocumentOnTypeFormattingOptions,
  /**
   * The server provides rename support.
   */
  renameProvider?: boolean,
  /**
   * The server provides document link support.
   */
  documentLinkProvider?: DocumentLinkOptions,
  /**
   * The server provides execute command support.
   */
  executeCommandProvider?: ExecuteCommandOptions,
  /**
   * Experimental server capabilities.
   */
  experimental?: any,
};

export type ShowMessageParams = {
  /**
   * The message type. See {@link MessageType}.
   */
  type: MessageType,

  /**
   * The actual message.
   */
  message: string,
};

export type MessageType = number;
/**
 * An error message.
 */
export const MessageTypeError = 1;
/**
 * A warning message.
 */
export const MessageTypeWarning = 2;
/**
 * An information message.
 */
export const MessageTypeInfo = 3;
/**
 * A log message.
 */
export const MessageTypeLog = 4;

export type ShowMessageRequestParams = {
  /**
   * The message type. See {@link MessageType}
   */
  type: number,

  /**
   * The actual message
   */
  message: string,

  /**
   * The message action items to present.
   */
  actions?: Array<MessageActionItem>,
};

export type MessageActionItem = {
  /**
   * A short title like 'Retry', 'Open Log' etc.
   */
  title: string,
};

export type LogMessageParams = {
  /**
   * The message type. See {@link MessageType}
   */
  type: number,

  /**
   * The actual message
   */
  message: string,
};

/**
 * General parameters to register for a capability.
 */
export type Registration = {
  /**
   * The id used to register the request. The id can be used to deregister
   * the request again.
   */
  id: string,

  /**
   * The method / capability to register for.
   */
  method: string,

  /**
   * Options necessary for the registration.
   */
  registerOptions?: any,
};

export type RegistrationParams = {
  registrations: Array<Registration>,
};

export type TextDocumentRegistrationOptions = {
  /**
   * A document selector to identify the scope of the registration. If set to null
   * the document selector provided on the client side will be used.
   */
  documentSelector: ?DocumentSelector,
};

/**
 * General parameters to unregister a capability.
 */
export type Unregistration = {
  /**
   * The id used to unregister the request or notification. Usually an id
   * provided during the register request.
   */
  id: string,

  /**
   * The method / capability to unregister for.
   */
  method: string,
};

export type UnregistrationParams = {
  unregisterations: Array<Unregistration>,
};

export type DidChangeConfigurationParams = {
  /**
   * The actual changed settings
   */
  settings: any,
};

export type DidOpenTextDocumentParams = {
  /**
   * The document that was opened.
   */
  textDocument: TextDocumentItem,
};

export type DidChangeTextDocumentParams = {
  /**
   * The document that did change. The version number points
   * to the version after all provided content changes have
   * been applied.
   */
  textDocument: VersionedTextDocumentIdentifier,

  /**
   * The actual content changes. The content changes descibe single state changes
   * to the document. So if there are two content changes c1 and c2 for a document
   * in state S10 then c1 move the document to S11 and c2 to S12.
   */
  contentChanges: Array<TextDocumentContentChangeEvent>,
};

/**
 * An event describing a change to a text document. If range and rangeLength are omitted
 * the new text is considered to be the full content of the document.
 */
export type TextDocumentContentChangeEvent = {
  /**
   * The range of the document that changed.
   */
  range?: Range,

  /**
   * The length of the range that got replaced.
   */
  rangeLength?: number,

  /**
   * The new text of the range/document.
   */
  text: string,
};

/**
 * Descibe options to be used when registered for text document change events.
 */
export type TextDocumentChangeRegistrationOptions = TextDocumentRegistrationOptions & {
  /**
   * How documents are synced to the server. See TextDocumentSyncKind.Full
   * and TextDocumentSyncKindIncremental.
   */
  syncKind: number,
};

/**
 * The parameters send in a will save text document notification.
 */
export type WillSaveTextDocumentParams = {
  /**
   * The document that will be saved.
   */
  textDocument: TextDocumentIdentifier,

  /**
   * The 'TextDocumentSaveReason'.
   */
  reason: number,
};

/**
 * Represents reasons why a text document is saved.
 */
export type TextDocumentSaveReason = number;

/**
 * Manually triggered, e.g. by the user pressing save, by starting debugging,
 * or by an API call.
 */
export const TextDocumentSaveReasonManual = 1;

/**
 * Automatic after a delay.
 */
export const TextDocumentSaveReasonAfterDelay = 2;

/**
 * When the editor lost focus.
 */
export const TextDocumentSaveReasonFocusOut = 3;

export type DidSaveTextDocumentParams = {
  /**
   * The document that was saved.
   */
  textDocument: TextDocumentIdentifier,

  /**
   * Optional the content when saved. Depends on the includeText value
   * when the save notifcation was requested.
   */
  text?: string,
};

export type TextDocumentSaveRegistrationOptions = TextDocumentRegistrationOptions & {
  /**
   * The client is supposed to include the content on save.
   */
  includeText?: boolean,
};

export type DidCloseTextDocumentParams = {
  /**
   * The document that was closed.
   */
  textDocument: TextDocumentIdentifier,
};

export type DidChangeWatchedFilesParams = {
  /**
   * The actual file events.
   */
  changes: Array<FileEvent>,
};

/**
 * An event describing a file change.
 */
export type FileEvent = {
  /**
   * The file's URI.
   */
  uri: DocumentUri,
  /**
   * The change type.
   */
  type: number,
};

/**
 * The file event type.
 */
export type FileChangeType = number;
/**
 * The file got created.
 */
export const FileChangeTypeCreated = 1;
/**
 * The file got changed.
 */
export const FileChangeTypeChanged = 2;
/**
 * The file got deleted.
 */
export const FileChangeTypeDeleted = 3;

export type PublishDiagnosticsParams = {
  /**
   * The URI for which diagnostic information is reported.
   */
  uri: DocumentUri,

  /**
   * An array of diagnostic information items.
   */
  diagnostics: Array<Diagnostic>,
};

/**
 * Represents a collection of [completion items](#CompletionItem) to be presented
 * in the editor.
 */
export type CompletionList = {
  /**
   * This list it not complete. Further typing should result in recomputing
   * this list.
   */
  isIncomplete: boolean,
  /**
   * The completion items.
   */
  items: Array<CompletionItem>,
};

/**
 * The primary text to be inserted is treated as a plain string.
 */
export const PlainText = 1;

/**
 * The primary text to be inserted is treated as a snippet.
 *
 * A snippet can define tab stops and placeholders with `$1`, `$2`
 * and `${3:foo}`. `$0` defines the final tab stop, it defaults to
 * the end of the snippet. Placeholders with equal identifiers are linked,
 * that is typing in one will update others too.
 *
 * See also: https://github.com/Microsoft/vscode/blob/master/src/vs/editor/contrib/snippet/common/snippet.md
 */
export const Snippet = 2;
export type InsertTextFormat = number;

export type CompletionItem = {
  /**
   * The label of this completion item. By default
   * also the text that is inserted when selecting
   * this completion.
   */
  label: string,
  /**
   * The kind of this completion item. Based of the kind
   * an icon is chosen by the editor.
   */
  kind?: number,
  /**
   * A human-readable string with additional information
   * about this item, like type or symbol information.
   */
  detail?: string,
  /**
   * A human-readable string that represents a doc-comment.
   */
  documentation?: string,
  /**
   * A string that shoud be used when comparing this item
   * with other items. When `falsy` the label is used.
   */
  sortText?: string,
  /**
   * A string that should be used when filtering a set of
   * completion items. When `falsy` the label is used.
   */
  filterText?: string,
  /**
   * A string that should be inserted a document when selecting
   * this completion. When `falsy` the label is used.
   */
  insertText?: string,
  /**
   * The format of the insert text. The format applies to both the `insertText` property
   * and the `newText` property of a provided `textEdit`.
   */
  insertTextFormat?: InsertTextFormat,
  /**
   * An edit which is applied to a document when selecting this completion. When an edit is provided the value of
   * `insertText` is ignored.
   *
   * *Note:* The range of the edit must be a single line range and it must contain the position at which completion
   * has been requested.
   */
  textEdit?: TextEdit,
  /**
   * An optional array of additional text edits that are applied when
   * selecting this completion. Edits must not overlap with the main edit
   * nor with themselves.
   */
  additionalTextEdits?: Array<TextEdit>,
  /**
   * An optional set of characters that when pressed while this completion is active will accept it first and
   * then type that character. *Note* that all commit characters should have `length=1` and that superfluous
   * characters will be ignored.
   */
  commitCharacters?: Array<string>,
  /**
   * An optional command that is executed *after* inserting this completion. *Note* that
   * additional modifications to the current document should be described with the
   * additionalTextEdits-property.
   */
  command?: Command,
  /**
   * An data entry field that is preserved on a completion item between
   * a completion and a completion resolve request.
   */
  data?: any,
};

/**
 * The kind of a completion entry.
 */
export type CompletionItemKind = number;
export const CompletionItemKindText = 1;
export const CompletionItemKindMethod = 2;
export const CompletionItemKindFunction = 3;
export const CompletionItemKindConstructor = 4;
export const CompletionItemKindField = 5;
export const CompletionItemKindVariable = 6;
export const CompletionItemKindClass = 7;
export const CompletionItemKindInterface = 8;
export const CompletionItemKindModule = 9;
export const CompletionItemKindProperty = 10;
export const CompletionItemKindUnit = 11;
export const CompletionItemKindValue = 12;
export const CompletionItemKindEnum = 13;
export const CompletionItemKindKeyword = 14;
export const CompletionItemKindSnippet = 15;
export const CompletionItemKindColor = 16;
export const CompletionItemKindFile = 17;
export const CompletionItemKindReference = 18;

export type CompletionRegistrationOptions = TextDocumentRegistrationOptions & {
  /**
   * The characters that trigger completion automatically.
   */
  triggerCharacters?: Array<string>,

  /**
   * The server provides support to resolve additional
   * information for a completion item.
   */
  resolveProvider?: boolean,
};

/**
 * The result of a hover request.
 */
export type Hover = {
  /**
   * The hover's content
   */
  contents: MarkedString | Array<MarkedString>,

  /**
   * An optional range is a range inside a text document
   * that is used to visualize a hover, e.g. by changing the background color.
   */
  range?: Range,
};

export type MarkedString = string | { language: string, value: string };

/**
 * Signature help represents the signature of something
 * callable. There can be multiple signature but only one
 * active and only one active parameter.
 */
export type SignatureHelp = {
  /**
   * One or more signatures.
   */
  signatures: Array<SignatureInformation>,

  /**
   * The active signature. If omitted or the value lies outside the
   * range of `signatures` the value defaults to zero or is ignored if
   * `signatures.length === 0`. Whenever possible implementors should
   * make an active decision about the active signature and shouldn't
   * rely on a default value.
   * In future version of the protocol this property might become
   * mandantory to better express this.
   */
  activeSignature?: number,

  /**
   * The active parameter of the active signature. If omitted or the value
   * lies outside the range of `signatures[activeSignature].parameters`
   * defaults to 0 if the active signature has parameters. If
   * the active signature has no parameters it is ignored.
   * In future version of the protocol this property might become
   * mandantory to better express the active parameter if the
   * active signature does have any.
   */
  activeParameter?: number,
};

/**
 * Represents the signature of something callable. A signature
 * can have a label, like a function-name, a doc-comment, and
 * a set of parameters.
 */
export type SignatureInformation = {
  /**
   * The label of this signature. Will be shown in
   * the UI.
   */
  label: string,

  /**
   * The human-readable doc-comment of this signature. Will be shown
   * in the UI but can be omitted.
   */
  documentation?: string,

  /**
   * The parameters of this signature.
   */
  parameters?: Array<ParameterInformation>,
};

/**
 * Represents a parameter of a callable-signature. A parameter can
 * have a label and a doc-comment.
 */
export type ParameterInformation = {
  /**
   * The label of this parameter. Will be shown in
   * the UI.
   */
  label: string,

  /**
   * The human-readable doc-comment of this parameter. Will be shown
   * in the UI but can be omitted.
   */
  documentation?: string,
};

export type SignatureHelpRegistrationOptions = TextDocumentRegistrationOptions & {
  /**
   * The characters that trigger signature help
   * automatically.
   */
  triggerCharacters?: Array<string>,
};

export type ReferenceParams = TextDocumentPositionParams & {
  context: ReferenceContext,
};

export type ReferenceContext = {
  /**
   * Include the declaration of the current symbol.
   */
  includeDeclaration: boolean,
};

/**
 * A document highlight is a range inside a text document which deserves
 * special attention. Usually a document highlight is visualized by changing
 * the background color of its range.
 *
 */
export type DocumentHighlight = {
  /**
   * The range this highlight applies to.
   */
  range: Range,

  /**
   * The highlight kind, default is DocumentHighlightKind.Text.
   */
  kind?: number,
};

/**
 * A document highlight kind.
 */
export type DocumentHighlightKind = number;
/**
 * A textual occurrence.
 */
export const DocumentHighlightKindText = 1;

/**
 * Read-access of a symbol, like reading a variable.
 */
export const DocumentHighlightKindRead = 2;

/**
 * Write-access of a symbol, like writing to a variable.
 */
export const DocumentHighlightKindWrite = 3;

export type DocumentSymbolParams = {
  /**
   * The text document.
   */
  textDocument: TextDocumentIdentifier,
};

/**
 * Represents information about programming constructs like variables, classes,
 * interfaces etc.
 */
export type SymbolInformation = {
  /**
   * The name of this symbol.
   */
  name: string,

  /**
   * The kind of this symbol.
   */
  kind: number,

  /**
   * The location of this symbol. The location's range is used by a tool
   * to reveal the location in the editor. If the symbol is selected in the
   * tool the range's start information is used to position the cursor. So
   * the range usually spwans more then the actual symbol's name and does
   * normally include thinks like visibility modifiers.
   *
   * The range doesn't have to denote a node range in the sense of a abstract
   * syntax tree. It can therefore not be used to re-construct a hierarchy of
   * the symbols.
   */
  location: Location,

  /**
   * The name of the symbol containing this symbol. This information is for
   * user interface purposes (e.g. to render a qaulifier in the user interface
   * if necessary). It can't be used to re-infer a hierarchy for the document
   * symbols.
   */
  containerName?: string,
};

/**
 * A symbol kind.
 */
export type SymbolKind = number;
export const SymbolKindFile = 1;
export const SymbolKindModule = 2;
export const SymbolKindNamespace = 3;
export const SymbolKindPackage = 4;
export const SymbolKindClass = 5;
export const SymbolKindMethod = 6;
export const SymbolKindProperty = 7;
export const SymbolKindField = 8;
export const SymbolKindConstructor = 9;
export const SymbolKindEnum = 10;
export const SymbolKindInterface = 11;
export const SymbolKindFunction = 12;
export const SymbolKindVariable = 13;
export const SymbolKindConstant = 14;
export const SymbolKindString = 15;
export const SymbolKindNumber = 16;
export const SymbolKindBoolean = 17;
export const SymbolKindArray = 18;

/**
 * The parameters of a Workspace Symbol Request.
 */
export type WorkspaceSymbolParams = {
  /**
   * A non-empty query string
   */
  query: string,
};

/**
 * Params for the CodeActionRequest
 */
export type CodeActionParams = {
  /**
   * The document in which the command was invoked.
   */
  textDocument: TextDocumentIdentifier,

  /**
   * The range for which the command was invoked.
   */
  range: Range,

  /**
   * Context carrying additional information.
   */
  context: CodeActionContext,
};

/**
 * Contains additional diagnostic information about the context in which
 * a code action is run.
 */
export type CodeActionContext = {
  /**
   * An array of diagnostics.
   */
  diagnostics: Array<Diagnostic>,
};

export type CodeLensParams = {
  /**
   * The document to request code lens for.
   */
  textDocument: TextDocumentIdentifier,
};

/**
 * A code lens represents a command that should be shown along with
 * source text, like the number of references, a way to run tests, etc.
 *
 * A code lens is _unresolved_ when no command is associated to it. For performance
 * reasons the creation of a code lens and resolving should be done in two stages.
 */
export type CodeLens = {
  /**
   * The range in which this code lens is valid. Should only span a single line.
   */
  range: Range,

  /**
   * The command this code lens represents.
   */
  command?: Command,

  /**
   * A data entry field that is preserved on a code lens item between
   * a code lens and a code lens resolve request.
   */
  data?: any,
};

export type CodeLensRegistrationOptions = TextDocumentRegistrationOptions & {
  /**
   * Code lens has a resolve provider as well.
   */
  resolveProvider?: boolean,
};

export type DocumentLinkParams = {
  /**
   * The document to provide document links for.
   */
  textDocument: TextDocumentIdentifier,
};

/**
 * A document link is a range in a text document that links to an internal or external resource, like another
 * text document or a web site.
 */
export type DocumentLink = {
  /**
   * The range this link applies to.
   */
  range: Range,
  /**
   * The uri this link points to. If missing a resolve request is sent later.
   */
  target?: DocumentUri,
};

export type DocumentLinkRegistrationOptions = TextDocumentRegistrationOptions & {
  /**
   * Document links have a resolve provider as well.
   */
  resolveProvider?: boolean,
};

export type DocumentFormattingParams = {
  /**
   * The document to format.
   */
  textDocument: TextDocumentIdentifier,

  /**
   * The format options.
   */
  options: FormattingOptions,
};

/**
 * Value-object describing what options formatting should use.
 */
export type FormattingOptions = {
  /**
   * Size of a tab in spaces.
   */
  tabSize: number,

  /**
   * Prefer spaces over tabs.
   */
  insertSpaces: boolean,

  /**
   * Signature for further properties.
   */
  [key: string]: boolean | number | string,
};

export type DocumentRangeFormattingParams = {
  /**
   * The document to format.
   */
  textDocument: TextDocumentIdentifier,

  /**
   * The range to format
   */
  range: Range,

  /**
   * The format options
   */
  options: FormattingOptions,
};

export type DocumentOnTypeFormattingParams = {
  /**
   * The document to format.
   */
  textDocument: TextDocumentIdentifier,

  /**
   * The position at which this request was sent.
   */
  position: Position,

  /**
   * The character that has been typed.
   */
  ch: string,

  /**
   * The format options.
   */
  options: FormattingOptions,
};

export type DocumentOnTypeFormattingRegistrationOptions = TextDocumentRegistrationOptions & {
  /**
   * A character on which formatting should be triggered, like `}`.
   */
  firstTriggerCharacter: string,
  /**
   * More trigger characters.
   */
  moreTriggerCharacter?: Array<string>,
};

export type RenameParams = {
  /**
   * The document to format.
   */
  textDocument: TextDocumentIdentifier,

  /**
   * The position at which this request was sent.
   */
  position: Position,

  /**
   * The new name of the symbol. If the given name is not valid the
   * request must return a [ResponseError](#ResponseError) with an
   * appropriate message set.
   */
  newName: string,
};

export type ExecuteCommandParams = {
  /**
   * The identifier of the actual command handler.
   */
  command: string,
  /**
   * Arguments that the command should be invoked with.
   */
  arguments?: Array<any>,
};

/**
 * Execute command registration options.
 */
export type ExecuteCommandRegistrationOptions = {
  /**
   * The commands to be executed on the server
   */
  commands: Array<string>,
};

export type ApplyWorkspaceEditParams = {
  /**
   * The edits to apply.
   */
  edit: WorkspaceEdit,
};

export type ApplyWorkspaceEditResponse = {
  /**
   * Indicates whether the edit was applied or not.
   */
  applied: boolean,
};
