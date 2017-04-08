"use babel";
// @flow

import React from "react";
import type {
  DiagnosticType,
} from "../../DiagnosticsFeature/Types/types.js.flow";
import type {
  DevToolWithDiagnostics as DevToolWithDiagnosticsType,
} from "../Types/types.js.flow";
import DevToolWithDiagnostics from "./DevToolWithDiagnostics";
import Rx from "rxjs/Rx";

export default class DevToolsWithDiagnostics
  extends React.Component<DefaultProps, Props, State> {
  state: State;
  props: Props;
  static defaultProps: DefaultProps;
  unsubscribeKeyObs: rxjs$Subscription;

  constructor(props: Props) {
    super(props);

    this.state = {
      showColor: false,
    };
  }

  componentDidMount() {
    const addEventListener = eventName => handler => {
      if (global.atom) {
        global.atom.workspace.observePanes(pane => {
          global.atom.views.getView(pane).addEventListener(eventName, handler);
        });
      } else {
        document.addEventListener(eventName, handler);
      }
    };

    const removeEventListener = eventName => handler => {
      if (global.atom) {
        global.atom.workspace.observePanes(pane => {
          global.atom.views
            .getView(pane)
            .removeEventListener(eventName, handler);
        });
      } else {
        document.removeEventListener(eventName, handler);
      }
    };

    this.unsubscribeKeyObs = Rx.Observable
      .combineLatest(
        Rx.Observable.merge(
          Rx.Observable
            .fromEventPattern(
              addEventListener("keyup"),
              removeEventListener("keyup"),
            )
            .filter(e => e.key == "Alt")
            .mapTo(false),
          Rx.Observable
            .fromEventPattern(
              addEventListener("keydown"),
              removeEventListener("keydown"),
            )
            .filter(e => e.key == "Alt")
            .mapTo(true),
        ),
        Rx.Observable.merge(
          Rx.Observable
            .fromEventPattern(
              addEventListener("keyup"),
              removeEventListener("keyup"),
            )
            .filter(e => e.key == "Shift")
            .mapTo(false),
          Rx.Observable
            .fromEventPattern(
              addEventListener("keydown"),
              removeEventListener("keydown"),
            )
            .filter(e => e.key == "Shift")
            .mapTo(true),
        ),
        (alt, shift) => alt && shift,
      )
      .subscribe(altShift => {
        if (altShift != this.state.showColor)
          this.setState({ showColor: altShift });
      });
  }

  componentWillUnmount() {
    this.unsubscribeKeyObs.unsubscribe();
  }

  render() {
    return (
      <ul
        style={{
          display: "flex",
          flex: "1",
          flexDirection: "row",
          paddingLeft: "0px",
          margin: "5px 0px",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          position: "relative",
        }}
      >
        {this.props.tools.map(tool => (
          <li
            key={tool.id + "-" + (tool.planColor || "")}
            style={{ listStyle: "none", margin: "0px" }}
          >
            <DevToolWithDiagnostics
              iconUri={tool.iconUri}
              name={tool.name}
              errors={tool.errors}
              warnings={tool.warnings}
              successes={tool.successes}
              infos={tool.infos}
              state={tool.state}
              index={tool.index}
              planColor={tool.planColor}
              legend={tool.legend}
              showColor={this.state.showColor || this.props.showColor}
              onLogsClick={() => this.props.onToolLogsClick(tool)}
              onDiagnosticClick={type =>
                this.props.onToolDiagnosticsClick(tool, type)}
              onSettingsClick={() => this.props.onToolSettingsClick(tool)}
            />
          </li>
        ))}
        {(this.state.showColor || this.props.showColor) &&
          <div
            className="dev-tool-bar-background-color"
            style={{
              borderRadius: "10px",
              boxShadow: "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)",
              minWidth: "100px",
              height: "75px",
              position: "absolute",
              top: "-100px",
              left: "10px",
              right: "10px",
              zIndex: "0",
            }}
          />}
      </ul>
    );
  }
}

DevToolsWithDiagnostics.defaultProps = {
  showColor: false,
};

type DefaultProps = {};

type Props = {
  tools: Array<DevToolWithDiagnosticsType>,
  showColor?: boolean,
  onToolDiagnosticsClick(
    devtool: DevToolWithDiagnosticsType,
    type: DiagnosticType,
  ): void,
  onToolLogsClick(devtool: DevToolWithDiagnosticsType): void,
  onToolSettingsClick(devtool: DevToolWithDiagnosticsType): void,
};

type State = {
  showColor: boolean,
};
