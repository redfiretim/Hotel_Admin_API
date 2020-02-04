// product list html
function readProductsTemplate(data, keywords){
    var read_products_html=`
        <!-- search products form
        <form id='search-reservation-form' action='s' method='post'>
            <div class='input-group pull-left w-30-pct'>
                <input type='text' value='` + keywords + `' name='keywords' class='form-control product-search-keywords' placeholder='Search...' />
    
                <span class='input-group-btn'>
                    <button type='submit' class='btn btn-default' type='button'>
                        <span class='glyphicon glyphicon-search'></span>
                    </button>
                </span>
            </div>
        </form>
        -->
 
        <!-- when clicked, it will load the create product form -->
        <div id='create-product' class='btn btn-primary pull-right m-b-15px create-reservation-button button-margin'>
            <span class='glyphicon glyphicon-plus'></span> Make a new reservation
        </div>
 
        <!-- start table -->
        <table class="table table-curved table-striped">
            <thead>
            <tr>
                <th class='w-15-pct'>Booking number</th>
                <th class='w-15-pct'>Customer</th>
                <th class='w-10-pct'>Room number</th>
                <th class='w-10-pct'>Total price</th>
                <th class='w-10-pct'>Check-in</th>
                <th class='w-10-pct'>Check-out</th>
                <th class='w-25-pct text-align-center'></th>
            </tr>
        </thead>`;

        // loop through returned list of data
        $.each(data.records, function(index, data) {
            // creating new table row per record
            read_products_html+=`<tr>
                <td>` + data.booking_num + `</td>
                <td>` + data.first_name + " " + data.last_name + `</td>
                <td>` + data.room_num + `</td>
                <td>` + data.total_price + `</td>
                <td>` + data.check_in_date + `</td>
                <td>` + data.check_out_date + `</td>
    
                <!-- 'action' buttons -->
                <td>
                    <!-- read product button -->
                    <button class='btn btn-primary m-r-10px read-one-reservation-button' data-id='` + data.booking_num + `'>
                        <span class='glyphicon glyphicon-eye-open'></span> Details
                    </button>
    
                    <!-- edit button -->
                    <button class='btn btn-info m-r-10px update-reservation-button' data-id='` + data.booking_num + `'>
                        <span class='glyphicon glyphicon-edit'></span> Edit
                    </button>
    
                    <!-- delete button -->
                    <button class='btn btn-danger delete-reservation-button' data-id='` + data.booking_num + `'>
                        <span class='glyphicon glyphicon-remove'></span> Delete
                    </button>
                </td>
            </tr>`;
        });
        // end table
        read_products_html+=`</table>`;
        
    // inject to 'page-content' of our app
    $("#page-content").html(read_products_html);
}