<?php

declare(strict_types=1);

namespace Thedah\Models\Meta;

use Thedah\CPTResource\Model\Meta;

class BlogMeta extends Meta {

  public string $slug = 'blog';
  public string $type = 'object';


  public array $schema = [
    'type'  => 'object',
    'properties'  => [
      'blogtype'  =>  [
        'type'  =>  'string',
        'enum'  =>  ['article', 'event', 'news', 'interview']
      ],
      'feature' =>  [
        'type'  => 'string',
        'enum'  => ['none', 'enroll', 'purchase', 'prepurchase']
      ]
    ]
  ];
}
