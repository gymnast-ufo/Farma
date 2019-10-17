import CLASS_NAMES from './CLASS_NAMES';
import State from './State';

/**
 * создаёт элемент аккордеона
 *
 * @param {object} node единичный элемент аккодеона
*/
export default class AccordeonItem {
	constructor(node, accordeon) {
		this.item = node;
		this.accordeon = accordeon;
		this.panel = this.item.querySelector(`.${CLASS_NAMES.accordeon.panel}`);
		this.collapse = this.item.querySelector(`.${CLASS_NAMES.accordeon.collapse}`);
		this.state = new State({
			open: false
		});

		this.handleClick = this.handleClick.bind(this);

		this.collapse.style.maxHeight = 0;
		this.panel.classList.contains(CLASS_NAMES.accordeon.panelActive) && this.openAccordeonItem();
		this.panel.addEventListener('click', this.handleClick);

		return this;
	}

	handleClick = e => {
		switch(this.state.getState().open) {
			case true: this.closeAccordeonItem(); break;
			case false: this.openAccordeonItem(); break;
		}
	}

	openAccordeonItem = () => {
		this.panel.classList.add(CLASS_NAMES.accordeon.panelActive);
		this.collapse.style.maxHeight = `${this.collapse.scrollHeight}px`;
		this.state.setState({open: true});

		if (this.accordeon.options.closeOther) {
			this.accordeon.state.getState().ready && this.accordeon.closeOther(this);
		}
	}

	closeAccordeonItem = () => {
		this.panel.classList.remove(CLASS_NAMES.accordeon.panelActive);
		this.collapse.style.maxHeight = 0;
		this.state.setState({open: false});
	}
}