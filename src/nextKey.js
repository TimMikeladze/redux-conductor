import Immutable from 'immutable';

/**
 * Return the maximum key in the given Map (or zero), plus one.
 * @param {Immutable.Map} map - defaults to a new Immutable Map
 * @returns number
 */
const nextKey = (map = Immutable.Map()) => {
  return (map.keySeq().max() || 0) + 1;
};
export default nextKey;