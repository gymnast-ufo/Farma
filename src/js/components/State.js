export default class State {
  constructor(initialState) {
    this._state = initialState || Object.create(null);
  }

  setState(data) {
    this._state = {
      ...this._state,
      ...data,
    };
  }

  getState() { return this._state; }
}