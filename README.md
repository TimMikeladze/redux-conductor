# Redux Conductor
`npm install --save redux-conductor`

Automatically conduct event traffic through Redux by using special thunks called **routes**.

### API

### `createConductor([ mapReducerToStore ])`
- `mapReducerToStore` is an optional function that returns a Redux store based on a given reducer. Defaults to `createStore`.
- You use `mapReducerToStore` if you want Conductor to create a store with middleware or some other customization.
- **Returns** a new instance of the `Conductor` class.
- (*Note:* All methods of `Conductor` are composable, meaning that they all return `this`.)

#### `Conductor.route(route)`
- `route` is a function called immediately after state changes, with a "yield" function and the current state. `route` may asynchronously call the "yield" function, which is defined by the next call to `Conductor.to`.
- **Returns** `this`.

#### `Conductor.to(yield_function)`
- Defines the yield function passed to a `route`, which is defined by the previous call to `Conductor.route`.
- **Returns** `this`.

#### `Conductor.toDispatch()`
- Equivalent to `Conductor.to(this._store.dispatch)`. Routes to the `dispatch` method of the conductor's Redux store.

### `createRoute(options)`
- `options.action` - An action-like object with optional `type` and `path` properties. If and only if the store's last action matches these properties, then the route will execute.
- `options.route` - A function of a "yield" function and the current state.
- This function is syntactic sugar for creating a route with an action-based guard condition.
- **Returns** a `function(Function, Immutable.Map)`.

### `combineRoutes(routes)`
- `routes` - An array or other iterable object (i.e. it must have a `forEach` property) of routes.
- **Returns** a single route that yields the result of each route in `routes`.