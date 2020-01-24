// product list html
function setStepOneContent(){
    var read_products_html=`

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
                            </div>`;



    // inject to 'page-content' of our app
    $("#page-content").html(read_products_html);

    changePageTitle("Choose dates");
}