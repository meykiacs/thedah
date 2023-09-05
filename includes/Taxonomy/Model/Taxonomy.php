<?php

declare(strict_types=1);

namespace Woochak\Taxonomy\Model;

class Taxonomy {
  protected string $slug;
  protected string $postType;
  protected string $pluralName;
  protected string $singularName;
  protected string $capSingularName;
  protected string $capPluralName;
  protected array $labels;
  protected bool $hierarchical = false;

  private string $fieldType;
  private bool $allowNew;
  private bool $single;

  public function __construct(
    string $slug,
    string $postType,
    string $fieldType = 'autocomplete',
    bool $allowNew = false,
    bool $single = true
  ) {
    $this->slug = $slug;
    $this->postType = $postType;
    $this->fieldType = $fieldType;
    $this->allowNew = $allowNew;
    $this->single = $single;
  }

  public function setSemiAutoLabels(): void {
    $this->pluralName = $this->pluralName ?? $this->slug . 's';
    $this->singularName = $this->singularName ?? $this->slug;
    $this->capSingularName = $this->capSingularName ?? ucfirst($this->slug);
    $this->capPluralName = $this->capPluralName ?? ucfirst($this->slug) . 's';
    $this->labels = [
      'name' => sprintf(esc_html_x('%s', 'taxonomy general name', 'woochak'), $this->capSingularName),
      'singular_name' => sprintf(esc_html_x('%s', 'taxonomy singular name', 'woochak'), $this->capSingularName),
      'search_items' => sprintf(esc_html__('Search %s', 'woochak'), $this->capSingularName),
      'popular_items' => sprintf(esc_html__('Popular %s', 'woochak'), $this->capPluralName),
      'all_items' => sprintf(esc_html__('All %s', 'woochak'), $this->capPluralName),
      'parent_item' => null,
      'parent_item_colon' => null,
      'edit_item' => sprintf(esc_html__('Edit %s', 'woochak'), $this->capSingularName),
      'update_item' => sprintf(esc_html__('Update %s', 'woochak'), $this->capSingularName),
      'add_new_item' => sprintf(esc_html__('Add New %s', 'woochak'), $this->capSingularName),
      'new_item_name' => sprintf(esc_html__('New %s Name', 'woochak'), $this->capSingularName),
      'separate_items_with_commas' => sprintf(esc_html__('Separate %s with commas', 'woochak'), $this->pluralName),
      'add_or_remove_items' => sprintf(esc_html__('Add or remove %s', 'woochak'), $this->pluralName),
      'choose_from_most_used' => sprintf(esc_html__('Choose from the most used %s', 'woochak'), $this->pluralName),
      'not_found' => sprintf(esc_html__('No %s found', 'woochak'), $this->pluralName),
      'menu_name' => sprintf(esc_html__('%s', 'woochak'), $this->capPluralName),
    ];
  }

  /**
   * @param string $slug 
   * @return self
   */
  public function setSlug(string $slug): self {
    $this->slug = $slug;
    return $this;
  }

  /**
   * @param string $pluralName 
   * @return self
   */
  public function setPluralName(string $pluralName): self {
    $this->pluralName = $pluralName;
    return $this;
  }

  /**
   * @param string $singularName 
   * @return self
   */
  public function setSingularName(string $singularName): self {
    $this->singularName = $singularName;
    return $this;
  }

  /**
   * @param string $capSingularName 
   * @return self
   */
  public function setCapSingularName(string $capSingularName): self {
    $this->capSingularName = $capSingularName;
    return $this;
  }

  /**
   * @param string $capPluralName 
   * @return self
   */
  public function setCapPluralName(string $capPluralName): self {
    $this->capPluralName = $capPluralName;
    return $this;
  }

  /**
   * @param array $labels 
   * @return self
   */
  public function setLabels(array $labels): self {
    $this->labels = $labels;
    return $this;
  }


  /**
   * @return string
   */
  public function getSlug(): string {
    return $this->slug;
  }

  /**
   * @return string
   */
  public function getPostType(): string {
    return $this->postType;
  }

  /**
   * @param string $postType 
   * @return self
   */
  public function setPostType(string $postType): self {
    $this->postType = $postType;
    return $this;
  }

  /**
   * @return array
   */
  public function getLabels(): array {
    return $this->labels;
  }

  /**
   * @return string
   */
  public function getSingularName(): string {
    return $this->singularName;
  }

  /**
   * @return string
   */
  public function getCapPluralName(): string {
    return $this->capPluralName;
  }

  /**
   * @return string
   */
  public function getPluralName(): string {
    return $this->pluralName;
  }


	/**
	 * @return string
	 */
	public function getFieldType(): string {
		return $this->fieldType;
	}
	
	/**
	 * @param string $fieldType 
	 * @return self
	 */
	public function setFieldType(string $fieldType): self {
		$this->fieldType = $fieldType;
		return $this;
	}
	
	/**
	 * @return bool
	 */
	public function getAllowNew(): bool {
		return $this->allowNew;
	}
	
	/**
	 * @param bool $allowNew 
	 * @return self
	 */
	public function setAllowNew(bool $allowNew): self {
		$this->allowNew = $allowNew;
		return $this;
	}
	
	/**
	 * @return bool
	 */
	public function getSingle(): bool {
		return $this->single;
	}
	
	/**
	 * @param bool $single 
	 * @return self
	 */
	public function setSingle(bool $single): self {
		$this->single = $single;
		return $this;
	}
}
