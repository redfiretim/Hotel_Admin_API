<?php
class DSConnect {
    // PROPERTIES:
    // DS object.
    public static $ds;
    // DS handle.
    private $dsh;

    // CONSTRUCTOR:
    public function __construct() {
        // Creates a data source handle based on ds credentials as specified in the Config class.
        try {
            $this->dsh = new PDO('mysql:host='.Config::$host.';dbname='.Config::$db_name, Config::$username, Config::$password);
            $this->dsh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->dsh->exec('set names utf8');
        } catch (PDOException $exception) {
            echo 'dscection error: '.$exception->getMessage();
        }
    }

    // METHODS:
    // Creates a DSConnect object inside the DSConnect class.
    public static function getInstance() {
        if (!isset(self::$ds)) {
            self::$ds = new DSConnect();
        }
        return self::$ds->dsh; 
    }
}