<?php
class Init
{
    public static function inicia()
    {
        $url = self::geturl();
        $controle = isset($url[0]) ? $url[0] : 'home';
        $metodo = isset($url[1]) ? $url[1] : 'inicio';
        $parametros = array_slice($url, 2);

        $controlerPath = self::getControlerPath($controle);
        if (!$controlerPath) {
            self::erro("Controler not found: " . $controle);
            return;
        }

        require_once $controlerPath;
        $classe = ucfirst($controle);
        if (!class_exists($classe)) {
            self::erro("Class not found: " . $classe);
            return;
        }

        $obj = new $classe();
        if (!method_exists($obj, $metodo)) {
            self::erro("Method not found: " . $metodo);
            return;
        }

        call_user_func_array([$obj, $metodo], $parametros);
    }

    public static function erro($mensagem)
    {
        $erro = $mensagem;
        require_once 'aplicacao/view/template/erro.php';
        exit;
    }

    public static function geturl()
    {
        if (isset($_GET['url'])) {
            $url = rtrim($_GET['url'], '/');
            $url = filter_var($url, FILTER_SANITIZE_URL);
            return explode('/', $url);
        }
        return [];
    }

    public static function carregarComponentes($controle)
    {
        $modelPath = "aplicacao/model/{$controle}Model.php";
        $viewPath = "aplicacao/view/{$controle}/index.php";

        if (file_exists($modelPath)) {
            require_once $modelPath;
        }
        if (file_exists($viewPath)) {
            require_once $viewPath;
        }
    }

    public static function getControlerPath($controle)
    {
        $basePath = "aplicacao/controler/";
        $path = $basePath . $controle . ".php";
        if (file_exists($path)) {
            return $path;
        }
        // Check subfolders
        $dirs = glob($basePath . '*', GLOB_ONLYDIR);
        foreach ($dirs as $dir) {
            $subPath = $dir . "/" . $controle . ".php";
            if (file_exists($subPath)) {
                return $subPath;
            }
        }
        return false;
    }
}
