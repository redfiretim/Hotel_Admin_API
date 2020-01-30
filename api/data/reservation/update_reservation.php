<?php 

// Catch reservation ID: 
if (isset($_GET['id'])) {
	$reservation_id = $_GET['id'];	
	
	// New values of to be updated variables.
	$check_in_date = $data->check_in_date;
	$check_out_date = $data->check_out_date;
	$accommodation_id = $data->accommodation_id; 
	$total_price = $data->total_price; 

	// Validates new values related to reservation period, accommodation and price.
	if (
	preg_match('/^[\d]{4}[\-](0[1-9]|1[012])[\-](0[1-9]|[12][0-9]|3[01])$/',$check_in_date) && 
	preg_match('/^[\d]{4}[\-](0[1-9]|1[012])[\-](0[1-9]|[12][0-9]|3[01])$/',$check_out_date) &&
	preg_match('/^[0-9]{1,4}$/',$accommodation_id) &&
	preg_match('/^[0-9]{1,4}$/',$total_price) &&
	$check_in_date < $check_out_date) {
		// Query content for reservation record query.
		$columns = $config->getColumns('create_reservation');
		$var_conditions = array("reservations.id" => $reservation_id);
		// Performs query.
		$stmt = $dshelper->read($tables, $columns, $var_conditions);
		// Result variable of query. 
		$reservation_array = $stmt->fetch(PDO::FETCH_ASSOC);
		// Extracts customer_id value.
		$customer_id = $reservation_array["customer_id"];
		//Calculates the amount of dates between dates
		$dates = date_diff(date_create($check_in_date), date_create($check_out_date));
		//Convert the dates to amount of days
		$num_of_nights = $dates->format('%a');
		// Include update_customer script.
		include_once 'data/customer/update_customer.php';
		$table = $config->getTables('create_reservation');
		$data = array(
			"customer_id" => $customer_id,
			"accommodation_id" => $accommodation_id,
			"check_in_date" => $check_in_date,
			"check_out_date" => $check_out_date,
			"num_of_nights" => $num_of_nights,
			"total_price" => $total_price);
		$conditions = array("id" => $reservation_id);
		$stmt = $dshelper->update($table, $data, $conditions);
		// count result rows.
		$num = $stmt->rowCount();
		// num > 0 means there is a result.
		if ($num > 0) {
			// response received, updated
			http_response_code(200);
			echo json_encode(array('message' => 'Reservation updated.'));
		} else {
			// bad request
			http_response_code(400);
			// tell the user that update failed.
			echo json_encode(array('message' => 'Update failed'));
		}
	} else {
		  // bad request
		  http_response_code(400);
		  // tell the user that something went wrong
		  echo json_encode(array('message' => 'Looks like something went wrong'));
	}
}