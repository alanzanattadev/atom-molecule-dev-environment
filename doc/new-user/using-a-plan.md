Using a plan
============

In the previous chapter, we have created a plan named "jest_0". You can run this
plan by clicking on the corresponding button, which will run `jest` and output
its diagnostics.

__INSERT "RUN-JEST-PLAN" GIF HERE__

Diagnostics panel
-----------------

All Molecule plugins have the same workflow:

* They analyse your project's files.
* They output a stream of plugin-dependent messages.

These messages are called **Diagnostics**, and can be accessed in the
**Diagnostics Panel**.

__INSERT "DIAGNOSTICS-PANEL-CLOSEUP" SCREENSHOT HERE__

You can open the diagnostics panel of a given tool by clicking on the tool's
icon. For instance, you can open the diagnostics for your Jest plan by clicking
on the Jest icon.

Once you execute the Jest plan (by clicking on the "jest_0" button), the
diagnostics panel will start to fill. There are several types of diagnostics:

- Errors
- Warnings
- Informations
- Hints
- Successes

__INSERT "CLICK-ON-DIAGNOSTIC" GIF HERE__

On most projects, the Jest plan should only display Success diagnostics.
Regardless, clicking on a diagnostic will lead you to the place in the code it
concerns. For instance, clicking on a failed unit test diagnostic will open
the relevant file, and place your cursor at the beginning for the failed unit
test. Clicking on a compile warning will place your cursor on the piece of code
your compiler is warning you about.

Terminal panel
--------------

Most Molecule plugins use a command-line tool. For instance, the Jest plugin is
based on the `jest` CLI.

While plugins try to parse the text these CLIs output into more readable
diagnostics, sometimes you may want to read the text output directly. You can
switch to the Terminal Panel by clicking on the "Terminal" icon at the
bottom-right for the Diagnostic panel.

__INSERT "SWITCH-TO-TERMINAL" GIF HERE__

Some plugins may ask you to enter text into the Terminal Panel (ex: a password).
However, in most cases, interacting with the Terminal is impossible.
