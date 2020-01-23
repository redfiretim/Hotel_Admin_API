// product list html
function setStepOneContent(data, keywords){
    var read_products_html=`
                            
                            `;



    // inject to 'page-content' of our app
    $("#page-content").html(read_products_html);

    changePageTitle("Choose dates");
}