<?php

namespace BNSIR\Controller;

use \Slim\Container;
use \BNSIR\model\ValidaForm;

class HomeController {
	protected $container;

	public function __construct(Container $container) {
		$this->container = $container;
	}

	private final function view($response, $path, $args = []) {
		return $this->container->renderer->render($response, $path, $args);
	}

	public function home($request, $response, $args) {
	    $redirected = $this->container->router->pathFor('login');
	    return $response->withRedirect($redirected);
	}

	public function login($request, $response, array $args) {
	    $this->view($response, '/html/index.php');
	}

	public function dashboard($request, $response, array $args) {
	    $this->view($response, '/html/dashboard.php', ['user' => $_SESSION['user']]);
	}

	public function dashPost($request, $response, array $args) {
	   $validateForm = new ValidaForm;
	   $inputs = $validateForm->validate($_REQUEST);

	   $_SESSION['user'] = $inputs['login'];

	   $redirected = $this->container->router->pathFor('dash');
	   return $response->withRedirect($redirected);
	}
}
