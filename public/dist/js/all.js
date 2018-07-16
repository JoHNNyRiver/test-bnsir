'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function animate(_ref) {
	var who = _ref.who,
	    where = _ref.where,
	    clazz = _ref.clazz;

	document.querySelector(who).addEventListener('animationend', function (event) {
		document.querySelector(where).classList.add(clazz);
	});
}

function csvInObject() {
	var store = {};
	store.result = [];

	function csvInArray(csv) {
		return csv.split(/\n/);
	}

	function getCsvHeader(csvArray) {
		return csvArray[0].split(';');
	}

	store.getCsv = function (uri) {
		return axios.get(uri).then(function (response) {
			return response.data;
		}).then(csvInArray);
	};

	store.transformInObject = function (data) {
		var header = getCsvHeader(data);

		data.forEach(function (info, index) {
			if (index > 0) {
				var obj = {};
				var current = data[index].split(';');

				header.forEach(function (item, sindex) {
					return obj[item] = current[sindex];
				});
				store.result.push(obj);
			}
		});
	};

	store.mountHtml = function (target) {
		store.result.slice(0, 3).forEach(function (info) {
			target.insertAdjacentHTML('beforeend', '\n\t\t\t\t\t<tr>\n\t\t\t\t\t\t<td>' + info.titulo + '</td>\n\t\t\t\t\t\t<td>' + info.anoConclusaoObra + '</td>\n\t\t\t\t\t\t<td>' + info.logradouro + '</td>\n\t\t\t\t\t\t<td>' + info.numero + '</td>\n\t\t\t\t\t\t<td>' + info.bairro + '</td>\n\t\t\t\t\t</tr>\n\t\t\t');
		});
	};

	return store;
}

function initMap() {
	var myLatLng = { lat: -23.574242, lng: -46.686359 };

	var map = new google.maps.Map(document.getElementById('map'), {
		center: myLatLng,
		zoom: 13
	});

	function addMarker(_ref2) {
		var _ref2$lat = _ref2.lat,
		    lat = _ref2$lat === undefined ? -23.574242 : _ref2$lat,
		    _ref2$lng = _ref2.lng,
		    lng = _ref2$lng === undefined ? -46.686359 : _ref2$lng;

		var marker = new google.maps.Marker({
			map: map,
			position: {
				lat: lat,
				lng: lng
			}
		});
	}

	addMarker({ lat: -23.574242, lng: -46.686359 });

	var letLng = csvInObject();

	letLng.getCsv('/data/dados_teste.csv').then(letLng.transformInObject);

	setTimeout(function () {
		letLng.result.forEach(function (item) {
			return addMarker({ lat: Number(item.lat), lng: Number(item.lng) });
		});
	}, 500);
}

function responsiveTable(event) {
	var table = this.querySelector('table');
	var left = table.getBoundingClientRect().left;
	var initLeft = table.offsetLeft;
	var currentValue = left - initLeft;

	if (this.scrollLeft * -1 < -0) {
		this.style.boxShadow = 'inset 1px -1px 25px 3px rgba(0,0,0,0.2)';
	} else {
		this.style.boxShadow = 'inset -5px -1px 20px rgba(0, 0, 0, .2)';
	}
}

/**
 * simples slidershow
 */
function sliderShow(target) {
	var scope = {};

	var count = 0;

	var elem = document.querySelector(target);
	var totalLength = [].concat(_toConsumableArray(elem.children)).length;

	var slidercontrols = document.querySelector('.slidercontrols');
	var back = slidercontrols.querySelector('.backcontrol');
	var next = slidercontrols.querySelector('.nextcontrol');
	var listControl = slidercontrols.querySelector('.listcontrol');
	var childListControl = [].concat(_toConsumableArray(listControl.children));

	next.addEventListener('click', function (event) {
		count++;

		if (count >= totalLength) {
			childListControl[0].click();
			count = 0;
			return;
		}

		childListControl[count].click();
	});

	back.addEventListener('click', function (event) {
		count--;

		if (count < 0) {
			childListControl[totalLength - 1].click();
			count = totalLength - 1;
			return;
		}

		childListControl[count].click();
	});

	function eventClickLi(event) {
		var current = parseInt(event.target.innerHTML) - 1;
		var currentEl = document.querySelectorAll('.sliderShow .wrapSliderShow .contentslider')[current];
		var wrap = document.querySelector('.sliderShow .wrapSliderShow');
		var li = document.querySelector('.listcontrol li.active');
		var actived = wrap.querySelector('.sliderShow .wrapSliderShow .active');

		wrap.style.transform = 'translateY(-' + currentEl.offsetHeight * current + 'px)';

		actived.classList.remove('active');
		currentEl.classList.add('active');

		li.classList.remove('active');
		event.target.classList.add('active');
	}

	childListControl.forEach(function (li) {
		return li.addEventListener('click', eventClickLi);
	});
	scope.init = function () {
		return mountHtml(elem);
	};

	function mountHtml(el) {
		el.innerHTML = component(el);
	}

	/**
  * montando o layout padrão do slide
  * @param  {Object} el
  * @return {String}
  * @private
  */
	function component(el) {
		return '\n\t\t\t<div class="sliderShow">\n\t\t\t\t<div class="wrapSliderShow">\n\t\t\t\t\t' + el.innerHTML + '\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t';
	}

	return scope;
}

if (window.location.pathname === '/dashboard') {
	animate({ who: '.sidebar', where: 'main.dashboard', clazz: 'fadeIn' });

	new DualRange('.dashboard__cardsselector', function (event) {
		document.querySelector('.min').textContent = event.min + ' m\xB2';
		document.querySelector('.max').textContent = event.max + ' m\xB2';
	});

	// csv
	var csv = csvInObject();
	csv.getCsv('/data/dados_teste.csv').then(csv.transformInObject);

	setTimeout(function () {
		csv.mountHtml(document.querySelector('.dashboard__wraptable tbody'));
	}, 500);

	// slider
	var slider = sliderShow('.slider');
	slider.init();

	// responsive table
	document.querySelector('.dashboard__wraptable').addEventListener('scroll', responsiveTable);

	// grafico
	var canvas = document.querySelector('.infografico');
	var context = canvas.getContext('2d');

	var myChart = new Chart(context, {
		type: 'bar',
		data: {
			labels: ['3 mar', '4 mar', '5 mar', '6 mar'],
			datasets: [{
				label: '',
				data: [10100, 11327, 9321, 10932],
				backgroundColor: ['rgba(127, 246, 51, 1)', 'rgba(127, 246, 51, 1)', 'rgba(127, 246, 51, 1)', 'rgba(127, 246, 51, 1)'],
				borderWidth: 1
			}]
		},
		options: {
			scales: {
				yAxes: [{
					ticks: {
						beginAtZero: true
					}
				}]
			}
		}
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