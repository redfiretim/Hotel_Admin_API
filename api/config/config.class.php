<?php

/* IMPORTANT
As of PHP 5.4 you can also use the short array syntax, which replaces array() with [].
So DONT use the short hand syntax [] for arrays.
*/

class Config {
    // Specifies database properties.
    private $host = 'localhost';
    private $db_name = 'reservation_system';
    private $username = 'root';
    private $password = '';
    // Specifies table properties.
    private $a = 'accommodations';
    private $at = 'accommodation_types';
    private $am = 'amenities';
    private $apa = 'amenities_per_accommodation';
    private $ci = 'cities';
    private $co = 'countries';
    private $c = 'customers';
    private $e = 'establishments';
    private $et = 'establishment_types';
    private $r = 'reservations';

    // Defines methods to get query content.
    // Tables needed:
    getTables($action) {
        switch ($action) {
            case 'read_reservations':
                return strval($r.', '.$c.', '.$a.', '.$e);
                break;
            case 'read_one_reservation':
                return strval($a.', '.$at.', '.$am.', '.$apa.', '.$ci.', '.$co.', '.$c.', '.$e.', '.$et.', '.$r);
                break;
        } 
    }
    // Columns needed:
    getColumns($action) {
        switch ($action) {
            case 'read_reservations':
                return array(
                    $r.'.id',
                    $c.'.first_name',
                    $c.'.last_name',
                    $a.'.room_num',
                    $r.'.total_price',
                    $r.'.check_in_date',
                    $r.'.check_out_date',
                );
                break;
            case 'read_one_reservation':
                return array (
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
                    $c.'.phone_num',
                    $e.'.name',
                    $e.'.zipcode',
                    $e.'.street_name',
                    $e.'.street_num',
                    $co.'.name',
                    $ci.'.name',
                    $at.'.name',
                    $a.'.price_per_night',
                    $a.'.room_num',
                );
                break;
        } 
    }

    // Constant conditions (table joiners) needed:
    getConstConditions($action) {
        switch ($action) {
            case 'read_reservations':
                return array(
                    $r.'.customer_id = '.$c.'.id',
                    $r.'.accommodation_id = '.$a.'.id',
                    $a.'.establishment_id = '.$e.'.id',
                );
                break;
            case 'read_one_reservation':
                return array(
                    $r.'.customer_id = '.$c.'.id',
                    $r.'.accommodation_id = '.$a.'.id',
                    $a.'.establishment_id = '.$e.'.id',
                    $a.'.accommodation_type_id = '.$at.'.id',
                    $at.'.establishment_type_id = '.$et.'.id',
                    $e.'.country_id = '.$co.'.id',
                    $e.'.cities_id = '.$ci.'.id',
                );
                break;
        } 
    }
}


