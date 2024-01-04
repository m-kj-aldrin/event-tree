/**
 * @typedef {Object} TreeEventInit
 * @property {boolean} [bubbles]
 * @property {boolean} [cancelable]
 * @property {boolean} [composed]
 * @property {any} [detail]
 */

export default class TreeEvent extends Event {
  #stopped = false;

  /**
   * @param {string} type
   * @param {TreeEventInit} init
   */
  constructor(type, init) {
    super(type, init);
  }

  get isStopped() {
    return this.#stopped;
  }

  stopPropagation() {
    this.#stopped = true;
  }
}
