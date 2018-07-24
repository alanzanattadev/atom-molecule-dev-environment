"use babel";
// @flow

import "babel-polyfill";
import atom from "atom";
import store from "./GlobalSystem/Store";
import watchman from "fb-watchman";
import { provideDevtool } from "./ExecutionControlEpic/DevtoolLoadingFeature/Model/DevtoolLoadingHandler";
import { DevToolsControllerInstance } from "./ExecutionControlEpic/DevtoolLoadingFeature/Model/DevToolsController";
import { toolPlansPanel } from "./ExecutionControlEpic/PlanConfigurationFeature/AtomLinks/Panels";
import handleStateChange from "./ExecutionControlEpic/LinterFeature/Model/StateChangeHandler";
import { createProjectsObservable } from "./EventSystemEpic/ProjectFeature/Model/createProjectsObservable";
import { refreshAllProjectsPackages } from "./ProjectSystemEpic/PackageFeature/Actions/RefreshAllProjectsPackages";
import { changeActiveProjects } from "./EventSystemEpic/ProjectFeature/Actions/ChangeActiveProjects";
import { renderDevtoolBar } from "./ExecutionControlEpic/DevToolsSummaryFeature/AtomLinks/Panels";
import { renderControlPanel } from "./ExecutionControlEpic/ControlPanelFeature/AtomLinks/Panels";
import { featureLoad } from "./ExecutionControlEpic/TaggingFeature/Actions/FeatureLoad";

export default {
  config: {
    freeTerminal: {
      type: "boolean",
      default: true,
    },
    pinnedPlans: {
      type: "boolean",
      default: true,
    },
    pluginEslint: {
      type: "boolean",
      default: true,
    },
    pluginNightwatch: {
      type: "boolean",
      default: true,
    },
    pluginFlowtype: {
      type: "boolean",
      default: true,
    },
    pluginGlup: {
      type: "boolean",
      default: true,
    },
    pluginJest: {
      type: "boolean",
      default: true,
    },
    pluginNpm: {
      type: "boolean",
      default: true,
    },
    pluginReactNative: {
      type: "boolean",
      default: true,
    },
    pluginShell: {
      type: "boolean",
      default: true,
    },
    pluginTestcafe: {
      type: "boolean",
      default: true,
    },
    moleculeConsole: {
      type: "boolean",
      default: true,
    },
    moleculeLinter: {
      type: "boolean",
      default: true,
    },
  },
  subscriptions: null,
  atomProjectsObservable: null,

  activate() {
    let {
      renderPinnedPlans,
    } = require("./ExecutionControlEpic/PlanConfigurationFeature/AtomLinks/Panels");

    const client = new watchman.Client();
    client.on("error", () => {
      global.atom.notifications.addError(
        "Error starting Molecule: Could not start watchman. Make sure watchman is installed on your operating system and accessible from your PATH.",
        {
          description:
            "See https://facebook.github.io/watchman/docs/install.html for installation instructions",
        },
      );
    });
    client.capabilityCheck(
      { optional: [], required: ["relative_root"] },
      error => {
        if (error) {
          global.atom.notifications.addError(
            "Error starting Molecule: Error starting watchman. See developer console for details",
          );
        }
        client.end();
      },
    );

    if (
      global.atom.config.get("molecule-dev-environment.pinnedPlans") === true
    ) {
      renderDevtoolBar();
      renderPinnedPlans();
    }
    renderControlPanel();

    if (
      global.atom.config.get("molecule-dev-environment.freeTerminal") ===
      undefined
    ) {
      global.atom.config.set("molecule-dev-environment.freeTerminal", true);
    }
    if (
      global.atom.config.get("molecule-dev-environment.pinnedPlans") ===
      undefined
    ) {
      global.atom.config.set("molecule-dev-environment.pinnedPlans", true);
    }
    if (
      global.atom.config.get("molecule-dev-environment.pluginEslint") ===
      undefined
    ) {
      global.atom.config.set("molecule-dev-environment.pluginEslint", true);
    }
    if (
      global.atom.config.get("molecule-dev-environment.pluginNightwatch") ===
      undefined
    ) {
      global.atom.config.set("molecule-dev-environment.pluginNightwatch", true);
    }
    if (
      global.atom.config.get("molecule-dev-environment.pluginFlowtype") ===
      undefined
    ) {
      global.atom.config.set("molecule-dev-environment.pluginFlowtype", true);
    }
    if (
      global.atom.config.get("molecule-dev-environment.pluginGlup") ===
      undefined
    ) {
      global.atom.config.set("molecule-dev-environment.pluginGlup", true);
    }
    if (
      global.atom.config.get("molecule-dev-environment.pluginJest") ===
      undefined
    ) {
      global.atom.config.set("molecule-dev-environment.pluginJest", true);
    }
    if (
      global.atom.config.get("molecule-dev-environment.pluginNpm") === undefined
    ) {
      global.atom.config.set("molecule-dev-environment.pluginNpm", true);
    }
    if (
      global.atom.config.get("molecule-dev-environment.pluginReactNative") ===
      undefined
    ) {
      global.atom.config.set(
        "molecule-dev-environment.pluginReactNative",
        true,
      );
    }
    if (
      global.atom.config.get("molecule-dev-environment.pluginShell") ===
      undefined
    ) {
      global.atom.config.set("molecule-dev-environment.pluginShell", true);
    }
    if (
      global.atom.config.get("molecule-dev-environment.pluginTestcafe") ===
      undefined
    ) {
      global.atom.config.set("molecule-dev-environment.pluginTestcafe", true);
    }
    if (
      global.atom.config.get("molecule-dev-environment.moleculeConsole") ===
      undefined
    ) {
      global.atom.config.set("molecule-dev-environment.moleculeConsole", true);
    }
    if (
      global.atom.config.get("molecule-dev-environment.moleculeLinter") ===
      undefined
    ) {
      global.atom.config.set("molecule-dev-environment.moleculeLinter", true);
    }

    let pluginsTable = [];
    // Bind plugins. Path should be relative to /lib/ExecutionControlEpic/Plugins/

    if (
      global.atom.config.get("molecule-dev-environment.pluginEslint") === true
    ) {
      pluginsTable.push("Eslint/index.js");
      store.dispatch(featureLoad("Eslint"));
    }
    if (
      global.atom.config.get("molecule-dev-environment.pluginNightwatch") ===
      true
    ) {
      pluginsTable.push("Nightwatch/index.js");
      store.dispatch(featureLoad("Nightwatch"));
    }
    if (
      global.atom.config.get("molecule-dev-environment.pluginFlowtype") === true
    ) {
      pluginsTable.push("Flowtype.js");
      store.dispatch(featureLoad("Flowtype"));
    }
    if (
      global.atom.config.get("molecule-dev-environment.pluginGlup") === true
    ) {
      pluginsTable.push("Gulp.js");
      store.dispatch(featureLoad("Gulp"));
    }
    if (
      global.atom.config.get("molecule-dev-environment.pluginJest") === true
    ) {
      pluginsTable.push("Jest.js");
      store.dispatch(featureLoad("Jest"));
    }
    if (global.atom.config.get("molecule-dev-environment.pluginNpm") === true) {
      pluginsTable.push("Npm.js");
      store.dispatch(featureLoad("Npm"));
    }
    if (
      global.atom.config.get("molecule-dev-environment.pluginReactNative") ===
      true
    ) {
      pluginsTable.push("ReactNative.js");
      store.dispatch(featureLoad("ReactNative"));
    }
    if (
      global.atom.config.get("molecule-dev-environment.pluginShell") === true
    ) {
      pluginsTable.push("Shell.js");
      store.dispatch(featureLoad("Shell"));
    }
    if (
      global.atom.config.get("molecule-dev-environment.pluginTestcafe") === true
    ) {
      pluginsTable.push("Testcafe.js");
      store.dispatch(featureLoad("Testcafe"));
    }

    if (pluginsTable !== []) {
      pluginsTable.forEach(tool =>
        provideDevtool(store, DevToolsControllerInstance)(tool),
      );
    }

    if (
      global.atom.config.get("molecule-dev-environment.freeTerminal") === true
    ) {
      store.dispatch(featureLoad("Free Terminal"));
    }
    if (
      global.atom.config.get("molecule-dev-environment.pinnedPlans") === true
    ) {
      store.dispatch(featureLoad("Pinned Plans"));
    }

    // AUTO UPDATE - Manage projects & files for packages auto updates
    store.dispatch(changeActiveProjects(global.atom.project.getPaths(), true));
    this.atomProjectObservable = createProjectsObservable(
      global.atom.project,
    ).subscribe(projectPaths =>
      store.dispatch(changeActiveProjects(projectPaths)),
    );

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new atom.CompositeDisposable();
    this.subscriptions.add(
      global.atom.commands.add("atom-workspace", {
        "molecule:hide-panel": () => {
          toolPlansPanel.hide();
          const bottomDock = global.atom.workspace.getBottomDock();
          const paneItem = global.atom.workspace.getPaneItems();
          const controlPane = paneItem.find(elem => {
            return elem.getTitle() == "Control Panel";
          });
          if (controlPane == undefined) {
            renderControlPanel();
          }
          if (bottomDock.isVisible()) {
            bottomDock.hide();
          } else {
            bottomDock.show();
          }
        },
        "molecule:refresh-packages": () => {
          store.dispatch(
            refreshAllProjectsPackages(
              DevToolsControllerInstance.getPackagesPlugins(),
            ),
          );
        },
        "molecule:free-terminal-toggle": () => {
          this.toggleFreeTerminal();
        },
        "molecule:pinned-plans-toggle": () => {
          this.togglePinnedPlans();
        },
        "molecule:plugin-eslint-toggle": () => {
          this.togglePluginEslint();
        },
        "molecule:plugin-nightwatch-toggle": () => {
          this.togglePluginNightwatch();
        },
        "molecule:plugin-flowtype-toggle": () => {
          this.togglePluginFlowtype();
        },
        "molecule:plugin-glup-toggle": () => {
          this.togglePluginGlup();
        },
        "molecule:plugin-jest-toggle": () => {
          this.togglePluginJest();
        },
        "molecule:plugin-npm-toggle": () => {
          this.togglePluginNpm();
        },
        "molecule:plugin-reactnative-toggle": () => {
          this.togglePluginReactNative();
        },
        "molecule:plugin-shell-toggle": () => {
          this.togglePluginShell();
        },
        "molecule:plugin-testcafe-toggle": () => {
          this.togglePluginTestcafe();
        },
        "molecule:console-toggle": () => {
          this.toggleMoleculeConsole();
        },
        "molecule:linter-toggle": () => {
          this.toggleMoleculeLinter();
        },
      }),
    );
  },

  deactivate() {
    this.subscriptions.dispose();
    if (this.atomProjectObservable) this.atomProjectsObservable.unsubscribe();
  },

  serialize() {
    return {};
  },

  consumeIndie(registerIndie: any) {
    if (
      global.atom.config.get("molecule-dev-environment.moleculeLinter") === true
    ) {
      const linter = registerIndie({
        name: "molecule",
      });
      this.subscriptions.add(linter);
      store.subscribe(handleStateChange(linter));
      store.dispatch(featureLoad("Linter"));
    }
  },

  toggleFreeTerminal() {
    if (
      global.atom.config.get("molecule-dev-environment.freeTerminal") === true
    ) {
      global.atom.config.set("molecule-dev-environment.freeTerminal", false);
    } else {
      global.atom.config.set("molecule-dev-environment.freeTerminal", true);
    }
    setTimeout(function() {
      global.atom.reload();
    }, 500);
  },

  togglePinnedPlans() {
    if (
      global.atom.config.get("molecule-dev-environment.pinnedPlans") === true
    ) {
      global.atom.config.set("molecule-dev-environment.pinnedPlans", false);
    } else {
      global.atom.config.set("molecule-dev-environment.pinnedPlans", true);
    }
    setTimeout(function() {
      global.atom.reload();
    }, 500);
  },

  togglePluginEslint() {
    if (
      global.atom.config.get("molecule-dev-environment.pluginEslint") === true
    ) {
      global.atom.config.set("molecule-dev-environment.pluginEslint", false);
    } else {
      global.atom.config.set("molecule-dev-environment.pluginEslint", true);
    }
    setTimeout(function() {
      global.atom.reload();
    }, 500);
  },

  togglePluginNightwatch() {
    if (
      global.atom.config.get("molecule-dev-environment.pluginNightwatch") ===
      true
    ) {
      global.atom.config.set(
        "molecule-dev-environment.pluginNightwatch",
        false,
      );
    } else {
      global.atom.config.set("molecule-dev-environment.pluginNightwatch", true);
    }
    setTimeout(function() {
      global.atom.reload();
    }, 500);
  },

  togglePluginFlowtype() {
    if (
      global.atom.config.get("molecule-dev-environment.pluginFlowtype") === true
    ) {
      global.atom.config.set("molecule-dev-environment.pluginFlowtype", false);
    } else {
      global.atom.config.set("molecule-dev-environment.pluginFlowtype", true);
    }
    setTimeout(function() {
      global.atom.reload();
    }, 500);
  },

  togglePluginGlup() {
    if (
      global.atom.config.get("molecule-dev-environment.pluginGlup") === true
    ) {
      global.atom.config.set("molecule-dev-environment.pluginGlup", false);
    } else {
      global.atom.config.set("molecule-dev-environment.pluginGlup", true);
    }
    setTimeout(function() {
      global.atom.reload();
    }, 500);
  },

  togglePluginJest() {
    if (
      global.atom.config.get("molecule-dev-environment.pluginJest") === true
    ) {
      global.atom.config.set("molecule-dev-environment.pluginJest", false);
    } else {
      global.atom.config.set("molecule-dev-environment.pluginJest", true);
    }
    setTimeout(function() {
      global.atom.reload();
    }, 500);
  },

  togglePluginNpm() {
    if (global.atom.config.get("molecule-dev-environment.pluginNpm") === true) {
      global.atom.config.set("molecule-dev-environment.pluginNpm", false);
    } else {
      global.atom.config.set("molecule-dev-environment.pluginNpm", true);
    }
    setTimeout(function() {
      global.atom.reload();
    }, 500);
  },

  togglePluginReactNative() {
    if (
      global.atom.config.get("molecule-dev-environment.pluginReactNative") ===
      true
    ) {
      global.atom.config.set(
        "molecule-dev-environment.pluginReactNative",
        false,
      );
    } else {
      global.atom.config.set(
        "molecule-dev-environment.pluginReactNative",
        true,
      );
    }
    setTimeout(function() {
      global.atom.reload();
    }, 500);
  },

  togglePluginShell() {
    if (
      global.atom.config.get("molecule-dev-environment.pluginShell") === true
    ) {
      global.atom.config.set("molecule-dev-environment.pluginShell", false);
    } else {
      global.atom.config.set("molecule-dev-environment.pluginShell", true);
    }
    setTimeout(function() {
      global.atom.reload();
    }, 500);
  },

  togglePluginTestcafe() {
    if (
      global.atom.config.get("molecule-dev-environment.pluginTestcafe") === true
    ) {
      global.atom.config.set("molecule-dev-environment.pluginTestcafe", false);
    } else {
      global.atom.config.set("molecule-dev-environment.pluginTestcafe", true);
    }
    setTimeout(function() {
      global.atom.reload();
    }, 500);
  },

  toggleMoleculeConsole() {
    if (
      global.atom.config.get("molecule-dev-environment.moleculeConsole") ===
      true
    ) {
      global.atom.config.set("molecule-dev-environment.moleculeConsole", false);
    } else {
      global.atom.config.set("molecule-dev-environment.moleculeConsole", true);
    }
    setTimeout(function() {
      global.atom.reload();
    }, 500);
  },

  toggleMoleculeLinter() {
    if (
      global.atom.config.get("molecule-dev-environment.moleculeLinter") === true
    ) {
      global.atom.config.set("molecule-dev-environment.moleculeLinter", false);
    } else {
      global.atom.config.set("molecule-dev-environment.moleculeLinter", true);
    }
    setTimeout(function() {
      global.atom.reload();
    }, 500);
  },
};
