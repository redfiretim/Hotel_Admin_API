<?php

class DSConnect {
    // Define datasource properties.
    private $host;
    private $db_name;
    private $username;
    private $password;
    public static $ds;
    private $dsc;

    // Catch datasource credentials via constructor.
    public function __construct($host, $db_name, $username, $password) {
        $this->host = $host;
        $this->db_name = $db_name;
        $this->username = $username;
        $this->password = $password;
    }

    private function DSConnect() {
        try {
            $this->dsc = new PDO('mysql:host='.$this->host.';dbname='.$this->db_name, $this->username, $this->password);
            $this->dsc->exec('set names utf8');
        } catch (PDOException $exception) {
            echo 'dscection error: '.$exception->getMessage();
        }
    }

    public static function getInstance($host, $db_name, $username, $password) {
        if (!isset(DSConnect::$ds)) {
            DSConnect::$ds = new DSConnect($host, $db_name, $username, $password);
        }
        return DSConnect::$ds->dsc;
    }
}
