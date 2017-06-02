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
    name: path.basename(path.dirname(packagePath)) +
      "/" +
      path.basename(packagePath),
    path: packagePath,
    plugin: plugin,
    type: isFile ? "file" : "directory",
  };
}

function getPackagesOfEntry(
  plugins: Array<Plugin>,
  entry,
  entries: Array<atom$File | atom$Directory>,
) {
  return plugins.map(plugin => {
    let entryPath = entry.getPath();
    let isPackage = isPackageOfPlugin(entryPath, plugin, {
      name: entryPath,
      files: entries.map(e => e.getPath()),
    });
    if (typeof isPackage === "boolean") {
      if (isPackage) {
        return getPackageOfPlugin(entryPath, plugin, entry.isFile());
      } else {
        return false;
      }
    } else {
      return Object.assign({}, isPackage, { plugin: plugin });
    }
  });
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
      if (entries === undefined || entries === null)
        return Rx.Observable.empty();
      else
        return entries
          .map(entry =>
            Rx.Observable
              .from(
                getPackagesOfEntry(plugins, entry, entries || []).filter(
                  v => v !== false,
                ),
              )
              .concat(
                entry.isDirectory()
                  ? findPackages(entry.getPath(), plugins)
                  : Rx.Observable.empty(),
              )
              .reduce((acc, v) => acc.concat(v), []),
          )
          .reduce((acc, v) => acc.merge(v), Rx.Observable.empty());
    })
    .mergeAll()
    .reduce((acc, v) => acc.concat(v), List())
    .map(v => v.toArray());
}
