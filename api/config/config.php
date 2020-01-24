<?php

// Database tables.
$a = 'accommodations';
$at = 'accommodation_types';
$am = 'amenities';
$apa = 'amenities_per_accommodation';
$ci = 'cities';
$co = 'countries';
$c = 'customers';
$e = 'establishments';
$et = 'establishment_types';
$r = 'reservations';

// Query content read all reservations for one establishment.
// Tables needed:
$reservation_tables = strval($r.', '.$c.', '.$a.', '.$e);
// Columns needed:
$reservation_columns = [
    $r.'.id', 
    $c.'.first_name', 
    $c.'.last_name', 
    $a.'.room_num', 
    $r.'.total_price', 
    $r.'.check_in_date', 
    $r.'.check_out_date'
];
// Constant conditions (table joiners) needed:
$reservation_const_conditions = [
    $r.'.customer_id = '.$c.'.id', 
    $r.'.accommodation_id = '.$a.'.id',
    $a.'.establishment_id = '.$e.'.id'
];
// Variable conditions (establishment identifier) needed:
    // FIX ME --> MOVE TO INDEX.PHP
$reservation_var_conditions = ['establishment_id' => '1'];

// Query content read one reservation.
// Tables needed:
$reservation_one_tables = strval($a.', '.$at.', '.$am.', '.$apa.', '.$ci.', '.$co.', '$c.', '.$e.', '.$et.', '.$r);
// Columns needed:
$reservation_one_columns = [
    $r.'.id', 
    $r.'.booking_date', 
    $r.'.num_of_pers',
    $r.'.check_in_date',
    $r.'.check_out_date',
    $r.'.num_of_nights',
    $r.'.total_price',
    $c.'.first_name',
    $c.'.last_name',
    $c.'.email',
    $c.'.phone',
    $e.'.name',
    $e.'.zipcode',
    $e.'.street_name',
    $e.'.street_num',
    $co.'.name',
    $ci.'.name',
    $at.'.name',
    $a.'.price_per_night'
];
// Constant conditions (table joiners) needed:
$reservation_one_const_conditions = [
    $r.'.customer_id = '.$c.'.id', 
    $r.'.accommodation_id = '.$a.'.id',
    $a.'.establishment_id = '.$e.'.id',
    $a.'accommodation_type_id = '.$at.'.id',
    $at.'establishment_type_id = '.$et.'.id'
];
// Variable conditions (establishment identifier, reservation.id) needed:
    // FIX ME --> MOVE TO INDEX.PHP
$reservation_one_var_conditions = ['establishment_id' => '1', 'reservation.id => 1'];
