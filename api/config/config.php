<?php

//Query content read all reservations
$reservation_tables = 'reservations, customers, accommodations, establishment';
$reservation_columns = ['reservations.id', 'customers.first_name', 'customers.last_name', 'accommodations.room_num', 'reservations.total_price', 'reservations.check_in_date', 'reservations.check_out_date'];
$reservation_one_const_conditions = ['reservations.customer_id = customers.id', 'reservations.accommodation_id = accommodations.id, accommodations.establishment_id = establishments.id'];
$reservation_one_var_conditions = ['establishment_id' => '1'];
