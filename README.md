# molecule-dev-environment package

A short description of your package.

![A screenshot of your package](https://f.cloud.github.com/assets/69169/2290250/c35d867a-a017-11e3-86be-cd7c5bf3ff9b.gif)

## Execution

plans: (configuration of an execution, tool config and host in params)

tasks: (execution with plan as parameters)

handler:
  - local (waits for infos, communicates data over process)

stagers: (responsible of executing strategy and fetching back data to Atom)
  - remote ssh (launch a local handler which connects to a remote machine and execute the stager that executes the strategy)
  - remote docker (launch a container on a remote host)
  - local (launch a local process and execute strategy in it)
  - integrated (execute strategy in atom)

strategy: (Payload of execution, determined by plugin)
  - shell (command in params)
  - node script (path in params)
  - http (request infos in params)

controller: (Binding between strategies and stagers)

filters:
  - project (group of apps)
  - package (app)
  - working set (feature)
