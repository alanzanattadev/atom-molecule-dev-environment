"use babel";
// @flow

type Project = {
  name: string
};

type Package = {
  path: string,
  project: Project
};

type DevToolPlan = {
  host: DevToolPlanHost,
  config: DevToolPlanConfig
};

type Progress = boolean | number;

type DevToolTask = {
  plan: DevToolPlan,
  devtool: DevTool,
  package: Package,
  isRunning(): Promise<boolean>,
  getProgress(): Promise<Progress>
};

type IPAddress = string;
type Port = number;

type DevToolPlanHost = {
  host: IPAddress,
  port: Port,
  type: string,
  transport: Transport
};

export type DevToolPlanConfig = mixed;

type ConfigSchemaPartBase = {
  title?: string,
  description?: string,
};

type ObjectConfigSchema = {
  type: "object",
  default: Object,
  schemas: { [key: string]: ConfigSchemaPart }
};

type ArrayConfigSchema = {
  type: "array",
  default: ConfigSchemaPart,
  items: ConfigSchemaPart
};

type StringConfigSchema = {
  type: "string",
  default: string,
  placeholder?: string
};

type BooleanConfigSchema = {
  type: "boolean",
  default: boolean
};

type NumberConfigSchema = {
  type: "number",
  default: number,
  placeholder: string
};

type ConditionalConfigSchema<T> = {
  type: "conditional",
  default: string,
  expression: ConfigSchemaPart,
  cases: { [key: string]: ConfigSchemaPart }
};

type EnumConfigSchema = {
  type: "enum",
  default: DevToolPlanConfig,
  enum: Array<{ value: mixed, description: string }>
};

export type ConfigSchemaPart =
  & ConfigSchemaPartBase
  & (
    | ArrayConfigSchema
    | StringConfigSchema
    | BooleanConfigSchema
    | NumberConfigSchema
    | EnumConfigSchema
    | ObjectConfigSchema
    | ConditionalConfigSchema<mixed>);

type DevToolPlanConfigSchema = ConfigSchemaPart;

type DevToolController = {
  attach(task: DevToolTask): void,
  detach(task: DevToolTask): void,
  isAttached(task: DevToolTask): boolean,
  getDevTool(id: DevToolID): DevTool
};

type FilePath = {
  path: string,
  line: number,
  column: number
};

type DevToolID = string;

type DevDiagnosticsController = {
  diagnostics: DevDiagnostics,
  previous: Array<DevDiagnostics>
};

type DevDiagnostics = Array<Diagnostic>;

type DiagnosticBase = {
  type: string,
  devtool: DevToolID
};

type ErrorDiagnostic = {
  type: "error",
  message: string,
  file?: FilePath
};

type WarningDiagnostic = {
  type: "warning",
  message: string,
  file?: FilePath
};

type SuccessDiagnostic = {
  type: "success"
};

type InfoDiagnostic = {
  type: "info",
  message: string,
  file?: FilePath
};

type Diagnostic =
  & DiagnosticBase
  & (ErrorDiagnostic | WarningDiagnostic | SuccessDiagnostic | InfoDiagnostic);

type DevEnvironment = {
  diagnostics: DevDiagnostics
};

type SSHAuth = {
  authType: "password" | "key",
  auth:
    | {
        username: string,
        password: string
      }
    | {
        username: string,
        privateKey: string
      }
};

type SSHTransport = {
  exec(host: DevToolPlanHost, command: string): any,
  auth: SSHAuth
};

type TransportBase = {
  type: string,
  remote: boolean
};

type TransportLocalBase = {
  remote: false,
  exec(action: any): any
};

type LocalShellTransport = {
  exec(command: string): any
};

type TransportRemoteBase = {
  remote: true,
  auth: any,
  exec(host: DevToolPlanHost, action: any): any
};

type Transport =
  & TransportBase
  & (
    | (TransportLocalBase & LocalShellTransport)
    | (TransportRemoteBase & SSHTransport));

type DevToolAction = string;

type DevTool = {
  getPlans(): Promise<Array<DevToolPlan>>,
  getPlanConfigSchema(): DevToolPlanConfigSchema,
  exec(plan: DevToolPlan, action: DevToolAction): Promise<DevToolTask>
};
