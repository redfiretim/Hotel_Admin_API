<?php

include_once '../index.php';

$var_conditions = array('establishment_id' => 1);

$stmt = $dshelper->read($tables, $columns, $var_conditions, $const_conditions);
$num = $stmt->rowCount();

// check if more than 0 record found
if ($num > 0) {
    // products array
    $reservation_array = array();
    $reservations_array['records'] = array();

    // retrieve our table contents
    // fetch() is faster than fetchAll()
    // http://stackoverflow.com/questions/2770630/pdofetchall-vs-pdofetch-in-a-loop
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        // extract row
        // this will make $row['name'] to
        // just $name only
        $reservation_array = $row;
        // $reservation_colums = 'reservations.id, customers.first_name, customers.last_name, accommodations.room_num, reservations.total_price, reservations.check_in_date, reservations.check_out_date';
        array_push($reservations_array['records'], $reservation_array);
    }
    // set response code - 200 OK
    http_response_code(200);

    echo json_encode($reservations_array);
} else {
    // set response code - 404 Not found
    http_response_code(404);

    // tell the user no products found
    echo json_encode(array('message' => 'No reservations found.'));
}
