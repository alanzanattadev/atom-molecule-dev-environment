"use babel";
// @flow

import "./load-react-devtools";
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
      description:
        "Activate or not Molecule's terminal ( you need to refresh or restart Atom to apply any of the changes on the settings)",
      default: true,
    },
    pinnedPlans: {
      type: "boolean",
      description: "Activate or not Molecule's pinned plans",
      default: true,
    },
    moleculeConsole: {
      type: "boolean",
      description: "Activate or not Molecule's console",
      default: true,
    },
    moleculeLinter: {
      type: "boolean",
      description: "Activate or not Linter in Molecule",
      default: true,
    },
    plugins: {
      type: "object",
      properties: {
        Eslint: {
          type: "boolean",
          description: "Activate or not Eslint in Molecule",
          default: true,
        },
        Cpp: {
          type: "boolean",
          description: "Activate or not Cpp in Molecule",
          default: true,
        },
        Nightwatch: {
          type: "boolean",
          description: "Activate or not Nightwatch in Molecule",
          default: true,
        },
        Flowtype: {
          type: "boolean",
          description: "Activate or not Flowtype in Molecule",
          default: true,
        },
        Glup: {
          type: "boolean",
          description: "Activate or not Flowtype in Molecule",
          default: true,
        },
        Jest: {
          type: "boolean",
          description: "Activate or not Jest in Molecule",
          default: true,
        },
        Npm: {
          type: "boolean",
          description: "Activate or not Npm in Molecule",
          default: true,
        },
        ReactNative: {
          type: "boolean",
          description: "Activate or not ReactNative in Molecule",
          default: true,
        },
        Shell: {
          type: "boolean",
          description: "Activate or not Shell in Molecule",
          default: true,
        },
        Testcafe: {
          type: "boolean",
          description: "Activate or not Testcafe in Molecule",
          default: true,
        },
      },
    },
  },
  subscriptions: null,
  atomProjectsObservable: null,

  activate() {
    let {
      renderPinnedPlans,
    } = require("./ExecutionControlEpic/PlanConfigurationFeature/AtomLinks/Panels");

    if (global.atom.inDevMode()) {
      console.warn(
        "Make sure to run `babel:watch` when running MOLECULE in dev mode!",
      );
    }

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

    if (global.atom.config.get("molecule.pinnedPlans") === true) {
      renderDevtoolBar();
      renderPinnedPlans();
    }
    renderControlPanel();

    // Bind plugins. Path should be relative to /lib/ExecutionControlEpic/Plugins/
    [
      "Eslint/index.js",
      "Nightwatch/index.js",
      "Flowtype.js",
      "Gulp.js",
      "Jest.js",
      "Npm.js",
      "ReactNative.js",
      "Shell.js",
      "Testcafe.js",
      "Cpp.js",
    ].forEach(plugin => {
      const pluginName = plugin.split(/\/|\./)[0];
      if (global.atom.config.get("molecule.plugins." + pluginName) === true) {
        provideDevtool(store, DevToolsControllerInstance)(plugin);
        store.dispatch(featureLoad(pluginName));
      }
    });

    if (global.atom.config.get("molecule.freeTerminal") === true) {
      store.dispatch(featureLoad("Free Terminal"));
    }
    if (global.atom.config.get("molecule.pinnedPlans") === true) {
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
    if (global.atom.config.get("molecule.moleculeLinter") === true) {
      const linter = registerIndie({
        name: "molecule",
      });
      this.subscriptions.add(linter);
      store.subscribe(handleStateChange(linter));
      store.dispatch(featureLoad("Linter"));
    }
  },
};
