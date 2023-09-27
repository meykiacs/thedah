<?php

use DI\Container;
use Thedah\QueryResource\QueryResource;

/**
 * @var Container $container
 */
global $container;

$lang = 'fa';

if (isset($_COOKIE['language'])) {
  $lang = $_COOKIE['language'];
}

$postTypeAbout = $lang === 'fa' ? 'thedah_aboutfa' : 'thedah_about';
$postTypePaper = $lang === 'fa' ? 'thedah_paperfa' : 'thedah_paper';
$postTypeBook = $lang === 'fa' ? 'thedah_bookfa' : 'thedah_book';

$aboutEn = [];
$aboutFa = [];
$papersEn = [];
$papersFa = [];
$booksEn = [];
$booksFa = [];
$about = $lang === 'fa' ? 'aboutFa' : 'aboutEn';
$papers = $lang === 'fa' ? 'papersFa' : 'papersEn';
$books = $lang === 'fa' ? 'booksFa' : 'booksEn';

// either $aboutEn or $aboutFa
$$about = $container->get(QueryResource::class)->getLastResource($postTypeAbout, '_' . $container->get('prefix') . '_about');
$$papers = $container->get(QueryResource::class)->getResourceList($postTypePaper, '_' . $container->get('prefix') . '_paper');
$$books = $container->get(QueryResource::class)->getResourceList($postTypeBook, '_' . $container->get('prefix') . '_book');

$aboutFaFetched = $lang === 'fa' ? '1' : '';
$aboutEnFetched = $lang === 'en' ? '1' : '';
$papersFaFetched = $lang === 'fa' ? '1' : '';
$papersEnFetched = $lang === 'en' ? '1' : '';
$booksFaFetched = $lang === 'fa' ? '1' : '';
$booksEnFetched = $lang === 'en' ? '1' : '';

?>
<div id="thedah-dashboard"
  data-home-url="<?php echo esc_attr(esc_url(home_url('/'))) ?>"
  data-site-title="<?php echo esc_attr((get_bloginfo('name'))) ?>"
  data-media-rest-url="<?php echo esc_attr(get_rest_url(null, "/wp/v2/media")); ?>"
  data-rest-nonce="<?php echo esc_attr(wp_create_nonce('wp_rest')); ?>"
  data-assets-fonts-url="<?php echo esc_attr(($container->get('assets.fonts.url'))) ?>"
  data-assets-images-url="<?php echo esc_attr(($container->get('assets.images.url'))) ?>"

  data-about-rest-url-en="<?php echo esc_attr(get_rest_url(null, "/wp/v2/" . $container->get('prefix') . '_about')); ?>"
  data-about-rest-url-fa="<?php echo esc_attr(get_rest_url(null, "/wp/v2/" . $container->get('prefix') . '_aboutfa')); ?>"
  data-book-rest-url-en="<?php echo esc_attr(get_rest_url(null, "/wp/v2/" . $container->get('prefix') . '_book')); ?>"
  data-book-rest-url-fa="<?php echo esc_attr(get_rest_url(null, "/wp/v2/" . $container->get('prefix') . '_bookfa')); ?>"
  data-paper-rest-url-en="<?php echo esc_attr(get_rest_url(null, "/wp/v2/" . $container->get('prefix') . '_paper')); ?>"
  data-paper-rest-url-fa="<?php echo esc_attr(get_rest_url(null, "/wp/v2/" . $container->get('prefix') . '_paperfa')); ?>"
  data-about-en-fetched="<?php echo esc_attr($aboutEnFetched) ?>" data-about-fa-fetched="<?php echo esc_attr($aboutFaFetched) ?>"
  data-books-en-fetched="<?php echo esc_attr($booksEnFetched) ?>" data-books-fa-fetched="<?php echo esc_attr($booksFaFetched) ?>"
  data-papers-en-fetched="<?php echo esc_attr($papersEnFetched) ?>" data-papers-fa-fetched="<?php echo esc_attr($papersFaFetched) ?>"
  data-resource-name="book">
</div>


<pre style="display: none !important" id="about-fa">
  <?php echo wp_json_encode($aboutFa); ?>
</pre>

<pre style="display: none !important" id="about-en">
  <?php echo wp_json_encode($aboutEn); ?>
</pre>

<pre style="display: none !important" id="papers-fa">
  <?php echo wp_json_encode(array_values($papersFa)); ?>
</pre>

<pre style="display: none !important" id="papers-en">
  <?php echo wp_json_encode(array_values($papersEn)); ?>
</pre>

<pre style="display: none !important" id="books-fa">
	<?php echo wp_json_encode(array_values($booksFa)); ?>
</pre>

<pre style="display: none !important" id="books-en">
	<?php echo wp_json_encode(array_values($booksEn)); ?>
</pre>