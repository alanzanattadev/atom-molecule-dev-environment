"use babel";
// @flow
import React from "react";
import type {Remote as RemoteType} from "../Types/types.js";
import Radium from "radium";

export class Remote extends React.Component<DefaultProps, Props, State> {
  state: State;
  props: Props;
  static defaultProps: DefaultProps;

  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <div
        className="text-color-highlight"
        style={{
          display: "inline-flex",
          padding: "5px",
          border: "1px #aaa solid",
          margin: "5px",
          minWidth: "40px",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "5px",
          whiteSpace: "nowrap",
          flex: "1",
        }}
      >
        {this.props.name}
      </div>
    );
  }
}

Remote.propTypes = {};

Remote.defaultProps = {};

type DefaultProps = {};

type Props = {} & RemoteType;

type State = {};

export default Radium(Remote);
