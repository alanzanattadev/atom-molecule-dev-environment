"use babel";
// @flow

import * as React from "react";
import classNames from "classnames";
import styled from "styled-components";

const HintPosition = styled.div`
  position: relative;
`;

const ToolTipInner = styled.div`
  width: 400px;
  font-size: 13px;
  white-space: normal !important;
`;

const ToolTipArrow = styled.div`
  left: 2% !important;
`;

export default class hintButton extends React.Component<Props, State> {
  state: State;
  props: Props;
  static defaultProps: DefaultProps;

  constructor(props: Props) {
    super(props);
    this.state = { isButtonHover: false };
  }

  displayMessage() {
    this.setState({ isButtonHover: true });
  }

  hideMessage() {
    this.setState({ isButtonHover: false });
  }

  render() {
    const isButtonHover = this.state.isButtonHover;
    const displayHint = isButtonHover ? 1 : 0;
    const displayBlock = isButtonHover ? "block" : "none";

    return (
      <span>
        <HintPosition style={{ top: this.props.top + "px" }}>
          <div
            style={{ opacity: displayHint, display: displayBlock }}
            className="tooltip top"
          >
            <ToolTipArrow className="tooltip-arrow" />
            <ToolTipInner className="tooltip-inner">
              {this.props.hint}
            </ToolTipInner>
          </div>
        </HintPosition>
        <span
          onMouseEnter={e => this.displayMessage(e)}
          onMouseLeave={e => this.hideMessage(e)}
          className="icon icon-info"
        />
      </span>
    );
  }
}
