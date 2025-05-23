<?php
class Controler
{
    public function render($conteudo, $arr = [])
    {
        extract($arr);
        require_once "aplicacao/view/{$conteudo}.php";
    }

    public function modelo($modelo)
    {
        $modelPath = "aplicacao/model/{$modelo}Model.php";
        if (file_exists($modelPath)) {
            require_once $modelPath;
            $className = ucfirst($modelo) . 'Model';
            if (class_exists($className)) {
                return new $className();
            }
        }
        return null;
    }

    public function erro($mensagem)
    {
        $erro = $mensagem;
        require_once 'aplicacao/view/template/erro.php';
        exit;
    }
}
