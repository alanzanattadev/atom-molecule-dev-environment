"use babel";
// @flow

import { areSamePlans } from "./PlanManipulators";
import type { PlanConfig } from "../Types/types.js";

describe("areSamePlans", () => {
  it("should return true if names differ", () => {
    let plan1: PlanConfig = {
      config: {
        a: {
          b: true,
        },
      },
      name: "myname",
      pinned: true,
      stager: { type: "integrated" },
      packageInfos: {
        name: "",
        path: "/",
        type: "directory",
      },
      tool: {
        id: "1",
        iconUri: "",
        name: "tool",
      },
      state: "running",
    };
    let plan2: PlanConfig = {
      config: {
        a: {
          b: true,
        },
      },
      name: "myname2",
      pinned: true,
      stager: { type: "integrated" },
      packageInfos: {
        name: "",
        path: "/",
        type: "directory",
      },
      tool: {
        id: "1",
        iconUri: "",
        name: "tool",
      },
      state: "running",
    };
    let subject = areSamePlans(plan1, plan2);

    expect(subject).toBe(true);
  });

  it("should return true if pinned differ", () => {
    let plan1: PlanConfig = {
      config: {
        a: {
          b: true,
        },
      },
      name: "myname",
      pinned: true,
      stager: { type: "integrated" },
      packageInfos: {
        name: "",
        path: "/",
        type: "directory",
      },
      tool: {
        id: "1",
        iconUri: "",
        name: "tool",
      },
      state: "running",
    };
    let plan2: PlanConfig = {
      config: {
        a: {
          b: true,
        },
      },
      name: "myname",
      pinned: false,
      stager: { type: "integrated" },
      packageInfos: {
        name: "",
        path: "/",
        type: "directory",
      },
      tool: {
        id: "1",
        iconUri: "",
        name: "tool",
      },
      state: "running",
    };
    let subject = areSamePlans(plan1, plan2);

    expect(subject).toBe(true);
  });

  it("should return false if tool differ", () => {
    let plan1: PlanConfig = {
      config: {
        a: {
          b: true,
        },
      },
      name: "myname",
      pinned: true,
      stager: { type: "integrated" },
      packageInfos: {
        name: "",
        path: "/",
        type: "directory",
      },
      tool: {
        id: "2",
        iconUri: "",
        name: "tool",
      },
      state: "running",
    };
    let plan2: PlanConfig = {
      config: {
        a: {
          b: true,
        },
      },
      name: "myname",
      pinned: true,
      stager: { type: "integrated" },
      packageInfos: {
        name: "",
        path: "/",
        type: "directory",
      },
      tool: {
        id: "1",
        iconUri: "",
        name: "tool",
      },
      state: "running",
    };
    let subject = areSamePlans(plan1, plan2);

    expect(subject).toBe(false);
  });

  it("should return false if config differ", () => {
    let plan1: PlanConfig = {
      config: {
        a: {
          b: true,
        },
      },
      name: "myname",
      pinned: true,
      stager: { type: "integrated" },
      packageInfos: {
        name: "",
        path: "/",
        type: "directory",
      },
      tool: {
        id: "1",
        iconUri: "",
        name: "tool",
      },
      state: "running",
    };
    let plan2: PlanConfig = {
      config: {
        a: {
          b: false,
        },
      },
      name: "myname",
      pinned: true,
      stager: { type: "integrated" },
      packageInfos: {
        name: "",
        path: "/",
        type: "directory",
      },
      tool: {
        id: "1",
        iconUri: "",
        name: "tool",
      },
      state: "running",
    };
    let subject = areSamePlans(plan1, plan2);

    expect(subject).toBe(false);
  });

  it("should return true if state differ", () => {
    let plan1: PlanConfig = {
      config: {
        a: {
          b: true,
        },
      },
      name: "myname",
      pinned: true,
      stager: { type: "integrated" },
      packageInfos: {
        name: "",
        path: "/",
        type: "directory",
      },
      tool: {
        id: "1",
        iconUri: "",
        name: "tool",
      },
      state: "running",
    };
    let plan2: PlanConfig = {
      config: {
        a: {
          b: true,
        },
      },
      name: "myname",
      pinned: true,
      stager: { type: "integrated" },
      packageInfos: {
        name: "",
        path: "/",
        type: "directory",
      },
      tool: {
        id: "1",
        iconUri: "",
        name: "tool",
      },
      state: "crashed",
    };
    let subject = areSamePlans(plan1, plan2);

    expect(subject).toBe(true);
  });
});
