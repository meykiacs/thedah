<?php

declare(strict_types=1);

use Thedah\Block\Block;
use DI\ContainerBuilder;
use Psr\Container\ContainerInterface;
use Thedah\CPTResource\Model\CPT;
use Thedah\CPTResource\Model\CPTResource;
use Thedah\CPTResource\Service\RegisterCPTResource;
use Thedah\Models\Meta\AboutMeta;
use Thedah\Models\Meta\BlogMeta;
use Thedah\Models\Meta\BookMeta;
use Thedah\Models\Meta\ImagesMeta;
use Thedah\Models\Meta\PaperMeta;

function thedah_woocommerce_support() {
  add_theme_support('woocommerce');
}
add_action('after_setup_theme', 'thedah_woocommerce_support');


// Disable woocommerce styles
add_filter('woocommerce_enqueue_styles', '__return_false');

/**
 * Disable WooCommerce block styles (front-end).
 */
function thedah_disable_woocommerce_block_styles() {
  wp_dequeue_style('wc-blocks-style');
}
add_action('wp_enqueue_scripts', 'thedah_disable_woocommerce_block_styles');


//Disable gutenberg style in Front
function wps_deregister_styles() {
  wp_dequeue_style('wp-block-library');
}
add_action('wp_print_styles', 'wps_deregister_styles', 100);


// Disable global-styles-inline-css
add_action('wp_enqueue_scripts', 'remove_global_styles');
function remove_global_styles() {
  wp_dequeue_style('global-styles');
}

define('TEXTDOMAIN', 'thedah');
require __DIR__ . '/vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

$containerBuilder = new ContainerBuilder();
$containerBuilder->addDefinitions([
  'block.dirpath' => get_theme_file_path('build/blocks/'),
  'rest.namespace' => 'thedah/v1',
  'prefix'  => 'thedah',
  'assets.fonts.url'  =>  get_theme_file_uri('assets/fonts'),
  'assets.images.url'  =>  get_theme_file_uri('assets/images'),
  'node_modules.url'  => get_theme_file_uri('node_modules'),
  'query_vars' => ['lang'],
  'resources' => [
    'en' => [
      'book' => function (ContainerInterface $c) {
        $bookCPT = new CPT('book', 'Book');
        $bookCPT->metas[] = new BookMeta();
        $bookCPT->metas[] = new ImagesMeta();
        return new CPTResource($bookCPT);
      },
      'paper' => function (ContainerInterface $c) {
        $paperCPT = new CPT('paper', 'Paper');
        $paperCPT->metas[] = new PaperMeta();
        $paperCPT->metas[] = new ImagesMeta();
        return new CPTResource($paperCPT);
      },
      'about' => function (ContainerInterface $c) {
        $aboutCPT = new CPT('about', 'About');
        $aboutCPT->metas[] = new AboutMeta();
        return new CPTResource($aboutCPT);
      },
      'blog' => function (ContainerInterface $c) {
        $blogCPT = new CPT('blog', 'Blog Post');
        $blogCPT->public = true;
        $blogCPT->metas[] = new ImagesMeta();
        $blogCPT->metas[] = new BlogMeta();
        return new CPTResource($blogCPT);
      },
    ],
    'fa' => [

      'book' => function (ContainerInterface $c) {
        $bookCPTFa = new CPT('bookfa', 'BookFa');
        $bookCPTFa->metas[] = new BookMeta();
        $bookCPTFa->metas[] = new ImagesMeta();
        return new CPTResource($bookCPTFa);
      },
      'paper' => function (ContainerInterface $c) {
        $paperCPTFa = new CPT('paperfa', 'PaperFa');
        $paperCPTFa->metas[] = new PaperMeta();
        $paperCPTFa->metas[] = new ImagesMeta();
        return new CPTResource($paperCPTFa);
      },
      'about' => function (ContainerInterface $c) {
        $aboutCPTFa = new CPT('aboutfa', 'AboutFa');
        $aboutCPTFa->metas[] = new AboutMeta();
        return new CPTResource($aboutCPTFa);
      },
      'blog' => function (ContainerInterface $c) {
        $blogCPTFa = new CPT('blogfa', 'Blog Post Fa');
        $blogCPTFa->public = true;
        $blogCPTFa->metas[] = new ImagesMeta();
        $blogCPTFa->metas[] = new BlogMeta();
        return new CPTResource($blogCPTFa);
      },
    ]
  ]
]);

$container = $containerBuilder->build();

$container->get(Block::class)->add('bookpage')
  ->add('dashboard')
  ->add('paperpage')
  ->add('aboutpage')
  ->add('homepage')
  ->register();

$container->get(RegisterCPTResource::class)
  ->add($container->get('resources')['en']['book'])
  ->add($container->get('resources')['en']['paper'])
  ->add($container->get('resources')['en']['about'])
  ->add($container->get('resources')['en']['blog'])
  ->add($container->get('resources')['fa']['book'])
  ->add($container->get('resources')['fa']['paper'])
  ->add($container->get('resources')['fa']['about'])
  ->add($container->get('resources')['fa']['blog'])
  ->register();

// $registerQueryVars = $container->get(RegisterQueryVars::class);