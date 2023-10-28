<?php

use DI\Container;
use Thedah\Block\Render;

/**
 * @var Container $container
 */
global $container;

$descriptionTagEn = "Explore the comprehensive list of books authored by Professor Afzal al-Sadat Hosseini, renowned for expertise in education and educational psychology.";
$descriptionTagFa = "کتاب‌های نوشته شده توسط دکتر افضل السادات حسینی، متخصص آموزش و روانشناسی تعلیم و تربیت.";
$titleEn = "Professor Afzal al-Sadat Hosseini's Book List";
$titleFa = "دکتر افضل السادات حسینی - فهرست کتاب‌ها";


$postTypes = ['book', 'quote'];
$container->get(Render::class)->generalTemplate($postTypes, 'book', 'Books', 'bookpage')->jsonInPre(['en'=> $titleEn, 'fa' => $titleFa], 'title')->jsonInPre(['en' => $descriptionTagEn, 'fa'=> $descriptionTagFa], 'description');
