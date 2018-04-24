"use babel";
// @flow

import * as React from "react";
import styled from "styled-components";

const Box = styled.div`
  display: flex;
  flex: 0 0 auto;
  fontsize: 15px;
  flex-direction: column;
`;

export default class DiagnosticDetails extends React.Component<Props, State> {
  state: State;
  props: Props;
  static defaultProps: DefaultProps;

  constructor(props: Props) {
    super(props);
  }

  render() {
    if (
      typeof this.props.diagnostic.message == "object" &&
      this.props.diagnostic.message.html
    ) {
      return (
        <Box
          dangerouslySetInnerHTML={{
            __html: this.props.diagnostic.message.text,
          }}
        />
      );
    } else if (
      typeof this.props.diagnostic.message == "object" &&
      this.props.diagnostic.message.data
    ) {
      return (
        <Box>{JSON.stringify(this.props.diagnostic.message.data, null, 2)}</Box>
      );
    } else if (typeof this.props.diagnostic.message == "object") {
      return <Box>{this.props.diagnostic.message.text}</Box>;
    } else if (
      typeof this.props.diagnostic.message == "string" &&
      this.props.view !== undefined
    ) {
      const Comp = this.props.view;
      return <Comp {...this.props.diagnostic} />;
    } else if (typeof this.props.diagnostic.message == "string") {
      return <Box>{this.props.diagnostic.message}</Box>;
    } else {
      return null;
    }
  }
}

DiagnosticDetails.defaultProps = {};

type DefaultProps = {};

type Props = {
  view?: React.ComponentType<any>,
  diagnostic: any,
};

type State = {};
