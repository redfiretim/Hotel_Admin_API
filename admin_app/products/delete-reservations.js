$(document).ready(function(){
    // will run if the delete button was clicked
    $(document).on('click', '.delete-reservation-button', function(){
        // get the product id
		var reservation_id = $(this).attr('data-id');
		//bootbox for good looking 'confirm pop up'
		bootbox.confirm({
		    message: "<h4>Are you sure?</h4>",
		    buttons: {
		        confirm: {
		            label: '<span class="glyphicon glyphicon-ok"></span> Yes',
		            className: 'btn-danger'
		        },
		        cancel: {
		            label: '<span class="glyphicon glyphicon-remove"></span> No',
		            className: 'btn-primary'
		        }
            },
		    callback: function (result) {
		        if(result==true){
				    // send delete request to api / remote server
				    $.ajax({
                        url: "http://178.18.138.109/educom/hotel_code/api/index.php?action=delete_reservation&id="+ reservation_id,
				        type : "POST",
						dataType : 'json',
						action : "delete_reservation",
				        data : JSON.stringify({ id: reservation_id }),
				        success : function(result) {
				            // re-load list of products
				             showProductsFirstPage();
						},
				        error: function(xhr, resp, text) {
				            console.log(xhr, resp, text);
				        }
				    });
				}
		    }
		});
    });
});