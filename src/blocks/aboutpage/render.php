<?php

use DI\Container;
use Thedah\Block\Render;

/**
 * @var Container $container
 */
global $container;
$postTypes = ['about'];
$container->get(Render::class)->generalTemplate($postTypes, 'about', 'About', 'aboutpage');
