<?php

use DI\Container;
use Thedah\Block\Render;

/**
 * @var Container $container
 */
global $container;
$descriptionTagEn = "Homepage of Professor Afzal al-Sadat Hosseini, renowned for expertise in education and educational psychology. Find publications, course materials, and more resources.";
$descriptionTagFa = "صفحه اصلی دکتر افضل السادات حسینی، متخصص آموزش و روانشناسی تعلیم و تربیت. کتاب ها، مقالات، و مطالب مربوط ایشان و بیشتر";
$titleEn = "Professor Afzal al-Sadat Hosseini's Homepage";
$titleFa = "دکتر افضل السادات حسینی - صفحه اصلی";

$postTypes = ['about', 'paper', 'book', 'blog', 'gallery', 'slider'];
$container->get(Render::class)->generalTemplate($postTypes, 'home', 'Home', 'homepage')->recentPosts()->jsonInPre(['en' => $titleEn, 'fa' => $titleFa], 'title')->jsonInPre(['en' => $descriptionTagEn, 'fa'  => $descriptionTagFa], 'description');
