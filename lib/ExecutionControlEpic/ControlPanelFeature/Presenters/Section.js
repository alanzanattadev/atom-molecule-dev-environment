"use babel";
// @flow

import React from "react";
import ReactDOM from "react-dom";
import { withState, lifecycle, withHandlers, compose } from "recompose";
import type { Node } from "react";
import styled from "styled-components";
import FoldButton from "./FoldButton";
import classNames from "classnames";

const SectionName = styled.span`
  display: flex;
  cursor: ${props => (props.isClickable ? "pointer" : undefined)};
  margin: 4px 0px;
  flex: 0 0 auto;
`;

const SectionBox = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0px 0px 0px ${props => (props.foldable ? "0px" : "8px")};
  flex: 0 0 auto;
  user-select: none;
`;

const SectionTitleBox = styled.div`
  display: flex;
  padding: ${props => (props.foldable ? "8px" : "0px")};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex: 0 0 auto;
  margin: 0px;
  cursor: ${props => props.foldable && "pointer"};
  transition: all ease 250ms;
  filter: brightness(100%);
  &:hover {
    filter: brightness(125%);
  }
`;

const SectionContentBox = styled.div`
  display: flex;
  margin: 0px 0px 4px 16px;
  flex-direction: column;
  flex: 1 0 auto;
`;

const ControlsBox = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  margin: 0px;
  flex: 0 0 auto;
  margin-right: 16px;
`;

const SectionIcon = styled.span`
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  flex: 0 0 auto;
`;

const SectionTitle = styled.div`
  display: flex;
  align-items: center;
  flex: 0 0 auto;
`;

const SectionLeftBorder = styled.div`
  background-color: ${props => props.color};
  border-radius: 10px;
  width: 6px;
  margin: 8px 0px 12px 10px;
`;

const SectionContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  margin: 0px;
  flex: 0 0 auto;
`;

export const withTooltip = compose(
  withState("tip", "setTip", null),
  withHandlers({
    disableTip: ({ tip }) => () => tip.dispose(),
  }),
  lifecycle({
    componentDidMount() {
      if (this.props.tooltip) {
        this.props.setTip(
          global.atom.tooltips.add(ReactDOM.findDOMNode(this), {
            title: this.props.tooltip,
          }),
        );
      }
    },
    componentWillUnmount() {
      if (this.props.tip) this.props.disableTip();
    },
  }),
);

const TooltipedSectionTitle = withTooltip(SectionTitle);

export function Section({
  children,
  controls = () => null,
  title,
  iconClassName,
  icon,
  color,
  foldable = false,
  opened = true,
  setOpened = () => {},
  onTitleClick,
  selected = false,
  tooltip,
}: {
  controls?: () => ?Node,
  title: string,
  children?: Node,
  iconClassName?: string,
  icon?: () => ?Node,
  color?: string,
  foldable?: boolean,
  opened?: boolean,
  setOpened?: (value: boolean) => void,
  onTitleClick?: () => void,
  selected?: boolean,
  tooltip?: string,
}) {
  return (
    <SectionBox foldable={foldable}>
      <SectionTitleBox
        foldable={foldable}
        className={classNames({
          "mode-selected": selected,
        })}
        onClick={() => {
          if (foldable) setOpened(!opened);
        }}
      >
        <TooltipedSectionTitle onClick={onTitleClick} tooltip={tooltip}>
          {foldable && <FoldButton opened={opened} />}
          {icon !== undefined ? (
            icon()
          ) : (
            <SectionIcon className={iconClassName} />
          )}
          <SectionName isClickable={onTitleClick}>
            {title.charAt(0).toUpperCase() + title.slice(1)}
          </SectionName>
        </TooltipedSectionTitle>
        <ControlsBox>{controls()}</ControlsBox>
      </SectionTitleBox>
      {opened && (
        <SectionContentWrapper>
          {color && <SectionLeftBorder color={color} />}
          <SectionContentBox>{children}</SectionContentBox>
        </SectionContentWrapper>
      )}
    </SectionBox>
  );
}

export default compose(withState("opened", "setOpened", true))(Section);
