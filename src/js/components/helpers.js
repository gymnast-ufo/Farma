import CLASS_NAMES from './CLASS_NAMES';

const isMobile = () => window.matchMedia('(max-width: 767px)').matches;
const isTablet = () => window.matchMedia('(max-width: 991px)').matches;
const displayYCenter = () => {
	let headerHeight = document.querySelector(`.${CLASS_NAMES.header.main}`).offsetHeight;
	return headerHeight + ((window.innerHeight / 2) - headerHeight);
};

export { isMobile, isTablet, displayYCenter };