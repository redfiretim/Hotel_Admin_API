function showUserDetailsForm(){
    // CALLBACK NEEDED
    var step_content=`   
        <form name='validate_Userform' id='create-reservation-form' action='#' method='post' border='0'>
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
                <input type="email" name='email' class="form-control" pattern='(.+)@(.+)\.(.+){2,}' required placeholder="Enter email">
            </div>
            <div class="form-group">
                <label for="phone">Phone number:*</label>
                <input type="number" name='phonenumber' class="form-control" pattern='[\+]{1}[1-9]{1}[0-9\-]{9,18}$|^[0-9]{1}[0-9\-]{9,20}' required placeholder="Enter phonenumber">
                <small id="Help" class="form-text text-muted">* are required</small>
            </div>
        </form>
        
        <button type='submit' class='btn btn-primary page-button3'>
            <span class='glyphicon glyphicon-chevron-right pull-right'></span> To summary
        </button>
        <button type="button" class="btn btn-link page-button">< One step back</button>`;

    // inject html to 'page-content' of our app
    $("#page-content").html(step_content);
    
    $(document).on('click', '.page-button3' , function(){
        return validateFormStep3();
    });

    changePageCircle("3");
    changePageTitle("Fill in contact details");
};