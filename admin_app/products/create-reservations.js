$(document).ready(function(){
    // show html form when 'create product' button was clicked
    $(document).on('click', '.create-reservation-button', function(){
        // load list of categories
        $.getJSON("http://178.18.138.109/educom/hotel_code/api/index.php?action=read_available_accommodations", function(data){
            // build categories option html
            // loop through returned list of data
            room_options_html = `<select id='accommodation_select' name='accommodation_id' class='form_control' required>
                                    <option value="free">Select dates to show rooms</option>
                                </select>`; 
		        
            // Function for datepicker
            $(function() {
                var startDate;
                var endDate;
				var startBoolean = false; 
                //var selectedMonthName = months[$("#datepicker").datepicker('getDate').getMonth()];
                
                // FIRST DATE PICKER
                //default settings for picker layout
                from = $("#from").datepicker({
                    dateFormat: "yy-mm-dd",
                    minDate: +2,
                    maxDate: "1Y",
                    defaultDate: "+2d",
                    changeMonth: true,
                    numberOfMonths: 1,
                    showOtherMonths: true,
                    selectOtherMonths: true,
                    showWeek: true
                });
        
                // Changes minDate of "to" picker to user-input of "from" picker
                $('#from').change(function() { 
					startBoolean = true;
                    startDate = $(this).datepicker('getDate'); 
                    $("#to").datepicker("option", "minDate", startDate); 
                }) 
        
                // SECOND DATE PICKER
                to = $( "#to" ).datepicker({
                    dateFormat: "yy-mm-dd",
                    maxDate: "1Y",     
                    changeMonth: true,
                    numberOfMonths: 1,
                    showOtherMonths: true,
                    selectOtherMonths: true,
                    showWeek: true
                })
        
                // Changes maxDate of "from" picker to user-input of "to" picker
                $('#to').change(function() { 
					endDate = $(this).datepicker('getDate'); 
					startDate = $("#from").datepicker('getDate'); 
                    $("#to").datepicker("option", "minDate", startDate); 
					$("#from").datepicker("option", "maxDate", endDate); 
					
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
                }) 
            });

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
                            <td><input type='text' name='first_name' class='form-control' pattern='([A-Za-z]{1,32}[ \-]?[A-Za-z]{1,32}){1,32}' required/></td>
                        </tr>
                        <tr>
                            <th>Lastname</th>
                            <td><input type='text' name='last_name' class='form-control' pattern='([A-Za-z]{1,32}[ \-]?[A-Za-z]{1,32}){1,32}' required/></td>
                        </tr>
                        <tr>
                            <th>Email</th>
                            <td><input type='text' name='email' class='form-control' required/></td>
                        </tr>
                        <tr>
                        <div class="col-md-6">
                            <th>Phonenumber</th>
                            <td><input type='number' name='phone_num' class='form-control' pattern='[\+]{1}[1-9]{1}[0-9\-]{9,18}$|^[0-9]{1}[0-9\-]{9,20}' required/></td>
                        </div>
                        </tr>
                        <tr>
                        <th>Number of persons</th>
                            <td><input type='text' name='num_of_pers' class='form-control' required/></td>
                        </tr>
                        <tr>
                            <th>Check-in</th>
                            <td>
                                <input class="picker form-control" type="text" id="from" name="check_in_date" required/>
                            </td>
                        </tr>
                        <tr>
                            <th>Check-out</th>
                            <td>
                                <input class="picker form-control" type="text" id="to" name="check_out_date" required>
                            </td>
                        </tr>
                        <!-- Sort room 'select' field -->
                        <tr>
                            <th>Room type</th>
                            <td>`+room_options_html+`</td>
                        </tr>
                        <!-- 
                        <tr>
                            <th>Room number</th>
                            <td><input type='text' name='room_num' class='form-control' pattern='[0-9]*' value='generated form db based on room type' disabled/></td>
                        </tr>
                        <tr>
                            <th>Room rate</th>
                            <td><input type='text' min='60' name='price_per_night' class='form-control' pattern='[0-9]*' value='generated form db based on room type' disabled /></td>
                        </tr>-->
                        <!--button to submit form -->
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
    $(document).on('submit', '#create-reservation-form', function(){
        // get form data
        var form_data=JSON.stringify($(this).serializeObject());
        console.log(form_data);

        // submit form data to api
        $.ajax({
            url: "http://178.18.138.109/educom/hotel_code/api/index.php?action=create_reservation",
            type : "POST",
            contentType : 'application/json',
            data : form_data,
            success : function(result) {
                console.log(result);
                // Reservation was created, go back to products list
                showProductsFirstPage();
            },
            error: function(xhr, resp, text) {
                // show error to console
                console.log(xhr, resp, text);
            }
        });
        showProductsFirstPage();
        return false;
    });
});