$(document).ready(function(){
    // Function for datepicker
    $(function() {

        var fromDate;

        // date format
        var dateFormat = "dd/mm/yy",
        


        // FIRST DATE PICKER
        //default settings for picker layout
        from = $("#from").datepicker({
            // min date restriction
            minDate: +1,
            // max date restriction
            maxDate: "1Y",
            // weeks
            defaultDate: "+1d",
            // can change month in picker
            changeMonth: true,
            // displayed number of months in picker
            numberOfMonths: 1,
            // show dates before/after displayed month
            showOtherMonths: true,
            // select days other than displayed month
            selectOtherMonths: true,
            // show week numbers left side of datepicker panel
            showWeek: true,
            // fold in animation
            showAnim: "fold"
        })


        // Changes minDate of "to" picker to user-input of "from" picker
        $('#from').change(function() { 
            startDate = $(this).datepicker('getDate'); 
            $("#to").datepicker("option", "minDate", startDate); 
        }) 




        // SECOND DATE PICKER
        to = $( "#to" ).datepicker({
            maxDate: "1Y",     
            changeMonth: true,
            numberOfMonths: 1,
            showOtherMonths: true,
            selectOtherMonths: true,
            selectOtherMonths: true,
            showWeek: true,
            showAnim: "fold"
        })

        // Changes maxDate of "from" picker to user-input of "to" picker
        $('#to').change(function() { 
            endDate = $(this).datepicker('getDate'); 
            $("#from").datepicker("option", "maxDate", endDate); 
        }) 




        // SET DATE in inputfield
        function getDate( element ) {
            var date;
            try {
                date = $.datepicker.parseDate( dateFormat, element.value );
            } catch( error ) {
                date = null;
            }
            return date;
        }
    });

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
                <form action="#">
                    <div class="row" id="first-row">
                        <div class="col-xs-6 col-md-4">
                            <label for="picker">Arrival date:</label></br>
                            <input class="picker" type="text" id="from" name="from">
                            <span for="picker" class="glyphicon glyphicon-calendar" aria-hidden="true"></span>
                        </div>
                        <div class="col-xs-6 col-md-4">
                            <label for="numberNights"><span class="calendar">Nights:</span></label></br>
                            <input class="picker_night"  type="number" name="numberNights" min="1" max="14" value="1">
                        </div>
                        <div class="col-xs-6 col-md-4">
                            <label for="to">Departure date:</label></br>
                            <input class="picker" type="text" id="to" name="to">
                            <span for="to" class="glyphicon glyphicon-calendar" aria-hidden="true"></span>
                        </div>
                    </div>

                    <div class="row" id="first-row">
                        <div class="col-xs-6 col-md-4">
                            <label for="numberNights"><span class="form_label_span">Number of guests:</span></label></br>
                            <input class="picker_night" type="number" name="numberGuests" min="1" max="2" value="1">
                            <span for="to" class="glyphicon glyphicon-menu-down" aria-hidden="true"></span>
                        </div>
                        <div class="col-xs-6 col-md-4">
                            <label for="numberNights"><span class="form_label_span">Number of rooms:</span></label></br>
                            <input class="picker_night" type="number" name="numberRooms" min="1" max="1" value="1">
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
 
// // function to make form values to json format
// $.fn.serializeObject = function(){
//     var o = {};
//     var a = this.serializeArray();
//     $.each(a, function() {
//         if (o[this.name] !== undefined) {
//             if (!o[this.name].push) {
//                 o[this.name] = [o[this.name]];
//             }
//             o[this.name].push(this.value || '');
//         } else {
//             o[this.name] = this.value || '';
//         }
//     });
//     return o;
// };