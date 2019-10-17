import CLASS_NAMES from './CLASS_NAMES';
import State from './State';
import AccordeonItem from './AccordeonItem';

/**
 * создаёт аккордеон
 *
 * @param {object} node родительский элемент "accordeon"
*/
export default class Accordeon {
	constructor(node, options) {
		this.accordeon = node;
		this.default = this.getDefaultOptions();
		this.options = Object.assign(this.default, options || {});
		this.state = new State({
			ready: false
		});
		this.items = [...this.accordeon.querySelectorAll(`.${CLASS_NAMES.accordeon.item}`)];
		this.items = this.items.map(item => new AccordeonItem(item, this));
		this.alreadyActiveItems = this.items.map(item => item.panel.classList.contains(CLASS_NAMES.accordeon.panelActive));

		this.closeOther = this.closeOther.bind(this);

		this.onready();
		(this.alreadyActiveItems.length === 0 && this.options.activeFirst) && this.items[0].openAccordeonItem();
	}

	closeOther = item => this.items.forEach(each => {
		(each.item !== item.item && each.state.getState().open) && each.closeAccordeonItem();
	});

	onready = () => {
		this.state.setState({
			ready: true
		});
	}

	getDefaultOptions = () => {
		return {
			closeOther: true,
			activeFirst: false
		};
	}
}