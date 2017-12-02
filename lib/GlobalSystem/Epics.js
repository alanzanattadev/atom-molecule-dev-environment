"use babel";
// @flow

import { combineEpics } from "redux-observable";
import { findPackages } from "../ProjectSystemEpic/PackageFeature/Model/FindPackages";
import Packages from "../ProjectSystemEpic/PackageFeature/Epics/Packages";
import Terminal from "xterm";
import helperApi from "../ExecutionControlEpic/TaskExecutionFeature/Model/HelperApi";
import PluginApi from "../ExecutionControlEpic/DiagnosticsFeature/Model/PluginApi";
import { generateTaskID } from "../ExecutionControlEpic/TaskExecutionFeature/Model/id";
import { DevToolsControllerInstance } from "../ExecutionControlEpic/DevtoolLoadingFeature/Model/DevToolsController";
import { api as questionSystem } from "../ExecutionControlEpic/QuestionSystemFeature/Model/api";
import LSPTasks from "../ExecutionControlEpic/LanguageServerProtocolFeature/Epics/Tasks";
import ExecutionsController from "../ExecutionControlEpic/LanguageServerProtocolFeature/Model/ExecutionsController";

const context = {
  atom: {
    notifications: global.atom.notifications,
  },
  molecule: {
    devtoolsController: DevToolsControllerInstance,
    questionSystem,
    helperAPI: helperApi,
    PluginApi,
    ExecutionsController,
    generateTaskID,
  },
  node: {
    nodeProcess: process,
    getCurrentDate: () => Date.now(),
  },
  extended: {
    Terminal,
  },
};

export default combineEpics(
  Packages(findPackages),
  LSPTasks(context),
  // Tasks(context),
);
