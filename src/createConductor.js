import { createStore } from 'redux';
import { createEvent } from 'event-flow';
import reducer from './util/reducer';

class Conductor {
  /**
   * Create a new Conductor.
   * @param {function(Function)} [mapReducerToStore] - Optional function that returns a store based on a reducer.
   */
  constructor(mapReducerToStore = createStore) {
    this._store = mapReducerToStore(reducer);
    this._event = createEvent(this._store.subscribe).pass(this._store.getState);
  }

  /**
   * When state changes, call the given function with a "yield" function and the current state.
   * @param {function(Function, Immutable.Map)} route
   * @return {Conductor}
   */
  route(route) {
    this._event.pipe(route);
    return this;
  }

  /**
   * Dispatch a START action to the store.
   * @returns {Conductor}
   */
  start() {
    this._store.dispatch({ type: 'START' });
    return this;
  }

  /**
   * When the last defined route function is called, pass the given function as the "yield" function.
   * @param {function} destination - A "yield" function to be passed into a route.
   * @return {Conductor}
   */
  to(destination) {
    this._event.to(destination);
    return this;
  }

  /**
   * Equivalent to this.to(this._store.dispatch)
   * @returns {Conductor}
   */
  toDispatch() {
    return this.to(this._store.dispatch);
  }
}

/**
 * Create a new Conductor.
 * @param {function(Function)} [mapReducerToStore] - Optional function that returns a store based on a reducer.
 * @return {Conductor}
 */
const createConductor =
  (mapReducerToStore = createStore) => {
    return new Conductor(mapReducerToStore);
  };
export default createConductor;