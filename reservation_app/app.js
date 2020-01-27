$(document).ready(function(){
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
                    <div class="row">
                        <div class="col-xs-6 col-md-4">
                            <label for="startDate"><span class="calendar">Arrival date:</span></label></br>
                            <input class="date_input" type="date" id="startDate" name="startDate" value="" />
                        </div>
                        <div class="col-xs-6 col-md-4">
                            <label for="numberNights"><span class="calendar">Nights:</span></label></br>
                            <input type="number" name="numberNights" min="1" max="14" value="1">
                        </div>
                        <div class="col-xs-6 col-md-4">
                            <label for="endDate"><span class="calendar">Departure date:</span></label></br>
                            <input class="date_input" type="date" id="endDate" name="endDate" />
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-xs-6 col-md-4">
                            <label for="numberNights"><span class="form_label_span">Number of guests:</span></label></br>
                            <input type="number" name="numberGuests" min="1" max="2" value="1">
                        </div>
                        <div class="col-xs-6 col-md-4">
                            <label for="numberNights"><span class="form_label_span">Number of rooms:</span></label></br>
                            <input type="number" name="numberRooms" min="1" max="1" value="1">
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