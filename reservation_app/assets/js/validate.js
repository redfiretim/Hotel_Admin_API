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
        if(document.validate_Userform.from_picker == ""){
            alert();
            return false;
        }
        if(document.validate_Userform.numberNights == ""){
            alert();
            return false;
        }
        if(document.validate_Userform.to_picker == ""){
            alert();
            return false;
        }
        if(document.validate_Userform.numberGuests == ""){
            alert();
            return false;
        }
        if(document.validate_Userform.numberRooms == ""){
            alert();
            return false;
        }
        if(document.validate_Userform.first_name.value == "") {
            alert();
            return false;
        }
        if(document.validate_Userform.last_name.value == "") {
            alert();
            return false;
        }
        if(document.validate_Userform.email.value == "") {
            alert();         
            return false;
        }
        if(document.validate_Userform.phonenumber.value == "") {
            alert();
            return false;
        }
        else{
            return true;
        }
    }

    // Check patterns boolean
    function checkPattern(){
        var name_reg_ex = /^([A-Za-z]{1,30}[ \-]?[A-Za-z]{1,32}){1,32}$/;
        var email_reg_ex = /^([A-Za-z0-9]{1}[A-Za-z0-9\.\_\-]{0,63}@[A-Za-z0-9]{1,80}[\.]{1}[A-Za-z]{2,20}){0,150}$/;
        var number_reg_ex = /^[0-9]*$/;
        var mobile_number_reg_ex =  /^[\+]{1}[1-9]{1}[0-9\-]{9,18}$|^[0-9]{1}[0-9\-]{9,20}$/;

        if(number_reg_ex.test(document.validate_Userform.numberNights.value) == false){
            alert();
            return false;
        }
        if(date_reg_ex.test(document.validate_Userform.first_name.value) == false){
            alert();
            return false;
        }
        if(number_reg_ex.test(document.validate_Userform.numberGuests.value) == false){
            alert();
            return false;
        }
        if(number_reg_ex.test(document.validate_Userform.numberRooms.value) == false){
            alert();
            return false;
        }
        if(name_reg_ex.test(document.validate_Userform.last_name.value) == false){
            alert();
            return false;
        }
        if(email_reg_ex.test(document.validate_Userform.email.value) == false){
            alert();
            return false;
        }
        if(mobile_number_reg_ex.test(document.validate_Userform.phonenumber.value) == false){
            alert();
            return false;
        }
        else{
            return true;
        }
    }
}