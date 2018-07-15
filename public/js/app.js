function animate ({ who, where, clazz }) {
	document.querySelector(who).addEventListener('animationend', event => {
		document.querySelector(where).classList.add(clazz)
	})
}

if (window.location.pathname === '/dashboard') {
	animate({who: '.sidebar', where: 'main.dashboard', clazz: 'fadeIn'})

	new DualRange('.dashboard__cardsselector', event => {
		document.querySelector('.min').textContent = `${event.min} m²`
    	document.querySelector('.max').textContent = `${event.max} m²`
	})
}