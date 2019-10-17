import CLASS_NAMES from './CLASS_NAMES';
import State from './State';
import { hideScroll, showScroll } from './prototypes';

/**
 * создаёт popup
 *
 * @param {object} node элемент popup-родитель
*/
export default class Popup {
	constructor(node) {
		this.popup = node;
		this.popupItems = [...this.popup.querySelectorAll(`.${CLASS_NAMES.popup.item}`)];
		this.close = this.createClose();
		this.allCloses = this.popup.querySelectorAll(`.${CLASS_NAMES.popup.allCloses}`);
		this.popup.appendChild(this.close);
		this.state = new State({
			activeElement: false
		});

		this.handleOpen = this.handleOpen.bind(this);
		this.handleClose = this.handleClose.bind(this);

		this.allCloses.forEach(close => close.addEventListener('click', this.handleClose));
		this.popup.addEventListener('click', this.handleClose);
	}

	handleOpen = e => {
		e.preventDefault();
		e.stopPropagation();
		this.closeAllPopups(e);

		let item = this.popupItems.filter(item => item.id === e.target.attributes.href.value.replace('#', '') && item)[0];

		document.body.hideScroll();
		
		this.popup.classList.add(CLASS_NAMES.popup.active);
		this.popup.scrollIntoView();

		item.classList.add(CLASS_NAMES.popup.itemActive);

		this.state.setState({
			activeElement: item
		});
	}

	handleClose = e => {
		if (e.target.nodeName === 'A') return;

		e.preventDefault();
		e.stopPropagation();

		if (e.target.classList.contains(CLASS_NAMES.popup.item) ||
			(e.target.parents(this.state.getState().activeElement) &&
			!e.target.classList.contains(CLASS_NAMES.popup.allCloses))
		) return false;

		document.body.showScroll();

		this.closeAllPopups(e);
	}

	closeAllPopups = e => {
		this.popup.classList.remove(CLASS_NAMES.popup.active);
		this.popupItems.forEach(item => item.classList.remove(CLASS_NAMES.popup.itemActive));

		this.state.setState({
			activeElement: false
		});
	}

	createClose = () => {
		let close = document.createElement('div');
		close.classList.add(CLASS_NAMES.popup.close);
		close.classList.add(CLASS_NAMES.burger.main);
		close.classList.add(CLASS_NAMES.burger.open);

		return close;
	}
}