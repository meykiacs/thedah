<?php
declare(strict_types=1);
namespace Woochak\Sanitize;

use Woochak\Constants;

class Sanitize
{

  public function email(): callable
  {
    return function (string $param, \WP_REST_Request $request, string $key) {
      $sane = sanitize_email($param);
      if ($sane !== $param) {
        return new \WP_Error('invalid_rest_param', esc_html__('Email is invalid', Constants::TEXTDOMAIN), ['status' => 400]);
      }
      return $sane;
    };
  }


  public function password(): callable
  {
    return function (string $param, \WP_REST_Request $request, string $key) {
      $sane = sanitize_text_field($param);
      if ($sane !== $param) {
        return new \WP_Error('invalid_rest_param', esc_html__('Password is invalid', Constants::TEXTDOMAIN), ['status' => 400]);
      }
      return $sane;
    };
  }

  public function textField(): callable
  {
    return function (string $param, \WP_REST_Request $request, string $key) {
      $sane = sanitize_text_field($param);
      if ($sane !== $param) {
        return new \WP_Error('invalid_rest_param', sprintf(__('%s is invalid', Constants::TEXTDOMAIN), $key), ['status' => 400]);
      }
      return $sane;
    };
  }


}