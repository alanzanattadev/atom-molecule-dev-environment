"use babel";
// @flow

import Packages from "./Packages";
import { packagesRefreshed } from "../Actions/PackagesRefreshed";
import { removePackages } from "../Actions/RemovePackages";
import { Map, List } from "immutable";

describe("Packages Reducer", () => {
  describe("PACKAGES_REFRESHED", () => {
    it("should add 2 packages on empty reducer", () => {
      let subject = Packages(
        Map(),
        packagesRefreshed(
          "/project/app1/",
          [
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
          ],
          [
            {
              tool: {
                name: "maven",
                iconUri: "atom://maven.svg",
                id: "2",
              },
              isPackage: "package.json",
            },
            {
              tool: {
                name: "npm",
                iconUri: "atom://npm.svg",
                id: "1",
              },
              isPackage: "package.json",
            },
          ],
        ),
      );

      expect(subject).toEqual(
        Map([
          [
            "1",
            List([
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
            ]),
          ],
          [
            "2",
            List([
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
          ],
        ]),
      );
    });
    it("should return state with removed paths in rootPath & plugin and new packages", () => {
      let subject = Packages(
        Map([
          [
            "1",
            List([
              {
                name: "",
                path: "/project/app1/pom.xml",
                plugin: {
                  tool: {
                    name: "npm",
                    iconUri: "atom://npm.svg",
                    id: "1",
                  },
                },
                type: "file",
              },
            ]),
          ],
          [
            "2",
            List([
              {
                name: "",
                path: "/project/app1/",
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
          ],
          [
            "3",
            List([
              {
                name: "",
                path: "/project/app2/",
                plugin: {
                  tool: {
                    name: "atom",
                    iconUri: "atom://",
                    id: "3",
                  },
                },
                type: "file",
              },
              {
                name: "",
                path: "/project/app2/package.json",
                plugin: {
                  tool: {
                    name: "atom",
                    iconUri: "atom://",
                    id: "3",
                  },
                },
                type: "file",
              },
              {
                name: "",
                path: "/project/app3/package.json",
                plugin: {
                  tool: {
                    name: "atom",
                    iconUri: "atom://",
                    id: "3",
                  },
                },
                type: "file",
              },
              {
                name: "",
                path: "/project/",
                plugin: {
                  tool: {
                    name: "atom",
                    iconUri: "atom://",
                    id: "3",
                  },
                },
                type: "file",
              },
            ]),
          ],
        ]),
        packagesRefreshed(
          "/project/app1/",
          [
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
          ],
          [
            {
              tool: {
                name: "maven",
                iconUri: "atom://maven.svg",
                id: "2",
              },
              isPackage: "package.json",
            },
            {
              tool: {
                name: "npm",
                iconUri: "atom://npm.svg",
                id: "1",
              },
              isPackage: "package.json",
            },
          ],
        ),
      );

      expect(subject.get("1").size).toBe(1);
      expect(subject.get("2").size).toBe(1);
      expect(subject.get("3").size).toBe(4);
      expect(subject.get("1").get(0).path).toBe(
        "/project/app1/website/package.json",
      );
      expect(subject.get("2").get(0).path).toBe(
        "/project/app1/abandonware/pom.xml",
      );
      expect(subject.get("3").get(0).path).toBe("/project/app2/");
      expect(subject.get("3").get(1).path).toBe("/project/app2/package.json");
      expect(subject.get("3").get(2).path).toBe("/project/app3/package.json");
      expect(subject.get("3").get(2).type).toBe("file");
      expect(subject.get("3").get(3).path).toBe("/project/");
      expect(subject.get("3").get(3).type).toBe("file");
    });
  });

  describe("REMOVE_PACKAGES", () => {
    it("should delete the packages that share the same rootPath", () => {
      let subject = Packages(
        Map([
          [
            "1",
            List([
              {
                name: "",
                path: "/project/app1/pom.xml",
                plugin: {
                  tool: {
                    name: "npm",
                    iconUri: "atom://npm.svg",
                    id: "1",
                  },
                },
                type: "file",
              },
            ]),
          ],
          [
            "2",
            List([
              {
                name: "",
                path: "/project/app1/",
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
          ],
          [
            "3",
            List([
              {
                name: "",
                path: "/project2/app2/",
                plugin: {
                  tool: {
                    name: "atom",
                    iconUri: "atom://",
                    id: "3",
                  },
                },
                type: "file",
              },
              {
                name: "",
                path: "/project2/app2/package.json",
                plugin: {
                  tool: {
                    name: "atom",
                    iconUri: "atom://",
                    id: "3",
                  },
                },
                type: "file",
              },
              {
                name: "",
                path: "/project2/app3/package.json",
                plugin: {
                  tool: {
                    name: "atom",
                    iconUri: "atom://",
                    id: "3",
                  },
                },
                type: "file",
              },
              {
                name: "",
                path: "/project2/",
                plugin: {
                  tool: {
                    name: "atom",
                    iconUri: "atom://",
                    id: "3",
                  },
                },
                type: "file",
              },
            ]),
          ],
        ]),
        removePackages("/project/"),
      );

      expect(subject).toEqual(
        Map([
          [
            "3",
            List([
              {
                name: "",
                path: "/project2/app2/",
                plugin: {
                  tool: {
                    name: "atom",
                    iconUri: "atom://",
                    id: "3",
                  },
                },
                type: "file",
              },
              {
                name: "",
                path: "/project2/app2/package.json",
                plugin: {
                  tool: {
                    name: "atom",
                    iconUri: "atom://",
                    id: "3",
                  },
                },
                type: "file",
              },
              {
                name: "",
                path: "/project2/app3/package.json",
                plugin: {
                  tool: {
                    name: "atom",
                    iconUri: "atom://",
                    id: "3",
                  },
                },
                type: "file",
              },
              {
                name: "",
                path: "/project2/",
                plugin: {
                  tool: {
                    name: "atom",
                    iconUri: "atom://",
                    id: "3",
                  },
                },
                type: "file",
              },
            ]),
          ],
        ]),
      );
    });
  });
});
