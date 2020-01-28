$(document).ready(function(){
    // show html form when 'create product' button was clicked
    $(document).on('click', '.create-reservation-button', function(){
        // load list of categories
        $.getJSON("http://178.18.138.109/educom/hotel_code/api/index_dev.php?action=read_reservations", function(data){
            // build categories option html
            // loop through returned list of data
            var room_options_html=`<select name='room_type_id' class='form-control' required>`;
                $.each(data.records, function(key, val){
                    //room_type_id is for rooms and type is for de name of the rooms 
                    room_options_html+=`<option value='` + val.accommodation_types_name + `'>` + val.accommodation_types_name + `</option>`;
                });
            room_options_html+=`</select>`;     

            var create_product_html=`
                <!-- 'back to reservations' button to show list of reservations -->
                <div id='read-product' class='btn btn-primary pull-right m-b-15px read-products-button button-margin'>
                    <span class='glyphicon glyphicon-list'></span> Back to reservations
                </div>

                <!-- reservation data will be shown in this table -->
                <form name='validate_Adminform' id='create-reservation-form' action='#' method='post' onsubmit="return validateForm();" border='0'>
                    <table class="table table-curved table-striped">
                        <tr>
                            <th>Firstname</th>
                            <td><input type='text' name='first_name' class='form-control' pattern='[A-Za-z]{1,32}' is-valid/></td>
                        </tr>
                        <tr>
                            <div class="col-md-4 mb-3 md-form">
                                <label for="validationCustomUsername2">Username</label>
                                <input type="text" class="form-control" id="validationCustomUsername2" aria-describedby="inputGroupPrepend2"
                                required>
                                <div class="invalid-feedback">
                                    Please choose a username.
                                </div>
                            </div>
                            https://mdbootstrap.com/docs/jquery/forms/validation/

                            <th>Lastname</th>
                            <td><input type='text' name='last_name' class='form-control' pattern='[A-Za-z]{1,32}' required is-valid/></td>
                        </tr>
                        <tr>
                            <th>Hotel</th>
                            <td><input type='text' name='establishments_name' class='form-control' value='`+data.establishments_name+`' pattern='[A-Za-z]{1,32}' disabled/></td>
                        </tr>
                        <tr>
                            <th>Hotel city</th>
                            <td><input type='text' name='city_name' class='form-control' value='`+data.city_name+`' pattern='[A-Za-z]{1,32}' disabled/></td>
                        </tr>
                        <tr>
                        <th>Check-in</th>
                            <td><input type='date' name='check_in_date' class='form-control' pattern='\d{4}-\d{2}-\d{2}' required /></td>
                        </tr>
                        <tr>
                            <th>Check-out</th>
                            <td><input type='date' name='check_out_date' class='form-control' pattern='\d{4}-\d{2}-\d{2}' required /></td>
                        </tr>
                        <!-- Sort room 'select' field -->
                        <tr>
                            <th>Room type</th>
                            <td>`+room_options_html+`</td>
                        </tr>
                        <tr>
                            <th>Room number</th>
                            <td><input type='text' name='room_num' class='form-control' pattern='[0-9]*' value='generated form db based on room type' disabled/></td>
                        </tr>
                        <tr>
                            <th>Room rate</th>
                            <td><input type='text' min='60' name='price_per_night' class='form-control' pattern='[0-9]*' value='generated form db based on room type' disabled /></td>
                        </tr>
                        <tr>
                            <th>Total price</th>
                            <td><input type='text' name='total_price' class='form-control' pattern='[0-9]*' value='generated form db based on room type' disabled /></td>
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
            url: "http://178.18.138.109/educom/hotel_code/api/index_dev.php?action=read_availability",
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