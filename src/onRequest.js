import createRoute from './createRoute';

/**
 * Yield a RESOLVE or REJECT action after a REQUEST action.
 * @type {function(Function, Immutable.Map)}
 */
const onRequest = createRoute({
  action: {
    type: 'REQUEST'
  },
  route: (push, state) => {
    const path = state.get('path');
    state.getIn(path.concat('promise')).then(
      props => push({ type: 'RESOLVE', path, props }),
      props => push({ type: 'REJECT', path, props })
    );
  }
});
export default onRequest;