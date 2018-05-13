"use babel";
// @flow

import Rx from "rxjs";
import { packagesRefreshed } from "../Actions/PackagesRefreshed";
import { packageRefreshCompleted } from "../Actions/PackageRefreshCompleted";
import type { Package } from "../Types/types";

type packageFinder = (
  rootPath: string,
  plugins: Array<Plugin>,
) => Rx.Observable<Array<Package>>;

const packagesEpic = (findPackages: packageFinder) => (action$: Observable) => {
  return action$
    .ofType("REFRESH_PACKAGES")
    .groupBy(a => a.payload.rootPath, null, () => Rx.Observable.timer(300))
    .map(g => g.buffer(Rx.Observable.timer(300)))
    .mergeAll()
    .filter(actions => actions && actions.length > 0)
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

      return findPackages(rootPath, plugins)
        .map(packages => packagesRefreshed(rootPath, packages, plugins))
        .concat(
          Rx.Observable.of(packageRefreshCompleted(rootPath, actions.length)),
        );
    })
    .mergeAll();
};

export default packagesEpic;
