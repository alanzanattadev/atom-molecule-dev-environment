"use babel";
// @flow

import React from "react";
import { withState, compose } from "recompose";
import type { Node } from "react";
import styled from "styled-components";
import FoldButton from "./FoldButton";
import classNames from "classnames";

const SectionName = styled.h3`
  display: flex;
  cursor: pointer;
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
  margin-right: 4px;
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
  onTitleClick = () => {},
  selected = false,
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
  onTitleClick: () => void,
  selected?: boolean,
}) {
  return (
    <SectionBox foldable={foldable}>
      <SectionTitleBox
        foldable={foldable}
        className={classNames({
          "package-title": foldable,
          "mode-selected": selected,
        })}
        onClick={() => {
          if (foldable) setOpened(!opened);
        }}
      >
        <SectionTitle onClick={onTitleClick}>
          {foldable && <FoldButton opened={opened} />}
          {icon !== undefined ? (
            icon()
          ) : (
            <SectionIcon className={iconClassName} />
          )}
          <SectionName>{title}</SectionName>
        </SectionTitle>
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
