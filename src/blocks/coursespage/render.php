<?php

use DI\Container;
use Thedah\Block\Render;

/**
 * @var Container $container
 */
global $container;
$postTypes = ['course'];
$container->get(Render::class)->generalTemplate($postTypes, 'course', 'Courses', 'coursespage');
