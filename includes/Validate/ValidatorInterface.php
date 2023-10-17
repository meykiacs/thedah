<?php

declare(strict_types=1);

namespace Thedah\Validate;

interface ValidatorInterface {
  public function validate($value): bool;
}
