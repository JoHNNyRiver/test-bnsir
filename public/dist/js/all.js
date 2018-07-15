'use strict';

function animate(_ref) {
	var who = _ref.who,
	    where = _ref.where,
	    clazz = _ref.clazz;

	document.querySelector(who).addEventListener('animationend', function (event) {
		document.querySelector(where).classList.add(clazz);
	});
}

if (window.location.pathname === '/dashboard') {
	animate({ who: '.sidebar', where: 'main.dashboard', clazz: 'fadeIn' });

	new DualRange('.dashboard__cardsselector', function (event) {
		document.querySelector('.min').textContent = event.min + ' m\xB2';
		document.querySelector('.max').textContent = event.max + ' m\xB2';
	});
}
'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var getFormElements = function getFormElements(form) {
	return [].concat(_toConsumableArray(form.elements)).filter(function (input) {
		return input.type !== 'hidden' && input.nodeName === 'INPUT';
	});
};
var isEmpty = function isEmpty(element) {
	return element.filter(function (element) {
		return element.value === '';
	});
};
var isValid = function isValid(elements) {
	return isEmpty(elements);
};

function component(message, description) {
	return '\n\t\t<div class="notify">\n\t\t\t<h3 class="notify__header">' + message + '</h3>\n\t\t\t<p class="notify__description">' + description + '</p>\n\t\t\t<span class="notify__close">&times;</span>\n\t\t</div>\n\t';
}

var infoCard = component('Preencha todos os campos', 'Campos obrigatŕoios!');

function notify() {
	document.body.insertAdjacentHTML('beforeend', infoCard);
	setTimeout(function () {
		return document.querySelector('.notify').remove();
	}, 2000);
}

if (window.location.pathname === '/login') {
	var submitedFrom = function submitedFrom(event) {
		if (isValid(elements).length > 0) {
			notify();
			isValid(elements)[0].focus();
			event.preventDefault();
		}
	};

	var addClassLabel = function addClassLabel() {
		this.value !== '' ? this.nextElementSibling.classList.add('effectInput') : this.nextElementSibling.classList.remove('effectInput');
	};

	var form = document.forms['login'];
	var elements = getFormElements(form);

	elements.forEach(function (element) {
		return element.addEventListener('blur', addClassLabel);
	});
	form.addEventListener('submit', submitedFrom);
}