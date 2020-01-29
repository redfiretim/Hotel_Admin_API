<?php

include_once '../index.php';

//Get the tables, columns and const_conditions necessary to read a specific accommodation
$accommodation_table = $config->getTables('read_accommodation');
$accommodation_columns = $config->getColumns('read_accommodation');
$accommodation_const_conditions = $config->getConstConditions('read_accommodation');

//Get room_num from user_input_data to fetch all data
$room_num = $data->room_num;
//Define the var_conditions in this specific case
$accommodation_var_conditions = array('establishment_id' => 1, 'room_num' => $room_num);
//Use the dshelper to get all data
$stmt = $dshelper->read($accommodation_table, $accommodation_columns, $accommodation_var_conditions, $accommodation_const_conditions);

$num = $stmt->rowCount();

// check if more than 0 record found
if ($num > 0) {
    $record = array();
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $accommodation_data = $row;
    }
    // set response code - 200 OK
    http_response_code(200);
} else {
    // set response code - 404 Not found
    http_response_code(404);

    // tell the user no products found
    echo json_encode(array('message' => 'No accommodation found.'));
}
