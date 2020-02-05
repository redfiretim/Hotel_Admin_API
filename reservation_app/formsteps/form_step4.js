function setValuesInHtml(){
    form_step4();
    // get elements by id and push the sorage item in the div
    // For step 1
    document.getElementById("numberNights").innerHTML = sessionStorage.getItem("numberNights");
    document.getElementById("check_in_date").innerHTML = sessionStorage.getItem("check_in_date");
    document.getElementById("check_out_date").innerHTML = sessionStorage.getItem("check_out_date");
    document.getElementById("numberGuests").innerHTML = sessionStorage.getItem("numberGuests");
    document.getElementById("numberRooms").innerHTML = sessionStorage.getItem("numberRooms");
    // For step 2
    document.getElementById("room_name").innerHTML = sessionStorage.getItem("room_name");
    document.getElementById("room_max_pers").innerHTML = sessionStorage.getItem("room_max_pers");
    document.getElementById("room_bedType").innerHTML = sessionStorage.getItem("room_bedType");
    document.getElementById("room_amenities").innerHTML = sessionStorage.getItem("room_amenities");
    document.getElementById("room_description").innerHTML = sessionStorage.getItem("room_description");
    document.getElementById("room_tumbnail").innerHTML = sessionStorage.getItem("room_tumbnail");
    // For step 3
    document.getElementById("first_name").innerHTML = sessionStorage.getItem("first_name");
    document.getElementById("last_name").innerHTML = sessionStorage.getItem("last_name");
    document.getElementById("email").innerHTML = sessionStorage.getItem("email");
    document.getElementById("phonenumber").innerHTML = sessionStorage.getItem("phonenumber");
}

function form_step4(){
    var step_content=`  
    <form name="step4_form" id="step4_form"> 
        <div class="row step4">
            <div class="col-sm-2">
                <b>Nights:</b></br>
                <div id="numberNights"> </div>
            </div>
            <div class="col-sm-3">
                <b>Arrival date:</b></br>
                <div id="check_in_date"> </div>
            </div>
            <div class="col-sm-3">
                <b>Departure date:</b></br>
                <div id="check_out_date"> </div>
            </div>
            <div class="col-sm-2">
                <b>Number of guests:</b></br>
                <div id="numberGuests"> </div>
            </div>
            <div class="col-sm-2">
                <b>Number of rooms:</b></br>
                <div id="numberRooms"> </div>
            </div>
        </div>

        <div class="row step4">
            <div class="col-xs-6 col-md-4"><img id="room_tumbnail" src="../reservation_app/assets/images/" alt="Room"/></div>
            <div class="col-xs-6 col-md-4">                        
                <h4 id="room_name"></h4>
                <span class="glyphicon glyphicon-user"><div id="room_max_pers" class="summeryStyling"></div></span>
                <span class="glyphicon glyphicon-bed"><div id="room_bedType" class="summeryStyling"></div></span>
                <span class="glyphicon glyphicon-plus"><div id="room_amenities" class="summeryStyling"></div></span>
            </div>
            
            <div class="col-xs-6 col-md-4">
                <p id="room_description"></p>
            </div>
        </div>

        <div class="row step4">
            <div class="col-xs-6 col-md-6">
                <tr>
                    <th><b>Name:</b></th>
                    <th>
                        <p id="first_name"></p>
                        <p id="last_name"></p>
                    </th>
                </tr></br>
                <tr>
                    <th><b>Email:</b></th>
                    <th><p id="email"></p></th>
                </tr></br>
                <tr>
                    <th><b>Phone number:</b></th>
                    <th><p id="phonenumber"></p></th>
                </tr>
            </div>
            <div class="col-xs-6 col-md-6">
                <th><b>Total:</b></th>
            </div>
        </div>

        <button class='btn btn-primary page-button4'>
            <span class='glyphicon glyphicon-chevron-right pull-right'></span>Book now
        </button>
        <button type="button" class="btn btn-link page-button2">< One step back</button>
    </form>`;

    // inject html to 'page-content' of our app
    $("#page-content").html(step_content);
    
    changePageCircle("4");
    changePageTitle("Summary");
}

//For back button
// $(document).on('click', '.page-button2' , function(){
//     showUserDetailsForm();
// });

$(document).on("click", ".page-button4", function(){
    // For step 1
    var num_of_nights =  sessionStorage.getItem("numberNights");
    var check_in_date = sessionStorage.getItem("check_in_date");
    var check_out_date = sessionStorage.getItem("check_out_date");
    var num_of_pers = sessionStorage.getItem("numberGuests");
    // For step 2
    var accommodation_id = sessionStorage.getItem("accommodation_id");
    // For step 3
    var first_name = sessionStorage.getItem("first_name");
    var last_name = sessionStorage.getItem("last_name");
    var email = sessionStorage.getItem("email");
    var phone_num = sessionStorage.getItem("phonenumber"); 

    var arrayForm = {"num_of_nights":num_of_nights, "check_in_date":check_in_date, "check_out_date":check_out_date, "num_of_pers":num_of_pers, "accommodation_id":accommodation_id, "first_name":first_name, "last_name":last_name, "email":email, "phone_num":phone_num};

    // get form data
    var form_data = JSON.stringify(arrayForm);

    console.log(form_data + "Array that gets send to backend. step4");
    
    // submit form data to api
    $.ajax({
        url: "http://178.18.138.109/educom/hotel_code/api/index.php?action=create_reservation",
        type : "POST",
        contentType : 'application/json',
        data : form_data,
        success : function(result) {
            // Reservation was created, go back to products list
            form_step5();
        },
        error: function(xhr, resp, text) {
            // show error to console
            console.log(xhr, resp, text);
        }
    });
    return false;
});

