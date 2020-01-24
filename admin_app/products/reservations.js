// product list html
function readProductsTemplate(data, keywords){
    var read_products_html=`
        <!-- search products form -->
        <form id='search-product-form' action='#' method='post'>
            <div class='input-group pull-left w-30-pct'>
                <input type='text' value='` + keywords + `' name='keywords' class='form-control product-search-keywords' placeholder='Search...' />
    
                <span class='input-group-btn'>
                    <button type='submit' class='btn btn-default' type='button'>
                        <span class='glyphicon glyphicon-search'></span>
                    </button>
                </span>
            </div>
        </form>
 
        <!-- when clicked, it will load the create product form -->
        <div id='create-product' class='btn btn-primary pull-right m-b-15px create-product-button'>
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
        $.each(data.reservations, function(index, data) {
            // creating new table row per record
            read_products_html+=`<tr>
                <td>` + data.reservation_id + `</td>
                <td>` + data.customer_id + `</td>
                <td>` + data.room_num + `</td>
                <td>` + data.total_price + `</td>
                <td>` + data.check_in_date + `</td>
                <td>` + data.check_out_date + `</td>
    
                <!-- 'action' buttons -->
                <td>
                    <!-- read product button -->
                    <button class='btn btn-primary m-r-10px read-one-reservation-button' data-id='` + data.reservation_id + `'>
                        <span class='glyphicon glyphicon-eye-open'></span> Details
                    </button>
    
                    <!-- edit button -->
                    <button class='btn btn-info m-r-10px update-reservation-button' data-id='` + data.reservation_id + `'>
                        <span class='glyphicon glyphicon-edit'></span> Edit
                    </button>
    
                    <!-- delete button -->
                    <button class='btn btn-danger delete-reservation-button' data-id='` + data.reservation_id + `'>
                        <span class='glyphicon glyphicon-remove'></span> Delete
                    </button>
                </td>
            </tr>`;
        });
        // end table
        read_products_html+=`</table>`;

    // pagination
    if(data.paging){
        read_products_html+="<ul class='pagination pull-left margin-zero padding-bottom-2em'>";
    
            // first page
            if(data.paging.first!=""){
                read_products_html+="<li><a data-page='" + data.paging.first + "'>First Page</a></li>";
            }
    
            // loop through pages
            $.each(data.paging.pages, function(key, val){
                var active_page=val.current_page=="yes" ? "class='active'" : "";
                read_products_html+="<li " + active_page + "><a data-page='" + val.url + "'>" + val.page + "</a></li>";
            });
    
            // last page
            if(data.paging.last!=""){
                read_products_html+="<li><a data-page='" + data.paging.last + "'>Last Page</a></li>";
            }
        read_products_html+="</ul>";
    }
 
    // inject to 'page-content' of our app
    $("#page-content").html(read_products_html);
}