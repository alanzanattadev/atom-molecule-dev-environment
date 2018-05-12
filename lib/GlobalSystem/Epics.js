"use babel";
// @flow

import { combineEpics } from "redux-observable";
import { findPackages } from "../ProjectSystemEpic/PackageFeature/Model/FindPackages";
import Packages from "../ProjectSystemEpic/PackageFeature/Epics/Packages";
import Terminal from "xterm";
import HelperAPI from "../ExecutionControlEpic/TaskExecutionFeature/Model/HelperAPI";
import watchman from "fb-watchman";
import PluginApi from "../ExecutionControlEpic/LanguageServerProtocolFeature/Model/PluginApi";
import { generateTaskID } from "../ExecutionControlEpic/TaskExecutionFeature/Model/id";
import { DevToolsControllerInstance } from "../ExecutionControlEpic/DevtoolLoadingFeature/Model/DevToolsController";
import { api as questionSystem } from "../ExecutionControlEpic/QuestionSystemFeature/Model/api";
import LSPTasks from "../ExecutionControlEpic/LanguageServerProtocolFeature/Epics/Tasks";
import WatchPackages from "../ProjectSystemEpic/PackageFeature/Epics/WatchPackages";
import ExecutionsController from "../ExecutionControlEpic/LanguageServerProtocolFeature/Model/ExecutionsController";
import WatchProjects from "../EventSystemEpic/ProjectFeature/Epics/Projects";
import GeneratePlans from "../ProjectSystemEpic/PackageFeature/Epics/GeneratePlans";
import AutoLaunchPlans from "../ProjectSystemEpic/PackageFeature/Epics/AutoLaunchPlans";

const context = {
  atom: {
    notifications: global.atom.notifications,
  },
  molecule: {
    devtoolsController: DevToolsControllerInstance,
    questionSystem,
    helperAPI: HelperAPI,
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
  WatchPackages(watchman),
  WatchProjects(watchman),
  GeneratePlans,
  AutoLaunchPlans,
  // Tasks(context),
);
