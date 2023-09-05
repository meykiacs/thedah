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
  id="thedah-bookpage"
  data-is-rtl="<?php echo esc_attr(is_rtl()); ?>"
  data-home-url="<?php echo esc_attr(esc_url(home_url('/'))) ?>"
  data-site-title="<?php echo esc_attr((get_bloginfo('name'))) ?>"
>
</div>

<pre style="display: none !important" id="books">
	<?php echo wp_json_encode(array_values($books)); ?>
</pre>