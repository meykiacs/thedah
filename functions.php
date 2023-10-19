<?php

declare(strict_types=1);

use Thedah\Block\Block;
use DI\ContainerBuilder;
use Psr\Container\ContainerInterface;
use Thedah\Auth\Auth;
use Thedah\CPTResource\Model\CPT;
use Thedah\CPTResource\Model\CPTResource;
use Thedah\CPTResource\Service\RegisterCPTResource;
use Thedah\Image\Image;
use Thedah\Models\Meta\AboutMeta;
use Thedah\Models\Meta\BlogMeta;
use Thedah\Models\Meta\BookMeta;
use Thedah\Models\Meta\CourseMeta;
use Thedah\Models\Meta\ImagesMeta;
use Thedah\Models\Meta\PaperMeta;
use Thedah\Rest\Model\Endpoints\EmailPost;
use Thedah\Rest\Model\Route\Route;
use Thedah\Rest\Service\Rest;

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
  'prefix' => DI\value('thedah'),
  'auth.slug'  => 'auth',
  'auth.redirect_url'  => home_url('dashboard'),
  'assets.fonts.url'  =>  get_theme_file_uri('assets/fonts'),
  'assets.images.url'  =>  get_theme_file_uri('assets/images'),
  'node_modules.url'  => get_theme_file_uri('node_modules'),
  'rest.namespace' => DI\value('thedah/v1'),
  'endpoint.email'  => DI\value('email'),
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
        $paperCPT->public = true;
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
        $blogCPT->showUI = true;
        $blogCPT->hasComments = true;
        $blogCPT->metas[] = new ImagesMeta();
        $blogCPT->metas[] = new BlogMeta();
        return new CPTResource($blogCPT);
      },
      'course' => function (ContainerInterface $c) {
        $courseCPT = new CPT('course', 'Course');
        $courseCPT->public = true;
        $courseCPT->hasComments = true;
        $courseCPT->metas[] = new ImagesMeta();
        $courseCPT->metas[] = new CourseMeta();
        return new CPTResource($courseCPT);
      },
      'gallery' => function (ContainerInterface $c) {
        $galleryCPT = new CPT('gallery', 'Gallery');
        $galleryCPT->public = true;
        $galleryCPT->metas[] = new ImagesMeta();
        return new CPTResource($galleryCPT);
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
        $paperCPTFa->public = true;
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
        $blogCPTFa->showUI = true;
        $blogCPTFa->hasComments = true;
        $blogCPTFa->metas[] = new ImagesMeta();
        $blogCPTFa->metas[] = new BlogMeta();
        return new CPTResource($blogCPTFa);
      },
      'course' => function (ContainerInterface $c) {
        $courseCPT = new CPT('coursefa', 'CourseFa');
        $courseCPT->public = true;
        $courseCPT->hasComments = true;
        $courseCPT->metas[] = new ImagesMeta();
        $courseCPT->metas[] = new CourseMeta();
        return new CPTResource($courseCPT);
      },
      'gallery' => function (ContainerInterface $c) {
        $galleryCPT = new CPT('galleryfa', 'Gallery Fa');
        $galleryCPT->public = true;
        $galleryCPT->metas[] = new ImagesMeta();
        return new CPTResource($galleryCPT);
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
  ->add('auth')
  ->add('contactpage')
  ->add('blogpage')
  ->add('coursepage')
  ->add('coursespage')
  ->add('singlepaperpage')
  ->add('searchpage')
  ->register();

$container->get(RegisterCPTResource::class)
  ->add($container->get('resources')['en']['book'])
  ->add($container->get('resources')['en']['paper'])
  ->add($container->get('resources')['en']['about'])
  ->add($container->get('resources')['en']['blog'])
  ->add($container->get('resources')['en']['course'])
  ->add($container->get('resources')['en']['gallery'])
  ->add($container->get('resources')['fa']['book'])
  ->add($container->get('resources')['fa']['paper'])
  ->add($container->get('resources')['fa']['about'])
  ->add($container->get('resources')['fa']['blog'])
  ->add($container->get('resources')['fa']['course'])
  ->add($container->get('resources')['fa']['gallery'])
  ->register();

$container->get(Image::class)->addImageSize('paperLandscape', 390, 300, ['center', 'center'])
->addImageSize('gallerySquare', 250, 268, ['center', 'center']);

$container->get(Auth::class)
  ->redirectNonAdminFromAdminPanel()
  ->removeAdminBarForNonAdmins()
  ->hideAdminBarOnFrontEnd()
  ->changeLoginUrl($container->get('auth.slug'));
// $registerQueryVars = $container->get(RegisterQueryVars::class);

$emailPost = $container->make(EmailPost::class);
$emailRoute = new Route($container->get('rest.namespace'), $container->get('endpoint.email'));
$emailRoute->addEndpoint($emailPost);
$container->get(Rest::class)->addRoute($emailRoute)->register();


add_filter('rest_allow_anonymous_comments', '__return_true');
