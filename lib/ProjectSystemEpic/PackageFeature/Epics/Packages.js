"use babel";
// @flow

import { Observable, of, timer } from "rxjs";
import { buffer, concat, filter, groupBy, map, mergeAll } from "rxjs/operators";
import { packagesRefreshed } from "../Actions/PackagesRefreshed";
import { packageRefreshCompleted } from "../Actions/PackageRefreshCompleted";
import type { Package } from "../Types/types";

type packageFinder = (
  rootPath: string,
  plugins: Array<Plugin>,
) => Observable<Array<Package>>;

const packagesEpic = (findPackages: packageFinder) => (action$: Observable) => {
  return action$.ofType("REFRESH_PACKAGES").pipe(
    groupBy(a => a.payload.rootPath, null, () => timer(300)),
    map(g => g.pipe(buffer(timer(300)))),
    mergeAll(),
    filter(actions => actions && actions.length > 0),
    map(actions => {
      const rootPath = actions[0].payload.rootPath;
      const plugins = actions.reduce((acc, curr) => {
        acc.push(
          ...curr.payload.plugins.filter(
            item => !acc.find(test => test.tool.id === item.tool.id),
          ),
        );
        return acc;
      }, []);

      return findPackages(rootPath, plugins).pipe(
        map(packages => packagesRefreshed(rootPath, packages, plugins)),
        concat(of(packageRefreshCompleted(rootPath, actions.length))),
      );
    }),
    mergeAll(),
  );
};

export default packagesEpic;
