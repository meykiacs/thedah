<?php
declare(strict_types=1);
namespace Woochak\Rest\Model\Endpoints;
use Woochak\Rest\Model\Fields\Field;

abstract class Endpoint
{
  private string $method;

  public function __construct(string $method) {
    $this->method = $method;
  }

  /**
   * @var Field[]
   */
  public array $fields = [];

  public function addField(Field $field): self
  {
    $this->fields[] = $field;
    return $this;
  }

  public function asArgs(): array
  {
    $args = [];
    foreach ($this->fields as $field) {
      $args[$field->getName()] = $field->asArgs();
    }
    return $args;
  }


  abstract public function getPermissionCallback(): callable;

  abstract public function getCallback(): callable;


	/**
	 * @return string
	 */
	public function getMethod(): string {
		return $this->method;
	}
	
	/**
	 * @param string $method 
	 * @return self
	 */
	public function setMethod(string $method): self {
		$this->method = $method;
		return $this;
	}
}