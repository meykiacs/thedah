<?php

declare(strict_types=1);

namespace Thedah\Models\Meta;

use Thedah\CPTResource\Model\Meta;

class PaperMeta extends Meta {

  public string $slug = 'paper';
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

      'fullReference' =>  [
        'type'  => 'string',
        'required'  => true
      ],
      'summary'  =>  [
        'type'  =>  'string'
      ],
      'link'  =>  [
        'type'  =>  'string',
        'format'  => 'uri'
      ],
      'coauthors'  =>  [
        'type'  =>  'array',
        'items' =>  [
          'type'  =>  'string'
        ]
      ],
    ]
  ];
}
