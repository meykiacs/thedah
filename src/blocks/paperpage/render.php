<?php

use DI\Container;
use Thedah\Block\Render;

/**
 * @var Container $container
 */
global $container;

$descriptionTagEn = "Browse the extensive list of research papers by Professor Afzal al-Sadat Hosseini, renowned for expertise in education and educational psychology.";
$descriptionTagFa = "فهرست مقالات نوشته شده توسط دکتر افضل السادات حسینی، متخصص آموزش و روانشناسی تعلیم و تربیت.";
$titleEn = "Professor Afzal al-Sadat Hosseini's Research Papers";
$titleFa = "دکتر افضل السادات حسینی - مقالات تحقیقاتی";


$postTypes = ['paper', 'quote'];
$container->get(Render::class)->generalTemplate($postTypes, 'paper', 'Papers', 'paperpage', 12)->jsonInPre(['en' => $titleEn, 'fa' => $titleFa], 'title')->jsonInPre(['en' => $descriptionTagEn, 'fa' => $descriptionTagFa], 'description');
