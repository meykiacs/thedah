<?php

use DI\Container;

/**
 * @var Container $container
 */
global $container;

$papersEn = [];
$papersFa = [];

$query = new WP_Query(
  [
    'post_type' => 'thedah_paperfa',
    'posts_per_page' => -1,
  ]
);

if ($query->have_posts()) {
  while ($query->have_posts()) {
    $query->the_post();
    $id = get_the_ID();
    $paper = array(
      'id' => get_the_ID(),
      'type' => get_post_type(get_the_ID()),
      'title' => get_the_title(),
      'content' => get_the_content(),
      'featured_image_url' => get_the_post_thumbnail_url($id, 'full'),
      'featured_image_id' => get_post_thumbnail_id($id),
      'meta' => ['_thedah_paper' => get_post_meta($id, '_thedah_paper', true)],
    );
    array_push($papersFa, $paper);
  }
}
wp_reset_query();

?>
<div id="thedah-paperpage" 
  data-home-url="<?php echo esc_attr(esc_url(home_url('/'))) ?>"
  data-site-title="<?php echo esc_attr((get_bloginfo('name'))) ?>"
  data-paper-rest-url-en="<?php echo esc_attr(get_rest_url(null, "/wp/v2/" . $container->get('prefix') . '_paper')); ?>"
  data-paper-rest-url-fa="<?php echo esc_attr(get_rest_url(null, "/wp/v2/" . $container->get('prefix') . '_paperfa')); ?>"
  data-media-rest-url="<?php echo esc_attr(get_rest_url(null, "/wp/v2/media")); ?>"
  data-rest-nonce="<?php echo esc_attr(wp_create_nonce('wp_rest')); ?>"
  data-assets-fonts-url="<?php echo esc_attr(($container->get('assets.fonts.url'))) ?>"
  data-assets-images-url="<?php echo esc_attr(($container->get('assets.images.url'))) ?>" 
  data-papers-en-fetched=""
  data-papers-fa-fetched="1"
  data-resource-name="paper"
  >

</div>

<pre style="display: none !important" id="papers-fa">
  <?php echo wp_json_encode(array_values($papersFa)); ?>
</pre>

<pre style="display: none !important" id="papers-en">
  <?php echo wp_json_encode(array_values($papersEn)); ?>
</pre>