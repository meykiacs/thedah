<?php
declare(strict_types=1);
namespace Woochak\Rest\Model\Fields;
use Woochak\Sanitize\Sanitize;
use Woochak\Validate\Validate;

abstract class Field
{
	private string $name;
	private bool $isRequired;
	private string $type;
	protected Validate $validate;
	protected Sanitize $sanitize;

	public function __construct(Validate $validate, Sanitize $sanitize) {
		$this->validate = $validate;
		$this->sanitize = $sanitize;
	}

	abstract public function getValidateCallback(): callable;
	abstract public function getSanitizeCallback(): callable;

	public function asArgs(): array
	{
		return [
			'required' => $this->getIsRequired(),
			'validate_callback' => $this->getValidateCallback(),
			'sanitize_callback' => $this->getSanitizeCallback(),
			'type' => $this->getType()
		];
	}

	/**
	 * @return string
	 */
	public function getName(): string
	{
		return $this->name;
	}

	/**
	 * @param string $name 
	 * @return self
	 */
	public function setName(string $name): self
	{
		$this->name = $name;
		return $this;
	}

	/**
	 * @return bool
	 */
	public function getIsRequired(): bool
	{
		return $this->isRequired;
	}

	/**
	 * @param bool $isRequired 
	 * @return self
	 */
	public function setIsRequired(bool $isRequired): self
	{
		$this->isRequired = $isRequired;
		return $this;
	}

	/**
	 * @return string
	 */
	public function getType(): string
	{
		return $this->type;
	}

	/**
	 * @param string $type 
	 * @return self
	 */
	public function setType(string $type): self
	{
		$this->type = $type;
		return $this;
	}
}