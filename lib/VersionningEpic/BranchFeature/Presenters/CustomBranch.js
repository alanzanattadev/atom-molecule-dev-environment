"use babel";
// @flow
import React from "react";
import Radium from "radium";

export class CustomBranch extends React.Component<DefaultProps, Props, State> {
  state: State;
  props: Props;
  static defaultProps: DefaultProps;

  constructor(props: Props) {
    super(props);

    this.state = {
      typing: false
    };
  }

  render() {
    return (
      <div
        className="custom-branch-color"
        style={{
          display: "inline-flex",
          justifyContent: "center",
          alignItem: "center",
          padding: "5px 10px",
          margin: "5px",
          borderRadius: "15px",
          border: "1px solid #000",
          cursor: "pointer"
        }}
        onClick={() => {
          if (this.state.typing === false) {
            this.setState({ typing: true }, () => {
              this.input.focus();
            });
          }
        }}
        onBlur={() => {
          if (this.state.typing === true) {
            this.setState({ typing: false });
          }
        }}
      >
        {this.state.typing
          ? <input
              type="text"
              className="native-key-bindings"
              style={{
                border: "0px",
                borderRadius: "15px",
                padding: "0px 10px",
                minWidth: "50px",
                display: "inline-flex"
              }}
              ref={elem => this.input = elem}
              onKeyPress={e => {
                if (e.key == "Enter") {
                  this.props.onCreateBranch(this.input.value);
                  this.setState({ typing: false });
                }
              }}
            />
          : <span>custom</span>}
      </div>
    );
  }
}

CustomBranch.propTypes = {};

CustomBranch.defaultProps = {};

type DefaultProps = {};

type Props = {
  onCreateBranch(name: string): void
};

type State = {};

export default Radium(CustomBranch);
