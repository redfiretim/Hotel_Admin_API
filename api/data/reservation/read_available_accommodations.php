<?php

//If data is left EMPTY, RETURNS all accommodations
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

        //Move these to the config.
        $tables = 'amenities, amenities_per_accommodation_type';
        $columns = array('amenities.name');
        $var_conditions = array('amenities_per_accommodation_type.accommodation_type_id' => $row['id']);
        $const_conditions = array('amenities_per_accommodation_type.amenity_id = amenities.id');

        $stmt_amenities = $dshelper->read($tables, $columns, $var_conditions, $const_conditions);
        $num = $stmt_amenities->rowCount();

        if ($num > 0) {
            $amenities = '';
            while ($row = $stmt_amenities->fetch(PDO::FETCH_ASSOC)) {
                $amenities .= $row['name'].' ,';
            }
            $amenities = rtrim($amenities, ' ,');
        }

        $amenities_list = array('amenities' => $amenities);
        $room = array_merge($available_room, $amenities_list);

        array_push($available_rooms['records'], $room);
    }
    // set response code - 200 OK
    http_response_code(200);

    //If the script is requested directly using its requested action, return json.
    if ($requested_action == basename(__FILE__, '.php')) {
        echo json_encode($available_rooms);
    }
} else {
    // set response code - 404 Not found
    http_response_code(404);

    // tell the user no products found
    echo json_encode(array('message' => 'No rooms found.'));
}
