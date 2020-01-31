<?php

class DSHelper
{
    // Datasource handle property.
    private $dsh;

    // Catch handle via constructor.
    public function __construct($dsh)
    {
        $this->dsh = $dsh;
    }

    // CREATE METHOD.
    public function create($table, $var_conditions)
    {
        // Defines a column and prepared value array.
        $cols = array();
        $preps = array();
        // Splits the data parameter into columns and prepared values and pushes them into arrays.
        foreach ($var_conditions as $column => $value) {
            array_push($cols, $column);
            array_push($preps, '?');
        }
        // Defines sql statement: columns and values are extracted from cols and preps arrays.
        $sql = 'INSERT INTO '.$table.' ('.implode(', ', $cols).') VALUES ('.implode(', ', $preps).')';
        $stmt = $this->dsh->prepare($sql);
        // Replace prepared values for real values.
        $index = 0;
        // Loops through all prepared statement and set the value
        foreach ($var_conditions as $column => $value) {
            ++$index;
            $stmt->bindValue($index, $value);
        }
        // Execute statement.
        $stmt->execute();
        // Return last ID.
        $last_id = $this->dsh->lastInsertId();

        return (int)$last_id;
    }

    public function filter($tables, $columns, $var_conditions, $const_conditions = '')
    {
        $sql = 'SELECT accommodation_types.name, accommodations.id, accommodations.price_per_night, accommodations.description, accommodations.accommodation_type_id, accommodations.room_num FROM accommodations, accommodation_types
        WHERE accommodations.accommodation_type_id = accommodation_types.id AND accommodations.id NOT IN(
        SELECT reservations.accommodation_id FROM reservations WHERE (reservations.check_in_date BETWEEN "'.$var_conditions[0].'" AND "'.$var_conditions[1].'" OR reservations.check_out_date BETWEEN "'.$var_conditions[0].'" AND "'.$var_conditions[1].'"))
        GROUP BY accommodations.accommodation_type_id';

        $stmt = $this->dsh->prepare($sql);
        $stmt->execute();

        // echo $sql;

        return $stmt;
    }

    // READ METHOD.
    public function read($tables, $columns, $var_conditions, $const_conditions = '')
    {
        // Defines a conditions variable.
        $conditions = '';
        // Changes var_conditions into prepared conditions.
        foreach ($var_conditions as $column => $value) {
            $conditions .= $column.' = ?';
            if (next($var_conditions)) {
                $conditions .= ' AND ';
            }
        }

        // Checks for const_conditions (fixed conditions that are needed to join tables).
        if (isset($const_conditions) && $const_conditions != '') {
            $conditions .= ' AND ';
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
        $sql = 'SELECT DISTINCT '.implode(', ', $columns).' FROM '.$tables.' '.$where_clause;
        $stmt = $this->dsh->prepare($sql);

        $index = 0;
        // Loops through all prepared statement and set the value
        foreach ($var_conditions as $column => $value) {
            ++$index;
            $stmt->bindValue($index, $value);
            // echo $index.' : '.$value;
        }
        // Executes statement.
        // echo $sql;
        $stmt->execute();

        return $stmt;
    }

    // UPDATE METHOD.
    public function update($table, $data, $conditions)
    {
        // Defines a settings and where_clause variable.
        $settings = array();
        $where_clause = '';
        // Redefines key-value pairs into key-prepared value pairs and pushes them into the settings array.
        foreach ($data as $column => $value) {
            array_push($settings, $column.'= ?');
        }
        // Changes conditions into prepared conditions.
        foreach ($conditions as $column => $value) {
            $where_clause .= $column.'= ?';
            if (next($conditions)) {
                $where_clause .= ' AND ';
            }
        }
        // Defines sql statement.
        $sql = 'UPDATE '.$table.' SET '.implode(', ', $settings).' WHERE '.$where_clause;
        $stmt = $this->dsh->prepare($sql);
        // Replaces prepared values for real values.

        $index = 0;
        // Loops through all prepared statement and set the value
        foreach ($data as $column => $value) {
            ++$index;
            $stmt->bindValue($index, $value);
        }

        // Loops through all prepared statement and set the value
        foreach ($conditions as $column => $value) {
            ++$index;
            $stmt->bindValue($index, $value);
        }
        // Executes statement.
        $stmt->execute();

        return $stmt;
    }

    // DELETE METHOD.
    public function delete($table, $var_conditions)
    {
        // Defines a where_clause variable.
        $where_clause = '';
        // Changes conditions into prepared conditions.
        foreach ($var_conditions as $column => $value) {
            $where_clause .= $column.'= ?';
            if (next($var_conditions)) {
                $where_clause .= ' AND ';
            }
        }
        // Defines sql statement.
        $sql = 'DELETE FROM '.$table.' WHERE '.$where_clause;
        $stmt = $this->dsh->prepare($sql);
        // Replaces prepared values for real values.
        $index = 0;
        foreach ($var_conditions as $column => $value) {
            ++$index;
            $stmt->bindValue($index, $value);
        }
        // Execute statement.
        $stmt->execute();
        // Return last ID.
        return $stmt;
    }
}
