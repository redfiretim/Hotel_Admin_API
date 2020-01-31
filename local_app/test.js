// will run if 'create product' form was submitted
function getData() {
	// get form data
	let form_data = {
		check_in_date: "2020-01-1",
		check_out_date: "2020-01-30"
	};

	console.log("Clicked");

	// submit form data to api
	$.ajax({
		url:
			"http://178.18.138.109/educom/hotel_code/api/index.php?action=read_accommodation_types",
		type: "GET",
		action: "read_accommodation_types",
		contentType: "application/json",
		data: form_data,
		success: function(result) {
			console.log(result["records"]);
		},
		error: function(xhr, resp, text) {
			// show error to console
			console.log(xhr, resp, text);
		}
	});
	return false;
}
