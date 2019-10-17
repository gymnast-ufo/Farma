import CLASS_NAMES from './CLASS_NAMES';

export default class Header {
	constructor(node) {
		this.header = node;
		this.height = this.header.offsetHeight;

		this.setScroll = this.setScroll.bind(this);
	}

	setScroll() {
		let top = window.pageYOffset;
		let cookie = document.querySelector(`.${CLASS_NAMES.cookies.main}`);
		let checkCookie = cookie.classList.contains(CLASS_NAMES.cookies.active);
		let setScrollPoint = checkCookie ? cookie.offsetHeight : 0;

		switch(top > setScrollPoint) {
			case true: this.header.classList.add(CLASS_NAMES.header.scroll); break;
			case false: this.header.classList.remove(CLASS_NAMES.header.scroll); break;
		}
	}
}