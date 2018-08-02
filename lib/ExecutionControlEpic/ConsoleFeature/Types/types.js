"use babel";
// @flow

export type ConsoleLog = {
  /**
   * Source of the message.
   */
  source: string,
  /**
   * Color identifying the source.
   */
  color: string,
  /**
   * The message's severity. Can be omitted. If omitted it is up to the
   * client to interpret message as error, warning, info or hint.
   */
  severity?: number,
  /**²
   * Message describing the error, action, warning from the source.
   */
  message?: string,
  /**
   * Date and hour of the message.
   */
  date?: string,
  /**
   *  Source's version.
   */
  version: string,
};

export type ConsoleLogSeverity =
  | ConsoleLogError
  | ConsoleLogWarning
  | ConsoleLogInformation
  | ConsoleLogHint
  | ConsoleLogSuccess;

export const ConsoleLogError = 1;

export const ConsoleLogWarning = 2;

export const ConsoleLogInformation = 3;

export const ConsoleLogHint = 4;

export const ConsoleLogSuccess = 5;
