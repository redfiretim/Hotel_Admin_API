function validateForm() {
    function alert(){
        bootbox.alert({
            size: "small",
            message: "<h4>You made a mistake</h4>",
            callback: function(){ /* your callback code */ }
        })
    }

    // Check on pattern and empty
    if(checkNotEmpty() && checkPattern()){
        return true;
    }else{
        return false;
    }

    // Check on empty boolean
    function checkNotEmpty(){
        /*
        * EMPTY FOR ADD RESERVATION AND EDIT RESERVATION ADMIN SIDE
        */
        if(document.validate_Adminform.first_name.value == "") {
            alert();
            //alert( "Please provide your firstname!" );
            return false;
        }
        if(document.validate_Adminform.last_name.value == "") {
            alert();
            return false;
        }
        if(document.validate_Adminform.establishments_name.value == "") {
            alert();
            return false;
        }
        if(document.validate_Adminform.city_name.value == "") {
            alert();
            return false;
        }
        if(document.validate_Adminform.check_in_date.value == "") {
            alert();
            return false;
        }
        if(document.validate_Adminform.check_out_date.value == "") {
            alert();
            return false;
        }
        if(document.validate_Adminform.room_num.value == "") {
            alert();
            return false;
        }
        if(document.validate_Adminform.price_per_night.value == "") {
            alert();
            return false;
        }
        if(document.validate_Adminform.total_price.value == "") {
            alert();
            return false;
        }
        // if(document.validate_Adminform.room_options_html.value == "") {
        //     alert("Please provide a room number!");
        //     return false;
        // }
        else{
            return true;
        }
    }

    // Check patterns boolean
    function checkPattern(){
        var name_reg_ex = /^[A-Za-z]{1,32}$/;
        var date_reg_ex = /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/;
        var number_reg_ex = /^[0-9]*$/;
        
        if(name_reg_ex.test(document.validate_Adminform.first_name.value) == false){
            alert("First name is not valid");
            return false;
        }
        if(name_reg_ex.test(document.validate_Adminform.last_name.value) == false){
            alert("Last name is not valid");
            return false;
        }
        if(name_reg_ex.test(document.validate_Adminform.establishments_name.value) == false){
            alert("Hotel is not valid");
            return false;
        }
        if(name_reg_ex.test(document.validate_Adminformc.city_name.value) == false){
            alert("Hotel city is not valid");
            return false;
        }
        if(date_reg_ex.test(document.validate_Adminform.check_in_date.value) == false){
            alert("Check-in is not valid");
            return false;
        }
        if(date_reg_ex.test(document.validate_Adminform.check_out_date.value) == false){
            alert("check-out is not valid");
            return false;
        }
        if(number_reg_ex.test(document.validate_Adminform.room_num.value) == false){
            alert("Room number is not valid");
            return false;
        }
        if(number_reg_ex.test(document.validate_Adminform.price_per_night.value) == false){
            alert("Price per night is not valid");
            return false;
        }
        if(number_reg_ex.test(document.validate_Adminform.total_price.value) == false){
            alert("Total price is not valid");
            return false;
        }
        else{
            return true;
        }
    }

}