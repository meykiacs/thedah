<?php

declare(strict_types=1);

namespace Thedah\Validate;


class EmailValidator implements ValidatorInterface {
  public function validate($value): bool {
    return boolval(is_email($value));
  }
}
