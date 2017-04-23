"use babel";
// @flow

import React from "react";
import {
  getColorForDiagnosticType,
  getDarkColorForDiagnosticType,
} from "../Styles/Colors";
import Arrow from "./Arrow";
import type { DiagnosticType } from "../Types/types.js.flow";

export default class DiagnosticSelector
  extends React.Component<DefaultProps, Props, State> {
  state: State;
  props: Props;
  static defaultProps: DefaultProps;

  constructor(props: Props) {
    super(props);
  }

  render() {
    let arrowContainerStyle = {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "20px",
    };
    return (
      <div
        className={getColorForDiagnosticType(this.props.type)}
        style={{
          display: "inline-flex",
          opacity: this.props.selected ? "1" : "0.5",
          flexWrap: "nowrap",
          margin: "5px 5px",
          height: "35px",
          borderRadius: "4px",
        }}
      >
        {this.props.of > 1
          ? <div onClick={this.props.onBack} style={arrowContainerStyle}>
              <Arrow side={"left"} />
            </div>
          : false}
        <div
          className={
            this.props.of > 1 && getDarkColorForDiagnosticType(this.props.type)
          }
          onClick={this.props.onClick}
          style={{
            minWidth: "35px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "5px 10px",
            borderRadius: this.props.of < 1 && "4px",
          }}
        >
          <span
            className="color-text-white"
            style={{ whiteSpace: "nowrap", fontSize: "14px" }}
          >
            {this.props.of > 1
              ? `${this.props.index + 1} of ${this.props.of}`
              : 1}
          </span>
        </div>
        {this.props.of > 1
          ? <div onClick={this.props.onForward} style={arrowContainerStyle}>
              <Arrow side={"right"} />
            </div>
          : false}
      </div>
    );
  }
}

DiagnosticSelector.defaultProps = {
  index: 0,
};

type DefaultProps = {
  index: number,
};

type Props = {
  of: number,
  index: number,
  type: DiagnosticType,
  onClick(): void,
  onBack(): void,
  onForward(): void,
  selected: boolean,
};

type State = {};
