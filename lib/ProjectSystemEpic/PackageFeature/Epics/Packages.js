"use babel";
// @flow

import Rx from "rxjs";
import { packagesRefreshed } from "../Actions/PackagesRefreshed";

const packagesEpic = findPackages => action$ => {
  return action$
    .ofType("REFRESH_PACKAGES")
    .groupBy(a => a.payload.rootPath, null, () => Rx.Observable.timer(3000))
    .map(g => g.buffer(Rx.Observable.timer(3000)))
    .mergeAll()
    .filter(test => test && test.length > 0)
    .map(actions => {
      const rootPath = actions[0].payload.rootPath;
      const plugins = actions.reduce((acc, curr) => {
        acc.push(
          ...curr.payload.plugins.filter(
            item => !acc.find(test => test.tool.id === item.tool.id),
          ),
        );
        return acc;
      }, []);
      return findPackages(rootPath, plugins).map(packages =>
        packagesRefreshed(rootPath, packages, plugins),
      );
    })
    .mergeAll();
};

export default packagesEpic;
