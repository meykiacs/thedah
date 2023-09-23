<?php

declare(strict_types=1);

namespace Thedah\RegisterQueryVars;

use Psr\Container\ContainerInterface;

class RegisterQueryVars {
  private $container;

  public function __construct(ContainerInterface $container) {
    $this->container = $container;
    $this->init();
  }

  private function init(): void {
    add_filter('query_vars', function ($vars) {
      foreach ($this->container->get('query_vars') as $var) {
        $vars[] = $var;
      }
      return $vars;
    });
  }
}
