<?php

declare(strict_types=1);

namespace Thedah\Models\Meta;

use Thedah\CPTResource\Model\Meta;

class AboutMeta extends Meta {

  public string $slug = 'about';
  public string $type = 'object';


  public array $schema = [
    'type'  => 'object',
    'properties'  => [
      'education'  =>  [
        'type'  =>  'array',
        'items' =>  [
          'type'  =>  'string'
        ]
      ],
      'activities'  =>  [
        'type'  =>  'array',
        'items' =>  [
          'type'  =>  'string'
        ]
      ],
      'executiveRecords'  =>  [
        'type'  =>  'array',
        'items' =>  [
          'type'  =>  'string'
        ]
      ],
      'awardsAndHonors'  =>  [
        'type'  =>  'array',
        'items' =>  [
          'type'  =>  'string'
        ]
      ],
      'academicRank'  =>  [
        'type'  =>  'string',
      ]
    ]
  ];
}
