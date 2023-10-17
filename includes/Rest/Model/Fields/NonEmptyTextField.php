<?php
declare(strict_types=1);
namespace Thedah\Rest\Model\Fields;

class NonEmptyTextField extends TextField
{
  public function getValidateCallback(): callable
  {
    return $this->validate->nonEmptyTextField();
  }
}