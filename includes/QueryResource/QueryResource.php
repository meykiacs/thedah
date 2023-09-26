<?php

namespace Thedah\QueryResource;

class QueryResource {
  private $query;

  public function __construct(\WP_Query $query) {
    $this->query = $query;
  }

  public function getResourceList($postType, $maxNumber = -1) {
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
          'picture' => get_the_post_thumbnail_url($id, 'medium'),
          'pictureId' => get_post_thumbnail_id($id),
          'meta'  =>  get_post_meta($id, '_thedah_book', true),
        );
        array_push($resourceList, $resource);
      }
    }
    wp_reset_query();

    return $resourceList;
  }
  public function getLastResource($postType) {
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
          'picture' => get_the_post_thumbnail_url($id, 'medium'),
          'pictureId' => get_post_thumbnail_id($id),
          'meta'  =>  get_post_meta($id, '_thedah_book', true),
        );
    }
    wp_reset_query();

    return $resource;
  }
}
