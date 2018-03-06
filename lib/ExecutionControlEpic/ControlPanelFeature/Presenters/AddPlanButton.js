"use babel";
// @flow

import React from "react";
import styled from "styled-components";

const AddPlanButtonElement = styled.span`
  margin: 0px 0px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export default function AddPlanButton({ ...props }: {}) {
  return <AddPlanButtonElement className="icon icon-plus" {...props} />;
}
