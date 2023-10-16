<?php
if (!function_exists('str_ends_with')) {
  function str_ends_with(string $haystack, string $needle): bool {
      $needle_len = strlen($needle);
      return ($needle_len === 0 || 0 === substr_compare($haystack, $needle, - $needle_len));
  }
}
$post_id = get_the_ID(); // replace this with your post ID if not inside The Loop
$author_id = get_post_field('post_author', $post_id);
$author = get_the_author_meta('display_name', $author_id);

use DI\Container;
use Thedah\Block\Render;

/**
 * @var Container $container
 */
global $container;
$colorScheme = empty($_COOKIE['colorscheme']) ? 'dark' : $_COOKIE['colorscheme'];

$post_type = get_post_type();
$direction = str_ends_with($post_type, 'fa') ? 'rtl' : 'ltr';
$language = str_ends_with($post_type, 'fa') ? 'fa' : 'en';
$imageUrls = get_post_meta(get_the_ID(), '_thedah_images', true);
$linkToFeature = get_post_meta(get_the_ID(), '_thedah_blog', true)['linkToFeature'] ?? null;
$feature = get_post_meta(get_the_ID(), '_thedah_blog', true)['feature'];
$dateTime = get_post_time('c', true, get_the_ID());
?>
<pre>
<?php 
  // var_dump($imageUrls);wp_die();
 ?>
</pre>

<div 
id="thedah-blogpage" 
data-home-url="<?php echo esc_attr(esc_url(home_url('/'))) ?>" 
data-site-title="<?php echo esc_attr((get_bloginfo('name'))) ?>"
data-media-rest-url="<?php echo esc_attr(get_rest_url(null, "/wp/v2/media")); ?>"
data-comments-rest-url="<?php echo esc_attr(get_rest_url(null, "/wp/v2/comments")); ?>"
data-post-id="<?php echo esc_attr(get_the_ID()); ?>"
data-rest-nonce="<?php echo esc_attr(wp_create_nonce('wp_rest')); ?>"
data-assets-fonts-url="<?php echo esc_attr(($container->get('assets.fonts.url'))) ?>"
data-assets-images-url="<?php echo esc_attr(($container->get('assets.images.url'))) ?>"
data-post-title="<?php echo esc_attr(esc_html(get_the_title())); ?>"
data-color-scheme="<?php echo esc_attr($colorScheme); ?>" 
data-prefix="thedah" 
data-newsletter-rest-url="<?php echo esc_attr(get_rest_url(null, 'tdnewsletter/v1/subscribe')) ?>"
data-direction="<?php echo esc_attr($direction); ?>"
data-language="<?php echo esc_attr($language); ?>"
data-images="<?php echo esc_attr(wp_json_encode($imageUrls, JSON_HEX_TAG)); ?>"
data-link-to-feature="<?php echo esc_attr($linkToFeature); ?>"
data-feature="<?php echo esc_attr($feature); ?>"
data-content="<?php echo esc_attr(wp_json_encode(get_the_content(), JSON_HEX_TAG)); ?>"
data-date-time="<?php echo esc_attr($dateTime) ?>"
data-author="<?php echo esc_attr($author) ?>"
>
</div>