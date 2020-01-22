$(document).ready(function(){
    // when a 'search products' button was clicked
    $(document).on('submit', '#search-product-form', function(){
 
        // get search keywords
        var keywords = $(this).find(":input[name='keywords']").val();
 
        // get data from the api based on search keywords
        $.getJSON("../api/#.php?s=" + keywords, function(data){
            // template in products.js
            readProductsTemplate(data, keywords);
            // chage page title
            changePageTitle("Search reservations: " + keywords);
        });
 
        // prevent whole page reload
        return false;
    });
});