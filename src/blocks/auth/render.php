<?php

use DI\Container;

if (is_admin() && !wp_doing_ajax()) {
  // Return early without rendering the block in the editor
  return '';
}


/**
 * @var Container $container
 */
global $container;

$prefix = $container->get('prefix');

$auth_mode = 'login';
$info = '';
$auth_error = [];

function getUser($user_login) {
  $user = get_user_by('login', $user_login);
  if (!$user) {
    $user = get_user_by('email', $user_login);
  }
  return $user;
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  $user_login = sanitize_text_field($_POST['user'] ?? '');
  $password = sanitize_text_field($_POST['password'] ?? '');
  $action = sanitize_text_field($_POST['action'] ?? '');
  $loginNonce = sanitize_text_field($_POST['login_nonce'] ?? '');
  $lostPasswordNonce = sanitize_text_field($_POST['lostpassword_nonce'] ?? '');
  $rpNonce = sanitize_text_field($_POST['rp_nonce'] ?? '');

  $login = $_GET['login'] ?? '';
  $key = $_GET['key'] ?? '';

  if ($action === 'login' && wp_verify_nonce($loginNonce, 'login_action')) {


    $user = getUser($user_login);

    if (!$user) {
      $auth_error[] = 'Invalid username or email address.';
      $auth_mode = 'login';
    } else {
      $user_auth = wp_authenticate_username_password(null, $user->user_login, $password);

      if (is_wp_error($user_auth)) {
        $auth_error[] = 'Invalid username or email address.';
        $auth_mode = 'login';
      } else {
        wp_set_current_user($user_auth->ID);
        wp_set_auth_cookie($user_auth->ID);

        $redirect = $_GET['redirect_to'] ?? null;
        if ($redirect) {
          wp_safe_redirect($redirect);
          exit;
        } else {
          wp_safe_redirect($container->get('auth.redirect_url'));
          exit;
        }
      }
    }
  } elseif ($action === 'lostpassword' && wp_verify_nonce($lostPasswordNonce, 'lostpassword_action')) {

    $user = getUser($user_login);
    if (!$user) {
      $auth_error[] = 'Invalid Username or Email';
    } else {
      $user_email = $user->user_email;
      $reset_key = get_password_reset_key($user);
      $reset_url = home_url($container->get('auth.slug') . "?action=rp&key=$reset_key&login=" . rawurlencode($user_login), 'login');

      $sent = wp_mail(
        $user_email,
        'Password Reset Request',
        "Someone has requested a password reset for the following account:\n\nUsername: " . $user_login . " \n\nIf this was a mistake, just ignore this email and nothing will happen.\n\nTo reset your password, visit the following address:\n\n" . esc_url_raw($reset_url)
      );
      if ($sent) {
        $info = 'An email including the password reset link has been sent to ' . $user_email . '.';
        $auth_mode = 'info';
      } else {
        $auth_mode = 'info';
        $info = 'Error sending the email!';
      }
    }
  } elseif ($action === 'rp' && wp_verify_nonce($rpNonce, 'rp_action')) {
    $user = check_password_reset_key($key, $login);

    if (is_wp_error($user)) {
      $auth_mode = 'info';
      $info = 'Your Pasword Reset Key in Invalid!';
    } else {
      if (isset($_POST['new_password']) && $_POST['new_password'] != '') {
        reset_password($user, $_POST['new_password']);
        $auth_mode = 'info';
        $info = 'Your Password Has Been Changed Successfuly';
      } else {
        $auth_mode = 'info';
        $info = 'Error Happened';
      }
    }
  } else {
    echo 'Invalid request';
  }
}



if ($_SERVER['REQUEST_METHOD'] === 'GET') {
  $action = $_GET['action'] ?? '';
  $login = $_GET['login'] ?? '';
  $key = $_GET['key'] ?? '';

  if ($action === 'logout') {

    wp_logout();
    wp_safe_redirect(home_url($container->get('auth.slug')));

    exit;
  }

  if (is_user_logged_in()) {
    wp_safe_redirect($container->get('auth.redirect_url'));
    exit;
  }

  if ($action === 'rp') {
    $user = check_password_reset_key($key, $login);
    if (is_wp_error($user)) {
      $auth_mode = 'info';
      $info = 'Your Pasword Reset Key in Invalid!';
    } else {
      $auth_mode = 'rp';
    }
  }
}
?>
<div id="<?php echo esc_attr($prefix); ?>-auth" data-home-url="<?php echo esc_attr(home_url()); ?>"  data-assets-fonts-url="<?php echo esc_attr(($container->get('assets.fonts.url'))) ?>" data-assets-images-url="<?php echo esc_attr(($container->get('assets.images.url'))) ?>" data-site-title="<?php echo esc_attr((get_bloginfo('name'))) ?>" data-lostpassword-nonce="<?php echo esc_attr(wp_create_nonce('lostpassword_action')); ?>" data-login-nonce="<?php echo esc_attr(wp_create_nonce('login_action')); ?>" data-register-nonce="<?php echo esc_attr(wp_create_nonce('register_action')); ?>" data-rpnonce="<?php echo esc_attr(wp_create_nonce('rp_action')); ?>" data-mode="<?php echo esc_attr($auth_mode); ?>" data-info="<?php echo esc_attr($info); ?>">
</div>

<pre style="display: none !important" id="auth_errors">
  <?php echo wp_json_encode(array_values($auth_error)); ?>
</pre>