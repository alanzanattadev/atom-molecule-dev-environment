"use babel";
// @flow

import { connect } from "react-redux";
import PlanConfigurer from "../Presenters/PlanConfigurer";
import type { State } from "../../../GlobalSystem/types.js.flow";
import { selectConfigSchemaOfTool } from "../Selectors/PlanConfigSchemas";
import { selectPlansOfTool } from "../Selectors/PlanConfigs";
import type { DevToolPlanConfigSchema, Stager } from "../Types/types.js.flow";
import {
  selectPackagesReducer,
  selectPlansSchemaReducer,
  selectPlansReducer,
} from "../../../GlobalSystem/Selectors";
import { addPlanConfig } from "../Actions/AddPlanConfig";
import type {
  Package,
  PackageInfos,
} from "../../../ProjectSystemEpic/PackageFeature/Types/types.js.flow";
import { selectPackagesOfTool } from "../../../ProjectSystemEpic/PackageFeature/Selectors/Packages";
import { compose, withState, lifecycle, withProps } from "recompose";
import {
  FormController,
  StateDispatcher,
  convertConversionModelToConversionJobs,
  convertIn,
  convertOut,
  composeValidation,
  validateModel,
  notEmpty,
  required,
  notFilled,
  notNull,
  notUndefined,
  isTrue,
  maxLength,
  lessThan,
  // $FlowFixMe
} from "react-forms-state";
import { getDefault } from "../Model/PlanConfigManipulators";

export function mapStateToProps(
  state: State,
  { toolId }: { toolId: string },
): { config: DevToolPlanConfigSchema, packages: Array<Package> } {
  return {
    config: selectConfigSchemaOfTool(selectPlansSchemaReducer(state), toolId),
    packages: selectPackagesOfTool(selectPackagesReducer(state), toolId),
    plans: selectPlansOfTool(selectPlansReducer(state), toolId),
  };
}

export function mapDispatchToProps(
  dispatch: (action: any) => any,
  ownProps: {
    toolId: string,
    toolIconUri: string,
    toolName: string,
    toolUri: string,
  },
): {
  onAddPlan: (plan: {
    name: string,
    config: mixed,
    stager: Stager,
    packageInfos: PackageInfos,
  }) => void,
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
            dominantColor: ownProps.toolDominantColor,
            uri: ownProps.toolUri,
          },
          plan.config,
          plan.stager,
          plan.packageInfos,
        ),
      );
    },
  };
}

export var Connecter = connect(mapStateToProps, mapDispatchToProps);

const ValidationUtils = {
  composeValidation,
  notEmpty,
  required,
  notFilled,
  notNull,
  notUndefined,
  isTrue,
  maxLength,
  lessThan,
};

function convertsConfigSchemaToFormModel(
  value,
  props,
  configSchema,
  context = {},
) {
  if (configSchema == null) return undefined;
  const validate =
    typeof configSchema.validate === "function"
      ? configSchema.validate(ValidationUtils)
      : configSchema.validate;
  switch (configSchema.type) {
    case "array":
      return {
        out: context.fieldName,
        validate,
        convertIn: array =>
          array.reduce((red, v, i) => ({ ...red, [i]: v }), {}),
        convertOut: map =>
          map.reduce((red, v) => (v != null ? red.concat(v) : red), []),
        ...Object.keys(value || {}).reduce(
          (red, i) => ({
            ...red,
            [i]: convertsConfigSchemaToFormModel(
              (value || {})[i],
              props,
              configSchema.items,
              { fieldName: i },
            ),
          }),
          {},
        ),
      };
    case "object":
      return {
        out: context.fieldName,
        validate,
        ...Object.keys(configSchema.schemas).reduce(
          (red, key) => ({
            ...red,
            [key]: convertsConfigSchemaToFormModel(
              (value || {})[key],
              props,
              configSchema.schemas[key],
              { fieldName: key },
            ),
          }),
          {},
        ),
      };
    case "conditional":
      return {
        out: context.fieldName,
        expressionValue: convertsConfigSchemaToFormModel(
          value ? value.expressionValue : null,
          props,
          configSchema.expression,
          { fieldName: "expressionValue" },
        ),
        caseValue: convertsConfigSchemaToFormModel(
          value ? value.caseValue : null,
          props,
          value ? configSchema.cases[value.expressionValue] : null,
          { fieldName: "caseValue" },
        ),
        validate,
      };
    case "enum":
    case "boolean":
    case "file":
    case "string":
    case "number":
      return {
        out: context.fieldName || "",
        default: configSchema.default,
        validate,
      };
  }
}

type Props = {
  config: ConfigSchemaPart,
  onAddPlan(plan: { config: mixed, name: string }): void,
  packages: Array<Package>,
};

export function getFormJobs(value, props) {
  const model = {
    name: {
      out: "name",
      validate: composeValidation(notEmpty(), () => true),
      default: "",
    },
    config: {
      ...convertsConfigSchemaToFormModel(value.config, props, props.config),
      out: "config",
    },
    stager: {
      out: "stager",
      convertOut: v => ({
        type: v.get("expressionValue"),
        host:
          v.get("expressionValue") === "remote"
            ? {
                ...v.getIn(["caseValue", "host"]).toJS(),
                transport: {
                  type: v.getIn(["caseValue", "method", "expressionValue"]),
                  ...v.getIn(["caseValue", "method", "caseValue"]).toJS(),
                },
              }
            : null,
      }),
      type: {
        out: "expressionValue",
        default: "integrated",
      },
      host: {
        out: "caseValue",
        default: null,
      },
    },
    packageInfos: {
      out: "packageInfos",
      default: null,
      convertOut: (v, props) => props.packages.find(p => p.path == v),
    },
  };
  const jobs = convertConversionModelToConversionJobs(model);
  return jobs;
}

export default compose(
  Connecter,
  withProps(({ onAddPlan }) => ({
    onSubmit(value) {
      onAddPlan(value);
    },
    onValidationFailed(validation) {
      if (global.atom) {
        if (typeof validation.infos === "object")
          global.atom.notifications.addWarning("Your plan isn't correct");
        else global.atom.notifications.addWarning(validation.infos);
      }
    },
  })),
  withState("initial", "setInitial", props => ({
    config: getDefault(props.config),
    packageInfos: props.packages[0] ? props.packages[0].path : null,
  })),
  lifecycle({
    componentWillReceiveProps(nextProps: Props) {
      if (this.props.packages.length === 0 && nextProps.packages.length !== 0) {
        this.props.setInitial({
          ...this.props.initial,
          packageInfos: nextProps.packages[0]
            ? nextProps.packages[0].path
            : null,
        });
      }
    },
  }),
  FormController(
    undefined,
    (value, props) => convertIn(value, getFormJobs(value, props), props),
    (value, props) =>
      convertOut(value, getFormJobs(value, props), { ...props, __debug: true }),
    { checkIfModified: false },
    (value, props) =>
      composeValidation(
        validateModel(getFormJobs(value, props)),
        (value, props) => {
          if (props.plans.find(p => p.name === value.name))
            return "This plan already exist";
          else return true;
        },
      )(value, props),
  ),
  StateDispatcher(),
)(PlanConfigurer);
