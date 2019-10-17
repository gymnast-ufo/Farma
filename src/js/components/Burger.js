import CLASS_NAMES from './CLASS_NAMES';
import State from './State';
import { hideScroll, showScroll } from './prototypes';
import { isTablet } from './helpers';
import Cookies from './Cookies';

/**
 * @param {object} node элемент burger
 * @param {object} node элемент меню
 * @param {bool} создавать или нет меню в отдельном попапе. Default - false
*/

export default class Burger {
	constructor({burger, mainMenu, popup, popupParent}) {
		this.popup = !!popup;
		this._burger = burger;
		this._mainMenu = this.popup ? mainMenu.cloneNode(true) : mainMenu;
		this.popupParent = (this.popup && !!popupParent) ? popupParent : document.body;
		this._menuItems = [...this._mainMenu.querySelectorAll(`.${CLASS_NAMES.menu.item.main}`)];

		this.state = new State({open: false});

		this.burgerHandleClick = this.burgerHandleClick.bind(this);
		this.openMenu = this.openMenu.bind(this);
		this.closeMenu = this.closeMenu.bind(this);

		this._burger.onclick = this.burgerHandleClick;
		this._menuItems.forEach(item => item.addEventListener('click', this.closeMenu, false));
		document.onclick = e => ((e.target != this._mainMenu && (e.target != this._burger && e.target != this._burger.children[0])) && this._menuItems.some(item => item != e.target)) && this.closeMenu(e);
	}

	/**
	 * обработчик клика
	*/
	burgerHandleClick = e => {
		switch (this.state.getState().open) {
			case true: this.closeMenu(e); break;
			case false: this.openMenu(e); break;
		}
	}

	/**
	 * создаёт меню-попап и бургер в нём
	 *
	 * @return {object} node элемент попап с меню
	*/
	createPopupMenu = () => {
		let checkMenu = document.querySelector(`.${CLASS_NAMES.popup.menu.main}`);
		if (!!checkMenu) return checkMenu;

		let menu = document.createElement('div');
		menu.classList.add(CLASS_NAMES.popup.main);
		this.popup && menu.classList.add(CLASS_NAMES.popup.menu);

		let closeBurger = this.createPopupCloseBurger();
		this._mainMenu.insertBefore(closeBurger, this._mainMenu.children[0]);
		menu.appendChild(this._mainMenu);
		this._mainMenu.classList.add(CLASS_NAMES.menu.open);
		this.popupParent.appendChild(menu);

		return menu;
	}

	/*
	 * создаёт бургер в попапе, если и меню в попапе
	 *
	 * @return {object} node элемент иконка закрытия меню
	*/
	createPopupCloseBurger = () => {
		let closeBurger = this._burger.cloneNode(true);
		closeBurger.classList.add(CLASS_NAMES.burger.open);
		closeBurger.onclick = this.burgerHandleClick;

		let burgerContainer = document.createElement('div');
		burgerContainer.classList.add(CLASS_NAMES.burger.main);
		burgerContainer.style.height = `${document.querySelector('.header').offsetHeight}px`;
		burgerContainer.appendChild(closeBurger);

		return burgerContainer;
	}

	openMenu = e => {
		let menu = this.popup ? this.createPopupMenu() : this._mainMenu;
		menu.classList.add(CLASS_NAMES.menu.open);

		Burger.setMenuHeight();
		this.state.setState({open: true});
		this._burger.classList.add(CLASS_NAMES.burger.open);
		document.body.hideScroll();
	}

	closeMenu = e => {
		let menu = this.popup ? this.createPopupMenu() : this._mainMenu;
		menu.classList.remove(CLASS_NAMES.menu.open);
		
		this.state.getState().open && document.body.showScroll();

		this.state.setState({open: false});
		this._burger.classList.remove(CLASS_NAMES.burger.open);
	}

	static setMenuHeight() {
		let menu = document.querySelector(`.${CLASS_NAMES.menu.main}`);
		let cookie = document.querySelector(`.${CLASS_NAMES.cookies.main}`);
		let { top, height } = cookie.getBoundingClientRect();
		let visibleHeight = !Cookies.isVisible() && height > -top ? height + top : 0;

		menu.style.height = isTablet()
			? `${window.innerHeight - visibleHeight}px`
			: 'auto';

		return visibleHeight;
	}
}