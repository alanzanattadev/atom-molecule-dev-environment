# Molecule IDE

At Molecule we think that you shouldn't have to adapt your workflow to your IDE but
the IDE to your methods, whether you're using cutting edge tooling or advanced
workflows, we provide you a flexible and easy to use tool that will become your
artboard.

Open Source is at the core of our thinking and we want to listen and help our
community to create the best and most modern development platform for your last
innovations.

**Visit our [website](http://www.molecule.sh) to know more about Molecule!**

**Warning:** Molecule is still in an early alpha stage. The current state is far from
what we want to achieve and it is still full of bug. We are working hard to correct
them as soon as possible and to add the features we are planning and you request.
So feel free to give us some [feedback](#feedback), we'll be very happy! ;)

**NOTE FOR WINDOWS USERS:** Molecule v0.2.0 is broken on Windows, please use v0.1.1 instead.

## Install

```bash
  git clone https://github.com/alanzanattadev/atom-molecule-dev-environment.git
  cd atom-molecule-dev-environment
  git checkout v0.2.0
  yarn (or npm install)
  apm link
```

Open atom and enjoy :)

## Update

```bash
  cd atom-molecule-dev-environment
  git checkout v(new version)
  rm -rf node_modules
  yarn (or npm install)
```

And reload atom !

## Contribute

### Feedback

We are open to any kind of feedback you could give us. From bug fixes to recommandations
and feature requests, we would love to hear what you think of Molecule.

You can send feedback on our [website](https://www.molecule.sh) or open a
[GitHub issue](https://github.com/alanzanattadev/molecule-landing/issues).
We love discussing with our users !

### Help to develop

In order to contribute to Molecule, you need to clone this repository and open
its directory. To link the development version of Molecule with atom,
run `apm link -d`. The `-d` option link it as a development package
(to be used in atom' development mode). Remove it to link the package with atom
directly.
