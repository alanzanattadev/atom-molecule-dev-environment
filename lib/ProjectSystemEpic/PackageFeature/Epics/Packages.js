"use babel";
// @flow

import Rx from "rxjs";
import atom from "atom";
import { packagesRefreshed } from "../Actions/PackagesRefreshed";
import { packageRefreshCompleted } from "../Actions/PackageRefreshCompleted";
import type { Package } from "../Types/types";
import type { PackageFactory } from "../Model/FindPackages";
import fs from "fs";

type packageFinder = (
  fileOrDir: atom$File | atom$Directory,
  plugins: Array<Plugin>,
) => Rx.Observable<PackageFactory>;

const packagesEpic = (findPackages: packageFinder) => (action$: Observable) => {
  return action$
    .ofType("REFRESH_PACKAGES")
    .groupBy(a => a.payload.rootPath, null, () => Rx.Observable.timer(300))
    .map(g => g.toArray())
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

      // TODO - async API
      const fileOrDir = fs.lstatSync(rootPath).isDirectory
        ? new atom.Directory(rootPath)
        : new atom.File(rootPath);

      return Rx.Observable.from(plugins)
        .map(plugin =>
          findPackages(fileOrDir, plugin)
            .mergeAll(1)
            .bufferTime(300)
            .filter(packageInfos => packageInfos.length > 0)
            .map(packageInfos =>
              packagesRefreshed(rootPath, packageInfos, [packageInfos[0].plugin]),
            )
        )
        .mergeAll(5)
        .concat(
          Rx.Observable.of(
            packageRefreshCompleted(rootPath, actions.length),
          ),
        );
    })
    .mergeAll();
};

export default packagesEpic;
