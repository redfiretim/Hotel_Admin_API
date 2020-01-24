$(document).ready(function(){
    // show html form when 'create product' button was clicked
    $(document).on('click', '.page-button', function(){
        var step_content=`
            testing

            <button type='submit' class='btn btn-primary'>
                <span class='glyphicon glyphicon-chevron-right'></span> Next step
            </button>
        `;

        // inject html to 'page-content' of our app
        $("#page-content").html(step_content);

        changePageCircle("2");
        changePageTitle("Choose room");
    });
});