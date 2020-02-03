//$(document).ready(function(){
    //show html form when 'create product' button was clicked
    function form_step4(){
        var step_content=`   
            <div class="row step4">
                <div class="col-sm-2">
                    <label for="numberNights"><span class="calendar">Nights:</span></label></br>
                    <input type="number" name="numberNights" min="1" max="14" value="1">
                </div>
                <div class="col-sm-3">
                    <label for="startDate"><span class="calendar">Arrival date:</span></label></br>
                    <input class="date_input" type="date" id="startDate" name="startDate" value="" />
                </div>
                <div class="col-sm-3">
                    <label for="endDate"><span class="calendar">Departure date:</span></label></br>
                    <input class="date_input" type="date" id="endDate" name="endDate" />
                </div>
                <div class="col-sm-2">
                    <label for="endDate"><span class="calendar">Number of guests:</span></label></br>
                    <input type="number" name="numberNights" min="1" max="14" value="2">
                </div>
                <div class="col-sm-2">
                    <label for="endDate"><span class="calendar">Number of rooms:</span></label></br>
                    <input type="number" name="numberNights" min="1" max="14" value="1">
                </div>
            </div>

            <div class="row step4">
                <div class="col-xs-6 col-md-4"><img id="room_tumbnail" src="" alt="Room"/></div>
                <div class="col-xs-6 col-md-4 room_properties">                        
                    <h4>Comfort room</h4>
                    <p><span class="glyphicon glyphicon-user properties"></span>max guests : 2</p>
                    <p><span class="glyphicon glyphicon-bed properties"></span> separate beds</p>
                    <p><span class="glyphicon glyphicon-equalizer"></span>walk-in shower</p>
                    <p><span class="glyphicon glyphicon-fullscreen"></span>30 m2</p>
                </div>
                
                <div class="col-xs-6 col-md-4">
                    <p>Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.</p>
                </div>
            </div>

            <div class="row step4">
                <div class="col-xs-6 col-md-6">
                    <tr>
                        <th>Name:</th>
                        <th><p></p></th>
                    </tr></br>
                    <tr>
                        <th>Email:</th>
                        <th><p>Annie@hotmail.com</p></th>
                    </tr></br>
                    <tr>
                        <th>Phone number:</th>
                        <th><p>0548923474238</p></th>
                    </tr>
                </div>
                <div class="col-xs-6 col-md-6">
                    <p>Total: 
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
                    //showProducts();
                },
                error: function(xhr, resp, text) {
                    // show error to console
                    console.log(xhr, resp, text);
                }
            });
            return false;
        });
    }