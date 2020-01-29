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
include_once './data/shared/utility.php';

//DEVELOPING ENVIRONMENT
include_once './config/config.class.php';
$dsh = DSConnect::getInstance();
$dshelper = new DSHelper($dsh);

//Initiate config class and get Database cred. using the getDatabase method
$config = new Config();

// http://localhost/projects/hotel/hotel_code/api/index.php?action=read_reservation&customer_id=5

if (isset($_GET['action'])) {
    $requested_action = $_GET['action'];
    $tables = $config->getTables($requested_action);
    $columns = $config->getColumns($requested_action);
    $const_conditions = $config->getConstConditions($requested_action);

    //Get data from the front-end, contains a assosstive array
    $data = json_decode(file_get_contents('php://input'));
    //Switch case to run the requested case (based on $requested_action)
    switch ($requested_action) {
        //Case when all reservations need to be fetch from the database. Return an mutlidimesional array contains all content about each reservation.
        case 'read_reservations':
            include_once './data/reservation/read_reservations.php';
            break;
        //Case when the accommodation availability has to be fetched from the database. Returns an array of all available rooms
        case 'read_availability':
            include_once './data/reservation/read_availability.php';
            break;
        //Case when a cusomter has to be inserted in the database, to create a reservation. Returns either a new or already existing ID
        case 'create_customer':
            include_once './data/customer/create_customer.php';
            break;
        //Case when a reservation has to be inserted in the database, uses read_availability, read_accomodation, create_customer.
        case 'create_reservation':
            include_once './data/reservation/create_reservation.php';
        break;
        //Request to read a single reservation. Needs an ID to get all data.
        case 'read_one_reservation':
            include_once './data/reservation/read_one_reservation.php';
            // echo json_encode($available_rooms);
            break;
        case 'update_reservation':
            //FIX: write case.
            break;
        case 'delete_reservation':
            include_once './data/reservation/delete_reservation.php';
            break;
        default:
            // set response code - 404 Not found
            http_response_code(404);

            // tell the user no products found
            echo json_encode(array('message' => 'action does not exist.'));
    }
    //No action has been found
} else {
    // set response code - 404 Not found
    http_response_code(404);

    // tell the user no products found
    echo json_encode(array('message' => 'No action found.'));
}
