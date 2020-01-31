<?php

class Reservation {
    // PROPERTIES.
    private $condition;
    private $data_arr;
    private $dshelper;
    private $table = 'reservations';

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
            "booking_date" => '/^[\d]{4}[\-](0[1-9]|1[012])[\-](0[1-9]|[12][0-9]|3[01])$/',
            "customer_id" => '/^[0-9]{0,4}$/',
            "accommodation_id" => '/^[0-9]{1,4}$/',
            "num_of_pers" => '/^[1-4]{1}$/',
            "check_in_date" => '/^[\d]{4}[\-](0[1-9]|1[012])[\-](0[1-9]|[12][0-9]|3[01])$/',
            "check_out_date" => '/^[\d]{4}[\-](0[1-9]|1[012])[\-](0[1-9]|[12][0-9]|3[01])$/',
            "num_of_nights" => '/^[0-9]{1,2}$/',
            "total_price" => '/^[0-9]{1,4}$/',
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

    public function createReservation() {
        // Execute query.
        $stmt = $this->dshelper->create($this->table, $this->data_arr);
        $this->handleResponse($stmt);
     }

    public function readOneReservation() {
        // ADD ME
    }

    public function readReservations() {
        // ADD ME
    }

    public function updateReservation() {
        // Execute query.
        $stmt = $this->dshelper->update($this->table, $this->data_arr, $this->condition);
        $this->handleResponse($stmt);
    }
    
    public function deleteReservation() {
        // ADD ME
    }
}