$(document).ready(function(){
    // show html form when 'create product' button was clicked
    $(document).on('click', '.page-button', function(){
        showAvailableRoom();

        function showAvailableRoom(){
            var json_url="../reservation_app/MOCK_DATA_rooms.json";
            showRooms(json_url);
        }

        // function to show list of products
        function showRooms(json_url){
            // get list of products from the API
            $.getJSON(json_url, function(data){
                //html for listing products
                readRoomsTemplate(data, "");
            });
        }

        function readRoomsTemplate(data){
            var step_content = `<div class="room-container">`;

            $.each(data.rooms, function(index, data) {
                step_content += `       
                    <div class="room_block">
                        <input type="radio" name="radioname" value="` + data.room_number + `" />
                       
                        <div class="row">
                            <div class="col-xs-6 col-md-4">
                                <img id="room_tumbnail" src="../reservation_app/assets/images/Comfort_kamer.jpg" alt="Room"/>
                            </div>
                            <div class="col-xs-6 col-md-4 room_properties">                        
                                <h4> Room ` + data.room_number + ` <span class="glyphicon glyphicon-ok"></span></h4>
                                <p><span class="glyphicon glyphicon-user properties"></span>` + data.max_guests + `</p>
                                <p><span class="glyphicon glyphicon-bed properties"></span>` + data.amenity1 + `</p>
                                <p><span class="glyphicon glyphicon-equalizer"></span>` + data.amenity2 + `</p>
                                <p><span class="glyphicon glyphicon-fullscreen"></span>` + data.amenity3 + `</p>
                            </div>
                            <div class="col-xs-6 col-md-4">
                                <p>`+ data.description +`</p>
                            </div>
                        </div>
                    </div>`;    
            });


            step_content += `<button type='submit' class='btn btn-primary page-button2'>
                                    <span class='glyphicon glyphicon-chevron-right pull-right'></span>Choose room
                            </button>`;
            step_content += `</div>`;



            // inject html to 'page-content' of our app
            $("#page-content").html(step_content);


            changePageCircle("2");
            changePageTitle("Choose room");
        };
    });
});