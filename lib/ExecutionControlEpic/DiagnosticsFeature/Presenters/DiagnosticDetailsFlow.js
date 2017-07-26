"use babel";
// @flow

import React from "react";
import type { Diagnostic } from "../Types/types.js.flow";
import DiagnosticDetails from "./DiagnosticDetails";
import { List } from "immutable";
import { WindowScroller, List as ListVirtualized } from "react-virtualized";

export default class DiagnosticDetailsFlow
  extends React.Component<DefaultProps, Props, State> {
  state: State;
  props: Props;
  static defaultProps: DefaultProps;

  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <WindowScroller>
        {({ height, isScrolling, onChildScroll, scrollTop }) => (
          <ListVirtualized
            autoHeight
            height={height}
            isScrolling={isScrolling}
            scrollTop={scrollTop}
            onScroll={onChildScroll}
            rowCount={this.props.diagnostics.size}
            rowHeight={100}
            width={600}
            scrollToIndex={this.props.diagnostics.size - 1}
            rowRenderer={({ key, index, isScrolling, isVisible, style }) => (
              <div key={key}>
                <DiagnosticDetails
                  message={this.props.diagnostics.get(index).message}
                  view={this.props.diagnostics.get(index).view}
                />
              </div>
            )}
          />
        )}
      </WindowScroller>
    );
  }
}

DiagnosticDetailsFlow.defaultProps = {};

type DefaultProps = {};

type Props = {
  diagnostics: Array<Diagnostic> | List<Diagnostic>,
};

type State = {};
