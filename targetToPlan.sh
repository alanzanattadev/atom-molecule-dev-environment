#!/bin/bash

find ./lib -name '*Target*' -exec bash -c 'git mv "{}" $(echo "{}" | sed "s/Target/Plan/")' \;
find ./.storybook -name '*target*' -exec bash -c 'git mv "{}" $(echo "{}" | sed "s/target/plan/")' \;
