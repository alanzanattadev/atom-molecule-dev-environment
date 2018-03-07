// flow-typed signature: c40a9238db56a67bb25677726dcfaa7c
// flow-typed version: 7888c3aaad/inline-style-prefixer_v3.x.x/flow_>=v0.34.x

declare module "inline-style-prefixer" {
  declare type Config = {
    userAgent?: string,
    keepUnprefixed?: boolean
  };
  declare class Prefixer {
    constructor(config?: Config): Prefixer;
    prefix(styles: Object): Object;
  }

  declare module.exports: typeof Prefixer;
}

declare module "inline-style-prefixer/static" {
  declare module.exports: Object => Object;
}
