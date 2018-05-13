"use babel";
// @flow

import React from "react";
import styled from "styled-components";

const SplitButtonElement = styled.span`
  cursor: pointer;
`;

const SplitButton = ({ onClick }: { onClick: () => void }) => (
  <SplitButtonElement className="icon icon-versions" onClick={onClick} />
);

export default SplitButton;
