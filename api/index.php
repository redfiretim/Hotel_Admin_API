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
include_once './shared/utility.php';
include_once './config/config.class.php';

// get database connection
$ds = DSConnect::getInstance();
$dshelper = new DSHelper($ds);

// http://localhost/projects/hotel/hotel_code/api/index.php?action=read_reservation&customer_id=5

if (isset($_GET['action'])) {
	
	$config = new Config(); 
	
    $requested_action = $_GET['action'];
	$tables = $config->getTables($requested_action); 
	$columns = $config->getColumns($requested_action); 
	$const_conditions = $config->getConstConditions($requested_action); 
	
    //Switch case to run the requested case (based on $requested_action)

    switch ($requested_action) {
        case 'read_reservations':
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

                // show reservations data in json format
                echo json_encode($reservations_array);
            } else {
                // set response code - 404 Not found
                http_response_code(404);

                // tell the user no products found
                echo json_encode(array('message' => 'No reservations found.'));
            }

            break;

        //Case when a reservation has to be inserted in the database
        case 'create_reservation':

            $data = json_decode(file_get_contents('php://input'));
			
			//FIX: get last inserted ID! 
			//$customer_id = // add
			
			$reservation_data = array(
                'id' => $id,
                'name' => $first_name.' '.$last_name,
                'room_num' => $room_num,
                'total_price' => $total_price,
                'check_in_date' => $check_in_date,
                'check_out_date' => $check_out_date,
            );


            break;

        //Request to read a single reservation. Needs an ID to get all data.
        case 'read_one_reservation':

            $data = json_decode(file_get_contents('php://input'));
            $reservation_id = $data->id;

			$var_conditions = array('establishment.id' => 1, 'reservation.id' => $reservation_id);           

            $stmt = $dshelper->read($tables, $columns, $var_conditions, $const_conditions);
            $num = $stmt->rowCount();

            // check if more than 0 record found
            if ($num > 0) {
                // products array
                $reservation_array = array();

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
                }

                // set response code - 200 OK
                http_response_code(200);

                // show products data in json format
                echo json_encode($reservation_array);
            } else {
                // set response code - 404 Not found
                http_response_code(404);

                // tell the user no products found
                echo json_encode(array('message' => 'No reservations found.'));
            }

            break;

        case 'update_reservation':

            //FIX: write case.

            break;

        case 'delete_reservation':

            //FIX: write case.
            $data = json_decode(file_get_contents('php://input'));
            $reservation_id = $data->id;

                if ($dshelper->delete($reservations)) { //FIX THIS
                    // set response code - 201 created
                    http_response_code(201);
                    // tell the user
                    echo json_encode(array('message' => 'Reservation was removed.'));
                } else {
                    // set response code - 503 service unavailable
                    http_response_code(503);

                    // tell the user
                    echo json_encode(array('message' => 'Unable to remove reservation.'));
                }

            break;

        //Customer related requested actions are specified down below:

        case 'create_customer':

        //FIX: customer_form.js isn't finished. Check phone_number and email var.
            $data = json_decode(file_get_contents('php://input'));

            $first_name = $data->first_name;
            $last_name = $data->last_name;
            $email = $data->email;
            $phone_num = $data->phone_num;
	
             $customer_data = array(
                'first_name' => $first_name,
                'last_name' => $last_name,
                'email' => $email,
                'phone_num' => $phone_num,
            ); 

            //create method asks for a table and the data to be inserted.
            if ($dshelper->create($tables, $customer_data)) {
                // set response code - 201 created
                http_response_code(201);
                // tell the user
                echo json_encode(array('message' => 'Customer was created.'));
            } else {
                // set response code - 503 service unavailable
                http_response_code(503);

                // tell the user
                echo json_encode(array('message' => 'Unable to create customer.'));
            }

            break;

        default:

            // set response code - 404 Not found
            http_response_code(404);

            // tell the user no products found
            echo json_encode(array('message' => 'No action found.'));
    }

    //Since updating, deleting and reading a customer are not 'important' for sprint 0, the cases have yet to be defined.
        //To do: read/update/delete customer.

//When no action is found:
} else {
    // set response code - 404 Not found
    http_response_code(404);

    // tell the user no products found
    echo json_encode(array('message' => 'No action found.'));
}
