<?php

namespace Thedah\QueryResource;

use DI\Container;

class QueryResource {
  private $query;
  private Container $c;

  public function __construct(\WP_Query $query, Container $c) {
    $this->query = $query;
    $this->c = $c;
  }

  public function getResourceList(string $postType, string $metaField, int $maxNumber = -1) {
    $resourceList = [];

    $this->query->query(
      [
        'post_type' => $postType,
        'posts_per_page' => $maxNumber,
      ]
    );

    if ($this->query->have_posts()) {
      while ($this->query->have_posts()) {
        $this->query->the_post();
        $id = get_the_ID();
        $resource = array(
          'id'  =>  get_the_ID(),
          'type'  =>  get_post_type(get_the_ID()),
          'title' => get_the_title(),
          'description' => get_the_content(),
          'featured_media_url' => get_the_post_thumbnail_url($id, 'medium'),
          'featured_media' => get_post_thumbnail_id($id),
          'meta'  =>  [$metaField => get_post_meta($id, $metaField, true)],
        );
        array_push($resourceList, $resource);
      }
    }
    wp_reset_query();

    return $resourceList;
  }
  public function getLastResource(string $postType, string $metaField) {
    $resource = [];

    $this->query->query(
      [
        'post_type' => $postType,
        'posts_per_page' => 1,
      ]
    );

    if ($this->query->have_posts()) {
      $this->query->the_post();
      $id = get_the_ID();
      $resource = array(
        'id'  =>  get_the_ID(),
        'type'  =>  get_post_type(get_the_ID()),
        'title' => get_the_title(),
        'description' => get_the_content(),
        'featured_media_url' => get_the_post_thumbnail_url($id, 'medium'),
        'featured_media' => get_post_thumbnail_id($id),
        'meta'  =>  [$metaField => get_post_meta($id, $metaField, true)],
      );
    }
    wp_reset_query();

    return $resource;
  }
}
