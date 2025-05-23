<?php
require_once 'core/controler.php';

class Web extends Controler
{
    public function inicio()
    {
        $userModel = $this->modelo('user/user');
        $usuarios = $userModel ? $userModel->listar() : [];
        $this->render('home/index', ['usuarios' => $usuarios]);
    }
}
