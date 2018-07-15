<?php include_once 'view/default/header.php'; ?>

<!-- stylesheet dashboard -->
<link rel="stylesheet" href="./public/dist/css/dashboard/dashboard.min.css">
<link rel="stylesheet" href="https://cdn.rawgit.com/figuarnieri/dualrange/master/dualrange.min.css" /> 
<link rel="stylesheet" href="./public/dist/css/fontawesome-all.min.css">

<aside class="sidebar animated slideInLeft">
	<header class="sidebar__header">
		<h3>BNSIR</h3>
	</header>

	<section class="sidebar__avatar avatar">
		<figure class="avatar__thumb">
			<img src="http://iekairos.com.br/wp-content/uploads/2016/01/tutor-8.jpg" alt="thumbnail">
		</figure>

		<div class="avatar__name">
			<h1><?= $user ?></h1>
		</div>
	</section>

	<section class="sidebar__bio">
		<h2>BIO</h2>

		<article class="sidebar__text">
			<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime soluta expedita rem excepturi perferendis voluptatem consequatur adipisci rerum.</p>
		</article>
	</section>

	<section class="sidebar__socialnetwork">
		<nav>
			<ul>
				<li><a href="#" target="_blank"><i class="fab fa-facebook-f"></i></a></li>
				<li><a href="#" target="_blank"><i class="fab fa-twitter"></i></a></li>
				<li><a href="#" target="_blank"><i class="fab fa-youtube"></i></a></li>
			</ul>
		</nav>
	</section>
</aside>

<main class="dashboard animated">
	<header class="dashboard__header">
		<h2>Dashboard</h2>
	</header>

	<section class="dashboard__info">
		
		<div class="dashboard__infocard">
			<h2>20.440</h2>
			<h3>casas</h3>
		</div>

		<div class="dashboard__infocard">
			<h2>10.940</h2>
			<h3>apartamentos</h3>
		</div>

		<div class="dashboard__infocard">
			<h2>3.040</h2>
			<h3>coberturas</h3>
		</div>

	</section>

	<section class="dashboard__search">
		<h2>Busca</h2>

		<form action="#" class="dashboard__searchform" method="post">
			<input type="search" id="search" placeholder="Busca por bairro, ano ou logradouro" required autocomplete="off">
			<label for="search" class="fa fa-search"></label>
		</form>
	</section>

	<section class="dashboard__cards">
		<div class="dashboard__cardinfomoveis">
			<h2>Área M²</h2>

			<input type="range" name="Range" class="dashboard__cardsselector" step="1" min="0" max="1000" />

			<div class="dashboard__cardsqtd">
				<span class="min">0 m²</span>
				<span class="max">1.000 m²</span>
			</div>
		</div>
		<div class="dashboard__cardinfomoveis"></div>
		<div class="dashboard__cardinfomoveis"></div>
		<div class="dashboard__cardinfomoveis"></div>
	</section>
</main>

<!-- scripts da dashboard -->
<script src="https://cdn.rawgit.com/figuarnieri/dualrange/master/dualrange.min.js"></script> 
<script src="./public/dist/js/chart.min.js" async></script>

<?php include_once 'view/default/footer.php'; ?>