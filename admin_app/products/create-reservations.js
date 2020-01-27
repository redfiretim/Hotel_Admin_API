$(document).ready(function(){
    // show html form when 'create product' button was clicked
    $(document).on('click', '.create-reservation-button', function(){
        // load list of categories
        $.getJSON("http://178.18.138.109/educom/hotel_code/api/index.php?action=read_reservations", function(data){
            // build categories option html
            // loop through returned list of data
            var room_options_html=`<select name='room_type_id' class='form-control'>`;
                $.each(data.records, function(key, val){
                    //room_type_id is for rooms and type is for de name of the rooms 
                    room_options_html+=`<option value='` + val.accommodation_types_name + `'>` + val.type + `</option>`;
                });
            room_options_html+=`</select>`;     

            var create_product_html=`
                <!-- 'back to reservations' button to show list of reservations -->
                <div id='read-product' class='btn btn-primary pull-right m-b-15px read-products-button button-margin'>
                    <span class='glyphicon glyphicon-list'></span> Back to reservations
                </div>

                <!-- reservation data will be shown in this table -->
                <form id='create-reservation-form' action='#' method='post' border='0'>
                    <table class="table table-curved table-striped">
                        <tr>
                            <th>Customer firstname</th>
                            <td><input type='text' name='first_name' class='form-control' required /></td>
                        </tr>
                        <tr>
                        <th>Customer lastname</th>
                            <td><input type='text' name='last_name' class='form-control' required /></td>
                        </tr>
                        <tr>
                            <th>Hotel</th>
                            <td><input type='text' name='establishments_name' class='form-control' value='`+data.establishments_name+`' disabled/></td>
                        </tr>
                        <tr>
                            <th>Hotel city</th>
                            <td><input type='text' name='city_name' class='form-control' value='`+data.city_name+`' disabled/></td>
                        </tr>
                        <tr>
                        <th>Check-in</th>
                            <td><input type='date' name='check_in_date' class='form-control' required /></td>
                        </tr>
                        <tr>
                            <th>Check-out</th>
                            <td><input type='date' name='check_out_date' class='form-control' required /></td>
                        </tr>
                        <!-- Sort room 'select' field -->
                        <tr>
                            <th>Room type</th>
                            <td>`+room_options_html+`</td>
                        </tr>
                        <tr>
                            <th>Room number</th>
                            <td><input type='number' name='room_num' class='form-control' required /></td>
                        </tr>
                        <tr>
                            <th>Room rate</th>
                            <td><input type='number' min='60' name='price_per_night' class='form-control' required /></td>
                        </tr>
                        <tr>
                            <th>Total price</th>
                            <td><input type='number' name='total_price' class='form-control' disabled /></td>
                        </tr>
                        <!-- button to submit form -->
                        <tr>
                            <td colspan="2">
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
                changePageTitle("New reservation");
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
            action : "create_reservation",
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