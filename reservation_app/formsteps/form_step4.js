$(document).ready(function(){
    // show html form when 'create product' button was clicked
    $(document).on('click', '.page-button3', function(){
        var step_content=`   
            <div class="row" style="border: 1px solid green">
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
                <div class="col-sm-2">col-sm-2</div>
                <div class="col-sm-2">col-sm-2</div>
            </div>

            <div class="row" style="border: 1px solid green">
                <div class="col-xs-6 col-md-4"><img src="" alt="Room"/></div>
                <div class="col-xs-6 col-md-4 room_properties">                        
                    <h4>Comfort room</h4>
                    <p><span class="glyphicon glyphicon-user properties"></span>max guests : 2</p>
                    <p><span class="glyphicon glyphicon-bed properties"></span> separate beds</p>
                    <p><span class="glyphicon glyphicon-equalizer"></span>walk-in shower</p>
                    <p><span class="glyphicon glyphicon-fullscreen"></span>30 m2</p>
                </div>
                
                <div class="col-xs-6 col-md-4">
                    <p>asdfljsadfl;kjaf;kajf;lsafjk</p>
                </div>
            </div>

            <div class="row" style="border: 1px solid green">
                <div class="col-xs-6 col-md-6">
                    <tr>
                        <th>Name:</th>
                        <th>Annie</th>
                    </tr></br>
                    <tr>
                        <th>Email:</th>
                        <th>Annie@hotmail.com</th>
                    </tr></br>
                    <tr>
                        <th>Phone number:</th>
                        <th>0548923474238</th>
                    </tr>
                </div>
                <div class="col-xs-6 col-md-6">
                    <p>Total: 
                </div>
            </div>

            <button class='btn btn-primary page-button4'>
                <span class='glyphicon glyphicon-chevron-right pull-right'></span>Book now
            </button>
        `;

            // inject html to 'page-content' of our app
        $("#page-content").html(step_content);
        
        changePageCircle("4");
        changePageTitle("Summary");
    });
});