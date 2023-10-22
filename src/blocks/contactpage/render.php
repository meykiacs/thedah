<?php

use DI\Container;
use Thedah\Block\Render;

/**
 * @var Container $container
 */
global $container;
$postTypes = [];
$container->get(Render::class)->generalTemplate($postTypes, 'contact', 'Contact', 'contactpage');

if (function_exists("tds_render")) {
  tds_render();
}