function create_reservations_template(room_options_html){
    // we have our html form here where product information will be entered
    // we used the 'required' html5 property to prevent empty fields
    `<!-- 'read products' button to show list of products -->
    <div id='read-product' class='btn btn-primary pull-right m-b-15px read-products-button'>
        <span class='glyphicon glyphicon-list'></span> Back to reservations
    </div>
    <!-- 'create reservation' html form -->
    <form id='create-product-form' action='#' method='post' border='0'>
        <table class='table table-hover table-responsive table-bordered'>
     
            <!-- Booking number field -->
            <tr>
                <td>Booking number</td>
                <td><input type='text' name='reservation_id' class='form-control' required /></td>
            </tr>
     
            <!-- Customer name field -->
            <tr>
                <td>Customer</td>
                <td><input type='text' name='customer_id' class='form-control' required /></td>
            </tr>

            <!-- Sort room 'select' field -->
            <tr>
                <td>Sort room</td>
                <td>`+room_options_html+`</td>
            </tr>

            <!-- Room number field -->
            <tr>
                <td>Room number</td>
                <td><input type='number' name='room_num' class='form-control' required /></td>
            </tr>

            <!-- Room rate field -->
            <tr>
                <td>Room rate</td>
                <td><input type='number' min='60' name='price_per_night' class='form-control' required /></td>
            </tr>

            <!-- Checkin field -->
            <tr>
                <td>Check-in</td>
                <td><input type='text' name='check_in_date' class='form-control' required /></td>
            </tr>

            <!-- Checkout field -->
            <tr>
                <td>Check-out</td>
                <td><input type='text' name='check_out_date' class='form-control' required /></td>
            </tr>

            <!-- button to submit form -->
            <tr>
                <td></td>
                <td>
                    <button type='submit' class='btn btn-primary'>
                        <span class='glyphicon glyphicon-plus'></span> New booking
                    </button>
                </td>
            </tr>
     
        </table>
    </form>`;

    // inject html to 'page-content' of our app
    $("#page-content").html(create_product_html);
    
    // chage page title
    changePageTitle("New Reservation");
}