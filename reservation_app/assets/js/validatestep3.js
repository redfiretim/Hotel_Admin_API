function validateFormStep3() {
    function alertfirstname(){
        bootbox.alert({
            size: "small",
            message: "<h4>You made a mistake with your firstname</h4>",
            callback: function(){ /* your callback code */ }
        })
    }
    function alertlastname(){
        bootbox.alert({
            size: "small",
            message: "<h4>You made a mistake with your lastname</h4>",
            callback: function(){ /* your callback code */ }
        })
    }
    function alertemail(){
        bootbox.alert({
            size: "small",
            message: "<h4>You made a mistake with your email</h4>",
            callback: function(){ /* your callback code */ }
        })
    }
    function alertphone(){
        bootbox.alert({
            size: "small",
            message: "<h4>You made a mistake with your phonenumber</h4>",
            callback: function(){ /* your callback code */ }
        })
    }
    function alert(){
        bootbox.alert({
            size: "small",
            message: "<h4>Regex klopt niet</h4>",
            callback: function(){ /* your callback code */ }
        })
    }


    if(checkNotEmpty() && checkPattern()){
        // If is not empty and checked than go to form_step4
        saveForm();
        return true;
    }else{
        return false;
    }

    // Check on empty boolean
    function checkNotEmpty(){
        /*
        * EMPTY FOR ADD RESERVATION AND EDIT RESERVATION ADMIN SIDE
        */
        if(document.validate_Userform.first_name.value == "") {
            alertfirstname();
            return false;
        }
        if(document.validate_Userform.last_name.value == "") {
            alertlastname();
            return false;
        }
        if(document.validate_Userform.email.value == "") {
            alertemail();         
            return false;
        }
        if(document.validate_Userform.phonenumber.value == "") {
            alertphone();
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
        var mobile_number_reg_ex =  /^[\+]{1}[1-9]{1}[0-9\-]{9,18}$|^[0-9]{1}[0-9\-]{9,20}$/;

        if(name_reg_ex.test(document.validate_Userform.first_name.value) == false){
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