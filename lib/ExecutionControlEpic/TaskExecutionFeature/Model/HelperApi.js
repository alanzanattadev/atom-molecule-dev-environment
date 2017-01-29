'use babel'
// @flow

import ansiToHtml from 'ansi-to-html';

export default {
  outputToHTML(output: string): string {
    let Convert = new ansiToHtml();
    return Convert.toHtml(output.replace(/(?:\r\n|\r|\n)/g, '<br/>').replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;').replace(/\ /g, '&nbsp;'));
  }
}
