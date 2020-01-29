<?php

include_once '../index.php';

if (isset($_GET['id'])) {
    $reservation_id = $_GET['id'];

    $var_conditions = array('establishments.id' => 1, 'reservations.id' => $reservation_id);

    $stmt = $dshelper->read($tables, $columns, $var_conditions, $const_conditions);
    $num = $stmt->rowCount();

    // check if more than 0 record found
    if ($num > 0) {
        // products array
        $reservation_array = array();
        $reservations_array['records'] = array();

        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $reservation_array = $row;
        }

        // set response code - 200 OK
        http_response_code(200);

        // show products data in json format
        echo json_encode($reservation_array);
    } else {
        // set response code - 404 Not found
        http_response_code(404);

        // tell the user no products found
        echo json_encode(array('message' => 'No reservations found.'));
    }
} else {
    // set response code - 404 Not found
    http_response_code(404);

    // tell the user no products found
    echo json_encode(array('message' => 'id required.'));
}
