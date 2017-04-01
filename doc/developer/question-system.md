```js
        let ask = () => {
          generateQuestionAPI()
            .ask([
              {
                type: "confirm",
              },
              {
                type: "checkbox",
                name: "test",
                message: "What test runner do you want ?",
                choices: ["Jest", "Karma", "TestCafé"],
              },
              {
                type: "input",
                name: "name",
                message: "What's your name ?",
                default: "",
                when: () => {
                  return Rx.Observable.of(true).delay(1000);
                },
                loader: () => {
                  return Rx.Observable.of("Alan").delay(1000);
                },
                validator: () => {
                  return Rx.Observable.of(true).delay(1000);
                },
              },
              {
                type: "confirm",
                name: "admin",
                message: "Do you want to exec as admin",
                default: false,
                when: answers => {
                  return Rx.Observable.of(answers.name === "Alan").delay(1000);
                },
                loader: () => {
                  return Rx.Observable.of({}).delay(1000);
                },
                validator: () => {
                  return Rx.Observable.of(true).delay(1000);
                },
              },
              {
                type: "input",
                name: "name",
                message: "What's your name ?",
                default: "",
                when: () => {
                  return false;
                },
                loader: () => {
                  return Rx.Observable.of("Alan").delay(1000);
                },
                validator: () => {
                  return Rx.Observable.of(true).delay(1000);
                },
              },
              {
                type: "list",
                choices: (answers, loaded) =>
                  ["dev", "staging", "preprod", "production"].concat(
                    loaded || [],
                  ),
                name: "NODE_ENV",
                message: "Choose an env",
                default: "preprod",
                when: () => {
                  return Rx.Observable.of(true).delay(1000);
                },
                loader: () => {
                  return Rx.Observable.of(["backup A", "backup B"]).delay(1000);
                },
                validator: answers => {
                  if (answers.NODE_ENV === "backup A")
                    return Rx.Observable.of(false).delay(1000);
                  else
                    return Rx.Observable.of(true).delay(1000);
                },
              },
              {
                type: "confirm",
                name: "step",
              },
              {
                type: "checkbox",
                name: "test",
                message: "What test runner do you want ?",
                choices: ["Jest", "Karma", "TestCafé"],
              },
              {
                type: "checkbox",
                name: "roles",
                message: "What roles do you endorse ?",
                choices: (answers, loaded) =>
                  [
                    { value: "front", description: "Front end developer" },
                    { value: "back", description: "Back end developer" },
                    { value: "devops", description: "DevOps developer" },
                  ].concat(answers.admin ? ["admin"] : []),
                default: (answers, loaded) => ({
                  devops: true,
                  admin: answers.admin,
                }),
              },
              {
                type: "confirm",
                name: "finished",
              },
            ])
            .then(answers => {
              console.log("ANSWERS:", answers);
            })
            .catch(err => {
              console.log("ERROR:", err);
            });
        }

```