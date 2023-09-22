<?php

use DI\Container;

/**
 * @var Container $container
 */
global $container;

$aboutEn = [];
$aboutFa = [];

$query = new WP_Query(
  [
    'post_type' => 'thedah_aboutfa',
    'posts_per_page' => -1,
  ]
);

if ($query->have_posts()) {
    $query->the_post();
    $id = get_the_ID();
    $aboutFa = array(
      'id' => get_the_ID(),
      'type' => get_post_type(get_the_ID()),
      'title' => get_the_title(),
      'content' => get_the_content(),
      'featured_image_url' => get_the_post_thumbnail_url($id, 'full'),
      'featured_image_id' => get_post_thumbnail_id($id),
      'meta' => ['_thedah_about' => get_post_meta($id, '_thedah_about', true)],
    );
}
wp_reset_query();

$query = new WP_Query(
  [
    'post_type' => 'thedah_about',
    'posts_per_page' => -1,
  ]
);

if ($query->have_posts()) {
    $query->the_post();
    $id = get_the_ID();
    $aboutEn = array(
      'id' => get_the_ID(),
      'type' => get_post_type(get_the_ID()),
      'title' => get_the_title(),
      'content' => get_the_content(),
      'featured_image_url' => get_the_post_thumbnail_url($id, 'full'),
      'featured_image_id' => get_post_thumbnail_id($id),
      'meta' => ['_thedah_about' => get_post_meta($id, '_thedah_about', true)],
    );
}
wp_reset_query();

?>
<div id="thedah-aboutpage" 
  data-home-url="<?php echo esc_attr(esc_url(home_url('/'))) ?>"
  data-site-title="<?php echo esc_attr((get_bloginfo('name'))) ?>"
  data-about-rest-url-en="<?php echo esc_attr(get_rest_url(null, "/wp/v2/" . $container->get('prefix') . '_about')); ?>"
  data-about-rest-url-fa="<?php echo esc_attr(get_rest_url(null, "/wp/v2/" . $container->get('prefix') . '_aboutfa')); ?>"
  data-media-rest-url="<?php echo esc_attr(get_rest_url(null, "/wp/v2/media")); ?>"
  data-rest-nonce="<?php echo esc_attr(wp_create_nonce('wp_rest')); ?>"
  data-assets-fonts-url="<?php echo esc_attr(($container->get('assets.fonts.url'))) ?>"
  data-assets-images-url="<?php echo esc_attr(($container->get('assets.images.url'))) ?>" 
  data-about-en-fetched="1"
  data-about-fa-fetched="1"
  data-resource-name="about"
  >

</div>


<pre style="display: none !important" id="about-fa">
  <?php echo wp_json_encode($aboutFa); ?>
</pre>

<pre style="display: none !important" id="about-en">
  <?php echo wp_json_encode($aboutEn); ?>
</pre>