$(document).ready(function(){
    // show html form when 'create product' button was clicked
    $(document).on('click', '.page-button2', function(){
        var step_content=`   
            testing step 3

            <button class='btn btn-primary page-button2'>
                <span class='glyphicon glyphicon-chevron-right pull-right'></span> To summary
            </button>
        `;

            // inject html to 'page-content' of our app
        $("#page-content").html(step_content);
        
        changePageCircle("3");
        changePageTitle("Fill in contact details");
    });
});