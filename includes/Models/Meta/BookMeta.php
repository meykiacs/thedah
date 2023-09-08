<?php

declare(strict_types=1);

namespace Thedah\Models\Meta;

use Thedah\CPTResource\Model\Meta;

class BookMeta extends Meta {

  public string $slug = 'bookmeta';
  public string $type = 'object';


  public array $schema = [
    'type'  => 'object',
    'properties'  => [
      'publisher' =>  [
        'type'  => 'string',
        // 'required'  => true,
      ],
      'year'  =>  [
        'type'  =>  'integer',
      ],
      'author'  =>  [
        'type'  =>  'string'
      ],
      'edition' =>  [
        'type'  =>  'integer',
      ],
      'isbn'  =>  [
        'type'  =>  'integer'
      ],
      'price' =>  [
        'type'  =>  'integer'
      ],
      'coauthor'  =>  [
        'type'  =>  'array',
        'items' =>  [
          'type'  =>  'string'
        ]
      ],
      'availability'  =>  [
        'type'  =>  'string',
        'enum'  =>  ['soon', 'available', 'out-of-stock']
      ]
    ]
  ];
}
