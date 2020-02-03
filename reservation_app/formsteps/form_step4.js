function setValuesInHtml(){
    form_step4();
    // get elements by id and push the sorage item in the div
    // For step 1
    document.getElementById("numberNights").innerHTML = sessionStorage.getItem("numberNights");
    document.getElementById("startDate").innerHTML = sessionStorage.getItem("startDate");
    document.getElementById("endDate").innerHTML = sessionStorage.getItem("endDate");
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
        <div class="row step4">
            <div class="col-sm-2">
                <b>Nights:</b></br>
                <div id="numberNights"> </div>
            </div>
            <div class="col-sm-3">
                <b>Arrival date:</b></br>
                <div id="startDate"> </div>
            </div>
            <div class="col-sm-3">
                <b>Departure date:</b></br>
                <div id="endDate"> </div>
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
        <button type="button" class="btn btn-link page-button2">< One step back</button>`;

    // inject html to 'page-content' of our app
    $("#page-content").html(step_content);
    
    changePageCircle("4");
    changePageTitle("Summary");



    // $(document).on('submit', '#create-product-form', function(){
    //     // get form data
    //     var form_data=JSON.stringify($(this).serializeObject());
    //     // submit form data to api
    //     $.ajax({
    //         url: "../api/#.php",
    //         type : "POST",
    //         contentType : 'application/json',
    //         data : form_data,
    //         success : function(result) {
    //             // Reservation was created, go back to products list
    //             //showProducts();
    //         },
    //         error: function(xhr, resp, text) {
    //             // show error to console
    //             console.log(xhr, resp, text);
    //         }
    //     });
    //     return false;
    // });
}