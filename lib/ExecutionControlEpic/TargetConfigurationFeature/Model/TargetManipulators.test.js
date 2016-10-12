'use babel'
// @flow


import {areSameTargets} from "./TargetManipulators";
import type {TargetConfig} from "../Types/types.js";

describe('areSameTargets', () => {
  it('should return true if names differ', () => {
    let target1: TargetConfig = {
      config: {
        a: {
          b: true
        }
      },
      name: "myname",
      pinned: true,
      tool: {
        id: "1",
        iconUri: "",
        name: "tool"
      },
      state: 'running'
    };
    let target2: TargetConfig = {
      config: {
        a: {
          b: true
        }
      },
      name: "myname2",
      pinned: true,
      tool: {
        id: "1",
        iconUri: "",
        name: "tool"
      },
      state: 'running'
    };
    let subject = areSameTargets(target1, target2);

    expect(subject).toBe(true);
  });

  it('should return true if pinned differ', () => {
    let target1: TargetConfig = {
      config: {
        a: {
          b: true
        }
      },
      name: "myname",
      pinned: true,
      tool: {
        id: "1",
        iconUri: "",
        name: "tool"
      },
      state: 'running'
    };
    let target2: TargetConfig = {
      config: {
        a: {
          b: true
        }
      },
      name: "myname",
      pinned: false,
      tool: {
        id: "1",
        iconUri: "",
        name: "tool"
      },
      state: 'running'
    };
    let subject = areSameTargets(target1, target2);

    expect(subject).toBe(true);
  });

  it('should return false if tool differ', () => {
    let target1: TargetConfig = {
      config: {
        a: {
          b: true
        }
      },
      name: "myname",
      pinned: true,
      tool: {
        id: "2",
        iconUri: "",
        name: "tool"
      },
      state: 'running'
    };
    let target2: TargetConfig = {
      config: {
        a: {
          b: true
        }
      },
      name: "myname",
      pinned: true,
      tool: {
        id: "1",
        iconUri: "",
        name: "tool"
      },
      state: 'running'
    };
    let subject = areSameTargets(target1, target2);

    expect(subject).toBe(false);
  });

  it('should return false if config differ', () => {
    let target1: TargetConfig = {
      config: {
        a: {
          b: true
        }
      },
      name: "myname",
      pinned: true,
      tool: {
        id: "1",
        iconUri: "",
        name: "tool"
      },
      state: 'running'
    };
    let target2: TargetConfig = {
      config: {
        a: {
          b: false
        }
      },
      name: "myname",
      pinned: true,
      tool: {
        id: "1",
        iconUri: "",
        name: "tool"
      },
      state: 'running'
    };
    let subject = areSameTargets(target1, target2);

    expect(subject).toBe(false);
  });

  it('should return true if state differ', () => {
    let target1: TargetConfig = {
      config: {
        a: {
          b: true
        }
      },
      name: "myname",
      pinned: true,
      tool: {
        id: "1",
        iconUri: "",
        name: "tool"
      },
      state: 'running'
    };
    let target2: TargetConfig = {
      config: {
        a: {
          b: true
        }
      },
      name: "myname",
      pinned: true,
      tool: {
        id: "1",
        iconUri: "",
        name: "tool"
      },
      state: 'crashed'
    };
    let subject = areSameTargets(target1, target2);

    expect(subject).toBe(true);
  });
});
