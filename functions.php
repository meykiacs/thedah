<?php
declare(strict_types=1);
use Thedah\Block\Block;
use Woochak\Rest\Model\Endpoints\ProductsGet;
use Woochak\Rest\Model\Route\Route;
use Woochak\Rest\Service\Rest;
use DI\ContainerBuilder;
use Woochak\Taxonomy\Model\MetaBoxTaxonomy;
use Woochak\Taxonomy\Model\Taxonomy;
use Woochak\Taxonomy\Service\MetaBoxTaxonomyController;
use Woochak\Taxonomy\Service\TaxonomyController;

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

require __DIR__ . '/vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

$containerBuilder = new ContainerBuilder();
$containerBuilder->addDefinitions([
  'block.dirpath' => get_theme_file_path('build/blocks/'),
  'plugin.filepath' => get_theme_file_path(),
  'rest.namespace' => 'thedah/v1',
]);

$container = $containerBuilder->build();

$container->get(Block::class)->add('bookpage')->register();

// $productsGet = $container->make(ProductsGet::class);
// $productsRoute = new Route($container->get('rest.namespace'), 'products');
// $productsRoute->addEndpoint($productsGet);
// $container->get(Rest::class)->addRoute($productsRoute)->register();
// $brandTaxonomy = new Taxonomy('brand', 'product');
// $brandTaxonomy->setSemiAutoLabels();
// $container->get(TaxonomyController::class)->addTaxonomy($brandTaxonomy)->register()->addMetaBox($brandTaxonomy);
