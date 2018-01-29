# taskAPI

The taskAPI provides methods allowing to interact with the diagnostics messages, and the activity of the used tools.

## Diagnostics

The diagnostic field has three methods allowing to set the environment for the diagnostics.

### Methods

* **setForPath(PublishDiagnostics: PublishDiagnosticsParams)** return a void, assigns diagnostics to a given path.
* **setForWorkspace(PublishDiagnostics: PublishDiagnosticsParams)** return a void, sets the path of a project.
* **clearAll()** return a void, clear the diagnostic configuration.

## BusyState

The busyState field allows to notify if a tool is running or not.

There is two modes, the busy and waiting mode.

### Methods

* **switchToBusyMode()** return a void, notify that the tool is working.
* **switchToWaitingMode()** return a void, notify that the tool stops its activity.

## Cache

In the cache are pushed tool's output strings.

Cache's data can be retrieved with get() and formated before being displayed.

### Methods

```js
export type CacheBlob = { data: any, time: number, };
```

* **get()** return a list of CacheBlob which contains the data.
* **push(data: any)** return a void, this method take a data and add it in the cache list returned by the get() method.
