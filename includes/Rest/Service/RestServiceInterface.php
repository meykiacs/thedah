<?php
declare(strict_types=1);
namespace Woochak\Rest\Service;
use Woochak\Rest\Model\Route\Route;

interface RestServiceInterface
{
  public function addRoute(Route $route): self;
  public function register() : void;
}