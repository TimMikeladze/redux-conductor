/**
 * Create a route that yields actions when the state's last action matches a given action-like object.
 * @param {{type: string, path: Array|undefined}} [action] - An action-like object to match against
 * @param {function(Function, Immutable.Map)} route - A function of a "push" function and state
 * @returns {function(Function, Immutable.Map)}
 */
const createRoute =
  ({ action = {}, route }) => {
    if (typeof route !== 'function') {
      throw new TypeError('[redux-conductor] route must be a function');
    }
    return (push, state) => {
      const matchesType = action.type === undefined || action.type === state.get('type');
      const matchesPath = action.path === undefined || action.path === state.get('path');
      if (matchesType && matchesPath) {
        route(push, state);
      }
    };
  };
export default createRoute;