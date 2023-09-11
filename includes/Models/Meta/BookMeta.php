<?php

declare(strict_types=1);

namespace Thedah\Models\Meta;

use Thedah\CPTResource\Model\Meta;

class BookMeta extends Meta {

  public string $slug = 'book';
  public string $type = 'object';


  public array $schema = [
    'type'  => 'object',
    'properties'  => [
      'publisher' =>  [
        'type'  => 'string',
        // 'required'  => true,
      ],
      'year'  =>  [
        'type'  =>  'string',
      ],
      'author'  =>  [
        'type'  =>  'string'
      ],
      'edition' =>  [
        'type'  =>  'string',
      ],
      'numberOfPages' =>  [
        'type'  =>  'string'
      ],
      'isbn'  =>  [
        'type'  =>  'string'
      ],
      'price' =>  [
        'type'  =>  'string'
      ],
      'coauthors'  =>  [
        'type'  =>  'array',
        'items' =>  [
          'type'  =>  'string'
        ]
      ],
      'availability'  =>  [
        'type'  =>  'string',
        'enum'  =>  ['soon', 'available', 'unavailable']
      ]
    ]
  ];
}
