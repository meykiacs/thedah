<?php

use DI\Container;
use Thedah\Block\Render;

/**
 * @var Container $container
 */
global $container;
$postTypes = ['course', 'quote'];
$container->get(Render::class)->generalTemplate($postTypes, 'course', 'Courses', 'coursespage');
