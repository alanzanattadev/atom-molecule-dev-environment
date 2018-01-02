Your first plan
===============

When starting Atom, your screen should look somewhat like this:

__INSERT "MOLECULE-START" SCREENSHOT HERE__

*Note: for the sake of this tutorial, we are browsing [the atom repository](https://github.com/atom/atom/)*

At the bottom of the screen, we can see the plugin bar (the round icons), and
the plan bar. Molecule is shipped with
[a bunch of default plugins](./default-plugins.md), and you can add third-party
plugins through `apm`.

__TODO - Add third-party Molecule plugin as an example__

Since you just installed Molecule, the plan bar should display "No plan has been
created yet".

TODO - Strategy

Create a plan
-------------

When you click on the name under one of the plugin icons, a panel titled "Plan
configuration" should open on your right.

This panel displays a list of settings specific to each plugin. You can tweak
the settings' values, then click "Create" to add a plan.

For this tutorial, we will create an eslint plan:

- Hover on the Jest icon, then click on the "Jest" text that appears under,
- Set name to "jest_0",
- Set Configuration to "npm/babel-jest_vx.x.x.js",
- Check "only modified files",
- Click the "Create" button.

__INSERT "CREATE-JEST-PLAN" GIF HERE__

A new plan named "jest_0" should have appeared at the bottom of your window. You
can click on this plan, which will run `jest` and start giving you diagnostics.

### Package system

The plugin bar doesn't display every Molecule plugin. Instead, Molecule adapts
to the current project by only display tools the project actually uses.

Molecule decides which tools the project uses by browsing for files that we call
"packages". For instance, if the project directory has an `.eslintrc` file, then Molecule considers that the project uses the Eslint tool, and displays the
Eslint plugin in the plugin bar.

Which files count as a package varies from plugin to plugin. Most Node.js
plugins consider `package.json` to be a package file.

__INSERT "PACKAGE-SETTING-CLOSEUP" SCREENSHOT HERE__

When creating a new plan, one of the configuration settings for all plugins is
"package". If the project includes several package files for the current plugin
(for instance, if the project has several folders with `package.json` files
when creating a Jest plan), then the "package" setting allows you to choose
which package the plan will use.

### Stager

The stager setting allows you to pick a stager for your plan. The stager allows
you to decide how the plan will be executed: locally, or on a distant machine.

__INSERT "STAGER-SETTING-CLOSEUP" SCREENSHOT HERE__

Most of the time, leaving the default value is fine; you only need to execute
your plan locally.
