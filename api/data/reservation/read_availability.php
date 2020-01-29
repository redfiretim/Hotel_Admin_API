<?php
/*
Available_rooms contains all avaiable rooms by room_id where check_in_date en check_out_date is not filled yet.
*/

include_once '../index.php';

// get dates from DATA
$check_in_date = $data->check_in_date;
$check_out_date = $data->check_out_date;

$var_conditions = array($check_in_date, $check_out_date);
$stmt = $dshelper->filter($tables, $columns, $var_conditions, $const_conditions);
$num = $stmt->rowCount();

if ($num > 0) {
    $available_room = array();
    $available_rooms['records'] = array();

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $available_room = $row;
        array_push($available_rooms['records'], $available_room);
    }
    // set response code - 200 OK
    http_response_code(200);

    echo json_encode($available_rooms);
} else {
    // set response code - 404 Not found
    http_response_code(404);

    // tell the user no products found
    echo json_encode(array('message' => 'No rooms found.'));
}
