<?php
/* IMPORTANT
As of PHP 5.4 you can also use the short array syntax, which replaces array() with [].
So DONT use the short hand syntax [] for arrays.
*/

class Config {
    // Specifies database properties.
    public static $host = 'localhost';
    public static $db_name = 'reservation_system';
    public static $username = 'root';
    public static $password = '';

    // Specifies table properties.
    private $a = 'accommodations';
    private $at = 'accommodation_types';
    private $am = 'amenities';
    private $apa = 'amenities_per_accommodation_type';
    private $ci = 'cities';
    private $co = 'countries';
    private $c = 'customers';
    private $e = 'establishments';
    private $et = 'establishment_types';
    private $r = 'reservations';

    // Defines methods to get query content.
    // Tables needed:
    public function getTables($action) {
        switch ($action) {
            case 'check_availability':
                return strval($this->r.', '.$this->a);
                break;
            case 'read_accommodation':
                return strval($this->a.', '.$this->at.', '.$this->e);
                break;
            case 'create_customer':
            case 'read_customer':
            case 'update_customer':
            case 'delete_customer':
                return strval($this->c);
                break;
            case 'create_reservation':
            case 'delete_reservation':
                return strval($this->r);
                break;
            case 'read_reservations':
                return strval($this->r.', '.$this->c.', '.$this->a.', '.$this->e);
                break;
            case 'update_reservation':
                return strval($this->r.', '.$this->c.', '.$this->a.', '.$this->at);
                break;
            case 'read_one_reservation':
                return strval($this->a.', '.$this->at.', '.$this->am.', '.$this->apa.', '.$this->ci.', '.$this->co.', '.$this->c.', '.$this->e.', '.$this->et.', '.$this->r);
                break;
            default:
                return 'no valid action';
        }
    }

    // Columns needed:
    public function getColumns($action) {
        switch ($action) {
            case 'check_availability':
                return array(
                    $this->a.'.id as accommodation_id',
                );
                break;
            case 'read_accommodation':
                return array(
                    $this->a.'.id',
                    $this->a.'.establishment_id',
                    $this->a.'.accommodation_type_id',
                    $this->a.'.room_num',
                    $this->a.'.description',
                    $this->a.'.price_per_night',
                    $this->a.'.image_one',
                    $this->a.'.image_two',
                    $this->a.'.image_three',
                    $this->a.'.image_four',
                    $this->a.'.image_five',
                );
                break;
            case 'create_customer':
            case 'read_customer':    
                $array = array(
                    $this->c.'.first_name',
                    $this->c.'.last_name',
                    $this->c.'.email',
                    $this->c.'.phone_num',
                );
                if ($action === 'read_customer') {
                    array_push(
                        $array, 
                        $this->c.'.id'
                    );
                }
                return $array;
                break;
            case 'create_reservation':
                return array(
                    $this->r.'.booking_date',
                    $this->r.'.customer_id',
                    $this->r.'.accommodation_id',
                    $this->r.'.num_of_pers',
                    $this->r.'.check_in_date',
                    $this->r.'.check_out_date',
                    $this->r.'.num_of_nights',
                    $this->r.'.total_price',
                );
                break;
            case 'read_reservations':
            case 'read_one_reservation':
                $array = array(
                    $this->r.'.id as booking_num',
                    $this->c.'.first_name',
                    $this->c.'.last_name',
                    $this->a.'.room_num',
                    $this->r.'.total_price',
                    $this->r.'.check_in_date',
                    $this->r.'.check_out_date',
                );
                if ($action === 'read_one_reservation') {
                    array_push(
                        $array,
                        $this->r.'.booking_date',
                        $this->r.'.num_of_pers',
                        $this->r.'.num_of_nights',
                        $this->c.'.email',
                        $this->c.'.phone_num',
                        $this->e.'.name as establishments_name',
                        $this->e.'.zipcode',
                        $this->e.'.street_name',
                        $this->e.'.street_num',
                        $this->co.'.name as country_name',
                        $this->ci.'.name as city_name',
                        $this->at.'.name as accommodation_types_name',
                        $this->a.'.price_per_night'
                    );
                }
                return $array;
                break;
            default:
                return 'no valid action';
        }
    }

    // Constant conditions (table joiners) needed:
    public function getConstConditions($action)
    {
        switch ($action) {
            case 'check_availability':
                return array(
                    $this->r.'.accommodation_id = '.$this->a.'.id',
                );
                break;
            case 'read_accommodation':
                return array(
                    $this->a.'.establishment_id = '.$this->e.'.id',
                    $this->a.'.accommodation_type_id = '.$this->at.'.id',
                );
                break;
            case 'read_reservations':
            case 'read_one_reservation':
                $array = array(
                    $this->r.'.customer_id = '.$this->c.'.id',
                    $this->r.'.accommodation_id = '.$this->a.'.id',
                    $this->a.'.establishment_id = '.$this->e.'.id',
                );
                if ($action === 'read_one_reservation') {
                    array_push(
                        $array,
                        $this->a.'.accommodation_type_id = '.$this->at.'.id',
                        $this->at.'.establishment_type_id = '.$this->et.'.id',
                        $this->e.'.country_id = '.$this->co.'.id',
                        $this->e.'.city_id = '.$this->ci.'.id'
                    );
                }
                return $array;    
                break;
            default:
                return 'no valid action';
        }
    }
}
