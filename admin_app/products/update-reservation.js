$(document).ready(function(){
    // show html form when 'update product' button was clicked
    $(document).on('click', '.update-reservation-button', function(){
        // get product id
        var id = $(this).attr('data-id');
        // read one record based on given product id
        $.getJSON("../admin_app/MOCK_DATA.json?id=" + id, function(data){
        
            // values will be used to fill out our form
            var reservation_id = data.reservation_id;
            var customer_id = data.customer_id;
            var room_id = data.room_id;
            var price_per_nights = data.price_per_nights;
            var check_in_date = data.check_in_date;
            var check_out_date = data.check_out_date;

            // load list of rooms
            $.getJSON("../admin_app/MOCK_DATA.json", function(data){  
                // build 'room option' html
                // loop through returned list of data
                var room_options_html=`<select name='room_type_id' class='form-control'>`;
                $.each(data.records, function(key, val){
                    // pre-select option is room id is the same
                    if(val.id==room_type_id){ 
                        room_options_html+=`<option value='` + val.room_type_id + `' selected>` + val.type + `</option>`; 
                    }else{ 
                        room_options_html+=`<option value='` + val.room_type_id + `'>` + val.type + `</option>`; 
                    }
                });
                room_options_html+=`</select>`;

                // store 'update reservation' html to this variable
                var update_product_html=`
                <div id='read-products' class='btn btn-primary pull-right m-b-15px read-products-button button-margin'>
                    <span class='glyphicon glyphicon-list'></span> Read Products
                </div>
                <!-- build 'update product' html form -->
                <!-- we used the 'required' html5 property to prevent empty fields -->
                <form id='update-product-form' action='#' method='post' border='0'>
                    <table class='table table-hover table-responsive table-bordered'>
                        
                        <!-- Booking number field -->
                        <tr>
                            <td>Booking number</td>
                            <td><input value=\"` + reservation_id + `\" type='text' name='reservation_id' class='form-control' disabled/></td>
                        </tr>

                        <!-- Customer name field -->
                        <tr>
                            <td>Customer</td>
                            <td><input value=\"` + customer_id + `\" type='text' name='customer_id' class='form-control' required /></td>
                        </tr>
                
                        <!-- categories 'select' field -->
                        <tr>
                            <td>Room type</td>
                            <td>` + room_options_html + `</td>
                        </tr>

                        <!-- Room number field -->
                        <tr>
                            <td>Room number</td>
                            <td><input value=\"` + room_id + `\" type='number' name='room_id' class='form-control' required /></td>
                        </tr>
                
                        <!-- Room rate field -->
                        <tr>
                            <td>Room rate</td>
                            <td><input value=\"` + price_per_nights + `\" type='number' name='price_per_nights' class='form-control' required /></td>
                        </tr>

                        <!-- Checkin field -->
                        <tr>
                            <td>Check-in</td>
                            <td><input value=\"` + check_in_date + `\"  type='text' name='check_in_date' class='form-control' required /></td>
                        </tr>

                        <!-- Checkout field -->
                        <tr>
                            <td>Check-out</td>
                            <td><input value=\"` + check_out_date + `\"  type='text' name='check_out_date' class='form-control' required /></td>
                        </tr>

                        <tr>
                            <!-- button to submit form -->
                            <td colspan="2">
                                <button type='submit' class='btn btn-primary'>
                                    <span class='glyphicon glyphicon-edit'></span> Update reservation
                                </button>
                            </td>
                        </tr>
                        <tr>
                        <!-- hidden 'reservation id' to identify which record to delete -->
                        <td class="display-none"><input value=\"` + reservation_id + `\" name='reservation_id' type='hidden' /></td>
                        </tr>
                
                    </table>
                </form>`;

                    // inject to 'page-content' of our app
                $("#page-content").html(update_product_html);
                
                // chage page title
                changePageTitle("Reservation Edit");
            });
        });
    });
     
    // will run if 'create product' form was submitted
    $(document).on('submit', '#update-product-form', function(){
        // get form data
        var form_data=JSON.stringify($(this).serializeObject());
        // submit form data to api
        $.ajax({
            url: "../api/#.php",
            type : "POST",
            action : "update_reservation",
            contentType : 'application/json',
            data : form_data,
            success : function(result) {
                // product was created, go back to products list
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