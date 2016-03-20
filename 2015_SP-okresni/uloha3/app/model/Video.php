<?php

namespace App\Model;

use Nette\Object;

class Video extends Object {

    public $slug;
    public $name;

    public function __construct($slug, $name) {
        $this->slug = $slug;
        $this->name = $name;
    }

}
