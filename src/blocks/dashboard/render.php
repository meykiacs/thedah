<?php

use DI\Container;
use Thedah\QueryResource\QueryResource;

/**
 * @var Container $container
 */
global $container;

// here
if (!is_user_logged_in()) {
  global $container;
  wp_safe_redirect(home_url($container->get('auth.slug')));
  exit;
}
// here
// logouturl

$postTypes = ['about', 'paper', 'book', 'blog', 'course', 'gallery', 'slider', 'quote'];
$defaultResourceName = 'book';


$lang = empty($_COOKIE['language']) ? 'fa' : $_COOKIE['language'];
$colorScheme = empty($_COOKIE['colorscheme']) ? 'dark' : $_COOKIE['colorscheme'];
$prefix = $container->get('prefix');
$data = [];
$fetched = [];
foreach ($postTypes as $postType) {
  foreach (['en', 'fa'] as $language) {
    $postTypeWithLang = $prefix . ($language === 'fa' ? "_{$postType}fa" : "_{$postType}");

    $dataKey = $language === 'fa' ? "{$postType}Fa" : "{$postType}En";
    $fetchedKey = $language === 'fa' ? "{$postType}FaFetched" : "{$postType}EnFetched";

    if ($language === $lang) {
      // Get the CPTResource instance
      $cptResource = $container->get('resources')[$language][$postType];

      // Get the metas of the CPT
      $metas = $cptResource->cpt->metas;

      // Prepare the array of meta keys
      $metaKeys = array_map(function ($meta) use ($container, $prefix) {
        return '_' . $prefix . '_' . $meta->slug;
      }, $metas);

      $data[$dataKey] = $container->get(QueryResource::class)->getResourceList($postTypeWithLang, $metaKeys);
      if ($dataKey === 'blogFa') {
      }
      $fetched[$fetchedKey] =  '1';
    } else {
      // If the language is not the specified language, set an empty array
      $data[$dataKey] = [];
      $fetched[$fetchedKey] = '';
    }
  }
}

?>
<div id="<?php echo esc_attr($prefix); ?>-dashboard" data-home-url="<?php echo esc_attr(esc_url(home_url('/'))) ?>" data-site-title="<?php echo esc_attr((get_bloginfo('name'))) ?>" data-logout-url="<?php echo wp_logout_url(); ?>" data-media-rest-url="<?php echo esc_attr(get_rest_url(null, "/wp/v2/media")); ?>" data-rest-nonce="<?php echo esc_attr(wp_create_nonce('wp_rest')); ?>" data-assets-fonts-url="<?php echo esc_attr(($container->get('assets.fonts.url'))) ?>" data-assets-images-url="<?php echo esc_attr(($container->get('assets.images.url'))) ?>" <?php foreach ($postTypes as $postType) : ?> data-<?php echo $postType; ?>-en-rest-url="<?php echo esc_attr(get_rest_url(null, "/wp/v2/" . $prefix . "_{$postType}")); ?>" data-<?php echo $postType; ?>-fa-rest-url="<?php echo esc_attr(get_rest_url(null, "/wp/v2/" . $prefix . "_{$postType}fa")); ?>" data-<?php echo $postType; ?>-en-fetched="<?php echo esc_attr($fetched["{$postType}EnFetched"]); ?>" data-<?php echo $postType; ?>-fa-fetched="<?php echo esc_attr($fetched["{$postType}FaFetched"]); ?>" <?php endforeach; ?> data-resource-name="<?php echo esc_attr($defaultResourceName) ?>" data-resource-human="Books" data-color-scheme="<?php echo esc_attr($colorScheme); ?>" data-resource-names="<?php echo esc_attr(wp_json_encode($postTypes)); ?>" data-prefix="<?php echo esc_attr($prefix); ?>">
</div>

<?php foreach ($postTypes as $postType) : ?>
  <pre style="display: none !important" id="<?php echo $postType; ?>-fa">
        <?php echo json_encode($data["{$postType}Fa"], JSON_HEX_TAG); ?>
    </pre>

  <pre style="display: none !important" id="<?php echo $postType; ?>-en">
        <?php echo json_encode($data["{$postType}En"], JSON_HEX_TAG); ?>
    </pre>
<?php endforeach;
if (function_exists('tdn_render')) {
  tdn_render();
}
if (function_exists('tds_render')) {
  tds_render();
}



function get_unapproved_comments($post_types) {
  $all_comments = array();
  foreach ($post_types as $post_type) {
    $args = array(
      'status' => 'hold',
      'post_type' => $post_type,
    );
    $comments_query = new WP_Comment_Query;
    $comments = $comments_query->query($args);

    foreach ($comments as $comment) {
      $post_id = $comment->comment_post_ID;
      $post = get_post($post_id);
      $title = $post->post_title;
      $permalink = get_permalink($post_id);
      $comment_data = array(
        'id' => $comment->comment_ID,
        'title' => wp_trim_words($comment->comment_content, 4),
        'content' => $comment->comment_content,
        'author' => $comment->comment_author,
        'author_email' => $comment->comment_author_email,
        'related_post' => array(
          'title' => $title,
          'permalink' => $permalink,
        ),
      );
      array_push($all_comments, $comment_data);
    }
  }
  return $all_comments;
}

$unapproved_comments_fa = get_unapproved_comments(['thedah_blogfa', 'thedah_coursefa']);
$unapproved_comments_en = get_unapproved_comments(['thedah_blog', 'thedah_course']);
?>

<pre style="display: none !important" id="unapproved-comments-fa">
        <?php echo json_encode($unapproved_comments_fa,  JSON_HEX_TAG); ?>
    </pre>
<pre style="display: none !important" id="unapproved-comments-en">
        <?php echo json_encode($unapproved_comments_en,  JSON_HEX_TAG); ?>
    </pre>

    <div id="comments-data" data-rest-url="<?php echo esc_attr(get_rest_url(null, '/wp/v2/comments')) ?>"
      data-fetched="1"
    ></div>