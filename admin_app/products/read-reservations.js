$(document).ready(function(){
 
    // show list of product on first load
    showProductsFirstPage();
 
    // when a 'read products' button was clicked
    $(document).on('click', '.read-products-button', function(){
        showProductsFirstPage();
    });
 
    // when a 'page' button was clicked
    $(document).on('click', '.pagination li', function(){
        // get json url
        var json_url=$(this).find('a').attr('data-page');
 
        // show list of products
        showProducts(json_url);
    });
});
 
function showProductsFirstPage(){
    var json_url="http://178.18.138.109/educom/hotel_code/api/index.php?action=read_reservations";
    showProducts(json_url);
}
 
// function to show list of products
function showProducts(json_url){
    // get list of products from the API
    $.getJSON(json_url, function(data){
        //console.log(data.reservations);
        //html for listing products
        readProductsTemplate(data, "");
        // chage page title
        changePageTitle("Reservations");

    });
}