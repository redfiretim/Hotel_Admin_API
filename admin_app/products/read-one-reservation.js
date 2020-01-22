$(document).ready(function(){
    // handle 'read one' button click
    $(document).on('click', '.read-one-product-button', function(){
        // get product id
        var id = $(this).attr('data-id');
        // read product record based on given ID
        $.getJSON("../api//#.php?id="+id, function(data){
            // start html
            var read_one_product_html=`
                <!-- when clicked, it will show the product's list -->
                <div id='read-product' class='btn btn-primary pull-right m-b-15px read-products-button'>
                    <span class='glyphicon glyphicon-list'></span> Back to reservations
                </div>
                <!-- product data will be shown in this table -->
                <table class='table table-bordered table-hover'>
                
                    <!-- Booking number -->
                    <tr>
                        <td class='w-30-pct'>Booking number</td>
                        <td class='w-70-pct'>` + data.reservation_id + `</td>
                    </tr>

                    <!-- Customer -->
                    <tr>
                        <td>Customer</td>
                        <td>` + data.customer_id + `</td>
                    </tr>

                    <!-- Sort room -->
                    <tr>
                        <td>Sort room</td>
                        <td>` + data.room_type_id + `</td>
                    </tr>

                    <!-- Room number -->
                    <tr>
                        <td>Room number</td>
                        <td>` + data.room_num + `</td>
                    </tr>

                    <!-- Room rate -->
                    <tr>
                        <td>Room rate</td>
                        <td>` + data.price_per_night + `</td>
                    </tr>

                    <!-- Check in -->
                    <tr>
                        <td>Check-in</td>
                        <td>` + data.check_in_date + `</td>
                    </tr>

                    <!-- Check out -->
                    <tr>
                        <td>Check-out</td>
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