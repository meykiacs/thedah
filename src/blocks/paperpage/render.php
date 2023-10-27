<?php

use DI\Container;
use Thedah\Block\Render;

/**
 * @var Container $container
 */
global $container;
$postTypes = ['paper', 'quote'];
$container->get(Render::class)->generalTemplate($postTypes, 'paper', 'Papers', 'paperpage');
