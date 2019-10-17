import CLASS_NAMES from './CLASS_NAMES';
import { scroll } from './prototypes';

/**
 * отслеживание кликов и наведений по элементам меню
 *
 * @param {object} node элемент меню
*/
export default class MenuItems {
	constructor({menu}) {
		this.menu = menu;
		this.items = [...this.menu.querySelectorAll(`.${CLASS_NAMES.menu.item.main}`)];
		this.itemActive = this.items.filter(item => item.classList.contains(CLASS_NAMES.menu.item.mainActive))[0];

		this.handleClick = this.handleClick.bind(this);
		this.mouseEnter = this.mouseEnter.bind(this);
		this.mouseLeave = this.mouseLeave.bind(this);

		this.items.forEach(item => item.onclick = this.handleClick);
		this.menu.addEventListener('mouseenter', this.mouseEnter, false);
		this.menu.addEventListener('mouseleave', this.mouseLeave, false);
	}

	handleClick = e => {
		let char = e.target.attributes.href.value[0];

		if (char === '/') {
			this.redirectTo(e);
		} else {
			this.checkPage(e);
			this.scrollToElement(e);
		}
	}

	mouseEnter = e => this.itemActive.classList.remove(CLASS_NAMES.menu.item.active);

	mouseLeave = e => this.itemActive.classList.add(CLASS_NAMES.menu.item.active);

	checkPage = e => location.pathname.length > 1 && location.replace(`/${e.target.attributes.href.value}`);

	/**
	 * скролл до элемента
	*/
	scrollToElement = e => {
		e.preventDefault();
		e.stopPropagation();

		if (e.target.classList.contains(CLASS_NAMES.popup.link)) return false;

		let hash = e.target.attributes.href.value;
		let target = document.querySelector(hash);

    target.scroll(300);
	}

	redirectTo = e => location = e.target.attributes.href.value;
}