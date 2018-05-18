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
  flex: 0 0 auto;
`;

const SectionBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 0px 0px ${props => (props.foldable ? "0px" : "8px")};
  flex: 0 0 auto;
  user-select: none;
  line-height: 22px;
  margin-bottom: 2px;
`;

const SectionTitleBox = styled.div`
  display: flex;
  padding: ${props => (props.shouldPad ? "8px" : undefined)};
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
  padding: 0px 0px 4px 16px;
  flex-direction: column;
  flex: 1 0 auto;
`;

const ControlsBox = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  padding: 0px;
  flex: 0 0 auto;
  padding-right: 16px;
`;

const SectionIcon = styled.span`
  padding-bottom: 4px;
  display: flex;
  align-items: center;
  flex: 0 0 auto;
`;

const SectionTitle = styled.div`
  display: flex;
  align-items: center;
  flex: 0 0 auto;
  padding-left: ${props => (!props.foldable ? "21px" : undefined)};
`;

const SectionLeftBorder = styled.div`
  position: relative;
  left: 35px;
  background-color: ${props => props.color};
  border-radius: 10px;
  width: 4px;
  margin: 6px 0px;
`;

const SectionContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  padding: 0px;
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
  isPackage = false,
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
  isPackage?: boolean,
}) {
  return (
    <SectionBox
      foldable={foldable}
      className={classNames({
        "mode-selected": selected,
      })}
    >
      <SectionTitleBox
        foldable={foldable}
        shouldPad={isPackage}
        onClick={() => {
          if (foldable) setOpened(!opened);
        }}
      >
        <TooltipedSectionTitle
          onClick={onTitleClick}
          tooltip={tooltip}
          foldable={foldable}
        >
          {foldable && <FoldButton opened={opened} isTopLevel={isPackage} />}
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
      {opened &&
        children && (
          <SectionContentWrapper>
            {color && <SectionLeftBorder color={color} />}
            <SectionContentBox>{children}</SectionContentBox>
          </SectionContentWrapper>
        )}
    </SectionBox>
  );
}

export default compose(withState("opened", "setOpened", true))(Section);
