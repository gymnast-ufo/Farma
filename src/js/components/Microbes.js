import CLASS_NAMES from './CLASS_NAMES';
import { isMobile, isTablet } from './helpers';

/*
 * создание микробов на странице
 *
 * @param {object} Чашка Петри, где будут развиваться микробы
*/
export default class Microbes {
	constructor(petriDish) {
		this.petriDish = petriDish;
		this.petriDishMaxHeight = this.setPetriDishMaxHeight();
		this.createMicrobeInterval = 5000;

		this.setQuantity = this.setQuantity.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.size = this.size.bind(this);

		this.setQuantity();
		this.size();
		this.init();
	}

	init = () => {
		this.shouldMicrobeCreate();
	}

	//установить максимальное количество микробов на странице	
	setQuantity = e => {
		let displayKoeff = 3.3;

		isTablet() && (displayKoeff = 2.2);

		this.microbeMaxQuantity = Math.round((this.petriDishMaxHeight / 1000) * displayKoeff);
	}

	//проверить количество микробов на странице
	checkMicrobesQuantity = () => document.querySelectorAll(`.${CLASS_NAMES.microbe.main}`).length;

	//проверка на создание микроба
	shouldMicrobeCreate = () => this.checkMicrobesQuantity() < this.microbeMaxQuantity && this.createMicrobe();

	//создание этого микроба и следующего
	createMicrobe = () => {
		let promise = new Promise((resolve, reject) => {
			setTimeout(() => resolve(this.microbeDOM()), this.createMicrobeInterval);
		});

		promise
			.then(result => {
				this.petriDish.appendChild(result);
				this.animationTime = parseInt(window.getComputedStyle(result).animationDuration) * 1000;

				setInterval(() => this.changeAnimation(result), this.animationTime);
				result.addEventListener('click', this.handleClick);
				window.addEventListener('resize', e => this.size(result));
				this.setMessagePosition(result);

				this.shouldMicrobeCreate();
			});
	}

	// создать DOM микроба
	microbeDOM = () => {
		let microbe = document.createElement('div');
		let microbeMessage = document.createElement('div');
		let microbeBody = document.createElement('div');
		let microbeBang = document.createElement('div');

		let microbeCount = this.checkMicrobesQuantity() + 1;
		let skinCount = microbeCount > 6 ? microbeCount - 6 : microbeCount;

		let skin = `${CLASS_NAMES.microbe.body.main}--${skinCount}`;
		let microbePositionClass = `${CLASS_NAMES.microbe.position}${microbeCount}`;

		microbe.classList.add(CLASS_NAMES.microbe.main);
		microbe.classList.add(microbePositionClass);
		microbe.classList.add(this.setRandomAnimate());
		microbeMessage.classList.add(CLASS_NAMES.microbe.message.main);
		microbeBody.classList.add(CLASS_NAMES.microbe.body.main);
		microbeBody.classList.add(skin);
		microbeBody.classList.add(CLASS_NAMES.microbe.body.animate);
		microbeBang.classList.add(CLASS_NAMES.microbe.bang.main);

		microbe.appendChild(microbeMessage);
		microbe.appendChild(microbeBody);
		microbe.appendChild(microbeBang);

		this.size(microbe);

		return microbe;
	}

	//установка размеров бактерий
	size = (microbe = null) => {
		this.microbeWidth = isTablet() ? 67 : 100;
		this.microbeHeight = isTablet() ? 68.5 : 100;

		if (microbe && microbe.classList.contains(CLASS_NAMES.microbe.main)) {
			microbe.style.width = `${this.microbeWidth}px`;
			microbe.style.height = `${this.microbeHeight}px`;
		}
	}

	getMicrobes = () => [...this.petriDish.querySelectorAll(`.${CLASS_NAMES.microbe.main}`)];

	/* рандом от min до max
	 *
	 * @param {number} минимум
	 * @param {number} максимум
	*/
	random = (min = 1, max = 5) => {
		let random = min + Math.random() * (max + 1 - min);
		random = Math.floor(random);

		return random;
	}

	//установка максимальной высоты для разведения бактерий
	setPetriDishMaxHeight = () => this.petriDishMaxHeight = this.petriDish.children[1].offsetHeight + this.petriDish.children[2].offsetHeight + this.petriDish.children[3].offsetHeight;

	//установка случайной анимации микроба
	setRandomAnimate = () => `microbe--animate-${this.random(1, 5)}`;

	// смена анимации на случайную
	changeAnimation = microbe => {
		let animationClass = microbe.classList[2];
		let check = animationClass.includes('animate');
		if (!check) return false;

		microbe.classList.remove(animationClass);
		microbe.classList.add(this.setRandomAnimate());
	}

	//клик по микробу
	handleClick = e => {
		let microbe = e.target.parentNode;
		let body = microbe.querySelector(`.${CLASS_NAMES.microbe.body.main}`);
		let transform = window.getComputedStyle(microbe).transform;

		body.classList.remove(CLASS_NAMES.microbe.body.animate);
		body.classList.add(CLASS_NAMES.microbe.body.hide);

		let delay = this.destroyMicrobeDelay(body);
		microbe.style.transform = transform;
		microbe.classList.remove(microbe.classList[2]);

		setTimeout(() => microbe.classList.add(CLASS_NAMES.components.hidden), delay);
	}

	//установка задержки до удаления микроба на основе анимации
	destroyMicrobeDelay = body => {
		let { animationDuration, animationDelay } = window.getComputedStyle(body);
		animationDuration = parseFloat(animationDuration);
		animationDelay = parseFloat(animationDelay);
		let delay = (animationDuration + animationDelay) * 1000;

		return delay;
	}

	//установка положения сообщения
	setMessagePosition = microbe => {
		let message = microbe.querySelector(`.${CLASS_NAMES.microbe.message.main}`);
		let delay = 2500;
		let microbeCenter = {};
		let center = {};

		microbeCenter.y = microbe.offsetTop + (microbe.offsetHeight / 2);
		microbeCenter.x = microbe.offsetLeft + (microbe.offsetWidth / 2);

		center.y = window.innerHeight / 2;
		center.x = window.innerWidth / 2;

		microbeCenter.y > center.y
			? message.classList.add(CLASS_NAMES.microbe.message.toTop)
			: message.classList.add(CLASS_NAMES.microbe.message.toBottom);

		microbeCenter.x > center.x
			? message.classList.add(CLASS_NAMES.microbe.message.toLeft)
			: message.classList.add(CLASS_NAMES.microbe.message.toRight);
	}

	//отображение сообщения
	showMessage = microbe => microbe.querySelector(`.${CLASS_NAMES.microbe.message.main}`).classList.add(CLASS_NAMES.microbe.message.active);
}