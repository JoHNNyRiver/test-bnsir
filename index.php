<?php

use \BNSIR\Controller\HomeController;
use Slim\Views\PhpRenderer;
use \Slim\App;

require_once 'vendor/autoload.php';

$app = new App([
	'settings' => [
		'displayErrorDetails' => true
	]
]);

$container = $app->getContainer();
$container['renderer'] = new PhpRenderer("./view");
$container['HomeController'] = function ($container){
	return new HomeController($container);
};

require_once './routes/default.php';

$app->run();
