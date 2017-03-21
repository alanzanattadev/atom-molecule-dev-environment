"use babel";
// @flow

import React from "react";
import PlanConfigPart from "./PlanConfigPart";
import type {ConfigSchemaPart} from "../../../types";
import {fromJS} from "immutable";
import {getDefault} from "../Model/PlanConfigManipulators";
import AddButton from "./AddButton";

export default class PlanConfigList
  extends React.Component<DefaultProps, Props, State> {
  state: State;
  props: Props;
  static defaultProps: DefaultProps;

  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <div
        className="plan-background-color"
        style={{
          display: "flex",
          overflow: "auto",
          flexDirection: "column",
          padding: "10px",
          alignItems: "stretch",
          margin: "5px 5px 5px 0px",
          borderRadius: "5px",
        }}
      >
        <span
          className="text-color-highlight"
          style={{
            display: "flex",
            overflow: "auto",
            fontSize: "13px",
          }}
        >
          {this.props.title}
        </span>
        <div
          style={{ overflow: "auto", display: "flex", flexDirection: "column" }}
        >
          {this.props.values.map((value, i) => (
            <li
              key={i}
              style={{
                display: "flex",
                overflow: "auto",
                listStyle: "none",
              }}
            >
              <PlanConfigPart
                // $FlowFixMe
                {...this.props.items}
                style={{
                  overflow: "auto",
                  display: "flex",
                }}
                value={value}
                onChange={v =>
                  this.props.onChange(
                    fromJS(this.props.values).update(i, value => v).toJS(),
                  )}
              />
            </li>
          ))}
          <AddButton
            onClick={() =>
              this.props.onChange(
                []
                  .concat(this.props.values)
                  .concat(getDefault(this.props.items)),
              )}
          />
        </div>
      </div>
    );
  }
}

PlanConfigList.propTypes = {};

PlanConfigList.defaultProps = {};

type DefaultProps = {};

type Props = {
  values: Array<mixed>,
  onChange(value: mixed): void,
  items: ConfigSchemaPart,
};

type State = {};
