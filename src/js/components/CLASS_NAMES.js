// наименования классов, вписывать по алфавиту
const CLASS_NAMES = {
	accordeon: {
		main: 'accordeon',
		item: 'accordeon__item',
		panel: 'accordeon__item__panel',
		panelActive: 'accordeon__item__panel--active',
		collapse: 'accordeon__item__collapse'
	},
	bird: {
		main: 'hole-bird',
		bird: 'hole-bird__bird',
		message: {
			main: 'hole-bird__message',
			rtl: 'hole-bird__message--rtl',
			animating: '--animating',
			active: '--active'
		},
		hole: 'hole-bird__hole'
	},
	burger: {
		main: 'burger',
		open: 'burger--open'
	},
	cookies: {
		main: 'about-cookies',
		active: 'about-cookies--active',
		close: 'about-cookies-close',
		item: {
			key: 'cookies',
			value: {
				true: 'show',
				false: 'hidden'
			}
		}
	},
	form: {
		method: 'POST',
		links: {
			sync: '',
			async: '/form.php'
		},
		button: {
			main: 'button-confirm'
		},
		input: {
			incorrect: 'incorrect-value',
			notification: {
				main: 'form__notification',
				error: 'notification--'
			},
			errors: {
				empty: 'empty',
				short: 'short',
				incorrect: 'incorrect'
			}
		}
	},
	header: {
		main: 'header',
		scroll: 'header--scroll'
	},
	menu: {
		main: 'menu',
		open: 'menu--open',
		item: {
			main: 'menu__item',
			active: 'menu__item--active',
			mainActive: 'menu__item--main-active'
		}
	},
	microbe: {
		main: 'microbe',
		position: 'microbe--position--',
		message: {
			main: 'microbe__message',
			active: 'microbe__message--active',
			toLeft: 'microbe__message--to-left',
			toRight: 'microbe__message--to-right',
			toTop: 'microbe__message--to-top',
			toBottom: 'microbe__message--to-bottom'
		},
		body: {
			main: 'microbe__body',
			animate: 'microbe__body--animate',
			hide: 'microbe__body--hide'
		},
		bang: {
			main: 'microbe__bang',
			active: 'microbe__bang--active'
		}
	},
	popup: {
		main: 'popup',
		active: 'popup--active',
		item: 'popup__item',
		itemActive: 'popup__item--active',
		link: 'popup-link',
		close: 'popup__close',
		allCloses: 'popup--closes'
	},
	components: {
		showing: 'showing',
		hidden: 'hidden',
		hideScroll: 'overflow',
		fixed: 'fixed'
	}
};

export default CLASS_NAMES;