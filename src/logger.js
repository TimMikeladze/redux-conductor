const start = Date.now();
const padding = '             ';

/**
 * A route that yields a log about the last action, with a relative timestamp.
 * @param {function} push
 * @param {Immutable.Map} state
 */
const logger =
  (push, state) => {
    const date = Date.now() - start;
    const paddedDate = `${padding}+${date} ms`.substring(date.length);
    const type = state.get('type');
    const paddedType = `${padding}${type}`.substring(Math.min(padding.length, type.length));
    push(`[${paddedDate}] ${paddedType} ${state.get('path')}`);
  };
export default logger;