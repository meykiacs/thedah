<?php

namespace Thedah\Auth;

class Auth {
  public function redirectNonAdminFromAdminPanel(): self {

    add_action(
      'admin_init',
      function () {
        if (!current_user_can('manage_options')) {
          wp_safe_redirect('/');
        }
      }
    );

    return $this;
  }

  public function removeAdminBarForNonAdmins(): self {

    add_action('wp_loaded', function () {
      if (!current_user_can('manage_options')) {
        show_admin_bar(false);
      }
    });
    return $this;
  }


  public function changeLoginUrl(string $login = 'login') {
    add_action('init', function () use ($login) {
      global $pagenow;
      if ($pagenow === 'wp-login.php') {
        // var_dump($pagenow); wp_die();
        wp_redirect(home_url($login . '?') . $_SERVER['QUERY_STRING']);
        exit;
      }
    });
    return $this;
  }

  public function hideAdminBarOnFrontEnd()  : self {
    add_action(
      'after_setup_theme',
      function () {
        if (!is_admin()) {
          show_admin_bar(false);
        }
      }

    );
    return $this;
  }
}
