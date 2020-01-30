<?php

$table_reservation = $tables;

$num_of_pers = $data->num_of_pers;
$check_in_date = $data->check_in_date;
$check_out_date = $data->check_out_date;
$accommodation_id = $data->accommodation_id;

if (
preg_match('/^[1-4]{1}$/', $num_of_pers) &&
preg_match('/^[\d]{4}[\-](0[1-9]|1[012])[\-](0[1-9]|[12][0-9]|3[01])$/', $check_in_date) &&
preg_match('/^[\d]{4}[\-](0[1-9]|1[012])[\-](0[1-9]|[12][0-9]|3[01])$/', $check_out_date) &&
preg_match('/^[0-9]{1,4}$/', $accommodation_id) && $check_in_date < $check_out_date) {
    //Calculate the amount of dates between dates
    $dates = date_diff(date_create($check_in_date), date_create($check_out_date));
    //Convert the dates to amount of days
    $num_of_nights = $dates->format('%a');
    $accommodation_available = false;

    include_once 'read_available_accommodations.php';
    //Get the stored available rooms from $available_rooms inside read_available_accommodations.php.
    foreach ($available_rooms['records'] as $accommodation) {
        //Check if the receiver accommodation id is still available to rent.
        if ($accommodation['id'] == $accommodation_id) {
            //Set true when accommodation_id is still available.
            $accommodation_available = true;
            $accommodation_price = $accommodation['price_per_night'];
        }
    }

    if ($accommodation_available) {
        include_once 'data/customer/create_customer.php';

        $total_price = $accommodation_price * $num_of_nights;
        $date = date('Y-m-d');

        // echo 'Customer: '.$customer_id.' | Price: '.$accommodation_price.' | Total Price: '.$total_price.' <!> ';

        $reservation_data = array(
        'booking_date' => $date,
        'customer_id' => $customer_id,
        'accommodation_id' => $accommodation_id,
        'num_of_pers' => $num_of_pers,
        'check_in_date' => $check_in_date,
        'check_out_date' => $check_out_date,
        'num_of_nights' => $num_of_nights,
        'total_price' => $total_price, );

        // print_r($reservation_data);

        $stmt = $dshelper->create($table_reservation, $reservation_data);
        $inserted_id = $stmt;
        // repsonse received, created
        http_response_code(200);

        echo json_encode(array('message' => 'Reservation created, ID:'.$inserted_id));
    } else {
        // repsonse received, no data found
        http_response_code(200);

        // tell the user no room has been found
        echo json_encode(array('message' => 'Room not available anymore'));
    }
} else {
    // bad request
    http_response_code(400);
    // tell the user that something went wrong
    echo json_encode(array('message' => 'Looks like something went wrong'));
}
