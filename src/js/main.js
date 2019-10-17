import Swiper from 'swiper';
import Inputmask from "inputmask";
import { isMobile, isTablet } from './components/helpers';
import Line from './components/Line';
import CenterLine from './components/CenterLine';
import Accordeon from './components/Accordeon';
import Form from './components/Form';
import ActiveDots from './components/ActiveDots';
import Microbes from './components/Microbes';

// скрипты для главной страницы

let newLine = new Line(document.querySelector('.how-work__curved-line'));
let centerLine = new CenterLine(document.querySelector('.how-work__center-line'));
let activeDots = new ActiveDots(document.querySelectorAll('.how-work__onscroll'));
let phoneMask = new Inputmask({
	mask:'+7(999)999-99-99',
	skipOptionalPartCharacter: " ",
	clearMaskOnLostFocus: true
});
let microbes = new Microbes(document.querySelector('.wrap'));

let resizeFunctions = (e = null) => {
	newLine.resizeSvg();
	centerLine.setHeight();
	activeDots.onevent(e);
	microbes.setQuantity(e);
	microbes.size();
};
let scrollFunctions = (e = null) => {
	activeDots.onevent(e);
	centerLine.setHeight();
};

resizeFunctions();
document.querySelectorAll('input[type="tel"]').forEach(input => phoneMask.mask(input));

window.addEventListener('resize', e => resizeFunctions(e));
window.addEventListener('scroll', e => scrollFunctions(e));

new Form({
	node: document.querySelector('.form'),
	method: 'POST',
	async: true
});

// accordeons
isTablet() && document.querySelectorAll('.accordeon').forEach(accordeon => new Accordeon(accordeon, {closeOther: false}));

// birds slider
let birdsSlider = new Swiper('.birds-slider', {
	slidesPerView: 1,
	loop: true,
	autoplay: true,
	mousewheel: false,
	pagination: {
		el: '.birds-slider__pagination',
		type: 'bullets',
		clickable: true,
		bulletClass: 'pagination__bullet',
		bulletActiveClass: 'pagination__bullet--active'
	},
	centeredSlides: true,
	breakpointsInverse: true,
	breakpoints: {
		992: {
			autoplay: false,
			slidesPerView: 3,
			pagination: false,
			centeredSlides: false,
			loop: false,
			loopAdditionalSlides: 0,
			loopedSlides: 0
		}
	},
	on: {
		init: function() {
			this.autoplay.stop();
			document.addEventListener('scroll', () => {
				let { top } = this.el.getBoundingClientRect();
				return (top <= window.innerHeight / 2.5 && -top < this.el.offsetHeight / 5)
				? this.autoplay.start()
				: this.autoplay.stop();
			});
		}
	}
});

//scheme slider
let scheme = new Swiper('.scheme', {
	slidesPerView: 'auto',
	autoplay: true,
	spaceBetween: 12,
	pagination: false,
	mousewheel: false,
	breakpointsInverse: true,
	breakpoints: {
		992: {
			slidesPerView: 3,
			autoplay: false,
			centeredSlides: false,
			spaceBetween: 0
		}
	},
	on: {
		init: function() {
			this.autoplay.stop();
			document.addEventListener('scroll', () => {
				let { top } = this.el.getBoundingClientRect();
				return (top <= window.innerHeight / 1.5 && top > 0)
				? this.autoplay.start()
				: this.autoplay.stop();
			});
		}
	}
});
