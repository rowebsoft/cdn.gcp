<?php
//hello world
$resourcedomain = filter_input(INPUT_GET, 'domain', FILTER_SANITIZE_STRING);
$resourceType = filter_input(INPUT_GET, 'type', FILTER_SANITIZE_STRING);
$resourceName = filter_input(INPUT_GET, 'name', FILTER_SANITIZE_STRING);
require_once('Config.php');

if ($resourcedomain && $resourceType && $resourceName) {

    if (in_array($resourcedomain, Config::DOMAINS) && in_array($resourceType, Config::TYPE))
    {
        $dir = $resourcedomain.DIRECTORY_SEPARATOR.$resourceType;
        if( $file = is_file($dir.$resourceName.$resourceType)){
            header("Content-type: text/css", true);
            header("Content-Length: " . filesize($file));
            readfile($file);
            exit();
        }
    }
}
throw new \Exception('Hello world, this is a private service please don\'t use it!');