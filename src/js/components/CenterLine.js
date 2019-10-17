import { isMobile, isTablet } from './helpers';

/**
 * устанавливает высоту центральной линии в блоке "как это работает"
 *
 * @param {object} dom элемент, сама линия
*/
export default class CenterLine {
	constructor(node) {
		this.node = node;
		this.parent = this.node.parentElement;
		this.rows = this.parent.querySelectorAll('.how-work__row');

		this.parentRect;
		this.buttonRect;
		this.preLastRowRect;


		this.setHeight = this.setHeight.bind(this);

		this.setHeight();
	}

	setRect() {
		this.parentRect = this.parent.getBoundingClientRect();
		this.buttonRect = this.parent.querySelector('.read-more').getBoundingClientRect();
		this.preLastRowRect = this.rows[this.rows.length - 3].getBoundingClientRect();
	}

	setHeight() {
		this.setRect();

		let {top, height} = isMobile() ? this.preLastRowRect : this.buttonRect;
		let calc = `${top + (height / 2) - this.parentRect.top}px`;

		this.node.style.height = calc;
	};
}