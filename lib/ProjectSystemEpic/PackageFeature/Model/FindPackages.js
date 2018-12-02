"use babel";
// @flow

import type {
  Directory as PackageDirectory,
  Package,
  Plugin,
} from "../Types/types";
import os from "os";
import path from "path";
import Rx from "rxjs";
import type { PackageTesterResult } from "../Types/types";

export async function isPackageOfPlugin(
  packagePath: string,
  plugin: Plugin,
  directory: PackageDirectory,
): Promise<PackageTesterResult> {
  if (typeof plugin.isPackage === "string") {
    return plugin.isPackage === path.basename(packagePath);
  } else if (plugin.isPackage instanceof RegExp) {
    return packagePath.match(plugin.isPackage) != null;
  } else if (typeof plugin.isPackage === "function") {
    return await plugin.isPackage(packagePath, directory);
  } else {
    throw new TypeError("isPackage must be a string, a regexp or a function");
  }
}

function getUriPlatform() {
  return os.platform == "win32" ? "windows" : "posix";
}

export function getPackageOfPlugin(
  packagePath: string,
  plugin: Plugin,
  isFile: boolean,
): Package {
  return {
    name: path.basename(path.dirname(packagePath)),
    path: packagePath,
    plugin: plugin,
    type: isFile ? "file" : "directory",
    uriPlatform: getUriPlatform(),
  };
}

function getPackagesOfEntry(
  plugin: Plugin,
  entry: atom$File | atom$Directory,
  entries: Array<atom$File | atom$Directory>,
): PackageFactory {
  return Rx.Observable.defer(() => {
    let entryPath = entry.getPath();
    let isPackage = isPackageOfPlugin(entryPath, plugin, {
      name: entryPath,
      files: entries.map(e => e.getPath()),
    });
    return Rx.Observable.fromPromise(isPackage)
      .map(packageTesterResult => {
        if (typeof packageTesterResult === "object") {
          return Object.assign({}, packageTesterResult, {
            plugin: plugin,
            uriPlatform: getUriPlatform(),
          });
        } else if (packageTesterResult) {
          return getPackageOfPlugin(entryPath, plugin, entry.isFile());
        } else {
          return null;
        }
      })
      .filter(packageInfo => packageInfo != null);
  });
}

export function findPackages(
  fileOrDir: atom$File | atom$Directory,
  plugin: Plugin,
): Rx.Observable<PackageFactory> {
  if (
    fileOrDir.getBaseName() === "node_modules" ||
    fileOrDir.getBaseName() === ".git"
  )
    return Rx.Observable.empty();
  if (fileOrDir.isDirectory()) {
    const entriesObs = Rx.Observable.bindNodeCallback(
      fileOrDir.getEntries.bind(fileOrDir),
    )();

    return entriesObs
      .map((entries: ?Array<atom$File | atom$Directory>) =>
        Rx.Observable.concat(
          getPackagesOfEntry(plugin, fileOrDir, entries || []),
          Rx.Observable.from(entries || [])
            .map(entry => findPackages(entry, plugin))
            .mergeAll(),
        ),
      )
      .mergeAll();
  } else {
    return Rx.Observable.of(
      getPackagesOfEntry(plugin, fileOrDir, []).map((packageInfo: Package) => ({
        ...packageInfo,
        isFile: true,
      })),
    );
  }
}

export type PackageFactory = Rx.Observable<Package>;
