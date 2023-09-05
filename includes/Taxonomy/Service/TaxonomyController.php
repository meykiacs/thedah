<?php
declare(strict_types=1);
namespace Woochak\Taxonomy\Service;

use Woochak\PluginHooks\PluginHooks;
use Woochak\Taxonomy\Model\Taxonomy;

class TaxonomyController
{

  private PluginHooks $pluginHooks;
  /**
   * Summary of taxonomies
   * @var Taxonomy[]
   */
  private array $taxonomies = [];


  public function __construct(PluginHooks $pluginHooks)
  {
    $this->pluginHooks = $pluginHooks;
  }

  public function addTaxonomy(Taxonomy $taxonomy): self
  {
    $this->taxonomies[] = $taxonomy;
    return $this;
  }

  public function register(): self
  {
    add_action('init', function () {
      foreach ($this->taxonomies as $taxonomy) {
        $this->registerSingleTaxonomy($taxonomy);
      }
    });
    foreach ($this->taxonomies as $taxonomy) {
      $this->addCallbackToActivate($taxonomy)
        ->addCallbackToDeactivate($taxonomy)
        ->addCallbackToUninstall($taxonomy);
    }
    return $this;
  }

  public function registerSingleTaxonomy(Taxonomy $taxonomy): self
  {
    register_taxonomy(
      $taxonomy->getSlug(), $taxonomy->getPostType(),
      [
        'hierarchical' => false,
        'show_admin_column' => true,
        'labels' => $taxonomy->getLabels(),
        'meta_box_cb' => false,
        'show_in_quick_edit'  => false,
      ]
    );
    return $this;
  }

  private function addCallbackToActivate(Taxonomy $taxonomy): self
  {
    $this->pluginHooks->addToActivate(function () use ($taxonomy) {
      $this->registerSingleTaxonomy($taxonomy);
    });
    return $this;
  }

  private function addCallbackToDeactivate(Taxonomy $taxonomy): self
  {
    $this->pluginHooks->addToDeactivate(
      function () use ($taxonomy) {
        unregister_taxonomy($taxonomy->getSlug());
      }
    );

    return $this;
  }

  private function addCallbackToUninstall(Taxonomy $taxonomy): self
  {
    $this->pluginHooks->addToDeactivate(
      function () use ($taxonomy) {
        unregister_taxonomy($taxonomy->getSlug());
      }
    );

    return $this;
  }

  public function addMetaBox(Taxonomy $taxonomy)
  {
    add_action(
      'add_meta_boxes',
      function () use ($taxonomy) {
        add_meta_box(
          $taxonomy->getSingularName(),
          $taxonomy->getPluralName(),
          fn($post) => $this->metaBoxFieldCallback($post, $taxonomy),
          $taxonomy->getPostType()
        );
      }
    );

    add_action(
      'save_post_' . $taxonomy->getPostType(),
      function ($post_id) use ($taxonomy) {
        if (!isset($_POST[$taxonomy->getSlug() . '_autocomplete_meta_box_nonce'])) {
          return;
        }
        if (!wp_verify_nonce($_POST[$taxonomy->getSlug() . '_autocomplete_meta_box_nonce'], $taxonomy->getSlug() . '_autocomplete_meta_box')) {
          return;
        }
        if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
          return;
        }

        if (!current_user_can('edit_post', $post_id)) {
          return;
        }
        if (isset($_POST['remove_term']) && $_POST['remove_term'] == '1') {
          wp_delete_object_term_relationships($post_id, $taxonomy->getSlug());
          // return;
        }
        if (!isset($_POST[$taxonomy->getSlug()])) {
          return;
        }

        $submitted_term = sanitize_text_field($_POST[$taxonomy->getSlug()]);

        // Check if the submitted brand is valid
        if (!$taxonomy->getAllowNew()) {
          $valid_brands = get_terms(
            array(
              'taxonomy' => $taxonomy->getSlug(),
              'hide_empty' => false,
              'fields' => 'names'
            )
          );
          if (in_array($submitted_term, $valid_brands, true)) {
            wp_set_object_terms(
              $post_id,
              $submitted_term,
              $taxonomy->getSlug()
            );

          } else {
            // Invalid brand, do not save
            // You can add additional error handling here
          }
        } else {
          wp_set_object_terms(
            $post_id,
            $submitted_term,
            $taxonomy->getSlug()
          );
        }
      }
    );
  }

  private function metaBoxFieldCallback(\WP_Post $post, Taxonomy $taxonomy)
  {
    if ($taxonomy->getFieldType() === 'autocomplete') {

      wp_nonce_field($taxonomy->getSlug() . '_autocomplete_meta_box', $taxonomy->getSlug() . '_autocomplete_meta_box_nonce');
      $terms = get_terms(
        array(
          'taxonomy' => $taxonomy->getSlug(),
          'hide_empty' => false,
        )
      );
      $terms_list = [];
      foreach ($terms as $term) {
        $terms_list[] = $term->name;
      }
      $terms_list = json_encode($terms_list);

      // Display the current term if the product has one
      $current_term = wp_get_post_terms($post->ID, $taxonomy->getSlug(), array('fields' => 'names'));
      if (!empty($current_term)) {
        echo '<p>Current brand: <strong>' . esc_html($current_term[0]) . '</strong></p>';
        echo '<input type="checkbox" name="remove_term" value="1"> Remove term<br>';

      }

      echo '<input type="text" id="brand-autocomplete" name="brand" />';
      echo '<span id="brand-message" style="display: none; color: red;"></span>';
      echo '<script>
        jQuery(function() {
            var availableBrands = ' . $terms_list . ';
            jQuery("#brand-autocomplete").autocomplete({
                source: availableBrands,
                change: function(event, ui) {
                    if (!ui.item) {
                        jQuery("#brand-message").text("Invalid brand. Please choose a valid brand from the list.").show();
                    } else {
                        jQuery("#brand-message").hide();
                    }
                }
            });
        });
    </script>';
    }
  }



}