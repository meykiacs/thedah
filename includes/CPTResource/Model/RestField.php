<?php
namespace Thedah\CPTResource\Model;

class RestField
{
  
  abstract function getCallback() : ?callable;
  abstract function updateCallback() : ?callable;
  abstract function validateCallback() : ?callable;

}