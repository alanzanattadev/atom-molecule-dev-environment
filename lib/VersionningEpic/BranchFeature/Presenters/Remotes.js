"use babel";
// @flow
import React from "react";
import DraggableRemote from "./DraggableRemote";
import Radium from "radium";

export class Remotes extends React.Component<DefaultProps, Props, State> {
  state: State;
  props: Props;
  static defaultProps: DefaultProps;

  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <ul
        style={{
          padding: "0px",
          display: "flex",
          flex: "1",
          margin: "5px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {this.props.remotes.map(remote => (
          <li
            style={{ listStyle: "none", flex: "1", display: "flex" }}
            key={remote.name}
          >
            <DraggableRemote {...remote} {...this.props} />
          </li>
        ))}
      </ul>
    );
  }
}

Remotes.propTypes = {};

Remotes.defaultProps = {};

type DefaultProps = {};

type Props = {};

type State = {};

export default Radium(Remotes);
