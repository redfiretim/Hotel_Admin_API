<?php

include_once '../index.php';

$reservation_id = $_GET['id'];
$var_conditions = array('reservations.id' => $reservation_id);

$stmt = $dshelper->delete($tables, $var_conditions);
$num = $stmt->rowCount();

// check if more than 0 record found
if ($num > 0) {
    // set response code - 201 created
    http_response_code(200);
    // tell the user
    echo json_encode(array('message' => 'Reservation was removed.'));
} else {
    // set response code - 503 service unavailable
    http_response_code(404);

    // tell the user
    echo json_encode(array('message' => 'Unable to remove reservation, reservation not found'));
}
