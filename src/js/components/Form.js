import Inputmask from "inputmask";
import CLASS_NAMES from './CLASS_NAMES';
import { show, hide } from './prototypes';

/**
 * валидация и отправка формы
 *
 * @param {object} node элемент form
 * @param {string} метод отправки данных
 * @param {bool} синхронный/асинхронный запрос
 *
 * требования к форме:
 * кнопка с классом "button-confirm"
 * "notification--empty" класс для ошибки при пустом поле
 * "notification--short" класс для ошибки при коротком сообщениии (менее 3 символов)
 * "notification--incorrect" класс для ошибки при непройденной валидации
 * 
 * DOM дерево
 * <form method="something">
 * 		<div>
 * 				<input type="something" />
 * 				<span class="notification--empty">Error</span>
 * 				<span class="notification--short">Error</span>
 * 				<span class="notification--incorrect">Error</span>
 * 		</div>
 * 		<div>
 * 				<input type="something" />
 * 				<span class="notification--empty">Error</span>
 * 				<span class="notification--short">Error</span>
 * 				<span class="notification--incorrect">Error</span>
 * 		</div>
 * 		<div>
 * 				<label>
 * 						<input type="radio" />
 * 						<div class=""></div>
 * 				</label>
 * 				<label>
 * 						<input type="radio" />
 * 						<div class=""></div>
 * 				</label>
 * 		</div>
 * 		<div>
 * 				<input type="checkbox" />
 * 				<label class=""></label>
 * 		</div>
 * </form>
*/
export default class Form {
	constructor({ node, method, async }) {
		this.node = node;
		this.method = method || CLASS_NAMES.form.method;
		this.async = async || true;
		this.link = this.async ? CLASS_NAMES.form.links.async : CLASS_NAMES.form.links.sync;
		this.inputs = [...this.node.querySelectorAll('input, textarea')];
		this.button = this.node.querySelector(`.${CLASS_NAMES.form.button.main}`);

		this.handleClick = this.handleClick.bind(this);

		this.inputs.forEach(input => input.oninput = e => input.classList.contains(CLASS_NAMES.form.input.incorrect) && this.removeError(input));
		this.button.addEventListener('click', this.handleClick);
	}

	checkForm = e => this.node.method === this.method;

	handleClick = e => {
		if (!this.async && !this.checkForm(e)) {
			e.preventDefault();
			e.stopPropagation();
			document.location.reload();
		}

		if (this.async) {
			e.preventDefault();
			e.stopPropagation();
		}

		let check = this.inputs.every(input => this.checkInput(input));

		check && this.send();
	}

	checkInput = input => {
		let type = input.type;

		if (type != 'checkbox') {
			return !this.checkEmpty(input) 
				? this.addError(input, CLASS_NAMES.form.input.errors.empty)
				: !this.checkLength(input)
						? this.addError(input, CLASS_NAMES.form.input.errors.short)
						: this.checkSpecific(input, type);
		}
		return type == 'checkbox' && this.checkSpecific(input, type);
	}

	checkEmpty = input => !!input.value;

	checkLength = input => input.value.length >= 2;

	checkSpecific = (input, type) => {
		let check;

		switch(type) {
			case 'text': check = this.checkLength(input); break;
			case 'textarea': check = this.checkLength(input); break;
			case 'tel': check = this.checkTel(input); break;
			case 'email': check = this.checkEmail(input); break;
			case 'checkbox': check = this.checkBox(input); break;
			case 'radio': check = true; break;
		}

		!check && this.addError(input, CLASS_NAMES.form.input.errors.incorrect);
		!!check && this.removeError(input);

		return check;
	}

	checkTel = input => Inputmask.unmask(input.value, {alias: '+9(999)999-99-99'}).length >= 11;

	checkEmail = input => /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i.test(input.value);

	checkBox = input => input.checked;

	addError = (input, error) => {
		input.classList.add(CLASS_NAMES.form.input.incorrect);

		input.type == 'checkbox' && input.nextElementSibling.classList.add(CLASS_NAMES.form.input.incorrect);

		input.type != 'checkbox' && this.showErrorMessage(input, error).classList.add(CLASS_NAMES.form.input.incorrect);
	}

	removeError = input => {
		input.classList.remove(CLASS_NAMES.form.input.incorrect);

		input.type == 'checkbox' && input.nextElementSibling.classList.remove(CLASS_NAMES.form.input.incorrect);

		input.type != 'checkbox' && this.hideErrorMessage(input).forEach(noty => noty.classList.remove(CLASS_NAMES.form.input.incorrect));
	}

	showErrorMessage = (input, error) => input.parentElement.querySelector(`.${CLASS_NAMES.form.input.notification.error}${error}`).show() || input.parentElement.querySelector(`.${CLASS_NAMES.form.input.notification.error}${error}`);

	hideErrorMessage = input => [...input.parentElement.querySelectorAll(`.${CLASS_NAMES.form.input.notification.main}`)].map(noty => noty.hide());

	send = () => {
		this.button.innerHTML = 'Отправка...';

		let req = new XMLHttpRequest();
		req.open(this.method, `${this.link}`, this.async);

		let data = new FormData(this.node);

		req.send(data);

		if (this.async) {
			req.onreadystatechange = () => {
				if(req.readyState != 4) return;
				if (req.status == 200 && req.responseText === 'correct') {
					[...this.node.children].forEach(child => child.style.display = 'none');
					let ready = document.createElement('div');
					ready.classList.add('form__ready');
					ready.innerHTML = 'Ваша заявка принята!';
					this.node.appendChild(ready);
				}
			}
		}
	}
}