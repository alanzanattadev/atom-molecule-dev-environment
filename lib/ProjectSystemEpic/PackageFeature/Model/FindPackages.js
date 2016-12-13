'use babel'
// @flow

import type {Package, Plugin, Directory as PackageDirectory} from '../Types/types.js.flow';
import {Directory} from 'atom';
import {List, Map, fromJS} from 'immutable';
import path from 'path';

export function isPackageOfPlugin(packagePath: string, plugin: Plugin, directory: PackageDirectory): (boolean | Package) {
  if (
    (typeof plugin.isPackage == "string" && plugin.isPackage == path.basename(packagePath)) ||
    (plugin.isPackage instanceof RegExp && packagePath.match(plugin.isPackage))
  ) {
    return true;
  } else if (typeof plugin.isPackage == 'function') {
    return plugin.isPackage(packagePath, directory);
  } else {
    return false;
  }
}

export function getPackageOfPlugin(packagePath: string, plugin: Plugin, isFile: boolean): Package {
  return {
    name: packagePath,
    path: packagePath,
    plugin: plugin,
    type: isFile ? "file" : "directory",
  };
}

export function findPackages(rootPath: string, plugins: Array<Plugin>): Array<Package> {
  let directory = new Directory(rootPath);
  let entries = directory.getEntriesSync();

  let getPackageOfEntry = entry => (
    plugins.map(plugin => {
      let entryPath = entry.getPath();
      let isPackage = isPackageOfPlugin(entryPath, plugin, {name: entryPath, files: entries.map(e => e.getPath())});
      if (typeof isPackage == "boolean") {
        if (isPackage) {
          return getPackageOfPlugin(entryPath, plugin, entry.isFile());
        } else {
          return false;
        }
      } else {
        return isPackage;
      }
    })
  );

  return entries.map(entry => (
    entry.isDirectory() ? [...findPackages(entry.getPath(), plugins), getPackageOfEntry(entry)] : [getPackageOfEntry(entry)]
  )).reduce((red, value, i) => red.concat([].concat.apply([], value)), List()).filter(v => v !== false).toJS();
}
