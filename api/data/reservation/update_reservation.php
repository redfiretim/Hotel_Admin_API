<?php 
	
	$data = json_decode(file_get_contents('php://input'));
	
	//Reservation ID: 
    $id = $data->id; 
	
	//User Input to update
	$first_name = $data->first_name; 
	$last_name = $data->last_name; 
	$check_in_date = $data->check_in_date;
	$check_out_date = $data->check_out_date;
	$accommodation_type = $data->room_type;  //Is this an ID?
	$total_price = $data->total_price; 
	
	//FIX: Get room to get accommodation_id room_num
	
	
	$update_reservation_array = array( 
		'customers.first_name' => $first_name, 
		'customers.last_name' => $last_name, 
		'reservations.check_in_date' => $check_in_date, 
		'reservations.check_out_date' => $check_out_date, 
		'reservations.accommodation_id' =>  //Information I do not have,
		'reservations.total_price' => $total_price 
	); 
	
	$conditions_array = array(
		'reservations.id' => $id,
		'reservations.customer_id' => 'customers.id' 	
	); 
	
	 //update($table, $data, $conditions)
	$config = new Config(); 
	$tables = $config->getTables('update_reservation'); 
	
	
	//Not sure if this is necessary: 
	$ds = DSConnect::getInstance();
	$dshelper = new DSHelper($ds);
	
	$dshelper->update($tables, $update_reservation_array, $conditions_array); 
	//Return a value to the index.php script to set the right response code.



?>
