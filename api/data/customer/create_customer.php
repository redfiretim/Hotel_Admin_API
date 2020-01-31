<?php
/*
Available_rooms contains all avaiable rooms by room_id where check_in_date en check_out_date is not filled yet.
*/

$first_name = $data->first_name;
$last_name = $data->last_name;
$email = $data->email;
$phone_num = $data->phone_num;

// Validates data with regular expressions.
if (
preg_match('/^([A-Za-z]{1,32}[ \-]?[A-Za-z]{1,32}){1,32}$/', $first_name) &&
preg_match('/^([A-Za-z]{1,32}[ \-]?[A-Za-z]{1,32}){1,32}$/', $last_name) &&
preg_match('/^([A-Za-z0-9]{1}[A-Za-z0-9\.\_\-]{0,63}@[A-Za-z0-9]{1,80}[\.]{1}[A-Za-z]{2,20}){0,150}$/', $email) &&
preg_match('/^[\+]{1}[1-9]{1}[0-9\-]{9,18}$|^[0-9]{1}[0-9\-]{9,20}$/', $phone_num)) {
    // Defines query content.
    $customer_columns = $config->getColumns('read_customer');
    $customer_table = $config->getTables('create_customer');
    $var_conditions = array('email' => $email);

    //Check database if there is already a customer with that email
    $stmt = $dshelper->read($customer_table, $customer_columns, $var_conditions);
    $num = $stmt->rowCount();
    if ($num > 0) {
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $customer_id = $row['id'];
        }
        http_response_code(200);

        if ($requested_action == basename(__FILE__, '.php')) {
            echo json_encode(array('message' => 'Customer: '.$customer_id.' has been selected from the database'));
        }
    } else {  //Insert a new customer in the database
        $customer_data = array('first_name' => "$first_name", 'last_name' => $last_name, 'email' => $email, 'phone_num' => $phone_num);
        $customer_id = $dshelper->create($customer_table, $customer_data);

        // set response code - 201 CREATED
        http_response_code(201);

        if ($requested_action == basename(__FILE__, '.php')) {
            echo json_encode(array('message' => 'Customer: '.$customer_id.' has been created'));
        }
    }
} else {
    // bad request
    http_response_code(400);
    // tell the user that something went wrong
    echo json_encode(array('message' => 'Looks like something went wrong'));
}
