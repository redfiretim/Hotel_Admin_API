$(document).ready(function(){
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    var startDate;
    var endDate;

    // Function for datepicker
    $(function() {
        // date format
        var dateFormat = "dd-mm-yy";
    
        // FIRST DATE PICKER
        //default settings for picker layout
        from = $("#from").datepicker({
            dateFormat: "yy-mm-dd",
            // min date restriction
            minDate: +2,
            // max date restriction
            maxDate: "1Y",
            // weeks
            defaultDate: "+2d",
            // can change month in picker
            changeMonth: true,
            // displayed number of months in picker
            numberOfMonths: 1,
            // show dates before/after displayed month
            showOtherMonths: true,
            // select days other than displayed month
            selectOtherMonths: true,
            // show week numbers left side of datepicker panel
            showWeek: true 
        });

        // Changes minDate of "to" picker to user-input of "from" picker
        $('#from').change(function() { 
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
            selectOtherMonths: true,
            showWeek: true
        })

        // Changes maxDate of "from" picker to user-input of "to" picker
        $('#to').change(function() { 
            endDate = $(this).datepicker('getDate'); 
            $("#from").datepicker("option", "maxDate", endDate); 
        }) 


        // CODE NOT USED!!
        // // SET DATE in inputfield
        // function getDate( element ) {
        //     var date;
        //     try {
        //         date = $.datepicker.parseDate( dateFormat, element.value );
        //     } catch( error ) {
        //         date = null;
        //     }
        //     return date;
        // }
    });




// WIP  CALCULATING NIGHTS  <--  NOT WORKING YET - NaN output in console (Not a Number)
    // //calculate number of night  (WIP)
    // function nights(startDate,endDate, oneDay) {
    //     const firstDate = startDate;
    //     const secondDate = endDate;
    
    //     const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));
    //     return diffDays;
    // }

    // // dev test log
    // if((startDate !== null) && (endDate !== null)){
    //     console.log(nights(startDate, endDate, oneDay));
    // }
    // else{
    //     console.log("Error: Night calculation needs to be exucuted after User Input!")
    // }
// WIP  CALCULATING NIGHTS  <--  NOT WORKING YET - NaN output in console (Not a Number)





    // app html template
    var app_html=`
        <div class="container">
            <!-- page-steps needed for displaying and changing the heading -->
            <div class="page-steps">
                <div class="page-circle"><p>1</p></div>
                <h1 class="page_title">Choose dates</h1>
            </div>
            
            <!-- page-content needed for displaying and changing the content from steps -->
            <div id="page-content">
                <form id="check_availability_form" action="#">
                    <div class="row" id="first-row">
                        <div class="col-xs-6 col-md-4">
                            <label for="picker">Arrival date:</label></br>
                            <input class="picker" type="text" id="from" name="check_in_date" placeholder="yyyy-mm-dd" required>
                            <span for="picker" class="glyphicon glyphicon-calendar" aria-hidden="true"></span>
                        </div>
                        <div class="col-xs-6 col-md-4">
                            <label for="numberNights"><span class="calendar">Nights:</span></label></br>
                            <input class="picker_night"  type="number" name="numberNights" min="1" max="14" value="1" readonly>
                        </div>
                        <div class="col-xs-6 col-md-4">
                            <label for="to">Departure date:</label></br>
                            <input class="picker" type="text" id="to" name="check_out_date" placeholder="yyyy-mm-dd" required>
                            <span for="to" class="glyphicon glyphicon-calendar" aria-hidden="true"></span>
                        </div>
                    </div>

                    <div class="row" id="first-row">
                        <div class="col-xs-6 col-md-4">
                            <label for="numberNights"><span class="form_label_span">Number of guests:</span></label></br>
                            <input class="picker_night" type="number" name="numberGuests" min="1" max="2" value="1" readonly>
                            <span for="to" class="glyphicon glyphicon-menu-down" aria-hidden="true"></span>
                        </div>
                        <div class="col-xs-6 col-md-4">
                            <label for="numberNights"><span class="form_label_span">Number of rooms:</span></label></br>
                            <input class="picker_night" type="number" name="numberRooms" min="1" max="1" value="1" readonly>
                            <span for="to" class="glyphicon glyphicon-menu-down" aria-hidden="true"></span>
                        </div>
                    </div>

                    <button type="submit" class="btn btn-primary page-button">
                        <span class='glyphicon glyphicon-chevron-right pull-right'></span> Check availability
                    </button>
                </form>
            </div>
        </div>`;
    // inject to 'app' in index.html
    $("#reservation").html(app_html);
});

// change page title
function changePageTitle(page_title){
    // change page title
    $('.page_title').text(page_title);
    // change title tag
    document.title=page_title;
}
// change page circle
function changePageCircle(page_circle){
    // change page title
    $('.page-circle').text(page_circle);
    // change title tag
    document.title=page_circle;
}
 


// catches submit button, checks input in validatform() and if true goes to Ajax send
$(document).on('submit', '#check_availability_form', function(){
    
    if(validateForm()){
        sendInput()
    }
});




// will run if 'create product' form was submitted
function sendInput(){
    // get form data
    var form_data=JSON.stringify($(this).serializeObject());

    console.log(form_data);

    // submit form data to api
    $.ajax({
        url: "http://178.18.138.109/educom/hotel_code/api/index.php?action=read_accommodation_types",
        type : "GET",
        action : "read_accommodation_types",
        contentType : 'application/json',
        data : form_data,
        // crossDomain: true,
        // headers: {
        //     // Set any custom headers here.
        //     // If you set any non-simple headers, your server must include these
        //     // headers in the 'Access-Control-Allow-Headers' response header.
        //   },
        // xhrFields: {
        //     // The 'xhrFields' property sets additional fields on the XMLHttpRequest.
        //     // This can be used to set the 'withCredentials' property.
        //     // Set the value to 'true' if you'd like to pass cookies to the server.
        //     // If this is enabled, your server must respond with the header
        //     // 'Access-Control-Allow-Credentials: true'.
        //     withCredentials: true
        //   },
        
        success : function(result) {
            // product was created, go back to products list
            // showProducts();
        },
        error: function(xhr, resp, text) {
            // show error to console
            console.log(xhr, resp, text);
        }
    });
    return false;
}


// function to make form values to json format
$.fn.serializeObject = function(){
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

