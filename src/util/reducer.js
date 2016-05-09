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
      case 'REMOVE': {
        return state
          .deleteIn(action.path)
          .set('type', action.type)
          .set('path', action.path);
      }

      default: {
        if ('path' in action) {
          return state
            .updateIn(action.path, data => (data || Immutable.Map()).concat(action.props || {}))
            .set('type', action.type)
            .set('path', action.path);
        }
        else {
          return state
            .set('type', action.type);
        }
      }
    }
  };
export default reducer;