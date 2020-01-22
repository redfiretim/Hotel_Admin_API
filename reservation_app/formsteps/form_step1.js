// product list html
function readProductsTemplate(data, keywords){
    var read_products_html=`
        <!-- start table -->
        <table class='table table-bordered table-hover'>`;
 
            // loop through returned list of data
            $.each(data.records, function(key, val) {
                // creating new table row per record
                read_products_html+=`<tr>
                    <td>testing</td>
                </tr>`;
            });
        // end table
        read_products_html+=`</table>`;

    // inject to 'page-content' of our app
    $("#page-content").html(read_products_html);

    changePageTitle("testing");
}