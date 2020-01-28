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
        var name_reg_ex = /^[A-Za-z]{1,32}$/;
        var email_reg_ex = /^(.+)@(.+)\.(.+){2,}$/;
        var number_reg_ex = /^[0-9]*$/;
        
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
        if(number_reg_ex.test(document.validate_Userform.phonenumber.value) == false){
            alert();
            return false;
        }
        else{
            return true;
        }
    }
}