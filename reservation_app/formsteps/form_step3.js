$(document).ready(function(){
    // show html form when 'create product' button was clicked
    $(document).on('click', '.page-button2', function(){
        var step_content=`   
            <form method="POST">
                <div class="form-group">
                    <label for="firstname">First name:*</label>
                    <input type="text" class="form-control" id="firstname" aria-describedby="firstname" placeholder="Enter first name">
                </div>
                <div class="form-group">
                    <label for="lastname">Last name:*</label>
                    <input type="text" class="form-control" id="lastname" aria-describedby="lastname" placeholder="Enter last name">
                </div>
                <div class="form-group">
                    <label for="exampleInputEmail1">Email address:*</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
                </div>
                <div class="form-group">
                    <label for="phone">Phone number:*</label>
                    <input type="email" class="form-control" id="phone" aria-describedby="phone" placeholder="Enter phonenumber">
                    <small id="Help" class="form-text text-muted">* are required</small>
                </div>
            </form>

            <button class='btn btn-primary page-button3'>
                <span class='glyphicon glyphicon-chevron-right pull-right'></span> To summary
            </button>
        `;

            // inject html to 'page-content' of our app
        $("#page-content").html(step_content);
        
        changePageCircle("3");
        changePageTitle("Fill in contact details");
    });
});