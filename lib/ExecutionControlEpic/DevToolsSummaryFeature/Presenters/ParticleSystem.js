"use babel";
// @flow

import * as React from "react";
import styled from "styled-components";
import { compose, withState, lifecycle } from "recompose";
import { List } from "immutable";
import Particle from "./Particle";

const particlesStore = withState("particles", "setParticles", List());

const particleLifecycle = lifecycle({
  removeParticle() {
    this.props.setParticles(particles => particles.shift());
  },

  addParticle() {
    const particleId = this.id;
    this.props.setParticles(particles => particles.push(particleId));
    this.id += 1;
    setTimeout(() => this.removeParticle(), 10000);
  },

  componentDidMount() {
    this.id = 0;
    this.subscription = this.props.notifier.subscribe(() => this.addParticle());
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.notifier !== this.props.notifier) {
      this.subscription.unsubscribe();
      if (nextProps.notifier != null) {
        this.subscription = nextProps.notifier.subscribe(() =>
          this.addParticle(),
        );
      }
    }
  },

  componentWillUnmount() {
    this.subscription.unsubscribe();
  },
});

const Particles = styled.ul`
  padding: 0;
  margin: 0;
  display: flex;
  flex: 0 0 0px;
  overflow: hidden;
`;

const ParticleItem = styled.li`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex: 0 1 auto;
  position: absolute;
`;

export function ParticleSystem({
  particles = List(),
  destX = "0px",
  destY = "0px",
}: {
  particles: List<any>,
  destX: string,
  destY: string,
}) {
  const colors = ["#288FFF", "#0A2440", "#14477F", "#2481E5"];
  return (
    <Particles>
      {particles.map(particle => (
        <ParticleItem key={particle}>
          <Particle
            destX={destX}
            destY={destY}
            random
            randomStrength={5}
            color={colors[particle % colors.length]}
          />
        </ParticleItem>
      ))}
    </Particles>
  );
}

export default compose(particlesStore, particleLifecycle)(ParticleSystem);
