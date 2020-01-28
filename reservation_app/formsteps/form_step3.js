$(document).ready(function(){
    // show html form when 'create product' button was clicked
    $(document).on('click', '.page-button2', function(){
        var step_content=`   
            <form name='validate_Adminform' id='create-reservation-form' action='#' method='post' onsubmit="return validateForm();" border='0'>
                <div class="form-group">
                    <label for="firstname">First name:*</label>
                    <input type="text" name='first_name' class="form-control"  pattern="[A-Za-z]{1,32}" required placeholder="Enter first name">
                </div>
                <div class="form-group">
                    <label for="lastname">Last name:*</label>
                    <input type="text" name='last_name' class="form-control" pattern="[A-Za-z]{1,32}" required placeholder="Enter last name">
                </div>
                <div class="form-group">
                    <label for="exampleInputEmail1">Email address:*</label>
                    <input type="email" name='email' class="form-control" pattern='^(.+)@(.+)\.(.+){2,}$' required placeholder="Enter email">
                </div>
                <div class="form-group">
                    <label for="phone">Phone number:*</label>
                    <input type="number" name='phonenumber' class="form-control" pattern='^[+]?[0-9]{10,}$' required placeholder="Enter phonenumber">
                    <small id="Help" class="form-text text-muted">* are required</small>
                </div>
            </form>
            
            <button type='submit' class='btn btn-primary page-button3'>
                <span class='glyphicon glyphicon-chevron-right pull-right'></span> To summary
            </button>`;

            // inject html to 'page-content' of our app
        $("#page-content").html(step_content);
        
        changePageCircle("3");
        changePageTitle("Fill in contact details");
    });

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