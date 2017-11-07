"use babel";
// @flow

import store from "../../../GlobalSystem/Store";
import { sendDiagnosticsToLinter } from "../Actions/SendDiagnosticsToLinter";

export default function handleStateChange() {
  store.dispatch(sendDiagnosticsToLinter(store.getState().diagnostics));
}
