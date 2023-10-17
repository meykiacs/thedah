<?php
declare(strict_types=1);
namespace Thedah\Rest\Service;
use Thedah\Rest\Model\Route\Route;

interface RestServiceInterface
{
  public function addRoute(Route $route): self;
  public function register() : void;
}