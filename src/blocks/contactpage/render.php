<?php

use DI\Container;
use Thedah\Block\Render;

/**
 * @var Container $container
 */
global $container;

$descriptionTagEn = "Get in touch with Professor Afzal al-Sadat Hosseini, renowned for expertise in education and educational psychology.";
$descriptionTagFa = "با دکتر افضل السادات حسینی، متخصص آموزش و روانشناسی تعلیم و تربیت، تماس بگیرید.";
$titleEn = "Professor Afzal al-Sadat Hosseini's Contact Page";
$titleFa = "دکتر افضل السادات حسینی - تماس با من";


$postTypes = [];
$container->get(Render::class)->generalTemplate($postTypes, 'contact', 'Contact', 'contactpage')->jsonInPre(['en'=> $titleEn, 'fa' => $titleFa], 'title')->jsonInPre(['en' => $descriptionTagEn, 'fa'=> $descriptionTagFa], 'description');

if (function_exists("tds_render")) {
  tds_render();
}