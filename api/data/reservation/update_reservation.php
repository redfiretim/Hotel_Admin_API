<?php 
	
include_once '../index.php';

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
	
	//FIX: Get room to get accommodation_id room_num
	
	$update_reservation_array = array( 
		'customers.first_name' => $first_name, 
		'customers.last_name' => $last_name, 
		'reservations.check_in_date' => $check_in_date, 
		'reservations.check_out_date' => $check_out_date, 
		'reservations.room_num' => $room_num;  
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
    // repsonse received, no data found
    http_response_code(200);

    // tell the user reservation couldn't be updated
    echo json_encode(array('message' => 'Reservation could not be updated.'));
}


?>
