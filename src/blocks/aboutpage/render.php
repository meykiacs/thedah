<?php

use DI\Container;
use Thedah\Block\Render;

/**
 * @var Container $container
 */
global $container;

$descriptionTagEn = "Learn more about Professor Afzal al-Sadat Hosseini, renowned for expertise in education and educational psychology.";
$descriptionTagFa = "درباره دکتر افضل السادات حسینی، متخصص آموزش و روانشناسی تعلیم و تربیت بیشتر بدانید.";
$titleEn = "Professor Afzal al-Sadat Hosseini - About";
$titleFa = "دکتر افضل السادات حسینی - درباره";


$postTypes = ['about'];
$container->get(Render::class)->generalTemplate($postTypes, 'about', 'About', 'aboutpage')->jsonInPre(['en'=> $titleEn, 'fa' => $titleFa], 'title')->jsonInPre(['en' => $descriptionTagEn, 'fa'=> $descriptionTagFa], 'description');
