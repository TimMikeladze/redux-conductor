/**
 * Create a router that routes the results of other routers.
 * @param {function(Function, Immutable.Map)[]} routes
 * @returns {function(Function, Immutable.Map)}
 */
const combineRoutes =
  (routes = []) => {
    if (!('forEach' in routes)) {
      throw new TypeError('[redux-conductor] combineRoutes must be called with an iterable argument');
    }
    return (push, state) => routes.forEach(
      route => route(push, state)
    );
  };
export default combineRoutes;