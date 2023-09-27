<?php

declare(strict_types=1);

namespace Thedah\Models\Meta;

use Thedah\CPTResource\Model\Meta;

class FeaturedImagesMeta extends Meta {

  public string $slug = 'featured_images';
  public string $type = 'array';


  public array $schema = [
    'type'  => 'array',
    'items' => [
      'type' => 'object',
      'properties' => [
        'id'  => [
          'type'  => 'integer',
        ],
        'mediumUrl' =>  [
          'type'  =>  'string',
          'format'  =>  'uri'
        ],
        'fullUrl'  => [
          'type'  => 'string',
          'format'  =>  'uri'
        ],
        'mediumLargeUrl'  => [
          'type'  => 'string',
          'format'  =>  'uri'
        ],
        'largeUrl'  => [
          'type'  => 'string',
          'format'  =>  'uri'
        ],
        'thumbnailUrl'  => [
          'type'  => 'string',
          'format'  =>  'uri'
        ],
      ]
    ]
  ];
}
