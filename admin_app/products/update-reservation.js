$(document).ready(function(){
    // show html form when 'update product' button was clicked
    $(document).on('click', '.update-reservation-button', function(){
        // get product id
        var id = $(this).attr('data-id');
        // read one record based on given product id
        $.getJSON("http://178.18.138.109/educom/hotel_code/api/index.php?action=read_one_reservation&id=" + id, function(data){
            // values will be used to fill out our form
            var booking_num = data.booking_num;
            var first_name = data.first_name;
            var last_name = data.last_name;
            var room_num = data.room_num;
            var price_per_night = data.price_per_night;
            var total_price = data.total_price;
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
                    <span class='glyphicon glyphicon-list'></span> Back to reservations
                </div>

                <!-- build 'update product' html form -->
                <!-- we used the 'required' html5 property to prevent empty fields -->
                <form id='validate_Adminform' action='#' method='post' border='0' onsubmit='return validateForm();'>
                    <table class="table table-curved table-striped">
                        
                        <!-- Booking number field -->
                        <tr>
                            <td>Booking number</td>
                            <td><input value=\"` + booking_num + `\" type='text' name='booking_num' class='form-control' disabled/></td>
                        </tr>

                        <!-- Customer name field -->
                        <tr>
                            <td>First name</td>
                            <td><input value=\"` + first_name + `\" type='text' name='first_name' class='form-control' pattern='([A-Za-z]{1,32}[ \-]?[A-Za-z]{1,32}){1,32}' required /></td>
                        </tr>
                        <!-- Customer name field -->
                        <tr>
                            <td>Last name</td>
                            <td><input value=\"` + last_name + `\" type='text' name='last_name' class='form-control' pattern='([A-Za-z]{1,32}[ \-]?[A-Za-z]{1,32}){1,32}' required /></td>
                        </tr>
                        <!-- Checkin field -->
                        <tr>
                            <td>Check-in</td>
                            <td><input value=\"` + check_in_date + `\"  type='date' name='check_in_date' class='form-control' required /></td>
                        </tr>

                        <!-- Checkout field -->
                        <tr>
                            <td>Check-out</td>
                            <td><input value=\"` + check_out_date + `\"  type='date' name='check_out_date' class='form-control' required /></td>
                        </tr>                                
                
                        <!-- categories 'select' field -->
                        <tr>
                            <td>Room type</td>
                            <td>` + room_options_html + `</td>
                        </tr>

                        <!-- Room number field -->
                        <tr>
                            <td>Room number</td>
                            <td><input value=\"` + room_num + `\" type='number' name='room_num' class='form-control' pattern='[0-9]*' disabled /></td>
                        </tr>
                
                        <!-- Room rate field -->
                        <tr>
                            <td>Room rate</td>
                            <td><input value=\"€` + price_per_night + `\" type='number' name='price_per_night' class='form-control' pattern='[0-9]*' disabled/></td>
                        </tr>

                        <!-- Room rate field -->
                        <tr>
                            <td>Total price</td>
                            <td><input value=\"` + total_price + `\" type='number' name='total_price' class='form-control' pattern='[0-9]*' required /></td>
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
                        <td class="display-none"><input value=\"` + booking_num + `\" name='reservation_id' type='hidden' /></td>
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