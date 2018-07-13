<?php

$app->get('/', 'HomeController:home');
$app->get('/dashboard', 'HomeController:dashboard');
$app->get('/login', 'HomeController:login')->setName('login');
