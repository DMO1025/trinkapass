<?php
class Database
{
    private $pdo;
    private $stmt;

    public function __construct()
    {
        $config = include 'core/config.php';
        $dsn = "mysql:host={$config['host']};dbname={$config['dbname']};charset=utf8";
        try {
            $this->pdo = new PDO($dsn, $config['user'], $config['password']);
            $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            die("Database connection failed: " . $e->getMessage());
        }
    }

    public function query($sql)
    {
        $this->stmt = $this->pdo->prepare($sql);
    }

    public function bind($param, $value, $type = null)
    {
        if (is_null($type)) {
            switch (true) {
                case is_int($value):
                    $type = PDO::PARAM_INT;
                    break;
                case is_bool($value):
                    $type = PDO::PARAM_BOOL;
                    break;
                case is_null($value):
                    $type = PDO::PARAM_NULL;
                    break;
                default:
                    $type = PDO::PARAM_STR;
            }
        }
        $this->stmt->bindValue($param, $value, $type);
    }

    public function create($table, $data)
    {
        $fields = implode(',', array_keys($data));
        $placeholders = ':' . implode(',:', array_keys($data));
        $sql = "INSERT INTO {$table} ({$fields}) VALUES ({$placeholders})";
        $this->query($sql);
        foreach ($data as $key => $value) {
            $this->bind(":{$key}", $value);
        }
        return $this->execute();
    }

    public function update($table, $id, $data, $campo = 'id')
    {
        $fields = '';
        foreach ($data as $key => $value) {
            $fields .= "{$key} = :{$key}, ";
        }
        $fields = rtrim($fields, ', ');
        $sql = "UPDATE {$table} SET {$fields} WHERE {$campo} = :id";
        $this->query($sql);
        foreach ($data as $key => $value) {
            $this->bind(":{$key}", $value);
        }
        $this->bind(':id', $id);
        return $this->execute();
    }

    public function delete($table, $id)
    {
        $sql = "DELETE FROM {$table} WHERE id = :id";
        $this->query($sql);
        $this->bind(':id', $id);
        return $this->execute();
    }

    public function result()
    {
        $this->execute();
        return $this->stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function unico()
    {
        $this->execute();
        return $this->stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function contagem()
    {
        return $this->stmt->rowCount();
    }

    public function execute()
    {
        return $this->stmt->execute();
    }

    public function paginar($sql, $limit, $offset)
    {
        $sql .= " LIMIT :limit OFFSET :offset";
        $this->query($sql);
        $this->bind(':limit', (int)$limit, PDO::PARAM_INT);
        $this->bind(':offset', (int)$offset, PDO::PARAM_INT);
        return $this->result();
    }
}
