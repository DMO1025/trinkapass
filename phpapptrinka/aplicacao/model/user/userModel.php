<?php
require_once 'core/database.php';

class UserModel extends Database
{
    public function listar()
    {
        $this->query("SELECT * FROM usuarios");
        return $this->result();
    }
}
