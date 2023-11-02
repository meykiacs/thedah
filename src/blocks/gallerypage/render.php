<?php

use DI\Container;
use Thedah\Block\Render;

/**
 * @var Container $container
 */
global $container;

$descriptionTagEn = "Explore the gallery of Professor Professor Afzal al-Sadat Hosseini renowned for expertise in education and educational psychology, showcasing a rich collection of research moments, academic events, and memorable interactions with students.";
$descriptionTagFa = "گالری دکتر افضل السادات حسینی، متخصص آموزش و روانشناسی تعلیم و تربیت. مجموعه‌ای از لحظه‌های تحقیق، رویدادهای آموزشی و تعاملات به‌یادماندنی با دانشجویان.";
$titleEn = "Professor Afzal al-Sadat Hosseini's Gallery";
$titleFa = "دکتر افضل السادات حسینی - گالری تصاویر";

$postTypes = ['gallery'];
$container->get(Render::class)->generalTemplate($postTypes, 'gallery', 'Gallery', 'gallerypage')->jsonInPre(['en'=> $titleEn, 'fa' => $titleFa], 'title')->jsonInPre(['en' => $descriptionTagEn, 'fa'=> $descriptionTagFa], 'description');
