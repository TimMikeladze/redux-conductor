/**
 * Return the maximum key in the given Map (or zero), plus one.
 * @param {Immutable.Map} map
 * @returns number
 */
const nextKey = (map) => {
  return (map.keySeq().max() || 0) + 1;
};
export default nextKey;