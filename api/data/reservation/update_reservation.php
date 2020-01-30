<?php 

//Reservation ID: 
if (isset($_GET['id'])) {
    $reservation_id = $_GET['id'];	
	
	//User Input to update
	$first_name = $data->first_name; 
	$last_name = $data->last_name; 
	$check_in_date = $data->check_in_date;
	$check_out_date = $data->check_out_date;
	$room_num = $data->room_num; 
	$total_price = $data->total_price; 

	if (
	preg_match('/^([A-Za-z]{1,32}[ \-]?[A-Za-z]{1,32}){1,32}$/',$first_name) &&
	preg_match('/^([A-Za-z]{1,32}[ \-]?[A-Za-z]{1,32}){1,32}$/',$last_name) &&
	preg_match('/^[\d]{4}[\-](0[1-9]|1[012])[\-](0[1-9]|[12][0-9]|3[01])$/',$check_in_date) && 
	preg_match('/^[\d]{4}[\-](0[1-9]|1[012])[\-](0[1-9]|[12][0-9]|3[01])$/',$check_out_date) &&
	preg_match('/^[0-9]{1,4}$/',$room_num) &&
	preg_match('/^[1-9]{1}[0-9]{0,3}$/',$total_price) &&
	$check_in_date < $check_out_date) {
	
		//FIX: Get room to get accommodation_id room_num
		
		$update_reservation_array = array( 
			'customers.first_name' => $first_name, 
			'customers.last_name' => $last_name, 
			'reservations.check_in_date' => $check_in_date, 
			'reservations.check_out_date' => $check_out_date, 
			'reservations.room_num' => $room_num,
			'reservations.total_price' => $total_price 
		); 
		
		$conditions_array = array(
			'reservations.id' => $reservation_id, 
			'reservations.customer_id' => 'customers.id' 	
		); 
		
		//update($table, $data, $conditions)
		//$config = new Config(); 
		//$tables = $config->getTables('update_reservation'); 
		//$tables has already been defined in the index.php
		
		$stmt = $dshelper->update($tables, $update_reservation_array, $conditions_array); 
		//Return a value to the index.php script to set the right response code.
		echo $stmt; 
		
		// repsonse received, updated
		http_response_code(200);

		echo json_encode(array('message' => 'Reservation updated.'));
	} else {
		// bad request
		http_response_code(400);
		// tell the user that something went wrong
		echo json_encode(array('message' => 'Looks like something went wrong'));
	}
} else {
    // repsonse received, no data found
    http_response_code(200);

    // tell the user reservation couldn't be updated
    echo json_encode(array('message' => 'Reservation could not be updated.'));
}


?>
