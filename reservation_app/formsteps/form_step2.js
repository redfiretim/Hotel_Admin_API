// $(document).ready(function(){
    // show html form when 'create product' button was clicked


    function showAvailableRoom(result){
        var json_data = result["records"];
        console.log(json_data);
        readRoomsTemplate(json_data, "");
        console.log("in show available room functie")
    }

    // function to show list of products
    function showRooms(json_data){
        // get list of products from the API
        $.getJSON(json_data, function(data){
            //html for listing products
            readRoomsTemplate(data, "");
        });
    }

    function readRoomsTemplate(data){
        var step_content = `<div class="room-container">`;
            $.each(data, function(index, data) {
                console.log(data);

                var bedType;
            
            // REBUILD RADIO BUTTON SYSTEM VIA THIS LINK: https://markheath.net/post/customize-radio-button-css

            // NEEDED FOR ADD CLASS TO SHOW BORDER AROUND SELECTED ROOM
            // $(document).on('click', '.room_block', function(){
            //     $('.room_block.active').removeClass("btn-primary:active"); 
            //     $(this).addClass("btn-primary:active"); 
            // });

                if((data.name) == "Standard triple room")
                {
                    bedType = "Separate beds";
                }
                if((data.name) == "Standard double room")
                {
                    bedType = "Queen size bed";
                }
                if((data.name) == "Deluxe double room")
                {
                    bedType = "King size bed";
                }
                // else{
                //     bedType = "Unknown";
                // }

                console.log(bedType);


                step_content += `
                <div class="room_block" onclick="">
                    <input type="radio" name="radioname" value="` + data.name + `" />
                    <div class="row">
                        <div class="col-xs-6 col-md-4">
                            <img id="room_tumbnail" src="../reservation_app/assets/images/`+ data.image_one +`" alt="Room"/>
                        </div>
                        <div class="col-xs-6 col-md-4 room_properties">                        
                            <h4>` + data.name + ` <span class="glyphicon glyphicon-ok"></span></h4>
                            <p><span class="glyphicon glyphicon-user properties"></span> ` + data.max_pers + `</p>
                            <p><span class="glyphicon glyphicon-bed properties"></span> ` + bedType + `</p>
                            <p><span class="glyphicon glyphicon-plus"></span> ` + data.amenities + `</p>
                        </div>
                        <div class="col-xs-6 col-md-4">
                            <p>`+ data.description +`</p>
                        </div>
                    </div>
                </div>`;  
            });
            step_content += ` <button type='submit' class='btn btn-primary page-button2'>
                                    <span class='glyphicon glyphicon-chevron-right pull-right'></span>Choose room
                            </button>
                            <a type="button" class="btn btn-link" href="../reservation_app/index.html">< One step back</a>`;
            step_content += `</div>`;

        // inject html to 'page-content' of our app
        $("#page-content").html(step_content);

        changePageCircle("2");
        changePageTitle("Choose room");
    };
// });
