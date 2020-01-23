$(document).ready(function(){
    // show html form when 'create product' button was clicked
    $(document).on('click', '.create-product-button', function(){
        // load list of categories
        $.getJSON("../MOCK_DATA.json", function(data){
            // build categories option html
            // loop through returned list of data
            var room_options_html=`<select name='room_type_id' class='form-control'>`;
                $.each(data.records, function(key, val){
                    //room_type_id is for rooms and type is for de name of the rooms 
                    room_options_html+=`<option value='` + val.room_type_id + `'>` + val.type + `</option>`;
                });
            room_options_html+=`</select>`;     

            var create_product_html = create_reservations_template(room_options_html);
        });
    });

    // will run if create Reservation form was submitted
    $(document).on('submit', '#create-product-form', function(){
        // get form data
        var form_data=JSON.stringify($(this).serializeObject());

        // submit form data to api
        $.ajax({
            url: "../api/#.php",
            type : "POST",
            contentType : 'application/json',
            data : form_data,
            action : "create_reservation",
            success : function(result) {
                // Reservation was created, go back to products list
                showProducts();
            },
            error: function(xhr, resp, text) {
                // show error to console
                console.log(xhr, resp, text);
            }
        });
        
        return false;
    });
});