<?php

use DI\Container;
use Thedah\Block\Render;

/**
 * @var Container $container
 */
global $container;
$postTypes = ['book', 'quote'];
$container->get(Render::class)->generalTemplate($postTypes, 'book', 'Books', 'bookpage');
