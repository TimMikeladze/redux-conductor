import Immutable from 'immutable';

/**
 * (state, action) => state
 * @param {Immutable.Map} state
 * @param {{type: string, path: Array|undefined, props: Object|undefined}} action
 * @returns {Immutable.Map}
 */
const reducer =
  (state = Immutable.Map(), action) => {
    switch (action.type) {

      case 'REMOVE':
        return state
          .deleteIn(action.path)
          .set('path', action.path)
          .set('type', action.type);

      default:
        return ('path' in action)
          ? state
              .updateIn(action.path,
                props => (props || Immutable.Map()).concat(action.props || {})
              )
              .set('path', action.path)
              .set('type', action.type)
          : state
              .set('type', action.type);
    }
  };
export default reducer;