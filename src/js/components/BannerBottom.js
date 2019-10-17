import { isMobile } from './helpers';

/**
 * устанавливает нижний блок профайлов на главном баннере под низ
*/
export default class BannerBottom {
	constructor() {
		this.banner = document.querySelector('.banner');
		this.bottomBanner = this.banner.querySelector('.banner__bottom');

		this.setHeight = this.setHeight.bind(this);
	}

	setHeight() {
		this.bottomBanner.classList.remove('banner__bottom--absolute');

		let { paddingTop } = getComputedStyle(this.banner);
		let { offsetHeight } = this.banner.querySelector('.banner__inner');
		paddingTop = parseFloat(paddingTop);

		(!isMobile() && (offsetHeight + paddingTop < this.banner.offsetHeight))
			&& this.bottomBanner.classList.add('banner__bottom--absolute');
	}
}