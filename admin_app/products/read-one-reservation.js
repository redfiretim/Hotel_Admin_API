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
                        <td class='w-70-pct'>` + data.bookingNumber + `</td>
                    </tr>

                    <!-- Customer -->
                    <tr>
                        <td>Customer</td>
                        <td>` + data.customer + `</td>
                    </tr>

                    <!-- Room number -->
                    <tr>
                        <td>Customer</td>
                        <td>` + data.roomNumber + `</td>
                    </tr>

                    <!-- Room rate -->
                    <tr>
                        <td>Room rate</td>
                        <td>` + data.roomRate + `</td>
                    </tr>

                    <!-- Check in -->
                    <tr>
                        <td>Check-in</td>
                        <td>` + data.checkIn + `</td>
                    </tr>

                    <!-- Check out -->
                    <tr>
                        <td>Check-out</td>
                        <td>` + data.checkOut + `</td>
                    </tr>
                </table>`;

            // inject html to 'page-content' of our app
            $("#page-content").html(read_one_product_html);
            
            // chage page title
            changePageTitle("Reservation Details");
        });
    });
 
});