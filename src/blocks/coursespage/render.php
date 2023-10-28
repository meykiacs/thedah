<?php

use DI\Container;
use Thedah\Block\Render;

/**
 * @var Container $container
 */
global $container;

$descriptionTagEn = "Discover the range of courses taught by Professor Afzal al-Sadat Hosseini, renowned for expertise in education and educational psychology.";
$descriptionTagFa = "دوره‌های تدریس‌شده توسط دکتر افضل السادات حسینی، متخصص آموزش و روانشناسی تعلیم و تربیت.";
$titleEn = "Professor Afzal al-Sadat Hosseini's Book List";
$titleFa = "دکتر افضل السادات حسینی - فهرست کتاب‌ها";

$postTypes = ['course', 'quote'];
$container->get(Render::class)->generalTemplate($postTypes, 'course', 'Courses', 'coursespage')->jsonInPre(['en'=> $titleEn, 'fa' => $titleFa], 'title')->jsonInPre(['en' => $descriptionTagEn, 'fa'=> $descriptionTagFa], 'description');
