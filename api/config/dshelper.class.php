<?php

class DSHelper {
    private $dsh;

    public function __construct($dsh) {
        $this->dsh = $dsh;
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

    public function create($table, $data) {
        // Splits the data parameter into column and prepared value arrays.
        foreach ($data as $column => $value) {
            $cols[] = $column;
            $preps[] = ':'.$column;
        }
        // Defines sql statement: columns and values are extracted from cols and preps arrays.
        $sql = 'INSERT INTO '.$table.' ('.implode(', ', $cols).') VALUES ('.implode(', ', $preps).')';
        $stmt = $this->dsh->prepare($sql);
        // Replace prepared values for real values.
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

    public function read($tables, $columns, $var_conditions, $const_conditions = '',) {
        // Defines a conditions variable.
        $conditions = '';
        // Changes var_conditions into prepared conditions.
        foreach ($var_conditions as $column => $value) {
                $conditions .= $column.'=:'.$column;
                if (next($var_conditions)) {
                    $conditions .= ' AND ';
                }
            }
        }
        // Checks for const_conditions (fixed conditions that are needed to join tables).
        if (isset($const_conditions) && $const_conditions != '') {
            $conditions .= ' AND '
            foreach ($const_conditions as $const_condition) {
                $conditions .= $const_condition;
                if (next($const_conditions)) {
                    $conditions .= ' AND ';
                }
            }
        }
        // Defines WHERE clause.
        $where_clause = 'WHERE '.$conditions;
        // Creates a prepared statement.
        $sql = 'SELECT '.implode(', ', $columns).' FROM '.$tables.' '.$where_clause;
        $stmt = $this->dsh->prepare($sql);
        // Loops through all prepared statement and set the value
        foreach ($var_conditions as $column => $value) {
            $stmt->bindValue((':'.$column), $value);
        }
        // Executes statement.
        return $stmt->execute();
    }
}
?>