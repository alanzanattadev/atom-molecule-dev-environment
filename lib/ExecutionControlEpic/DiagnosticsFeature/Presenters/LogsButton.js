"use babel";
// @flow

import React from "react";
import Image from "react-image-fallback";
import classNames from "classnames";

export default class LogsButton
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
        className={classNames("diagnostics-mode-selector", {
          selected: this.props.selected,
        })}
        style={{
          height: "35px",
          display: "inline-flex",
          justifyContent: "center",
          alignItems: "center",
          border: "0px",
          borderRadius: "4px",
          padding: "5px 10px",
          margin: "5px 10px",
        }}
        disabled={this.props.disabled}
      >
        <Image
          fallbackImage="diagnostic-icon-log.svg"
          src="atom://molecule-dev-environment/.storybook/public/diagnostic-icon-log.svg"
          style={{ transition: "all 0.2s", height: "20px", width: "20px" }}
        />
        <span
          className="text-color-highlight"
          style={{
            fontSize: "16px",
            marginLeft: "10px",
          }}
        >
          Logs
        </span>
      </button>
    );
  }
}

LogsButton.defaultProps = {
  selected: false,
};

type DefaultProps = {};

type Props = {
  onClick(): void,
  disabled: boolean,
  selected: boolean,
};

type State = {};
