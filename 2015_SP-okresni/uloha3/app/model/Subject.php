<?php

namespace App\Model;

use Nette\Object;
use App\Model\Video;

class Subject extends Object {

    /** @var string */
    public $slug;

    /** @var string */
    public $name;

    /** @var Video[] */
    public $videos;

    /** @var string|NULL */
    public $supplier;

    /**
     * @param string $slug
     * @param string $name
     * @param Video[] $videos
     * @param string|NULL $supplier
     */
    public function __construct($slug, $name, array $videos, $supplier = NULL) {
        $this->slug = $slug;
        $this->name = $name;
        $this->videos = $videos;
        $this->supplier = $supplier;
    }

}
