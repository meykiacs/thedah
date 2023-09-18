<?php
declare(strict_types=1);
use Thedah\Block\Block;
use DI\ContainerBuilder;
use Thedah\CPTResource\Model\CPT;
use Thedah\CPTResource\Model\CPTResource;
use Thedah\CPTResource\Service\RegisterCPTResource;
use Thedah\Models\Meta\BookMeta;
use Thedah\Models\Meta\PaperMeta;

function thedah_woocommerce_support()
{
  add_theme_support('woocommerce');
}
add_action('after_setup_theme', 'thedah_woocommerce_support');


// Disable woocommerce styles
add_filter('woocommerce_enqueue_styles', '__return_false');

/**
 * Disable WooCommerce block styles (front-end).
 */
function thedah_disable_woocommerce_block_styles()
{
  wp_dequeue_style('wc-blocks-style');
}
add_action('wp_enqueue_scripts', 'thedah_disable_woocommerce_block_styles');


//Disable gutenberg style in Front
function wps_deregister_styles()
{
  wp_dequeue_style('wp-block-library');
}
add_action('wp_print_styles', 'wps_deregister_styles', 100);


// Disable global-styles-inline-css
add_action('wp_enqueue_scripts', 'remove_global_styles');
function remove_global_styles()
{
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
  'assets.images.url'  =>  get_theme_file_uri('assets/images')
]);

$container = $containerBuilder->build();

$container->get(Block::class)->add('bookpage')
  ->add('dashboard')
  ->add('paperpage')
  ->register();

$bookCPT = new CPT('book', 'Book');
$bookCPTFa = new CPT('bookfa', 'BookFa');
$bookCPT->metas[] = new BookMeta();
$bookCPTFa->metas[] = new BookMeta();
$bookCPTResource = new CPTResource($bookCPT);
$bookCPTFaResource = new CPTResource($bookCPTFa);

$paperCPT = new CPT('paper', 'Paper');
$paperCPTFa = new CPT('paperfa', 'PaperFa');
$paperCPT->metas[] = new PaperMeta();
$paperCPTFa->metas[] = new PaperMeta();
$paperCPTResource = new CPTResource($paperCPT);
$paperCPTFaResource = new CPTResource($paperCPTFa);

$container->get(RegisterCPTResource::class)
->add($bookCPTResource)
->add($bookCPTFaResource)
->add($paperCPTResource)
->add($paperCPTFaResource)
->register();

// $productsGet = $container->make(ProductsGet::class);
// $productsRoute = new Route($container->get('rest.namespace'), 'products');
// $productsRoute->addEndpoint($productsGet);
// $container->get(Rest::class)->addRoute($productsRoute)->register();
// $brandTaxonomy = new Taxonomy('brand', 'product');
// $brandTaxonomy->setSemiAutoLabels();
// $container->get(TaxonomyController::class)->addTaxonomy($brandTaxonomy)->register()->addMetaBox($brandTaxonomy);
