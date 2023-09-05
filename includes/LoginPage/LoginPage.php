<?php

namespace Woochak\LoginPage;

class LoginPage
{

  private $cssFile;

  public function __construct(string $cssFile)
  {
    $this->cssFile = $cssFile;
  }

  public function customize(): void
  {
    add_filter('login_headerurl', fn() => home_url());
    add_filter('login_headertext', fn() => 'Woochak');
    add_action(
      'login_enqueue_scripts',
      function () {
        require $this->cssFile;
      }
    );
  }
}