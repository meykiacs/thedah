<?php

use DI\Container;

/**
 * @var Container $container
 */
global $container;

$postType = 'thedah_bookfa';

$lang = get_query_var('lang') === 'en' ? 'en' : 'fa';
$postType = $lang === 'fa' ? 'thedah_bookfa' : 'thedah_book';
$books = $lang === 'fa' ? 'booksFa' : 'booksEn';
$faFetched = $lang === 'fa' ? '1' : '';
$enFetched = $lang === 'en' ? '1' : '';
$direction = $lang === 'en' ? 'ltr' : 'rtl';
$booksEn = [];
$booksFa = [];

$query = new WP_Query(
  [
    'post_type' => $postType,
    'posts_per_page' => -1,
  ]
);

if ($query->have_posts()) {
  while ($query->have_posts()) {
    $query->the_post();
    $id = get_the_ID();
    $book = array(
      'id'  =>  get_the_ID(),
      'type'  =>  get_post_type(get_the_ID()),
      'title' => get_the_title(),
      'description' => get_the_content(),
      'picture' => get_the_post_thumbnail_url($id, 'full'),
      'pictureId' => get_post_thumbnail_id($id),
      'meta'  =>  get_post_meta($id, '_thedah_book', true),
    );
    array_push($$books, $book);
  }
}
wp_reset_query();

// Now $books contains the array of books.

?>
<div id="thedah-bookpage" data-lang="<?php echo esc_attr($lang); ?>" data-direction="<?php echo esc_attr($direction) ?>" data-home-url="<?php echo esc_attr(esc_url(home_url('/'))) ?>" data-site-title="<?php echo esc_attr((get_bloginfo('name'))) ?>" data-book-rest-url-en="<?php echo esc_attr(get_rest_url(null, "/wp/v2/" . $container->get('prefix') . '_book')); ?>" data-book-rest-url-fa="<?php echo esc_attr(get_rest_url(null, "/wp/v2/" . $container->get('prefix') . '_bookfa')); ?>" data-media-rest-url="<?php echo esc_attr(get_rest_url(null, "/wp/v2/media")); ?>" data-rest-nonce="<?php echo esc_attr(wp_create_nonce('wp_rest')); ?>" data-assets-fonts-url="<?php echo esc_attr(($container->get('assets.fonts.url'))) ?>" data-assets-images-url="<?php echo esc_attr(($container->get('assets.images.url'))) ?>" data-books-en-fetched="<?php echo esc_attr($enFetched) ?>" data-books-fa-fetched="<?php echo esc_attr($faFetched) ?>" data-resource-name="book" data-resource-human="Books">
</div>

<pre style="display: none !important" id="books-fa">
	<?php echo wp_json_encode(array_values($booksFa)); ?>
</pre>

<pre style="display: none !important" id="books-en">
	<?php echo wp_json_encode(array_values($booksEn)); ?>
</pre>