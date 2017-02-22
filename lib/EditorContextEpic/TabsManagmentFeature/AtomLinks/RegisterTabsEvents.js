"use babel";
// @flow
import { getAssociatedFiles } from "../Model/AssociatedFiles";
import { File } from "atom";

export function observeTabs() {
  atom.workspace.onDidAddPaneItem(({ item, pane }) => {
    getAssociatedFiles(item.getPath())
      .filter(filePath => new File(filePath).existsSync())
      .forEach(filePath => {
        process.nextTick(function() {
          atom.workspace.open(filePath, {
            split: "right",
            searchAllPanes: true
          });
        });
      });
  });

  atom.workspace.onDidDestroyPaneItem(({ item, pane }) => {
    let associatedFiles = getAssociatedFiles(item.getPath());
    atom.workspace
      .getPaneItems()
      .filter(paneItem => paneItem.getPath() != item.getPath())
      .forEach(paneItem => {
        if (associatedFiles.includes(paneItem.getPath()))
          atom.workspace.paneForItem(paneItem).destroyItem(paneItem);
      });
  });
}
