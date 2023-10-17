<?php

declare(strict_types=1);

namespace Thedah\Sanitize;

interface SanitizerInterface {
  public function sanitize($value);
}
