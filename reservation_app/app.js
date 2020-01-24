
$(document).ready(function(){

    // app html
    var app_html=`
        <div class="container">

                <div class="page-steps">
                    <div class="circle"><p>1</p></div>
                    <h1 class="page_steps">Choose dates</h1>
                </div>

                
                <div id="page-content">
                    <div class="content_box">
                        <form action="form_step2.js" method="POST">
                            <div class="input_group">
                                <div class="form-group">
                                    <div class="">
                                        <label for="startDate"><span class="calendar">Start date:</span></label>
                                        <input class="date_input" type="date" id="startDate" name="startDate" value="" />
            
                                        <label for="numberNights"><span class="calendar">Number of nights:</span></label>
                                        <input type="number" name="numberNights" min="1" max="14" value="0">
            
                                        <label for="endDate"><span class="calendar">End date:</span></label>
                                        <input class="date_input" type="date" id="endDate" name="endDate" />
                                    </div>
                                </div>
                            </div>
            
                            <div class="input_group">
                                <div class="form-group">
                                    <div class="">
                                        <label for="numberNights"><span class="form_label_span">Number of guests:</span></label>
                                        <input type="number" name="numberGuests" min="1" max="2" value="0">
            
                                        <label for="numberNights"><span class="form_label_span">Number of rooms:</span></label>
                                        <input type="number" name="numberRooms" min="1" max="1" value="0">
                                    </div>
                                </div>
                            </div>
            
                            <button type="submit" class="btn btn-primary">Next step</button>
                        </form>
                    </div>
                </div>
        </div>
        `;

    // inject to 'app' in index.html
    $("#reservation").html(app_html);

});
 


// change page title
function changePageTitle(page_title){
    // change page title
    $('.page-steps').text(page_title);
    // change title tag
    document.title=page_title;
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