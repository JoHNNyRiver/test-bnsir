<?php

// Metodos GET
$app->get('/', 'HomeController:home');
$app->get('/dashboard', 'HomeController:dashboard')->setName('dash');
$app->get('/login', 'HomeController:login')->setName('login');

// metodos POST
$app->post('/dashboard', 'HomeController:dashPost')->setName('login');

