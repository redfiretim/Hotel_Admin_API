<?php

class DSHelper {
    // Datasource handle property.
    private $dsh;

    // Catch handle via constructor.
    public function __construct($dsh) {
        $this->dsh = $dsh;
    }

    // CREATE METHOD.
    public function create($table, $data) {
        // Defines a column and prepared value array.
        $cols = array();
        $preps = array();
        // Splits the data parameter into columns and prepared values and pushes them into arrays.
        foreach ($data as $column => $value) {
            array_push($cols, $column;
            array_push($preps, ':'.$column;
        }
        // Defines sql statement: columns and values are extracted from cols and preps arrays.
        $sql = 'INSERT INTO '.$table.' ('.implode(', ', $cols).') VALUES ('.implode(', ', $preps).')';
        $stmt = $this->dsh->prepare($sql);
        // Replace prepared values for real values.
        foreach ($data as $column => $value) {
            $stmt->bindValue((':'.$column), $value);
        }
        // Execute statement.
        $stmt->execute();
        // Return last ID.
        return $stmt->lastInsertId();
    }

    // READ METHOD.
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
        $sql = 'SELECT DISTINCT '.implode(', ', $columns).' FROM '.$tables.' '.$where_clause;
        $stmt = $this->dsh->prepare($sql);
        // Loops through all prepared statement and set the value
        foreach ($var_conditions as $column => $value) {
            $stmt->bindValue((':'.$column), $value);
        }
        // Executes statement.
        return $stmt->execute();
    }

    // UPDATE METHOD.
    public function update($table, $data, $conditions) {
        // Defines a settings and where_clause variable.
        $settings = array();
        $where_clause = '';
        // Redefines key-value pairs into key-prepared value pairs and pushes them into the settings array.
        foreach ($data as $column => $value) {
            array_push($settings, $column.'=:'.$column;
        }
        // Changes conditions into prepared conditions.
        foreach ($conditions as $column => $value) {
            $where_clause .= $column.'=:'.$column;
            if (next($conditions)) {
                $where_clause .= ' AND ';
            }
        }
        // Defines sql statement.
        $sql = 'UPDATE '.$table.' SET '.implode(', ', $settings).' WHERE '.$where_clause;
        $stmt = $this->dsh->prepare($sql);
        // Replaces prepared values for real values.
        foreach ($data as $column => $value) {
            $stmt->bindValue((':'.$column), $value);
        }
        foreach ($conditions as $column => $value) {
            $stmt->bindValue((':'.$column), $value);
        }
        // Executes statement.
        $stmt->execute();
        return;
    }

    // DELETE METHOD.
    public function delete($table, $conditions) {
        // Defines a where_clause variable.
        $where_clause = '';
        // Changes conditions into prepared conditions.
        foreach ($conditions as $column => $value) {
            $where_clause .= $column.'=:'.$column;
            if (next($conditions)) {
                $where_clause .= ' AND ';
            }
        }
        // Defines sql statement.
        $sql = 'DELETE FROM '.$table.' WHERE '.$where_clause;
        $stmt = $this->dsh->prepare($sql);
        // Replaces prepared values for real values.
        foreach ($conditions as $column => $value) {
            $stmt->bindValue((':'.$column), $value);
        }
        // Executes statement.
        $stmt->execute();
        return;
    }
}
?>