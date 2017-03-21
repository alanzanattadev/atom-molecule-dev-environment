"use babel";
// @flow

import React from "react";
import Image from "react-image-fallback";
import type {ConfigSchemaPart} from "../../../types";
import PlanConfigPart from "./PlanConfigPart";

export default class PlanConfigGroup
  extends React.Component<DefaultProps, Props, State> {
  props: Props;
  state: State;
  static defaultProps: DefaultProps;

  constructor(props: Props) {
    super(props);

    this.state = { expanded: false };
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
        <div
          style={{
            display: "flex",
            overflow: "auto",
            padding: "10px",
            justifyContent: "space-between",
          }}
          onClick={() => this.setState({ expanded: !this.state.expanded })}
        >
          <span
            className="text-color-highlight"
            style={{
              display: "flex",
              overflow: "auto",
              fontSize: "13px",
            }}
          >
            config &gt; {this.props.title}
          </span>
          <Image
            src="atom://molecule-dev-environment/.storybook/public/arrow-right.svg"
            fallbackImage="arrow-right.svg"
            style={{
              display: "flex",
              overflow: "auto",
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
                overflow: "auto",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {Object.keys(this.props.schemas).map(key => (
                <PlanConfigPart
                  {...this.props.schemas[key]}
                  style={{
                    overflow: "auto",
                    display: "flex",
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

PlanConfigGroup.propTypes = {};

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
