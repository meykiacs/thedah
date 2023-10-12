<?php

declare(strict_types=1);

namespace Thedah\Block;

use DI\Container;
use Thedah\QueryResource\QueryResource;

class Render {
  private $prefix;
  private $container;

  public function __construct(Container $container) {
    // $this->prefix = $prefix;
    $this->container = $container;
    $this->prefix = $container->get('prefix');
  }

  public function generalTemplate(array $postTypes, string $defaultResourceName, string $resourceHuman, string $divId): self {


    $lang = empty($_COOKIE['language']) ? 'fa' : $_COOKIE['language'];
    $colorScheme = empty($_COOKIE['colorscheme']) ? 'dark' : $_COOKIE['colorscheme'];
    $data = [];
    $fetched = [];
    foreach ($postTypes as $postType) {
      foreach (['en', 'fa'] as $language) {
        $postTypeWithLang = $this->prefix . ($language === 'fa' ? "_{$postType}fa" : "_{$postType}");

        $dataKey = $language === 'fa' ? "{$postType}Fa" : "{$postType}En";
        $fetchedKey = $language === 'fa' ? "{$postType}FaFetched" : "{$postType}EnFetched";

        if ($language === $lang) {
          // Get the CPTResource instance
          $cptResource = $this->container->get('resources')[$language][$postType];

          // Get the metas of the CPT
          $metas = $cptResource->cpt->metas;

          // Prepare the array of meta keys
          $metaKeys = array_map(function ($meta) {
            return '_' . $this->prefix . '_' . $meta->slug;
          }, $metas);

          $data[$dataKey] = $this->container->get(QueryResource::class)->getResourceList($postTypeWithLang, $metaKeys);
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
    <div id="<?php echo esc_attr($this->prefix . '-' . $divId); ?>" data-home-url="<?php echo esc_attr(esc_url(home_url('/'))) ?>" data-site-title="<?php echo esc_attr((get_bloginfo('name'))) ?>" data-media-rest-url="<?php echo esc_attr(get_rest_url(null, "/wp/v2/media")); ?>" data-rest-nonce="<?php echo esc_attr(wp_create_nonce('wp_rest')); ?>" data-assets-fonts-url="<?php echo esc_attr(($this->container->get('assets.fonts.url'))) ?>" data-assets-images-url="<?php echo esc_attr(($this->container->get('assets.images.url'))) ?>" <?php foreach ($postTypes as $postType) : ?> data-<?php echo $postType; ?>-en-rest-url="<?php echo esc_attr(get_rest_url(null, "/wp/v2/" . $this->prefix . "_{$postType}")); ?>" data-<?php echo $postType; ?>-fa-rest-url="<?php echo esc_attr(get_rest_url(null, "/wp/v2/" . $this->prefix . "_{$postType}fa")); ?>" data-<?php echo $postType; ?>-en-fetched="<?php echo esc_attr($fetched["{$postType}EnFetched"]); ?>" data-<?php echo $postType; ?>-fa-fetched="<?php echo esc_attr($fetched["{$postType}FaFetched"]); ?>" <?php endforeach; ?> data-resource-name="<?php echo esc_attr($defaultResourceName) ?>" data-resource-human="Books" data-color-scheme="<?php echo esc_attr($colorScheme); ?>" data-resource-names="<?php echo esc_attr(wp_json_encode($postTypes)); ?>" data-prefix="<?php echo esc_attr($this->prefix); ?>" data-resource-human="<?php echo esc_attr($resourceHuman); ?>"
      data-newsletter-rest-url="<?php echo esc_attr(get_rest_url(null, 'tdnewsletter/v1/subscribe')) ?>"
      data-logout-url="<?php echo wp_logout_url(); ?>"
      >
    </div>

    <?php foreach ($postTypes as $postType) : ?>
      <pre style="display: none !important" id="<?php echo $postType; ?>-fa">
        <?php echo wp_json_encode($data["{$postType}Fa"], JSON_HEX_TAG); ?>
    </pre>

      <pre style="display: none !important" id="<?php echo $postType; ?>-en">
        <?php echo wp_json_encode($data["{$postType}En"], JSON_HEX_TAG); ?>
    </pre>
    <?php endforeach; ?>

  <?php
    return $this;
  }

  public function recentPosts(): self {


    $postTypesWithMetaFieldsFa = [
      'thedah_coursefa' => ['_thedah_course', '_thedah_images'],
      'thedah_blogfa' => ['_thedah_blog', '_thedah_images']
    ];
    $recentPostsFa = $this->container->get(QueryResource::class)->getRecent($postTypesWithMetaFieldsFa, 4);
    // var_dump($recentPostsFa);wp_die();
    $postTypesWithMetaFields = [
      'thedah_course' => ['_thedah_course', '_thedah_images'],
      'thedah_blog' => ['_thedah_blog', '_thedah_images']
    ];
    $recentPosts = $this->container->get(QueryResource::class)->getRecent($postTypesWithMetaFields, 4);
  ?>
    <pre style="display: none !important" id="recent-en">
<?php echo wp_json_encode($recentPosts, JSON_HEX_TAG); ?>
</pre>
    <pre style="display: none !important" id="recent-fa">
<?php echo wp_json_encode($recentPostsFa, JSON_HEX_TAG); ?>
</pre>
<?php
    return $this;
  }
}
