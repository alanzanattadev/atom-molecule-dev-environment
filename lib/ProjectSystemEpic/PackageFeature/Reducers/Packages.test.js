"use babel";
// @flow

import Packages from "./Packages";
import {packagesRefreshed} from "../Actions/PackagesRefreshed";

describe("Packages Reducer", () => {
  describe("PACKAGES_REFRESHED", () => {
    it(
      "should return state with removed paths in rootPath and new packages",
      () => {
        let subject = Packages(
          [
            {
              name: "",
              path: "/project/app1/",
              plugin: {
                tool: {
                  name: "",
                  iconUri: "atom://",
                  id: "",
                },
              },
              type: "file",
            },
            {
              name: "",
              path: "/project/app1/pom.xml",
              plugin: {
                tool: {
                  name: "",
                  iconUri: "atom://",
                  id: "",
                },
              },
              type: "file",
            },
            {
              name: "",
              path: "/project/app2/",
              plugin: {
                tool: {
                  name: "",
                  iconUri: "atom://",
                  id: "",
                },
              },
              type: "file",
            },
            {
              name: "",
              path: "/project/app2/package.json",
              plugin: {
                tool: {
                  name: "",
                  iconUri: "atom://",
                  id: "",
                },
              },
              type: "file",
            },
            {
              name: "",
              path: "/project/app3/package.json",
              plugin: {
                tool: {
                  name: "",
                  iconUri: "atom://",
                  id: "",
                },
              },
              type: "file",
            },
            {
              name: "",
              path: "/project/",
              plugin: {
                tool: {
                  name: "",
                  iconUri: "atom://",
                  id: "",
                },
              },
              type: "file",
            },
          ],
          packagesRefreshed("/project/app1/", [
            {
              name: "website",
              path: "/project/app1/website/package.json",
              plugin: {
                tool: {
                  name: "npm",
                  iconUri: "atom://npm.svg",
                  id: "1",
                },
              },
              type: "file",
            },
            {
              name: "app",
              path: "/project/app1/abandonware/pom.xml",
              plugin: {
                tool: {
                  name: "maven",
                  iconUri: "atom://maven.svg",
                  id: "2",
                },
              },
              type: "file",
            },
          ]),
        );

        expect(subject.length).toBe(6);
        expect(subject[0].path).toBe("/project/app2/");
        expect(subject[1].path).toBe("/project/app2/package.json");
        expect(subject[2].path).toBe("/project/app3/package.json");
        expect(subject[3].path).toBe("/project/");
        expect(subject[4].path).toBe("/project/app1/website/package.json");
        expect(subject[4].type).toBe("file");
        expect(subject[5].path).toBe("/project/app1/abandonware/pom.xml");
        expect(subject[5].type).toBe("file");
      },
    );
  });
});
