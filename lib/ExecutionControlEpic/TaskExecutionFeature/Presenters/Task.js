"use babel";
// @flow

import React from "react";
import type { TaskState } from "../Types/types.js.flow";
import { getStateColor } from "../../PlanConfigurationFeature/Presenters/Plan";
import moment from "moment";

export default class Task extends React.Component<DefaultProps, Props, State> {
  state: State;
  props: Props;
  static defaultProps: DefaultProps;

  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <div
        className="color-background-dgrey"
        style={{
          padding: "10px 15px",
          display: "flex",
          border: "1px solid #000",
          cursor: this.props.onClick ? "pointer" : undefined,
        }}
        onClick={this.props.onClick}
      >
        <div
          style={{
            display: "inline-flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <span
            style={{
              borderRadius: "50%",
              height: "30px",
              width: "30px",
              backgroundColor: getStateColor(this.props.state),
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            marginLeft: "15px",
            flexDirection: "column",
            alignItems: "stretch",
            justifyContent: "center",
          }}
        >
          {this.props.end
            ? <div>
                <span
                  className="color-text-white"
                  style={{
                    fontSize: "16px",
                    whitespace: "no-wrap",
                  }}
                >
                  {moment.unix(this.props.end).fromNow()}
                </span>
                <hr
                  className="color-background-black"
                  style={{
                    height: "1px",
                    margin: "5px 0px",
                  }}
                />
              </div>
            : false}
          <div>
            <span
              className="color-text-white"
              style={{ fontSize: "16px", whiteSpace: "nowrap" }}
            >
              {moment.unix(this.props.debut).fromNow()}
            </span>
          </div>
        </div>
      </div>
    );
  }
}

Task.defaultProps = {};

type DefaultProps = {};

type Props = {
  state: TaskState,
  debut: number,
  end: number,
  onClick(): void,
};

type State = {};
