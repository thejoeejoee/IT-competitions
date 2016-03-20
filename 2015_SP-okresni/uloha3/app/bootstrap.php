<?php

require __DIR__ . '/../vendor/autoload.php';

$configurator = new Nette\Configurator;

if (!function_exists('bDump')) {
    /**
     * Tracy\Debugger::barDump() shortcut.
     * @tracySkipLocation
     */
    function bDump($var) {
        array_map('Tracy\Debugger::barDump', func_get_args());
        return $var;
    }
}

$configurator->setDebugMode(TRUE); // enable for your remote IP
$configurator->enableDebugger(__DIR__ . '/../log');

$configurator->setTempDirectory(__DIR__ . '/../temp');

$configurator->createRobotLoader()
    ->addDirectory(__DIR__)
    ->register();

$configurator->addConfig(__DIR__ . '/config/config.neon');

$container = $configurator->createContainer();

return $container;
