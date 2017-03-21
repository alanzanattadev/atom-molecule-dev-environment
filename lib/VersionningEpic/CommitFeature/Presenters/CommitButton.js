"use babel";
// @flow

import React from "react";
import classNames from "classnames";

export default class CommitButton
  extends React.Component<DefaultProps, Props, State> {
  state: State;
  props: Props;
  static defaultProps: DefaultProps;

  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <button
        onClick={this.props.onClick}
        style={{ margin: "10px 5px", alignSelf: "flex-end" }}
        className={classNames("btn", "icon", "icon-plus", {
          "btn-success": true,
        })}
      >
        Commit
      </button>
    );
  }
}

CommitButton.propTypes = {};

CommitButton.defaultProps = {};

type DefaultProps = {};

type Props = {
  onClick(): void,
};

type State = {};
