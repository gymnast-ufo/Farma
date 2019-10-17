/**
* создаёт активную ссылку из дата-аттрибута
* 
* @param {object} node элемент ссылки
*
* необходимо иметь дата-аттрибут data-{some-method}
* методы доступа: tel, mailto, skype, file, http, https, ftp
*/
export default class MobileLink {
	constructor(node) {
		this.node = node;

		this.node.onclick = this.handleClick;

		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(e) {
		for(let key in e.target.dataset) {
			let skype = key === 'skype' ? '?chat' : '';

			document.location.replace(`${key}:${e.target.dataset[key]}${skype}`);
		}
	}
}