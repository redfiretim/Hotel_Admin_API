<?php

class DSConnect
{
    public static $ds;
    private $dsc;

    // specify your own database credentials
    private $host = 'localhost';
    private $db_name = 'reservation_system';
    private $username = 'root';
    private $password = '';

    private function setConnection()
    {
        try {
            $this->dsc = new PDO('mysql:host='.$this->host.';dbname='.$this->db_name, $this->username, $this->password);
            $this->dsc->exec('set names utf8');
        } catch (PDOException $exception) {
            echo 'dscection error: '.$exception->getMessage();
        }
    }

    public static function getInstance()
    {
        if (!isset(DSConnect::$ds)) {
            DSConnect::$ds = new DSConnect();
        }

        return DSConnect::$ds->dsc;
    }
}
