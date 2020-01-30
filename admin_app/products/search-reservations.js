$(document).ready(function(){
    // when a 'search products' button was clicked
    $(document).on('submit', '#search-reservation-form', function(){
 
        // get search keywords
        var keywords = $(this).find(":input[name='keywords']").val();
 
        // get data from the api based on search keywords
        $.getJSON("http://178.18.138.109/educom/hotel_code/api/index.php?action=read_reservations?s=" + keywords, function(data){
            // template in products.js
            readProductsTemplate(data, keywords);
            // chage page title
            changePageTitle("Search reservations: " + keywords);
        });
 
        // prevent whole page reload
        return false;
    });
});