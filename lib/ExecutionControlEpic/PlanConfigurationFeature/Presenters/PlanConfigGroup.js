"use babel";
// @flow

import React from "react";
import Image from "react-image-fallback";
import type { ConfigSchemaPart } from "../Types/types.js.flow";
import PlanConfigPart from "./PlanConfigPart";

export default class PlanConfigGroup
  extends React.Component<DefaultProps, Props, State> {
  props: Props;
  state: State;
  static defaultProps: DefaultProps;

  constructor(props: Props) {
    super(props);

    this.state = { expanded: true };
  }

  render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          flexShrink: "0",
          margin: "10px 0px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexShrink: "0",
            margin: "5px 0px",
          }}
          onClick={() => this.setState({ expanded: !this.state.expanded })}
        >
          <span
            className="text-color-highlight"
            style={{
              display: "flex",
              fontSize: "13px",
            }}
          >
            config{this.props.title != null ? ` > ${this.props.title}` : ""}
          </span>
          <Image
            src="atom://molecule-dev-environment/.storybook/public/arrow-right.svg"
            fallbackImage="arrow-right.svg"
            style={{
              display: "flex",
              height: "15px",
              width: "15px",
              transform: this.state.expanded ? "rotate(90deg)" : "",
              transition: "0.2s transform",
            }}
          />
        </div>
        {this.state.expanded
          ? <div
              style={{
                display: "flex",
                flexDirection: "column",
                flexShrink: "0",
              }}
            >
              {Object.keys(this.props.schemas).map(key => (
                <PlanConfigPart
                  {...this.props.schemas[key]}
                  style={{
                    display: "flex",
                    flexShrink: "0",
                  }}
                  key={key}
                  onChange={value =>
                    this.props.onChange(
                      Object.assign({}, this.props.value, { [key]: value }),
                    )}
                  value={this.props.value[key]}
                />
              ))}
            </div>
          : false}
      </div>
    );
  }
}

PlanConfigGroup.defaultProps = {};

type DefaultProps = {};

type Props = {
  schemas: { [key: string]: ConfigSchemaPart },
  title: string,
  onChange(value: any): void,
  value: any,
};

type State = {
  expanded: boolean,
};
