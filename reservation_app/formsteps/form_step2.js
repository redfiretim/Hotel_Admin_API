// get the availible rooms
function showAvailableRoom(result){
    var json_data = result["records"];
    readRoomsTemplate(json_data, "");
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
    // start of html object
    var step_content = `<div class="room-container">
        <form name="room_type_form" id="room_type_form">`;
            // loop through data to generate content radio blocks
            $.each(data, function(index, data) {
                var bedType;
        

                if((data.name) == "Standard double room"){
                    bedType = "Queen size bed";
                }
                if((data.name) == "Standard triple room"){
                    bedType = "Separate beds";
                }
                if((data.name) == "Deluxe double room"){
                    bedType = "King size bed";
                }
                
                step_content += `
                <div>
                    <input type="radio" name="room_name" value="` + data.id + `" />                 
                    <label class="room_block">
                        <input type="hidden" name="room_name" value="` + data.name + `" />
                        <input type="hidden" name="room_tumbnail" value="` + data.image_one + `" />
                        <input type="hidden" name="room_max_pers" value="` + data.max_pers + `" />
                        <input type="hidden" name="room_bedType" value="` + bedType + `" />
                        <input type="hidden" name="room_amenities" value="` + data.amenities + `" />
                        <input type="hidden" name="room_description" value="` + data.description + `" />
                        <input type="hidden" name="accommodation_id" value="` + data.id + `" />

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
                    </label>
                </div>`;  
            });

            // submit button + back button
step_content += ` <button type='submit' class='btn btn-primary page-button2'>
                    <span class='glyphicon glyphicon-chevron-right pull-right'></span>Choose room
                </button>
            <a type="button" class="btn btn-link" href="../reservation_app/index.html">< One step back</a>
        </form>
    </div>`;

    // inject html to 'page-content' of our app
    $("#page-content").html(step_content);

    // change content titelbar step number and titel
    changePageCircle("2");
    changePageTitle("Choose room");
};

$(document).on('submit', '#room_type_form', function(){
    // Put form user input into Local Storage
    if(saveFormStep2() == true){
        return showUserDetailsForm();
    }
});