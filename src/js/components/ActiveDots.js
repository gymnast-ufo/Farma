import CLASS_NAMES from './CLASS_NAMES';
import { displayYCenter } from './helpers';

const NAMES = {
	animate: 'big-border--animate'
};

export default class ActiveDots {
	constructor(node) {
		this.nodes = [...node];

		this.onevent = this.onevent.bind(this);
	}

	onevent = e => {
		this.centerDot = displayYCenter();

		this.setActive(this.checkActiveDot());
	}

	checkActiveDot = () => {
		return this.nodes.reduce((prev, item) => {
			let { top } = item.getBoundingClientRect();
			let prevTop = prev.getBoundingClientRect().top;
			let check = Math.abs(this.centerDot - top) < Math.abs(this.centerDot - prevTop);

			return check ? item : prev;
		});
	}

	setActive = el => {
		let type = this.checkType(el);
		let animateClass = `${type}--${NAMES.animate}`;

		if (!el.classList.contains(animateClass)) {
			this.nodes.forEach(el => el.classList.remove(`${this.checkType(el)}--${NAMES.animate}`));
			el.classList.add(animateClass);
		}
	}

	checkType = el => el.nodeName.toLowerCase() === 'a' ? 'button' : 'dot';
}