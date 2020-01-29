<?php
/*
Available_rooms contains all avaiable rooms by room_id where check_in_date en check_out_date is not filled yet.
*/

include_once '../index.php';

$first_name = $data->first_name;
$last_name = $data->last_name;
$email = $data->email;
$phone_num = $data->phone_num;

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

    echo json_encode($customer_id);
} else {  //Insert a new customer in the database
    $customer_data = array('first_name' => "$first_name", 'last_name' => $last_name, 'email' => $email, 'phone_num' => $phone_num);
    $customer_id = $dshelper->create($customer_table, $customer_data);

    // set response code - 201 CREATED
    http_response_code(201);

    echo json_encode($customer_id);
}
