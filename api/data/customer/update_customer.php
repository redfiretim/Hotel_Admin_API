<?php

// Catch JSON data
$customer_id = $data->customer_id;
$first_name = $data->first_name;
$last_name = $data->last_name;
$email = $data->email;
$phone_num = $data->phone_num;
$customer_update = false;

// Validates customer details with regular expressions.
if (
preg_match('/^([A-Za-z]{1,32}[ \-]?[A-Za-z]{1,32}){1,32}$/', $first_name) &&
preg_match('/^([A-Za-z]{1,32}[ \-]?[A-Za-z]{1,32}){1,32}$/', $last_name) &&
preg_match('/^([A-Za-z0-9]{1}[A-Za-z0-9\.\_\-]{0,63}@[A-Za-z0-9]{1,80}[\.]{1}[A-Za-z]{2,20}){0,150}$/', $email) &&
preg_match('/^[\+]{1}[1-9]{1}[0-9\-]{9,18}$|^[0-9]{1}[0-9\-]{9,20}$/', $phone_num)) {
    // defines query parameters.
    $table = $config->getTables('update_customer');
    $data = array(
        'first_name' => $first_name,
        'last_name' => $last_name,
        'email' => $email,
        'phone_num' => $phone_num, );
    $conditions = array('id' => $customer_id);
    // execute query.
    $stmt = $dshelper->update($table, $data, $conditions);
    // count result rows.
    $num = $stmt->rowCount();
    // num > 0 means there is a result.
    if ($num > 0) {
        $customer_update = true;
        // response received, updated
        http_response_code(200);
        // tell the user that update was succesful.
        if ($requested_action == basename(__FILE__, '.php')) {
            echo json_encode(array('message' => 'Customer updated.'));
        }
    } else {
        // bad request
        http_response_code(200);
        // tell the user that update failed.

        // echo json_encode(array('message' => 'Update failed'));
    }
} else {
    // bad request
    http_response_code(200);
    // tell the user that something went wrong
    // echo json_encode(array('message' => 'Looks like something went wrong'));
}
