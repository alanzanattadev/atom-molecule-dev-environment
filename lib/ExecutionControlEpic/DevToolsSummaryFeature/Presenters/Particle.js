"use babel";
// @flow

import * as React from "react";
import { pure } from "recompose";
import styled, { keyframes } from "styled-components";

function createParticleMovement(
  { destX, destY, random = false, randomStrength = 30 } = {},
) {
  return keyframes`
    from {
      transform: translate3d(0px, 0px, 0px);
    }

    to {
      transform: translate3d(
        calc(${destX || "0px"} + ${
    random ? Math.random() * randomStrength * (Math.random() > 0.5 ? 1 : -1) : 0
  }px), calc(${destY || "0px"} + ${
    random ? Math.random() * randomStrength * (Math.random() > 0.5 ? 1 : -1) : 0
  }px), 0px);
    }
  `;
}

const ParticleElement = styled.span`
  display: flex;
  height: 5px;
  width: 5px;
  border-radius: 50%;
  background-color: ${props => props.color || "red"};
  animation: ${createParticleMovement} cubic-bezier(0.2, 0.57, 0.4, 1) 0.675s
    forwards;
`;

export function Particle({
  destX,
  destY,
  random,
  color,
  randomStrength,
}: {
  destX?: string,
  destY?: string,
  random?: boolean,
  color?: string,
  randomStrength?: number,
}) {
  return (
    <ParticleElement
      destX={destX}
      destY={destY}
      random={random}
      color={color}
      randomStrength={randomStrength}
    />
  );
}

export default pure(Particle);
