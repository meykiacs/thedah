<?php

declare(strict_types=1);

namespace Thedah\CPTResource\Service;

use DI\Container;
use Thedah\CPTResource\Model\CPT;
use Thedah\CPTResource\Model\CPTResource;

class RegisterCPTResource {

  private Container $c;
  private string $prefix;
  public function __construct(Container $c) {
    $this->c = $c;
    $this->prefix = $c->get('prefix');
  }

  /**
   * @var CPTResource[]
   */
  private array $resources = [];

  public function add(CPTResource $resource): self {
    $this->resources[] = $resource;
    return $this;
  }

  public function register(): void {
    if (!empty($this->resources)) {
      add_action('init', [$this, 'registerCPT']);
    }
  }


  public function registerCPT() {
    foreach ($this->resources as $resource) {
      $cpt = $resource->cpt;
      register_post_type(
        $this->setPrefixedSlug($cpt->slug),
        [
          'hierarchical'       => $cpt->hierarchical,
          'labels' => $this->labels($cpt),
          'public' => $cpt->public,
          'show_ui' => $cpt->showUI,
          'capability_type' => $cpt->capabilityType,
          'menu_icon' => $cpt->icon,
          'supports' => $this->supports($cpt),
          'show_in_rest' => $cpt->showInRest,
          'has_archive' => $cpt->hasArchive
        ]
      );

      foreach ($cpt->metas as $meta) {
        register_post_meta(
          $this->setPrefixedSlug($cpt->slug),
          $this->setPrefixedSlugForMeta($meta->slug),
          [
            'type' => $meta->type,
            'description' => $meta->description,
            'single' => $meta->single,
            'show_in_rest' => ['schema' => $meta->schema],
            'sanitize_callback' => $meta->sanitizeCallback(),
            'auth_callback' => $meta->authCallback(),
            // 'schema'  => $meta->schema
          ]
        );
      }
    }
  }

  private function registerRestFields() {
    foreach ($this->resources as $resource) {
      if (empty($resource->indieMetaTypes)) {
        continue;
      }

      add_action('rest_api_init', function () use ($resource) {

        $cpt = $resource->cpt;

        foreach ($resource->indieMetaTypes as $indieMetaType) {
          register_rest_field(
            $this->setPrefixedSlug($cpt->slug),
            $indieMetaType->slug(),
            [
              'get_callback' => $indieMetaType->getCallback(),
              'update_callback' => $indieMetaType->updateCallback(),
              'schema' => [
                'type' => $indieMetaType->type(),
                'arg_options' => [
                  'sanitize_callback' => $indieMetaType->sanitizeCallback(),
                  'validate_callback' => $indieMetaType->validateCallback()
                ]
              ]
            ]
          );
        }
      });
    }
  }


  private function supports(CPT $cpt): array {
    $supports = [];
    if ($cpt->hasTitle)
      $supports[] = 'title';
    if ($cpt->hasEditor)
      $supports[] = 'editor';
    if ($cpt->hasThumbnail)
      $supports[] = 'thumbnail';
    if ($cpt->hasMeta)
      $supports[] = 'custom-fields';
    if ($cpt->hasAuthor)
      $supports[] = 'author';


    return $supports;
  }

  private function labels(CPT $cpt): array {
    if (empty($cpt->labels)) {
      return ['name' => $cpt->name];
    }
    return $cpt->labels;
  }

  private function setPrefixedSlug(string $slug): string {
    return $this->prefix . '_' . $slug;
  }

  private function setPrefixedSlugForMeta(string $slug): string {
    return '_' . $this->prefix . '_' . $slug;
  }
}
