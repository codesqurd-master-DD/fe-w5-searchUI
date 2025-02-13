import { _ } from "../utils/dom.js";

export default function Component($target, props) {
  this.$target = $target;
  this.props = props;
  this.init();
}

Component.prototype = {
  constructor: Component,
  init,
  setup,
  render,
  getTemplate,
  mount,
  setEvents,
  addEvent,
  setState,
};
// methods
async function init() {
  await this.setup();
  this.render();
  this.setEvents();
}
function setup() {}
function render() {
  this.$target.innerHTML = this.getTemplate();
  this.mount();
}
function getTemplate() {}
function mount() {}
function setEvents() {}
function setState(newState, isRender = true) {
  this.state = { ...this.state, ...newState };
  isRender ? this.render() : null;
}

function addEvent(eventType, selector, callback) {
  const children = [...this.$target.querySelectorAll(selector)];
  this.$target.addEventListener(eventType, (event) => {
    if (!_isTarget(children, selector, event.target)) return false;
    callback(event);
  });
}

function _isTarget(children, selector, target) {
  return children.includes(target) || target.closest(selector);
}
