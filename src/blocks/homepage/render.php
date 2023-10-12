<?php

use DI\Container;
use Thedah\Block\Render;

/**
 * @var Container $container
 */
global $container;
$postTypes = ['about', 'paper', 'book', 'blog', 'gallery'];
$container->get(Render::class)->generalTemplate($postTypes, 'home', 'Home', 'homepage')->recentPosts();
