"use babel";
// @flow

import type {
  Directory as PackageDirectory,
  Package,
  Plugin,
} from "../Types/types.js.flow";
import { Directory } from "atom";
import { List } from "immutable";
import path from "path";
import Rx from "rxjs";

export function isPackageOfPlugin(
  packagePath: string,
  plugin: Plugin,
  directory: PackageDirectory,
): boolean | Package {
  if (
    (typeof plugin.isPackage === "string" &&
      plugin.isPackage === path.basename(packagePath)) ||
    (plugin.isPackage instanceof RegExp && packagePath.match(plugin.isPackage))
  ) {
    return true;
  } else if (typeof plugin.isPackage === "function") {
    return plugin.isPackage(packagePath, directory);
  } else {
    return false;
  }
}

export function getPackageOfPlugin(
  packagePath: string,
  plugin: Plugin,
  isFile: boolean,
): Package {
  return {
    name:
      path.basename(path.dirname(packagePath)) +
      "/" +
      path.basename(packagePath),
    path: packagePath,
    uriPlatform: path.sep === "\\" ? "windows" : "posix",
    plugin: plugin,
    type: isFile ? "file" : "directory",
  };
}

function getPackagesOfEntry(
  plugins: Array<Plugin>,
  entry,
  entries: Array<atom$File | atom$Directory>,
) {
  return Rx.Observable
    .from(plugins)
    .map(plugin =>
      Rx.Observable.defer(() => {
        let entryPath = entry.getPath();
        let isPackage = isPackageOfPlugin(entryPath, plugin, {
          name: entryPath,
          files: entries.map(e => e.getPath()),
        });
        if (!(isPackage instanceof Promise)) {
          isPackage = Promise.resolve(isPackage);
        }
        return Rx.Observable.fromPromise(isPackage).map(test => {
          if (typeof test === "boolean") {
            if (test) {
              return getPackageOfPlugin(entryPath, plugin, entry.isFile());
            } else {
              return false;
            }
          } else {
            return Object.assign({}, test, { plugin: plugin });
          }
        });
      }),
    )
    .mergeAll(5);
}

export function findPackages(
  rootPath: string,
  plugins: Array<Plugin>,
): Rx.Observable<Array<Package>> {
  if (
    path.basename(rootPath) === "node_modules" ||
    path.basename(rootPath) === ".git"
  )
    return Rx.Observable.of([]);
  const directory = new Directory(rootPath);
  const getEntries = Rx.Observable.bindNodeCallback(
    directory.getEntries.bind(directory),
  );
  const entriesObs = getEntries();

  return entriesObs
    .map(entries => {
      return Rx.Observable.defer(() => {
        if (entries === undefined || entries === null)
          return Rx.Observable.empty();
        else
          return Rx.Observable.concat(
            ...entries.map(entry =>
              Rx.Observable.defer(() =>
                getPackagesOfEntry(plugins, entry, entries || [])
                  .filter(v => v !== false)
                  .concat(
                    entry.isDirectory()
                      ? findPackages(entry.getPath(), plugins)
                      : Rx.Observable.empty(),
                  )
                  .reduce((acc, v) => acc.concat(v), [])
                  .delay(1),
              ),
            ),
          );
      });
    })
    .mergeAll(1)
    .reduce((acc, v) => acc.concat(v), List())
    .map(v => v.toArray());
}
