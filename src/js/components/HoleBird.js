import CLASS_NAMES from './CLASS_NAMES';
import { displayYCenter } from './helpers';

const ACCURACY = 0.2;

export default class HoleBird {
	constructor(bird) {
		this.bird = bird;
		this.birdBody = this.bird.querySelector(`.${CLASS_NAMES.bird.bird}`);
		this.hole = this.bird.querySelector(`.${CLASS_NAMES.bird.hole}`);
		this.message = this.bird.querySelector(`.${CLASS_NAMES.bird.message.main}`);
		this.isRtlMessage = this.message.classList.contains(CLASS_NAMES.bird.message.rtl);
		this.messageActiveClass = `${this.isRtlMessage ? CLASS_NAMES.bird.message.rtl : CLASS_NAMES.bird.message.main}${CLASS_NAMES.bird.message.active}`;
		this.messageAnimatingClass = `${this.isRtlMessage ? CLASS_NAMES.bird.message.rtl : CLASS_NAMES.bird.message.main}${CLASS_NAMES.bird.message.animating}`;

		this.maybeSay = this.maybeSay.bind(this);

		return this;
	}

	maybeSay() {
		let { top } = this.message.getBoundingClientRect();
		let checkOnCenter = Math.abs(top - displayYCenter()) < (window.innerHeight * ACCURACY);
		let checkIsActive = (this.message.classList.contains(this.messageActiveClass) || this.message.classList.contains(this.messageAnimatingClass));

		(checkOnCenter && !checkIsActive) && this.say();
	}

	say() {
		this.message.classList.add(this.messageAnimatingClass);

		setTimeout(() => {
			this.message.classList.remove(this.messageAnimatingClass);
			this.message.classList.add(this.messageActiveClass);
		}, 300);
	}
}