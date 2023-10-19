<?php
if (!function_exists('str_ends_with')) {
  function str_ends_with(string $haystack, string $needle): bool {
    $needle_len = strlen($needle);
    return ($needle_len === 0 || 0 === substr_compare($haystack, $needle, -$needle_len));
  }
}

use DI\Container;

/**
 * @var Container $container
 */
global $container;
$colorScheme = empty($_COOKIE['colorscheme']) ? 'dark' : $_COOKIE['colorscheme'];

?>
  <?php
  global $wp_query;
  $posts = [];

  if ($wp_query->have_posts()) {
    // Loop through the posts.
    while ($wp_query->have_posts()) {
      $wp_query->the_post();
      
      $postType = get_post_type();
      $title = get_the_title();
      $permalink = get_permalink();
      $posts[] = compact('postType', 'title', 'permalink');
    }
  }
  ?>
<div id="thedah-searchpage"
data-posts="<?php echo esc_attr(wp_json_encode($posts, JSON_HEX_TAG)); ?>"
data-home-url="<?php echo esc_attr(esc_url(home_url('/'))) ?>" 
data-site-title="<?php echo esc_attr((get_bloginfo('name'))) ?>"
data-media-rest-url="<?php echo esc_attr(get_rest_url(null, "/wp/v2/media")); ?>"
data-rest-nonce="<?php echo esc_attr(wp_create_nonce('wp_rest')); ?>"
data-assets-fonts-url="<?php echo esc_attr(($container->get('assets.fonts.url'))) ?>"
data-assets-images-url="<?php echo esc_attr(($container->get('assets.images.url'))) ?>"
data-color-scheme="<?php echo esc_attr($colorScheme); ?>" 
data-prefix="thedah" 
data-newsletter-rest-url="<?php echo esc_attr(get_rest_url(null, 'tdnewsletter/v1/subscribe')) ?>"
data-search-query="<?php echo esc_attr(get_search_query()); ?>"
style="min-height: 100%"
>
</div>