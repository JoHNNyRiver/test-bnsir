const getFormElements = form => [...form.elements].filter(input => input.type !== 'hidden' && input.nodeName === 'INPUT')
const isEmpty = element => element.filter(element => element.value === '')
const isValid = elements => isEmpty(elements)

function component (message, description) {
	return `
		<div class="notify">
			<h3 class="notify__header">${message}</h3>
			<p class="notify__description">${description}</p>
			<span class="notify__close">&times;</span>
		</div>
	`
}

const infoCard = component('Preencha todos os campos' , 'Campos obrigatŕoios!')

function notify () {
	document.body.insertAdjacentHTML('beforeend', infoCard)
	setTimeout(() => (document.querySelector('.notify').remove()), 2000)
}

if (window.location.pathname === '/login') {
	const form = document.forms['login']
	const elements = getFormElements(form)

	elements.forEach(element => element.addEventListener('blur', addClassLabel))
	form.addEventListener('submit', submitedFrom)
	
	function submitedFrom (event) {
		if (isValid(elements).length > 0) {
			notify()
			isValid(elements)[0].focus()
			event.preventDefault()
		}
	}

	function addClassLabel () {
		this.value !== '' 
		? this.nextElementSibling.classList.add('effectInput') 
		: this.nextElementSibling.classList.remove('effectInput')
	}
}
