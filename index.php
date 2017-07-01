<?php
//hello world
$resourceDomain = filter_input(INPUT_GET, 'domain', FILTER_SANITIZE_STRING);
$resourceType = filter_input(INPUT_GET, 'type', FILTER_SANITIZE_STRING);
$resourceName = filter_input(INPUT_GET, 'name', FILTER_SANITIZE_STRING);
$debug = filter_input(INPUT_GET, 'dbg', FILTER_SANITIZE_STRING);
require_once('Config.php');

if ($resourceDomain && $resourceType && $resourceName) {

    if (in_array($resourceDomain, Config::DOMAINS) && in_array($resourceType, Config::TYPE)) {
        $dir = $resourceDomain . DIRECTORY_SEPARATOR . $resourceType;
        if ($file = is_file($dir . $resourceName . '.' . $resourceType)) {
            header("Content-type: text/css", true);
            header("Content-Length: " . filesize($file));
            readfile($file);
            exit();
        } else {
            if ($debug == 1) {
                throw new \Exception(' file :: ' . var_export($file) . ' fir::' . $dir);
            }
        }
    } else {
        if ($debug == 1) {
            throw new \Exception(
                'Not in array or not in config type cond 1::'
                . var_export(in_array($resourceDomain, Config::DOMAINS)) . 'cond 2::'
                . var_export(in_array($resourceType, Config::TYPE))
            );
        }
    }
} else {
    throw new \Exception('Hello world, this is a private service please don\'t use it!');
}