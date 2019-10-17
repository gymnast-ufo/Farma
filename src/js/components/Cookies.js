import CLASS_NAMES from './CLASS_NAMES';
import Burger from './Burger';

/**
 * отображение сообщения об использованиии куки
 *
 * @param {object} node элемент окно куки
*/
export default class Cookies {
	constructor(node) {
		this.node = node;
		this.height = this.node.offsetHeight;
		this.closeButton = this.node.querySelector(`.${CLASS_NAMES.cookies.close}`);
		this.wrap = document.querySelector('.wrap');

		this.check = this.check.bind(this);

		this.closeButton.addEventListener('click', this.close, false);

	}

	check = (e = null) => {
		this.height = this.node.offsetHeight;
		switch(Cookies.isVisible()) {
			case true: this.close(); break;
			case false: this.show(); break;
		}
	}

	show = () => {
		localStorage.setItem(CLASS_NAMES.cookies.item.key, CLASS_NAMES.cookies.item.value.true);
		this.node.classList.add(CLASS_NAMES.cookies.active);
		this.wrap.style.top = `${this.height}px`;
		Burger.setMenuHeight();
	}

	close = (e = null) => {
		localStorage.setItem(CLASS_NAMES.cookies.item.key, CLASS_NAMES.cookies.item.value.false);
		this.node.classList.remove(CLASS_NAMES.cookies.active);
		this.wrap.style.top = 0;
		Burger.setMenuHeight();
	}

	static isVisible = () => localStorage.getItem(CLASS_NAMES.cookies.item.key) == CLASS_NAMES.cookies.item.value.false;
}