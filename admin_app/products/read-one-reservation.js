$(document).ready(function(){
    // handle 'read one' button click
    $(document).on('click', '.read-one-reservation-button', function(){
        // get product id
        var id = $(this).attr('data-id');
        // read product record based on given ID

        $.getJSON("../admin_app/MOCK_DATA.json?id="+id, function(data){
            // start html
            var read_one_product_html=`
                <!-- when clicked, it will show the product's list -->
                <div id='read-product' class='btn btn-primary pull-right m-b-15px read-products-button button-margin'>
                    <span class='glyphicon glyphicon-list'></span> Back to reservations
                </div>
                <!-- product data will be shown in this table -->
                <table class="table table-curved table-striped">
                    <tr>
                        <th class='w-30-pct'>Booking number</td>
                        <td class='w-70-pct'>` + data.reservations_id + `</td>
                    </tr>
                    <tr>
                        <th class='w-15-pct'>Customer name</th>
                        <td>` + data.customer_id + `</td>
                    </tr>
                    <tr>
                        <th class='w-10-pct'>Hotel</th>
                        <td>` + data + `</td>
                    </tr>
                    <tr>
                        <th class='w-10-pct'>Hotel city</th>
                        <td>` + data + `</td>
                    </tr>
                    <tr>
                        <th class='w-10-pct'>Room type</th>
                        <td>` + data.room_type_id + `</td>
                    </tr>
                    <tr>
                        <th class='w-10-pct'>Room number</th>
                        <td>` + data.room_num + `</td>
                    </tr>
                    <tr>
                        <th class='w-10-pct'>Room rate</th>
                        <td>` + data.price_per_night + `</td>
                    </tr>
                    <tr>
                        <th class='w-10-pct'>Total price</th>
                        <td>` + data.total_price + `</td>
                    </tr>
                    <tr>
                        <th class='w-10-pct'>Check-in</th>
                        <td>` + data.check_in_date + `</td>
                    </tr>
                    <tr>
                        <th class='w-10-pct'>Check-out</th>
                        <td>` + data.check_out_date + `</td>
                    </tr>
                </table>`;

            // inject html to 'page-content' of our app
            $("#page-content").html(read_one_product_html);
            
            // chage page title
            changePageTitle("Reservation details");
        });
    });
 
});