$(document).ready(function(){
    // show html form when 'update product' button was clicked
    $(document).on('click', '.update-reservation-button', function(){
        // get product id
        var id = $(this).attr('data-id');
        // read one record based on given product id
        $.getJSON("http://178.18.138.109/educom/hotel_code/api/index.php?action=read_one_reservation&id=" + id, function(data){
			
			var room_options_html = `<select id='accommodation_select' name='accommodation_id' class='form_control' required>`; 
			room_options_html += `<option value="free">Select dates to show rooms</option>`; 
			room_options_html+= `</select>`; 
			
            // values will be used to fill out our form
            var booking_num = data.booking_num;
            var first_name = data.first_name;
            var last_name = data.last_name;
            var phone_num = data.phone_num;
            var email = data.email;
            var room_num = data.room_num;
            var price_per_night = data.price_per_night;
            var total_price = data.total_price;
            var check_in_date = data.check_in_date;
            var check_out_date = data.check_out_date;
            var customer_id = data.customer_id;

            // load list of rooms
            // $.getJSON("http://178.18.138.109/educom/hotel_code/api/index.php?action=read_available_accommodations", function(data){  
                // Function for datepicker
                $(function() {
                    var startDate;
                    var endDate;
					var startBoolean = false; 
                    // FIRST DATE PICKER
                    //default settings for picker layout
                    from = $("#from").datepicker({
                        dateFormat: "dd-mm-yy",
                        minDate: +1,
                        maxDate: "1Y",
                        defaultDate: "+1d",
                        changeMonth: true,
                        numberOfMonths: 1,
                        showOtherMonths: true,
                        selectOtherMonths: true,
                    });

                    // Changes minDate of "to" picker to user-input of "from" picker
                    $('#from').change(function() { 
						startBoolean = true; 
                        startDate = $(this).datepicker('getDate'); 
                        $("#to").datepicker("option", "minDate", startDate); 
                    }) 

                    // SECOND DATE PICKER
                    to = $( "#to" ).datepicker({
                        dateFormat: "dd-mm-yy",
                        maxDate: "1Y",     
                        changeMonth: true,
                        numberOfMonths: 1,
                        showOtherMonths: true,
                        selectOtherMonths: true
                    })

                    // Changes maxDate of "from" picker to user-input of "to" picker
                    $('#to').change(function() { 
                        endDate = $(this).datepicker('getDate'); 
                        $("#from").datepicker("option", "maxDate", endDate);
						$("#to").datepicker("option", "minDate", startDate); 
						
						if(startBoolean) {	
							// get form data
							var form_data=JSON.stringify($('#create-reservation-form').serializeObject());
							console.log(form_data);

							// submit form data to api
							$.ajax({
								url: "http://178.18.138.109/educom/hotel_code/api/index.php?action=read_available_accommodations",
								type : "POST",
								contentType : 'application/json',
								data : form_data,
								success : function(result) {
									console.log(result);
									$('#accommodation_select').empty(); 
									$.each(result.records, function(key, val){
										$('#accommodation_select').append('<option value="'+val.id+'">'+val.name+' ' + val.room_num + '</option>'); 
									}); 
									// Reservation was created, go back to products list
								},
								error: function(xhr, resp, text) {
									// show error to console
									console.log(xhr, resp, text);
								}
							});
							return false;
						}
                    });
                });

                // store 'update reservation' html to this variable
                var update_product_html=`
                <div id='read-products' class='btn btn-primary pull-right m-b-15px read-products-button button-margin'>
                    <span class='glyphicon glyphicon-list'></span> Back to reservations
                </div>

                <!-- build 'update product' html form -->
                <!-- we used the 'required' html5 property to prevent empty fields -->
                <form name="validate_Adminform" id='update-reservation-form' action='#' method='post' border='0' onsubmit="return validateForm();" novalidate>
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
							<input type='hidden' name='customer_id' value=\"` + customer_id + `" /> 
                        </tr>
                        <!-- Customer name field -->
                        <tr>
                            <td>Last name</td>
                            <td><input value=\"` + last_name + `\" type='text' name='last_name' class='form-control' pattern='([A-Za-z]{1,32}[ \-]?[A-Za-z]{1,32}){1,32}' required /></td>
                        </tr>
                        <tr>
                            <td>Phonenumber</td>
                            <td><input value=\"` + phone_num + `\" type='text' name='phone_num' class='form-control' pattern='[\+]{1}[1-9]{1}[0-9\-]{9,18}$|^[0-9\-]{10,20}' required /></td>
                        </tr>
                        <!-- Customer name field -->
                        <tr>
                            <td>Email</td>
                            <td><input value=\"` + email + `\" type='text' name='email' class='form-control' pattern='([A-Za-z0-9]{1}[A-Za-z0-9._-]{0,63}@[A-Za-z0-9]{1,80}[\.]{1}[A-Za-z]{2,20}){0,150}' required /></td>
                            <input type="hidden" value="` + customer_id + `">
                        </tr>
                        <!-- Checkin field -->
                        <tr>
                            <td>Check-in</td>
                            <td><input class="picker form-control" id="from" value=\"` + check_in_date + `\"  type='text' name='check_in_date' required /></td>
                        </tr>

                        <!-- Checkout field -->
                        <tr>
                            <td>Check-out</td>
                            <td><input class="picker form-control" id="to" value=\"` + check_out_date + `\"  type='text' name='check_out_date' required /></td>
                        </tr>  
                        <!-- categories 'select' field -->


                        <!-- Sort room 'select' field -->
                        <tr>
                            <th>Room type</th>
                            <td>`+room_options_html+`</td>
                        </tr>
                
                        <!-- Room rate field -->
                        <tr>
                            <td>Room rate</td>
                            <td><input value=\"` + price_per_night + `\" type='number' name='price_per_night' class='form-control' disabled/></td>
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
                        <td class="display-none"><input value=\"` + booking_num + `\" name='booking_num' type='hidden' /></td>
                        </tr>
                    </table>
                </form>`;

                // inject to 'page-content' of our app
                $("#page-content").html(update_product_html);
                // chage page title
                changePageTitle("Reservation Edit");
            // });
        });
    });
     
    // will run if 'create product' form was submitted
    $(document).on('submit', '#update-reservation-form', function(){
        // get form data
        var form_data=JSON.stringify($(this).serializeObject());
		
		console.log(form_data); 
        // submit form data to api
        $.ajax({
            url: "http://178.18.138.109/educom/hotel_code/api/index.php?action=update_reservation",
            type : "POST",
            contentType : 'application/json',
            data : form_data,
            success : function(result) {
				console.log("asdlkfjaklj"); 
                // product was created, go back to products list
                showProductsFirstPage();
            },
            error: function(xhr, resp, text) {
                // show error to console
                console.log(xhr, resp, text);
            }
        });
        return false;
    });
});