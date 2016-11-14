'use babel'
// @flow

import { connect } from "react-redux";
import TargetConfigurer from "../Presenters/TargetConfigurer";
import type {State} from "../../../GlobalSystem/types.js.flow";
import {selectConfigSchemaOfTool} from "../Selectors/TargetConfigSchemas";
import type {ConfigSchemaPart, Stager} from "../Types/types.js";
import {selectTargetsSchemaReducer} from "../../../GlobalSystem/Selectors";
import {addTargetConfig} from "../Actions/AddTargetConfig";

export function mapStateToProps(state: State, {toolId}: {toolId: string}): {config: ConfigSchemaPart} {
  return {
    config: selectConfigSchemaOfTool(selectTargetsSchemaReducer(state), toolId)
  };
};

export function mapDispatchToProps(dispatch: (action: any) => any, ownProps: {toolId: string, toolIconUri: string, toolName: string}): {onAddTarget: (target: {name: string, config: mixed, stager: Stager}) => void} {
  return {
    onAddTarget: (target: {name: string, config: mixed, stager: Stager}) => {
      dispatch(addTargetConfig(target.name, {name: ownProps.toolName, id: ownProps.toolId, iconUri: ownProps.toolIconUri}, target.config, target.stager));
    }
  };
};

export var Connecter = connect(mapStateToProps, mapDispatchToProps);

export default Connecter(TargetConfigurer);
