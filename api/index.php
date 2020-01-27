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

//Initiate config class and get Database cred. using the getDatabase method
$config = new Config(); 
$db_cred_array = $config->getDatabase(); 

$host = $db_cred_array[0]; 
$db_name = $db_cred_array[1]; 
$username = $db_cred_array[2]; 
$password = $db_cred_array[3]; 

// get database connection
$ds = DSConnect::getInstance($host, $db_name, $username, $password);
$dshelper = new DSHelper($ds);

// http://localhost/projects/hotel/hotel_code/api/index.php?action=read_reservation&customer_id=5

if (isset($_GET['action'])) {

	
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
			
			// FIX: availability-check! returns accommodation_id's!
	
			//Create customer and get last ID to create complete reservation
			$customer_id = create_customer($data); 
			
			//Extract all data from the data-array to get num_of_nights
			//$accomodation_id = $data->room_num; 
			$num_of_pers = $data->num_of_pers;
			$check_in_date = $data->check_in_date;
			$check_out_date = $data->check_out_date;
			$num_of_nights = $data->num_of_nights; 
			
			//Calculate total price, using the calculate_price function and the num_of_nights.
			$accommodation_data = get_accommodation_data($data); 
			$price = $accommodation_data->price_per_night;
			$total_price = $price * $num_of_nights; 
			
			$accommodation_id = $accommodation_data->id; 

			$reservation_data = array(
			//FIX: check if current_date works
				'booking_date' => 'CURRENT_DATE', 
				'customer_id' => $customer_id, 
                'accommodation_id' => $accommodation_id, 
				'num_of_pers' => $num_of_pers, 
                'check_in_date' => $check_in_date,
                'check_out_date' => $check_out_date,
				'num_of_nights' => $num_of_nights, 
				'total_price' => $total_price, 	
            );
			
			//FIX: check if this is the right way to call for method create
			$dshelper->create($tables, $reservation_data); 

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
                    $reservation_array = extract($row);
				
                    // $reservation_colums = 'reservations.id, customers.first_name, customers.last_name, accommodations.room_num, reservations.total_price, reservations.check_in_date, reservations.check_out_date';
                }

                // set response code - 200 OK
                http_response_code(200);

                // show reservations data in json format
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
			
			
			//FIX: Is it clear that reservation_id is the only condition, or should I rename it to: condition
                if ($dshelper->delete($reservations, $reservation_id)) { //FIX THIS
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

function create_customer($data) {
	
	
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
	
	
	$customer_table = $config->getTables('create_customer'); 
	$last_id = $dshelper->create($customer_table, $customer_data); 
	
	return $last_id; 
}

//Function to retrieve data on one specific accommodation, using front-end data (room_num - in this case)
//FIX: Might create a more generic way to retrieve this data.
function get_accommodation_data($data) {
	//Get the tables, columns and const_conditions necessary to read a specific accommodation
	$accommodation_table = $config->getTables('read_accommodation');
	$accommodation_columns = $config->getColumns('read_accommodation'); 
	$accommodation_const_conditions = $config->getConstConditions('read_accommodation'); 
	
	//Get room_num from user_input_data to fetch all data
	$room_num = $data->room_num; 
	
	//Define the var_conditions in this specific case
	$accommodation_var_conditions = array ('establishment_id' => 1, 'room_num' => $room_num); 
	
	//Use the dshelper to get all data 
	$accommodation_data = $dshelper->read($accommodation_table, $accommodation_columns, $accommodation_var_conditions, $accommodation_const_conditions); 
	
	return $accommodation_data; 
}
	
	
	

function get_availability() {
	
	//use function read($tables, $columns, $var_conditions, $const_conditions = '',)
	
	//FIX: Write function to get availability! 
	
	
}




