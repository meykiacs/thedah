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

$direction = str_ends_with($post_type, 'fa') ? 'rtl' : 'ltr';
$language = str_ends_with($post_type, 'fa') ? 'fa' : 'en';
?>
<pre>
</pre>
<div 
id="thedah-four04" 
data-home-url="<?php echo esc_attr(esc_url(home_url('/'))) ?>" 
data-site-title="<?php echo esc_attr((get_bloginfo('name'))) ?>"
data-color-scheme="<?php echo esc_attr($colorScheme); ?>" 
data-prefix="thedah" 
data-direction="<?php echo esc_attr($direction); ?>"


>
</div>