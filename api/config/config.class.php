<?php
/* IMPORTANT
As of PHP 5.4 you can also use the short array syntax, which replaces array() with [].
So DONT use the short hand syntax [] for arrays.
*/
class Config
{
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
    public function getTables($action)
    {
        switch ($action) {
            case 'read_reservations':
                return strval($this->r.', '.$this->c.', '.$this->a.', '.$this->e);
                break;
            case 'read_one_reservation':
                return strval($this->a.', '.$this->at.', '.$this->am.', '.$this->apa.', '.$this->ci.', '.$this->co.', '.$this->c.', '.$this->e.', '.$this->et.', '.$this->r);
                break;
        }
    }

    // Columns needed:
    public function getColumns($action)
    {
        switch ($action) {
            case 'read_reservations':
                return array(
                    $this->r.'.id',
                    $this->c.'.first_name',
                    $this->c.'.last_name',
                    $this->a.'.room_num',
                    $this->r.'.total_price',
                    $this->r.'.check_in_date',
                    $this->r.'.check_out_date',
                );
                break;
            case 'read_one_reservation':
                return array(
                    $this->r.'.id',
                    $this->r.'.booking_date',
                    $this->r.'.num_of_pers',
                    $this->r.'.check_in_date',
                    $this->r.'.check_out_date',
                    $this->r.'.num_of_nights',
                    $this->r.'.total_price',
                    $this->c.'.first_name',
                    $this->c.'.last_name',
                    $this->c.'.email',
                    $this->c.'.phone_num',
                    $this->e.'.name',
                    $this->e.'.zipcode',
                    $this->e.'.street_name',
                    $this->e.'.street_num',
                    $this->co.'.name',
                    $this->ci.'.name',
                    $this->at.'.name',
                    $this->a.'.price_per_night',
                    $this->a.'.room_num',
                );
                break;
        }
    }

    // Constant conditions (table joiners) needed:
    public function getConstConditions($action)
    {
        switch ($action) {
            case 'read_reservations':
                return array(
                    $this->r.'.customer_id = '.$this->c.'.id',
                    $this->r.'.accommodation_id = '.$this->a.'.id',
                    $this->a.'.establishment_id = '.$this->e.'.id',
                );
                break;
            case 'read_one_reservation':
                return array(
                    $this->r.'.customer_id = '.$this->c.'.id',
                    $this->r.'.accommodation_id = '.$this->a.'.id',
                    $this->a.'.establishment_id = '.$this->e.'.id',
                    $this->a.'.accommodation_type_id = '.$this->at.'.id',
                    $this->at.'.establishment_type_id = '.$this->et.'.id',
                    $this->e.'.country_id = '.$this->co.'.id',
                    $this->e.'.city_id = '.$this->ci.'.id',
                );
                break;
        }
    }
}
