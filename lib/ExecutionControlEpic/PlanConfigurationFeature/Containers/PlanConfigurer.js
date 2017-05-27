"use babel";
// @flow

import { FormController, StateDispatcher } from "react-forms-state";
import { connect } from "react-redux";
import { compose } from "recompose";
import {
  selectPackagesReducer,
  selectPlansSchemaReducer,
} from "../../../GlobalSystem/Selectors";
import type { State } from "../../../GlobalSystem/types.js.flow";
import {
  selectPackagesOfTool,
} from "../../../ProjectSystemEpic/PackageFeature/Selectors/Packages";
import type {
  Package,
  PackageInfos,
} from "../../../ProjectSystemEpic/PackageFeature/Types/types.js.flow";
import { addPlanConfig } from "../Actions/AddPlanConfig";
import PlanConfigValidator from "../Model/PlanConfigValidator";
import PlanConfigurer from "../Presenters/PlanConfigurer";
import { selectConfigSchemaOfTool } from "../Selectors/PlanConfigSchemas";
import type { DevToolPlanConfigSchema, Stager } from "../Types/types.js.flow";

export function mapStateToProps(
  state: State,
  { toolId }: { toolId: string },
): { config: DevToolPlanConfigSchema, packages: Array<Package> } {
  return {
    config: selectConfigSchemaOfTool(selectPlansSchemaReducer(state), toolId),
    packages: selectPackagesOfTool(selectPackagesReducer(state), toolId),
  };
}

export function mapDispatchToProps(
  dispatch: (action: any) => any,
  ownProps: { toolId: string, toolIconUri: string, toolName: string },
): {
  onAddPlan: (plan: {
    name: string,
    config: mixed,
    stager: Stager,
    packageInfos: PackageInfos,
  }) => void,
  onSubmit: () => void,
} {
  return {
    onAddPlan: (plan: {
      name: string,
      config: mixed,
      stager: Stager,
      packageInfos: PackageInfos,
    }) => {
      dispatch(
        addPlanConfig(
          plan.name,
          {
            name: ownProps.toolName,
            id: ownProps.toolId,
            iconUri: ownProps.toolIconUri,
          },
          plan.config,
          plan.stager,
          plan.packageInfos,
        ),
      );
    },
  };
}

let formController = FormController(
  (state, props) => state, // Apply Control
  (value, props) => {
    return {
      name: value.name,
      config: makeConfig(props.config, value.config),
      packages: value.packages,
    };
  }, // Convert In
  (value, props) => {
    return {
      name: value.name,
      config: makeConfig(props.config, value.config),
      packages: value.packages,
    };
  }, // Convert Out
  {
    checkIfModified: true, // Checks if value has been modified to prevent repeated submits
    immutableInitial: false, // Speeds up checks by only checking reference equalities
  },
  (value, props) => PlanConfigValidator(value, props), // Validation function
);

function makeConfig(root: any, value: any): any {
  let config = {};

  if (root.type === "object") {
    const schemas = root.schemas;
    Object.keys(schemas).forEach(key => {
      if (schemas[key].type === "object") {
        config[key] = makeConfig(config[key], value[key]);
      } else {
        if (value && value[key]) config[key] = value[key];
        else config[key] = schemas[key].default;
      }
    });
  }

  return config;
}

let stateDispatcher = StateDispatcher(
  (value, props) => value, // Convert In
  (value, props) => value, // Convert Out
);

let enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  formController,
  stateDispatcher,
);

export default enhance(PlanConfigurer);
