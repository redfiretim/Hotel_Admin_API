$(document).ready(function(){
    // show html form when 'create product' button was clicked
    $(document).on('click', '.page-button', function(){
        var read_one_product_html=`
            testing
        `;

        // inject html to 'page-content' of our app
        $("#page-content").html(read_one_product_html);

        changePageCircle("2");
        changePageTitle("Choose room");
        changePageButton("Next step");
    });
});