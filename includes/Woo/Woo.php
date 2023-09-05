<?php
declare(strict_types=1);
namespace Woochak\Woo;

use Automattic\WooCommerce\Client;
use DI\Container;

class Woo
{
  private string $woock;
  private string $woocs;
  private array $pageSlugs;
  public function __construct(Container $c)
  {
    $this->woock = $c->get('woo.ck');
    $this->woocs = $c->get('woo.cs');
    $this->pageSlugs['cart'] = $c->get('woo.cartslug');
    $this->pageSlugs['shop'] = $c->get('woo.shopslug');
    $this->pageSlugs['checkout'] = $c->get('woo.checkoutslug');
    $this->pageSlugs['account'] = $c->get('woo.accountslug');
  }

  public function getProductsRest(\WP_REST_Request $request)
  {

    $woocommerce = new Client(
      home_url(),
      $this->woock,
      $this->woocs,
      [
        'version' => 'wc/v3',
      ]
    );
    // Retrieve all request parameters
    // $params = $request->get_params();

    // Build the URL for the WooCommerce Products endpoint
    // $api_url = trailingslashit(get_home_url()) . 'wp-json/wc/v3/products';

    // Append the original request parameters to the API URL
    // $api_url = add_query_arg($params, $api_url);

    // Create the request headers with the API keys
    // $headers = array(
    //   'Authorization' => 'Basic ' . base64_encode($this->woock . ':' . $this->woocs),
    //   'Content-Type' => 'application/json',
    // );

    // Send the request to the WooCommerce Products endpoint with the headers
    $response = $woocommerce->get('products');
    // $response = wp_remote_get($api_url, array('headers' => $headers));

    // Check for errors and return the response
    if (is_wp_error($response)) {
      return new \WP_Error('woocommerce_request_failed', 'Failed to retrieve WooCommerce products.', array('status' => 500));
    } else {
      return $response;
    }
  }

  public function getProducts(\WP_REST_Request $request)
  {
    $params = $request->get_params();

    // Prepare the arguments for wc_get_products()
    $args = array(
      'status' => 'publish',
      'limit' => -1,
    );

    // Map query parameters to wc_get_products() arguments
    if (isset($params['per_page'])) {
      $args['limit'] = absint($params['per_page']);
    }
    if (isset($params['page'])) {
      $args['page'] = absint($params['page']);
    }
    if (isset($params['offset'])) {
      $args['offset'] = absint($params['offset']);
    }
    if (isset($params['orderby'])) {
      $args['orderby'] = sanitize_text_field($params['orderby']);
    }
    if (isset($params['order']) && in_array(strtoupper($params['order']), array('ASC', 'DESC'), true)) {
      $args['order'] = strtoupper($params['order']);
    }
    if (isset($params['category'])) {
      $args['category'] = sanitize_text_field($params['category']);
    }
    if (isset($params['tag'])) {
      $args['tag'] = sanitize_text_field($params['tag']);
    }
    if (isset($params['featured']) && strtolower($params['featured']) === 'true') {
      $args['featured'] = true;
    }
    if (isset($params['on_sale']) && strtolower($params['on_sale']) === 'true') {
      $args['on_sale'] = true;
    }
    if (isset($params['min_price'])) {
      $args['min_price'] = floatval($params['min_price']);
    }
    if (isset($params['max_price'])) {
      $args['max_price'] = floatval($params['max_price']);
    }
    if (isset($params['min_rating'])) {
      $args['min_rating'] = floatval($params['min_rating']);
    }
    if (isset($params['search'])) {
      $args['search'] = sanitize_text_field($params['search']);
    }
    if (isset($params['status'])) {
      $args['status'] = sanitize_text_field($params['status']);
    }

    // Retrieve products using wc_get_products()
    $products = wc_get_products($args);

    // Prepare the response
    $response = array();
    foreach ($products as $product) {
      // Access product data
      $product_data = array(
        'id' => $product->get_id(),
        'name' => $product->get_name(),
        'permalink' => $product->get_permalink(),
        // Add more product properties as needed
      );
      $response[] = $product_data;
    }

    return rest_ensure_response($response);
  }

  public function getColorVariations(int $product_id): array
  {
    $product = wc_get_product($product_id);
    $colors = [];

    if ($product->is_type('variable')) {
      $variations = $product->get_available_variations();
      foreach ($variations as $variation) {
        $variation_id = $variation['variation_id'];
        $variation_product = wc_get_product($variation_id);
        $color = $variation_product->get_attribute('color');
        if (!empty($color)) {
          $colors[] = $color;
        }
      }
    }

    $unique_colors = array_unique($colors);
    return $unique_colors;
  }

  public function getProductInfo(int $product_id): array
  {
    $product = wc_get_product($product_id);
    $brand_terms = wp_get_post_terms($product->get_id(), 'brand');
    if (!empty($brand_terms)) {
      $brand_name = $brand_terms[0]->name;
    } else {
      $brand_name = '';
    }
    return [
      'id' => $product->get_id(),
      'name' => $product->get_name(),
      'imageThumbnail' => wp_get_attachment_image_src($product->get_image_id(), 'woocommerce_thumbnail')[0] ?? '',
      'imageFull' => wp_get_attachment_image_src($product->get_image_id(), 'full')[0] ?? '',
      'description' => $product->get_description(),
      'brand' => $brand_name,
      'category' => wp_get_post_terms($product_id, 'product_cat', array('fields' => 'names')),
      'salePrice' => $product->get_sale_price(),
      'regularPrice' => $product->get_regular_price(),
      'currency'  => get_woocommerce_currency_symbol(),
      'rating' => $product->get_average_rating(),
      'isNew' => boolval(rand(0, 1)),
      'reviews' => [],
      'url' => esc_url(get_permalink($product_id)),
      // This depends on how you want to retrieve reviews
      'num_reviews' => $product->get_review_count(),
      'isInStock' => $product->is_in_stock(),
      'colors' => $this->getColorVariations($product->get_id())
    ];
  }

  private function getPageUrl(string $page): string
  {
    $shop_page_id = wc_get_page_id($page);
    return get_permalink($shop_page_id);
  }

  public function getCartUrl(): string
  {
    return $this->getPageUrl($this->pageSlugs['cart']);
  }

  public function getShopUrl(): string
  {
    return $this->getPageUrl($this->pageSlugs['shop']);
  }

  public function getCheckoutUrl(): string
  {
    return $this->getPageUrl($this->pageSlugs['checkout']);
  }

  public function getAccountUrl(): string
  {
    return $this->getPageUrl($this->pageSlugs['account']);
  }
}