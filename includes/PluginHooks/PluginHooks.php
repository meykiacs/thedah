<?php

namespace Woochak\PluginHooks;

use DI\Container;

class PluginHooks
{
  private string $pluginFilePath;
  private array $activationCallbacks = [];
  private array $deactivationCallbacks = [];
  private array $uninstallCallbacks = [];

  public function __construct(Container $c)
  {
    $this->pluginFilePath = $c->get('plugin.filepath');
  }

  public function addToActivate(callable $callback)
  {
    $this->activationCallbacks[] = $callback;
  }

  public function addToDeactivate(callable $callback)
  {
    $this->deactivationCallbacks[] = $callback;
  }

  public function addToUninstall(callable $callback)
  {
    $this->uninstallCallbacks[] = $callback;
  }
  public function registerActivationHook()
  {
    register_activation_hook($this->pluginFilePath, function () {
      foreach ($this->activationCallbacks as $callback) {
        $callback();
      }
      flush_rewrite_rules();
    });
  }

  public function registerDeactivationHook()
  {
    register_deactivation_hook($this->pluginFilePath, function () {
      foreach ($this->deactivationCallbacks as $callback) {
        $callback();
      }
      flush_rewrite_rules();
    });
  }

  public function registerUninstallHook()
  {
    register_uninstall_hook($this->pluginFilePath, function () {
      foreach ($this->uninstallCallbacks as $callback) {
        $callback();
      }
      flush_rewrite_rules();
    });
  }
}