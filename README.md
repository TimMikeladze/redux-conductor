# Redux Conductor
`npm install --save redux-conductor`

Automatically conduct event traffic through Redux by reacting to actions.

### Quick overview

- **`createConductor`** creates an object called a `Conductor` that wraps around a Redux store.
- **`createRoute`** creates a route, which is a "generator function" of the store's current state. Routes get added to a
conductor. Each route "listens" for changes in state that resulted from a certain kind of action. When it matches, the
route is called with a "yield" function and the resulting state. The route may then call "yield" repeatedly with a series
of values, which are usually actions. A route can call "yield" once... never... multiple times... after a Promise
resolves or rejects... or in any fashion. *This is the power of the route*.
- Add a route to a conductor with `Conductor.route( ... ).to( ... )`. The function passed to `to` will be passed to the
route as its "yield" function. Use `.toDispatch()` instead of `.to( ... )` to use `store.dispatch` as the route's
"yield" function. A route is a bit like an "automatic" Redux thunk.
- Call `Conductor.start()` to dispatch an action of type `START` to the conductor's store. Now you can add a route that
"listens" for a `START` action and dispatches something else.

### NOTE: Redux Conductor's special reducer and actions

Redux Conductor uses a special reducer to create its store. You do not write a reducer. The reducer begins with an
initial state of an empty [Immutable.js](https://facebook.github.io/immutable-js/) `Map`. Redux Conductor's reducer
expects a special type of action, which contains the following properties:
- `type` - A string that is the action's type.
- `path` (optional) - An array of keys that point to a value within state. This value itself is a `Map`.
- `props` (optional) - An object with key-value pairs that will be set on the value at `path`.

For every action, the reducer sets two keys on state, `type` and `path`, which are equal to the corresponding properties
of the action. If `action.path` is not present, then the reducer deletes `path` from state.

- If `action.type === 'REMOVE'`, then the reducer deletes the key at `action.path`.
- Otherwise, for any other `action.type`, the reducer first checks for the presence of `action.path`. If present, then...
  1) If `action.props` is present, the reducer assigns each key-value pair in `action.props`, onto the value at `action.path`.
  2) The reducer sets a key with the same name as the value at `action.type`, with a value equivalent to `Date.now()`,
  onto the value at `action.path`. These "last action" timestamps can be useful when implementing certain kinds of routes.

### API

### `createConductor([ mapReducerToStore ])`
- `mapReducerToStore` is an optional function that returns a Redux store based on a given reducer. Defaults to `createStore`.
- You might use `mapReducerToStore` if you want Conductor to create a store with middleware or some other customization.
- **Returns** a new instance of the `Conductor` class.
- (*Note:* All methods of `Conductor` are composable, meaning that they all return `this`.)

#### `Conductor.route(route)`
- `route` is a function called immediately after state changes, with a "yield" function and the current state.
`route` may asynchronously call the "yield" function, which is defined by the next call to `Conductor.to`.
- **Returns** `this`.

#### `Conductor.to(yield_function)`
- Defines the yield function passed to a `route`, which is defined by the previous call to `Conductor.route`.
- **Returns** `this`.

#### `Conductor.toDispatch()`
- Equivalent to `Conductor.to(this._store.dispatch)`. Routes to the `dispatch` method of the conductor's Redux store.
- **Returns** `this`.

#### `Conductor.start()`
- Dispatches an action of type `START` to the conductor's Redux store.
- **Returns** `this`.

### `createRoute(options)`
- `options.action` - An action-like object with optional `type` and `path` properties. If and only if the store's last
action matches these properties, then the route will execute when state changes.
- `options.route` - A function of a "yield" function and the current state.
- This function is syntactic sugar for creating a route with a guard condition based on the "last action".
- **Returns** a `function(Function, Immutable.Map)`.

### `combineRoutes(routes)`
- `routes` - An array or other iterable object (i.e. it must have a `forEach` property) of routes.
- **Returns** a single route that yields the results of each route in `routes`.

### `logger`
- A route that yields a single-line log of the last action, with a relative millisecond timestamp.

### `onRequest`
- A route that yields a `RESOLVE` or `REJECT` action after executing a Promise passed through the `promise` property of
a `REQUEST` action.

### Future features?

- Support for combining the default reducer with other reducers.