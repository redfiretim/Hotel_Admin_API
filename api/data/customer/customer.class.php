<?php

class Customer {
    // PROPERTIES.
    private $condition;
    private $data_arr;
    private $dshelper;
    private $table = 'customers';

    // CONSTRUCTOR.
    public function __construct($data, $dshelper) {
        // Stores dshelper in object.
        $this->dshelper = $dshelper;
        // Defines arrays to store keys and values of JSON object.
        $keys_arr = array();
        $values_arr = array();
        // Defines an array that stores validation patterns of $data keys.
        $pattern_arr = array(
            "id" => '/^[0-9]{0,4}$/',
            "first_name" => '/^([A-Za-z]{1,32}[ \-]?[A-Za-z]{1,32}){1,32}$/',
            "last_name" => '/^([A-Za-z]{1,32}[ \-]?[A-Za-z]{1,32}){1,32}$/',
            "email" => '/^([A-Za-z0-9]{1}[A-Za-z0-9\.\_\-]{0,63}@[A-Za-z0-9]{1,80}[\.]{1}[A-Za-z]{2,20}){0,150}$/',
            "phone_num" => '/^[\+]{1}[1-9]{1}[0-9\-]{9,18}$|^[0-9]{1}[0-9\-]{9,20}$/'
         );
        // Validate JSON object values by using regular expressions.
        foreach($data as $property => $value) {
            if (isset($pattern_arr[$property])) {
                if (preg_match($pattern_arr[$property], $value)) {
                    // Push keys and values in arrays if validation was succesful.
                    array_push($keys_arr, $property);
                    array_push($values_arr, $value);
                    //
                    if ($property === 'id') {
                        $this->condition = array('id' => $value);
                    }
                } else {
                    // Bad request.
                    http_response_code(400);
                    // Tells the user that something went wrong.
                    echo json_encode(array('message' => 'Looks like something went wrong'));
                }
            }
        }
        // Defines an array consisting of key => value pairs.
        $this->data_arr = array_combine($keys_arr, $values_arr);
    }

    // METHODS.
    public function handleResponse($stmt) {
        if (is_int($stmt)) {
            // Transform $stmt into $num when executed query = 'create_customer'.
            $num = $stmt;
        } else {
            // Count number of result rows.
            $num = $stmt->rowCount();
        }
        // Num > 0 means there is a result.
        if ($num > 0) {
            // response received, updated
            http_response_code(200);
        } else {
            // bad request
            http_response_code(400);
            // tell the user that update failed.
            echo json_encode(array('message' => 'Request failed'));
        }
    }

    public function createCustomer() {
        // Execute query.
        $stmt = $this->dshelper->create($this->table, $this->data_arr);
        $this->handleResponse($stmt);
     }

    public function readCustomer() {
        // ADD ME
    }

    public function updateCustomer() {
        // Execute query.
        $stmt = $this->dshelper->update($this->table, $this->data_arr, $this->condition);
        $this->handleResponse($stmt);
    }
    
    public function deleteCustomer() {
        // ADD ME
    }
}