<?php include_once 'view/default/header.php'; ?>

<!-- stylesheet dashboard -->
<link rel="stylesheet" href="./public/dist/css/dashboard/dashboard.min.css">
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

		<form action="#" class="dashboard__searchform">
			<input type="text" id="search" placeholder="Busca por bairro, ano ou logradouro">
			<label for="search" class="fa fa-search"></label>
		</form>
	</section>

	<section class="dashboard__cards">
		<div class="dashboard__cardinfomoveis"></div>
		<div class="dashboard__cardinfomoveis"></div>
		<div class="dashboard__cardinfomoveis"></div>
		<div class="dashboard__cardinfomoveis"></div>
	</section>
</main>

<?php include_once 'view/default/footer.php'; ?>