<?php

namespace App;

use App\Model\Subject;
use App\Model\SubjectManager;
use Nette\Application\IRouter;
use Nette\Application\Routers\Route;
use Nette\Application\Routers\RouteList;
use Nette\InvalidStateException;
use Nette\Object;

/**
 * Router factory.
 */
class RouterFactory extends Object {
    /**
     * @return IRouter
     */
    public function createRouter() {
        $router = new RouteList();
        $router[] = new Route('<presenter>/<action>', 'Homepage:default');
        return $router;
    }

}
