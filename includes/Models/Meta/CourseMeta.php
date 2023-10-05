<?php

declare(strict_types=1);

namespace Thedah\Models\Meta;

use Thedah\CPTResource\Model\Meta;

class CourseMeta extends Meta {

  public string $slug = 'course';
  public string $type = 'object';


  public array $schema = [
    'type'  => 'object',
    'properties'  => [
      'teacher' =>  [
        'type'  => 'string',
      ],
      'organizer' =>  [
        'type'  => 'string',
      ],
      'duration'  =>  [
        'type'  =>  'string',
      ],
      'courseType'  =>  [
        'type'  =>  'string'
      ],
      'price' =>  [
        'type'  =>  'string'
      ],
      'coTeachers'  =>  [
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
