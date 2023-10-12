<?php

use DI\Container;
use Thedah\Block\Render;

/**
 * @var Container $container
 */
global $container;
$postTypes = ['paper'];
$container->get(Render::class)->generalTemplate($postTypes, 'paper', 'Papers', 'paperpage');
