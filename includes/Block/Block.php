<?php
declare(strict_types=1);
namespace Thedah\Block;

use DI\Container;

class Block
{
  /**
   * The array of the names of the directory in the build folder that contains the block.json file
   * @var string[]
   */
  private array $blockNames = [];

  private string $dirPath;

  public function __construct(Container $c)
  {
    $this->dirPath = $c->get('block.dirpath');
  }

  public function add(string $blockName): self
  {
    $this->blockNames[] = $blockName;
    return $this;
  }

  public function register(): void
  {
    add_action(
      'init',
      function () {
        foreach ($this->blockNames as $blockName) {
          // var_dump( $this->dirPath . $blockName); wp_die();
          register_block_type($this->dirPath . $blockName);
        }
      }
    );
  }
}