<?php
class DSConnect {
    // PROPERTIES:
    // DS object.
    public static $ds;
    // DS handle.
    private $dsh;
    // DS credentials.
    private $host;
    private $db_name;
    private $username;
    private $password; 

    // CONSTRUCTOR:
    // Catches datasource credentials.
    public function __construct() {
        $this->host = Config::$host;
        $this->db_name = Config::$db_name;
        $this->username = Config::$username;
        $this->password = Config::$password;
    }

    // METHODS:
    // Creates a data source handle.
    private function DSConnect() {
        try {
            $this->dsh = new PDO('mysql:host='.$this->host.';dbname='.$this->db_name, $this->username, $this->password);
            $this->dsh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->dsh->exec('set names utf8');
        } catch (PDOException $exception) {
            echo 'dscection error: '.$exception->getMessage();
        }
    }

    // Creates a DSConnect object inside the DSConnect class.
    public static function getInstance() {
        if (!isset(DSConnect::$ds)) {
            DSConnect::$ds = new DSConnect();
        }
        DSConnect::$ds->DSConnect();
        return DSConnect::$ds->dsh; 
    }
}