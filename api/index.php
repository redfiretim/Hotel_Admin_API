<?php

// required headers
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: access');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json');

// include database and object files
include_once './config/dsconnect.class.php';
include_once './config/dshelper.class.php';
include_once './config/config.php';

// get database connection
$ds = DSConnect::getInstance();
$dshelper = new DSHelper($ds);

// http://localhost/projects/hotel/hotel_code/api/index.php?action=read_reservation&customer_id=5

if (isset($_GET['action'])) {
    if (($_GET['action']) == 'read_reservations') {
        $stmt = $dshelper.read($reservation_tables, $reservation_columns, $reservation_one_const_conditions, $reservation_var_const_conditions);
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
                extract($row);

                $reservation_array = array(
                'id' => $id,
                'name' => $first_name.' '.$last_name,
                'room_num' => $room_num,
                'total_price' => $total_price,
                'check_in_date' => $check_in_date,
                'check_out_date' => $check_out_date,
            );
                // $reservation_colums = 'reservations.id, customers.first_name, customers.last_name, accommodations.room_num, reservations.total_price, reservations.check_in_date, reservations.check_out_date';
                array_push($reservations_array['records'], $reservation_array);
            }

            // set response code - 200 OK
            http_response_code(200);

            // show products data in json format
            echo json_encode($products_arr);
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
        echo json_encode(array('message' => 'Wrong action found.'));
    }
} else {
    // set response code - 404 Not found
    http_response_code(404);

    // tell the user no products found
    echo json_encode(array('message' => 'No action found.'));
}
