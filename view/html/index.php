<?php include_once 'view/default/header.php'; ?>

<!-- stylesheet apenas da pagina login -->
<link rel="stylesheet" href="./public/dist/css/login/login.min.css">

<main class="login">
	<section class="login__box animated fadeIn">
		<header class="login__header">
			<h1>BNSIR</h1>
		</header>

		<form action="/dashboard" class="login__form" name="login" method="post">
			<fieldset>
				<div class="login__field">
					<input type="text" id="login" name="login" required autofocus autocomplete="off">
					<label for="login">login</label>
				</div>

				<div class="login__field">
					<input type="password" id="password" name="password" required>
					<label for="password">Senha</label>
				</div>

				<button class="login__submit">Entrar</button>
			</fieldset>
		</form>

		<footer class="login__footer">
			<a href="/esquecisenha">Esqueceu sua senha?</a>
		</footer>
	</section>
</main>

<?php include_once 'view/default/footer.php'; ?>
