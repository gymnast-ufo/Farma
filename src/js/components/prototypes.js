import CLASS_NAMES from './CLASS_NAMES';
import { isTablet } from './helpers';;

function parents(elem) {
	if (!elem) return this.parentNode;

	let parent = this;

	while ((parent = parent.parentNode) && parent !== elem);
	return parent;
}

function scroll(duration = 300) {
  let start = null;
  let { top } = this.getBoundingClientRect();
  let { offsetHeight } = document.querySelector(`.${CLASS_NAMES.header.main}`);
	let w = window.pageYOffset - offsetHeight;
  let V = Math.abs(duration / top);

  requestAnimationFrame(step);
  
  function step(time) {
  	if (start === null) start = time;

  	let progress = time - start;
  	let r = (top < 0 ? Math.max(w - progress / V, w + top) : Math.min(w + progress / V, w + top));
  	
  	window.scrollTo(0, r);

  	if (r != w + top) requestAnimationFrame(step);
  }
}

function show(duration = 300) {
  let elem = this;
  let styles = window.getComputedStyle(elem);
  let transitionTiming = duration / 1000;

  if (elem.offsetHeight === elem.scrollHeight) return elem;

  elem.classList.add(CLASS_NAMES.components.showing);

  elem.style.display = (styles.display === 'none' || styles.display === 'inline') ? 'inline-block' : styles.display;
  elem.style.maxHeight = 0;
  elem.style.transitionDuration = `${transitionTiming}s`;

  elem.style.maxHeight = `${elem.scrollHeight}px`;

  setTimeout(() => elem.classList.remove(CLASS_NAMES.components.showing), duration);

  return elem;
}

function hide(duration = 300) {
  let elem = this;
  let styles = window.getComputedStyle(elem);
  let transitionTiming = duration / 1000;

  if (elem.offsetHeight === 0) return elem;

  elem.classList.add(CLASS_NAMES.components.showing);

  elem.style.display = (styles.display === 'none' || styles.display === 'inline') ? 'inline-block' : styles.display;
  elem.style.maxHeight = `${elem.scrollHeight}px`;
  elem.style.transitionDuration = `${transitionTiming}s`;

  elem.style.maxHeight = 0;

  setTimeout(() => elem.classList.remove(CLASS_NAMES.components.showing), duration);

  return elem;
}

function hideScroll() {
  let { pageYOffset } = window;
  let { offsetWidth } = this;

  this.classList.add(CLASS_NAMES.components.hideScroll, CLASS_NAMES.components.fixed);
  this.style.width = isTablet() ? `100%` : `${offsetWidth}px`;
  this.style.top = `${-pageYOffset}px`;
}

function showScroll() {
  let { top } = window.getComputedStyle(this);
  top = -parseFloat(top);

  this.classList.remove(CLASS_NAMES.components.hideScroll, CLASS_NAMES.components.fixed);
  this.style.width = ``;
  this.style.top = ``;

  window.scrollTo(0, top);
}

HTMLElement.prototype.parents = parents;
HTMLElement.prototype.scroll = scroll;
HTMLElement.prototype.show = show;
HTMLElement.prototype.hide = hide;
HTMLElement.prototype.hideScroll = hideScroll;
HTMLElement.prototype.showScroll = showScroll;

export { parents, scroll, show, hide, hideScroll, showScroll };