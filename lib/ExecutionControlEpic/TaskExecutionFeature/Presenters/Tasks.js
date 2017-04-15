"use babel";
// @flow

import React from "react";
import Task from "./Task";

export default class Tasks extends React.Component<DefaultProps, Props, State> {
  state: State;
  props: Props;
  static defaultProps: DefaultProps;

  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <div style={{ overflow: "auto", flex: "1", display: "inline-flex" }}>
        <ul style={{ padding: "0px" }}>
          {this.props.tasks
            .slice(0, this.props.limited ? 5 : undefined)
            .map(task => (
              <li
                style={{
                  listStyle: "none",
                  opacity: task.selected ? "1" : "0.5",
                }}
                key={task.id}
              >
                <Task {...task} onClick={() => this.props.onTaskClick(task)} />
              </li>
            ))}
        </ul>
      </div>
    );
  }
}

Tasks.defaultProps = {
  limited: false,
};

type DefaultProps = {
  limited: boolean,
};

type Props = {
  limited: boolean,
  onTaskClick(task: Task): void,
  tasks: Array<Task & { selected: boolean }>,
};

type State = {};
