import { isTablet } from './components/helpers';
import Accordeon from './components/Accordeon';

// скрипты для второстепенных страниц

window.onload = e => {
	document.querySelectorAll('.accordeon').forEach(accordeon => new Accordeon(accordeon, {closeOther: true}));

}