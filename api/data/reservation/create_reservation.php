<?php

$num_of_pers = $data->num_of_pers;
$check_in_date = $data->check_in_date;
$check_out_date = $data->check_out_date;
$room_num = $data->room_num;

if (
preg_match('/^[1-4]{1}$/',$num_of_pers) &&
preg_match('/^[\d]{4}[\-](0[1-9]|1[012])[\-](0[1-9]|[12][0-9]|3[01])$/',$check_in_date) && 
preg_match('/^[\d]{4}[\-](0[1-9]|1[012])[\-](0[1-9]|[12][0-9]|3[01])$/',$check_out_date) &&
preg_match('/^[0-9]{1,4}$/',$room_num) &&
$check_in_date < $check_out_date) {
  $days = date_diff(date_create($check_in_date), date_create($check_out_date));
  $num_of_nights = $days->format('%a');

  include_once 'read_availability.php';
  if (in_array($data->room_num, $available_rooms)) {
      // echo 'Room available';
      include_once '..customer/create_customer.php'; //ALERT! Data from the customer
      // echo ' | Customer: '.$customer_id;
      include_once 'read_accommodation.php';
      // print_r($accommodation_data);

      $price = $accommodation_data['price_per_night'];
      $total_price = $price * $num_of_nights;
      $accommodation_id = $accommodation_data['id'];
      $date = date('Y-m-d');

      $reservation_data = array(
        'booking_date' => $date,
        'customer_id' => $customer_id,
        'accommodation_id' => $accommodation_id,
        'num_of_pers' => $num_of_pers,
        'check_in_date' => $check_in_date,
        'check_out_date' => $check_out_date,
        'num_of_nights' => $num_of_nights,
        'total_price' => $total_price, );

      print_r($reservation_data);

      $stmt = $dshelper->create($tables, $reservation_data);
      echo $stmt;
      // repsonse received, created
      http_response_code(200);

      echo json_encode(array('message' => 'Reservation created.'));
  } else {
      // repsonse received, no data found
      http_response_code(200);

      // tell the user no room has been found
      echo json_encode(array('message' => 'Room not available.'));
  }
} else {
  // bad request
  http_response_code(400);
  // tell the user that something went wrong
  echo json_encode(array('message' => 'Looks like something went wrong'));
}
