<?php

declare(strict_types=1);

namespace Thedah\Image;

class Image {

  public function addImageSize(string $name, int $width, int $height, array $crop) : self {
    add_action(
      'after_setup_theme',
      function () use ($name, $width, $height, $crop) {
        add_image_size($name, $width, $height, $crop);
      }
    );

    return $this;
  }
}
