import 'babel-polyfill';
import './components/polyfills';
import { isTablet } from './components/helpers';
import Popup from './components/Popup';
import Cookies from './components/Cookies';
import Burger from './components/Burger';
import Header from './components/Header';
import MenuItems from './components/MenuItems';
import MobileLink from './components/MobileLink';
import HoleBird from './components/HoleBird';

// скрипты, используещееся на всех страницах

const makeElementSquare = node => node.style.height = `${node.offsetWidth}px`;
let popup = new Popup(document.querySelector('.popup'));
let cookies = new Cookies(document.querySelector('.about-cookies'));
let header = new Header(document.querySelector('.header'));
let birds = [...document.querySelectorAll('.hole-bird')].map(bird => new HoleBird(bird));
let menuItems = new MenuItems({
	menu: document.querySelector('.menu__wrapper')
});
let burger = new Burger({
	burger: document.querySelector('.burger'),
	mainMenu: document.querySelector('.menu'),
	popup: false
});

let resizeFunctions = (e = null) => {
	birds.forEach(bird => bird.maybeSay(e));
	document.querySelectorAll('.drug-backlight').forEach(elem => makeElementSquare(elem));
	cookies.check();

	//mobile burger
	isTablet() && document.querySelectorAll('.header a').forEach(link => link.addEventListener('click', burger.closeMenu, false));

	// mobile links
	isTablet() && document.querySelectorAll('.mobile-link').forEach(link => new MobileLink(link));

	header.setScroll();
	Burger.setMenuHeight();
};
let scrollFunctions = (e = null) => {
	header.setScroll(e);
	birds.forEach(bird => bird.maybeSay(e));
	Burger.setMenuHeight();
};

resizeFunctions();
window.addEventListener('scroll', e => scrollFunctions(e));
window.addEventListener('resize', e => resizeFunctions(e));

document.querySelectorAll('.popup-link').forEach(link => link.onclick = popup.handleOpen);