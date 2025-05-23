<?php
class Classes
{
    public static function autoload($class_name)
    {
        $directories = [
            'core/',
            'aplicacao/classes/',
            'aplicacao/controler/',
            'aplicacao/model/'
        ];

        foreach ($directories as $dir) {
            $file = $dir . $class_name . '.php';
            if (file_exists($file)) {
                require_once $file;
                return;
            }
        }
    }
}

spl_autoload_register(['Classes', 'autoload']);
