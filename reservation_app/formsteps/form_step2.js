$(document).ready(function(){
    // show html form when 'create product' button was clicked
    $(document).on('click', '.page-button', function(){
        showAvailableRoom();

        function showAvailableRoom(){
            console.log("showAvailableRoom");
            var json_url="../reservation_app/MOCK_DATA_rooms.json";
            showRooms(json_url);
        }

        // function to show list of products
        function showRooms(json_url){
            console.log("showRooms");
            // get list of products from the API
            $.getJSON(json_url, function(data){
                console.log(data.rooms);
                //html for listing products
                readRoomsTemplate(data, "");
            });
        }

        function readRoomsTemplate(data){

            var step_content = `<div>`;

            $.each(data.rooms, function(index, data) {

                console.log("binnen in template");

                console.log(data.room_number);

                
                step_content += `       
                    <div class="room_block">
                    <input type="radio" name="radioname" value="` + data.room_number + `" />
                        <div class="row">
                            <div class="col-xs-6 col-md-4"><img id="room_tumbnail" src="../reservation_app/assets/images/Comfort_kamer.jpg" alt="Room"/></div>
                            <div class="col-xs-6 col-md-4 room_properties">                        
                                <h4> Room ` + data.room_number + `</h4>
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

                
                console.log(step_content);
                                
            });


            step_content += `<button type='submit' class='btn btn-primary'>
                                    <span class='glyphicon glyphicon-chevron-right pull-right'></span>Choose room
                            </button>`;

            step_content += `</div>`;



            // inject html to 'page-content' of our app
            $("#page-content").html(step_content);


            changePageCircle("2");
            changePageTitle("Choose room");

            console.log("einde van pagina");
        };
    });
});

// $(document).ready(function(){
//     // show html form when 'create product' button was clicked
//     $(document).on('click', '.page-button', function(){
//         var step_content=`       
//             <div class="">
//                 <div class="row" id="">
//                     <div class="col-xs-6 col-md-4"><img id="room_tumbnail" src="../reservation_app/assets/images/Comfort_kamer.jpg" alt="Room" witdh="150px"/></div>
//                     <div class="col-xs-6 col-md-4 room_properties">                        
//                         <h4>Comfort room</h4>
//                         <p><span class="glyphicon glyphicon-user properties"></span>max guests : 2</p>
//                         <p><span class="glyphicon glyphicon-bed properties"></span> separate beds</p>
//                         <p><span class="glyphicon glyphicon-equalizer"></span>walk-in shower</p>
//                         <p><span class="glyphicon glyphicon-fullscreen"></span>30 m2</p>
//                     </div>
//                     <div class="col-xs-6 col-md-4">
//                         <p>asdfljsadfl;kjaf;kajf;lsafjk</p>
//                     </div>
//                 </div>
//             </div>

//             <button type='submit' class='btn btn-primary page-button2'>
//                 <span class='glyphicon glyphicon-chevron-right pull-right'></span> Next step
//             </button>`;
//     // inject html to 'page-content' of our app
//     $("#page-content").html(step_content);

//     changePageCircle("2");
//     changePageTitle("Choose room");
//     });
// });