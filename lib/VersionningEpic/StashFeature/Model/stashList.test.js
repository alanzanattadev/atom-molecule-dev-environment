'use babel'
// @flow

import {getStashesFromStashListOutput} from "./stashList";

describe('stashList', () => {
  describe('getStashesFromStashListOutput', () => {
    it('should return stashes', () => {
      let subject = getStashesFromStashListOutput(`
        stash@{0}: WIP on master: 965c41b test
        stash@{1}: Not finished yet on dev: 924979a adds file
      `);

      expect(subject.length).toBe(2);
      expect(subject[0].branchName).toBe('master');
      expect(subject[0].commitId).toBe('965c41b');
      expect(subject[0].commitMessage).toBe('test');
      expect(subject[0].index).toBe(0);
      expect(subject[0].name).toBe('WIP');
      expect(subject[1].branchName).toBe('dev');
      expect(subject[1].commitId).toBe('924979a');
      expect(subject[1].commitMessage).toBe('adds file');
      expect(subject[1].index).toBe(1);
      expect(subject[1].name).toBe('Not finished yet');
    });
  });
});
