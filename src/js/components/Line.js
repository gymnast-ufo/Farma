/**
 * создаёт кривую линию
*/
export default class Line {
	constructor(node) {
		this.node = node;
		this.svg = !!this.node.querySelector('svg')
			? this.node.querySelector('svg')
			: this.createSvg(this.node);
		this.svgHeight = !!this.svg.offsetHeight ? this.svg.offsetHeight : 80;

		this.resizeSvg = this.resizeSvg.bind(this);
	}

	createSvg() {
		const svg = document.createElement('svg');
		let cx = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');

		svg.appendChild(cx);
		this.node.insertBefore(svg, this.node.children[1]);

		return svg;
	}

	resizeSvg() {
		let cx = this.node.querySelector('ellipse');

		this.setAttributes(cx);
	}

	setAttributes(cx) {
		cx.style.width = `100%`;
		cx.setAttribute('cx', this.node.offsetWidth / 2);
		cx.setAttribute('cy', -this.svgHeight);
		cx.setAttribute('rx', this.node.offsetWidth / 1.724);
		cx.setAttribute('ry', this.svgHeight * 2);
		cx.setAttribute('fill', 'rgba(0,0,0,0)');
		cx.setAttribute('stroke', '#e6e6e6');
		cx.setAttribute('stroke-width', 2);

		return cx;
	}
}