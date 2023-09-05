<?php
declare(strict_types=1);
namespace Woochak\Rest\Model\Fields;

class TextField extends Field
{

  public function __construct($name, $isRequired)
  {
    $this->setType('string');
    $this->setName($name);
    $this->setIsRequired($isRequired);
  }

  public function getValidateCallback(): callable
  {
    return $this->validate->textField();
  }
  public function getSanitizeCallback(): callable
  {
    return $this->sanitize->textField();
  }

}