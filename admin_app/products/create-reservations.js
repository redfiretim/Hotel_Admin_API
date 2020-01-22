$(document).ready(function(){
    // show html form when 'create product' button was clicked
    $(document).on('click', '.create-product-button', function(){
        // load list of categories
        $.getJSON("../api/#.php", function(data){
            // build categories option html
            // loop through returned list of data
            var room_options_html=`<select name='category_id' class='form-control'>`;
            $.each(data.records, function(key, val){
                room_options_html+=`<option value='` + val.id + `'>` + val.name + `</option>`;
            });
            room_options_html+=`</select>`;     
            // we have our html form here where product information will be entered
            // we used the 'required' html5 property to prevent empty fields
            var create_product_html=`
                <!-- 'read products' button to show list of products -->
                <div id='read-product' class='btn btn-primary pull-right m-b-15px read-products-button'>
                    <span class='glyphicon glyphicon-list'></span> Back to reservations
                </div>
                <!-- 'create reservation' html form -->
                <form id='create-product-form' action='#' method='post' border='0'>
                    <table class='table table-hover table-responsive table-bordered'>
                 
                        <!-- Booking number field -->
                        <tr>
                            <td>Booking number</td>
                            <td><input type='text' name='bookingNumber' class='form-control' required /></td>
                        </tr>
                 
                        <!-- Customer name field -->
                        <tr>
                            <td>Customer</td>
                            <td><input type='text' name='customer' class='form-control' required /></td>
                        </tr>

                        <!-- Sort room 'select' field -->
                        <tr>
                            <td>Sort room</td>
                            <td>`+room_options_html+`</td>
                        </tr>

                        <!-- Room number field -->
                        <tr>
                            <td>Room number</td>
                            <td><input type='number' name='roomNumber' class='form-control' required /></td>
                        </tr>

                        <!-- Room rate field -->
                        <tr>
                            <td>Room rate</td>
                            <td><input type='number' min='60' name='roomRate' class='form-control' required /></td>
                        </tr>

                        <!-- Checkin field -->
                        <tr>
                            <td>Check-in</td>
                            <td><input type='number' name='CheckIn' class='form-control' required /></td>
                        </tr>

                        <tr>
                            <td>Check-out</td>
                            <td><input type='number' name='CheckOut' class='form-control' required /></td>
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
        });
    });

    // will run if create Reservation form was submitted
    $(document).on('submit', '#create-product-form', function(){
        // get form data
        var form_data=JSON.stringify($(this).serializeObject());

        // submit form data to api
        $.ajax({
            url: "../api/#.php",
            type : "POST",
            contentType : 'application/json',
            data : form_data,
            success : function(result) {
                // Reservation was created, go back to products list
                showProducts();
            },
            error: function(xhr, resp, text) {
                // show error to console
                console.log(xhr, resp, text);
            }
        });
        
        return false;
    });
});