<?php

class DSHelper
{
    private $dbc;

    public function __construct($dsh)
    {
        $this->dbc = $dsh;
    }

    // /* Create example customer */
    // $table = 'customer';
    // $data = ['first_name' => 'Pieter', 'last_name' => 'Iepsma', 'email' => 'lorum_ipsum@gmail.com', 'phone' => '0612345678'];
    // create($table, $data);

    // /* Create example reservation */
    // $customer_id = 'LAST_INSERT_ID()';
    // $table = 'reservation';
    // $data = ['customer_id' => $customer_id];
    // create($table, $data);

    public function create($table, $data)
    {
        //Splits the Array into strings to create a prepared statement query
        foreach ($data as $column => $value) {
            $cols[] = $table.'.'.$column;
            $preps[] = ':'.$column;
        }
        //Splits the arrays to create the SET for the query
        $sql = 'INSERT INTO '.$table.' ('.implode(', ', $cols).') VALUES ('.implode(', ', $preps).')';
        $stmt = $this->dbh->prepare($sql);
        //loop through all prepared statement and set the value
        foreach ($data as $column => $value) {
            $stmt->bindValue((':'.$column), $value);
        }
        // Execute statement.
        return $stmt->execute();
    }

    // /* read all example reservation*/
    // $table = 'reservation';
    // $data = ['reservation_id', 'room_id', 'customer_id'];
    // read($table, $data);

    // /* read example reservations by customer */
    // $table = 'reservation';
    // $data = ['reservation_id', 'room_id', 'customer_id'];
    // $conditions = ['customer_id' => '2'];
    // read($table, $data, $conditions);

    // /* read  example rooms by details */
    // $table = 'room';
    // $data = ['room_id', 'room_type', 'room_price'];
    // $conditions = ['wifi' => '1'];
    // read($table, $data, $conditions);

    public function read($table, $data, $conditions = '')
    {
        //Splits the data array into strings, to set the colums to select.
        foreach ($data as $column => $value) {
            $cols[] = $table.'.'.$column;
        }

        //Splits the condition array into strings, to set the colums to select.
        if ($conditions != '') {
            foreach ($conditions as $condition => $value) {
                $condition = $table.'.'.$condition.' = '.':'.$condition;
                if (next($condition)) {
                    $condition .= ' AND ';
                }
                $clause .= $condition;
            }
            $where = 'WHERE '.$clause;
        }
        // prepare statement
        $sql = 'SELECT '.implode(', ', $cols).' FROM '.$where;
        $stmt = $this->dbh->prepare($sql);
        //loop through all prepared statement and set the value
        foreach ($data as $column => $value) {
            $stmt->bindValue((':'.$column), $value);
        }
        // Execute statement.
        return $stmt->execute();
    }
}
