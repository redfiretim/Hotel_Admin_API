function validateFormStep1() {
    function alert(){
        bootbox.alert({
            size: "small",
            message: "<h4>You made a mistake</h4>",
            callback: function(){ /* your callback code */ }
        })
    }

    // Check on pattern and empty
    if(checkNotEmptyStep1() && checkPatternStep1()){
        // If is not empty and checked than go to form_step4
        showAvailableRoom();
        return true;
    }else{
        return false;
    }

    function checkNotEmptyStep1(){
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
    }

    function checkPatternStep1(){
        var number_reg_ex = /^[0-9]*$/;
        var date_reg_ex =  /^([0-9]{4}[\-]{1}[0-9]{2}[\-]{1}[0-9]{2})$/;

        if(date_reg_ex.test(document.validate_Userform.check_in_date.value) == false){
            alert();
            return false;
        }
        if(date_reg_ex.test(document.validate_Userform.check_out_date.value) == false){
            alert();
            return false;
        }
        if(number_reg_ex.test(document.validate_Userform.numberNights.value) == false){
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
    };

    // Check on empty boolean
    function checkNotEmptyStep1(){
        /*
        * EMPTY FOR ADD RESERVATION AND EDIT RESERVATION ADMIN SIDE
        */
        if(document.validate_Userform.check_in_date.value == "") {
            alert();
            return false;
        }
        if(document.validate_Userform.check_out_date.value == "") {
            alert();
            return false;
        }
        if(document.validate_Userform.numberNights.value == "") {
            alert();         
            return false;
        }
        if(document.validate_Userform.numberGuests.value == "") {
            alert();
            return false;
        }
        if(document.validate_Userform.numberRooms.value == "") {
            alert();
            return false;
        }
        else{
            return true;
        }
    }
};

