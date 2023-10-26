<?php

declare(strict_types=1);

namespace Thedah\Models\Meta;

use Thedah\CPTResource\Model\Meta;

class QuoteMeta extends Meta {

  public string $slug = 'quote';
  public string $type = 'object';


  public array $schema = [
    'type'  => 'object',
    'properties'  => [
      'coursePageQuote' =>  [
        'type'  => 'object',
        'properties'  => [
          'mainQuote' => [
            'type'  => 'string'
          ],
          'from'  =>  [
            'type'  => 'string'
          ],
          'description'  =>  [
            'type'  => 'string'
          ],
        ],
      ],
      'bookPageQuote' =>  [
        'type'  => 'object',
        'properties'  => [
          'mainQuote' => [
            'type'  => 'string'
          ],
          'from'  =>  [
            'type'  => 'string'
          ],
          'description'  =>  [
            'type'  => 'string'
          ],
        ],
      ],
      'paperPageQuote' =>  [
        'type'  => 'object',
        'properties'  => [
          'mainQuote' => [
            'type'  => 'string'
          ],
          'from'  =>  [
            'type'  => 'string'
          ],
          'description'  =>  [
            'type'  => 'string'
          ],
        ],
      ],
    ],
  ];
}
