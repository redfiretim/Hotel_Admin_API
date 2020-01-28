$(document).ready(function(){
    // show html form when 'create product' button was clicked
    $(document).on('click', '.page-button4', function(){
        var step_content=`
            <div class="step5_content">
                <h2>Thank you for booking at Educom Hotels!</2>
                <p>Thank you for your choosing us.</br>
                We hope you will enjoy your stay!</p>
            </div>
        `;

            // inject html to 'page-content' of our app
        $("#page-content").html(step_content);
        
        changePageCircle("5");
        changePageTitle("Confirmation");
    });
});