<?php

declare(strict_types=1);

namespace Thedah\Rest\Model\Endpoints;

use Thedah\Rest\Model\Endpoints\Endpoint;

class EmailPost extends Endpoint {

  public function __construct() {
    parent::__construct('POST');
  }

  public function getPermissionCallback(): callable {
    return '__return_true';
  }
  public function getCallback(): callable {
    /**
     * @return \WP_REST_Response|\WP_Error
     */
    return function (\WP_REST_Request $request) {
      $to = 'example@example.com';
      $subject = 'New message from ' . sanitize_text_field($request['name']);
      $body = 'From: ' . sanitize_email($request['email']) . "\n\n" . sanitize_text_field($request['content']);
      $headers = array('Content-Type: text/html; charset=UTF-8');
      if (wp_mail($to, $subject, $body, $headers)) {
        return new \WP_REST_Response('Email sent successfully', 200);
      } else {
        return new \WP_REST_Response('Error sending email', 500);
      }
    };
  }
}
