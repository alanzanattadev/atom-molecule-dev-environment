"use babel";
// @flow

import { connect } from "react-redux";
import PlanConfigurer from "../Presenters/PlanConfigurer";
import type { State } from "../../../GlobalSystem/types.js.flow";
import { selectConfigSchemaOfTool } from "../Selectors/PlanConfigSchemas";
import type { ConfigSchemaPart, Stager } from "../Types/types.js";
import {
  selectPlansSchemaReducer,
  selectPackagesReducer
} from "../../../GlobalSystem/Selectors";
import { addPlanConfig } from "../Actions/AddPlanConfig";
import type {
  PackageInfos
} from "../../../ProjectSystemEpic/PackageFeature/Types/types.js.flow";
import {
  selectPackagesOfTool
} from "../../../ProjectSystemEpic/PackageFeature/Selectors/Packages";

export function mapStateToProps(
  state: State,
  { toolId }: { toolId: string }
): { config: ConfigSchemaPart } {
  return {
    config: selectConfigSchemaOfTool(selectPlansSchemaReducer(state), toolId),
    packages: selectPackagesOfTool(selectPackagesReducer(state), toolId)
  };
}

export function mapDispatchToProps(
  dispatch: (action: any) => any,
  ownProps: { toolId: string, toolIconUri: string, toolName: string }
): {
  onAddPlan: (plan: { name: string, config: mixed, stager: Stager }) => void
} {
  return {
    onAddPlan: (
      plan: {
        name: string,
        config: mixed,
        stager: Stager,
        packageInfos: PackageInfos
      }
    ) => {
      dispatch(
        addPlanConfig(
          plan.name,
          {
            name: ownProps.toolName,
            id: ownProps.toolId,
            iconUri: ownProps.toolIconUri
          },
          plan.config,
          plan.stager,
          plan.packageInfos
        )
      );
    }
  };
}

export var Connecter = connect(mapStateToProps, mapDispatchToProps);

export default Connecter(PlanConfigurer);
