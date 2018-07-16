function animate ({ who, where, clazz }) {
	document.querySelector(who).addEventListener('animationend', event => {
		document.querySelector(where).classList.add(clazz)
	})
}

function csvInObject () {
	const store = {}
	store.result = []

	function csvInArray (csv) {
		return csv.split(/\n/)
	}

	function getCsvHeader (csvArray) {
		return csvArray[0].split(';')
	}

	store.getCsv = uri => {
		return axios.get(uri)
			.then(response => response.data)
			.then(csvInArray)
	}

	store.transformInObject = data => {
		const header = getCsvHeader(data)

		data.forEach((info, index) => {
			if (index > 0) {
				const obj = {}
				const current = data[index].split(';')
				
				header.forEach((item, sindex) => (obj[item] = current[sindex]))
				store.result.push(obj)
			}
		})
	}

	store.mountHtml = target => {
		store.result.slice(0, 3).forEach(info => {
			target.insertAdjacentHTML('beforeend', `
					<tr>
						<td>${info.titulo}</td>
						<td>${info.anoConclusaoObra}</td>
						<td>${info.logradouro}</td>
						<td>${info.numero}</td>
						<td>${info.bairro}</td>
					</tr>
			`)
		})
	}

	return store
}

function initMap () {
  const myLatLng = {lat: -23.574242, lng: -46.686359}

  const map = new google.maps.Map(document.getElementById('map'), {
    center: myLatLng,
    zoom: 13
  })
	
	function addMarker ({ lat = -23.574242, lng = -46.686359 }) {
		const marker = new google.maps.Marker({
	    map: map,
	    position: {
	    	lat,
	    	lng
	    },
	  })
	}

	addMarker({ lat: -23.574242, lng: -46.686359 })

	const letLng = csvInObject()

	letLng.getCsv('/data/dados_teste.csv')
		.then(letLng.transformInObject)
	
	setTimeout(() => {
		letLng.result.forEach(item => addMarker({ lat: Number(item.lat), lng: Number(item.lng) }))
	}, 500)
}


function responsiveTable (event) {
	const table = this.querySelector('table')
	const left = table.getBoundingClientRect().left
	const initLeft = table.offsetLeft
	const currentValue = left - initLeft

	if (this.scrollLeft * -1 < -0) {
		this.style.boxShadow = 'inset 1px -1px 25px 3px rgba(0,0,0,0.2)'
	} else {
		this.style.boxShadow = 'inset -5px -1px 20px rgba(0, 0, 0, .2)'
	}
}


/**
 * simples slidershow
 */
function sliderShow (target) {
	const scope = {}

	let count = 0

	const elem = document.querySelector(target)
	const totalLength = [...elem.children].length

	const slidercontrols = document.querySelector('.slidercontrols')
	const back = slidercontrols.querySelector('.backcontrol')
	const next = slidercontrols.querySelector('.nextcontrol')
	const listControl = slidercontrols.querySelector('.listcontrol')
	const childListControl = [...listControl.children]

	next.addEventListener('click', event => {
		count++

		if (count >= totalLength) {
			childListControl[0].click()
			count = 0
			return
		}

		childListControl[count].click()
	})

	back.addEventListener('click', event => {
		count--

		if (count < 0) {
			childListControl[totalLength - 1].click()
			count = totalLength - 1
			return
		}

		childListControl[count].click()
	})

	function eventClickLi (event) {
		const current = parseInt(event.target.innerHTML) - 1
		const currentEl = document.querySelectorAll('.sliderShow .wrapSliderShow .contentslider')[current]
		const wrap = document.querySelector('.sliderShow .wrapSliderShow')
		const li = document.querySelector('.listcontrol li.active')
		const actived = wrap.querySelector('.sliderShow .wrapSliderShow .active')

		wrap.style.transform = `translateY(-${currentEl.offsetHeight * current}px)`

		actived.classList.remove('active')
		currentEl.classList.add('active')

		li.classList.remove('active')
		event.target.classList.add('active')
	}

	childListControl.forEach(li => li.addEventListener('click', eventClickLi))
	scope.init = () => mountHtml(elem)

	function mountHtml (el) {
		el.innerHTML = component(el)
	}

	/**
	 * montando o layout padrão do slide
	 * @param  {Object} el
	 * @return {String}
	 * @private
	 */
	function component (el) {
		return `
			<div class="sliderShow">
				<div class="wrapSliderShow">
					${el.innerHTML}
				</div>
			</div>
		`
	}

	return scope
}


if (window.location.pathname === '/dashboard') {
	animate({who: '.sidebar', where: 'main.dashboard', clazz: 'fadeIn'})

	new DualRange('.dashboard__cardsselector', event => {
		document.querySelector('.min').textContent = `${event.min} m²`
    	document.querySelector('.max').textContent = `${event.max} m²`
	})

	// csv
	const csv = csvInObject()
	csv.getCsv('/data/dados_teste.csv')
		.then(csv.transformInObject)

	setTimeout(() => {
		csv.mountHtml(document.querySelector('.dashboard__wraptable tbody'))
	}, 500)

	// slider
	const slider = sliderShow('.slider')
	slider.init()

	// responsive table
	document.querySelector('.dashboard__wraptable').addEventListener('scroll', responsiveTable)

	// grafico
	const canvas = document.querySelector('.infografico')
	const context = canvas.getContext('2d')

	const myChart = new Chart(context, {
    type: 'bar',
    data: {
        labels: ['3 mar', '4 mar', '5 mar', '6 mar'],
        datasets: [{
            label: '',
            data: [10100, 11327, 9321, 10932],
            backgroundColor: [
                'rgba(127, 246, 51, 1)',
                'rgba(127, 246, 51, 1)',
                'rgba(127, 246, 51, 1)',
                'rgba(127, 246, 51, 1)',
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
	})
}