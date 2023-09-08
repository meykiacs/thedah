<?php

declare(strict_types=1);

namespace Thedah\CPTResource\Model;

class CPTResource {
  public CPT $cpt;

  public function __construct(CPT $cpt) {
    $this->cpt = $cpt;
  }

  /**
   * @var RestField[]
   */
  public array $restFields = [];
}
