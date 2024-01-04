import TreeEvent from "./event.js";

/**
 * @typedef {Object} TreeNodeInit
 * @property {string} [name]
 */

export default class TreeNode extends EventTarget {
  /**@type {TreeNode} */
  #parent = null;
  #name;

  /**@type {TreeNode[]} */
  #children = [];

  /**
   * @param {TreeNodeInit} o
   */
  constructor({ name } = {}) {
    super();
    this.#name = name;
  }

  get name() {
    return this.#name;
  }

  get parent() {
    return this.#parent;
  }

  /**
   * Inserts a TreeNode as child to this TreeNode and sets this TreeNode as parent to inserted TreeNode, positonal index is optional and will append child if not present
   * @param {TreeNode} child
   * @param {number} [index]
   */
  insertChild(child, index) {
    if (index == null) index = this.#children.length;

    child.#parent = this;
    this.#children.splice(index, 0, child);
  }

  /**
   * Removes child TreeNode and removes this TreeNode as parent
   * @param {TreeNode} child */
  removeChild(child) {
    if (child.#parent != this) return;

    let remove_index = this.#children.findIndex(
      (this_child) => this_child == child
    );

    child.#parent = null;
    this.#children.splice(remove_index, 1);

    return child;
  }

  /**
   * Calls removeChild from this TreeNodes parent with this TreeNode as argument
   * @returns {TreeNode}
   */
  remove() {
    if (!this.#parent) return this;
    return this.#parent.removeChild(this);
  }

  /**
   * Dispatches a TreeEvent with this TreeNode as target, calls dispatchEvent recursively on this TreeNodes parent if event.bubbles == true until a root node is found or stopPropagation is called on the event
   * @param {TreeEvent} event
   */
  dispatchEvent(event) {
    let is_canceled = super.dispatchEvent(event);

    if (this.#parent && event.bubbles && !event.isStopped) {
      return this.#parent.dispatchEvent(event);
    }

    return is_canceled;
  }

  /**
   * Add an handler that fires when an TreeEvent of type is dispatched on this TreeNode
   * @param {string} type
   * @param {(event:TreeEvent)=>void} handler
   * @param {EventListenerOptions} [options] abortcontroller that has it's signal attached to the listener
   */
  addEventListener(type, handler, options = {}) {
    let controller = new AbortController();
    super.addEventListener(type, handler, {
      ...options,
      signal: controller.signal,
    });
    return controller;
  }
}
