<?php
use DI\Container;

/**
 * @var Container $container
 */
global $container;
$books = [];
// $shop_page_id = wc_get_page_id('shop');
// $shop_page_url = get_permalink($shop_page_id);
?>
<div 
  id="thedah-crudbookpage"
  data-is-rtl="<?php echo esc_attr(is_rtl()); ?>"
  data-home-url="<?php echo esc_attr(esc_url(home_url('/'))) ?>"
  data-site-title="<?php echo esc_attr((get_bloginfo('name'))) ?>"
  data-book-rest-url="<?php echo esc_attr(get_rest_url(null, "/wp/v2/" . $container->get('prefix') . '_book')); ?>"
  data-media-rest-url="<?php echo esc_attr(get_rest_url(null, "/wp/v2/media")); ?>"
  data-rest-nonce="<?php echo esc_attr(wp_create_nonce('wp_rest')); ?>"

>
</div>

<pre style="display: none !important" id="books">
	<?php echo wp_json_encode(array_values($books)); ?>
</pre>