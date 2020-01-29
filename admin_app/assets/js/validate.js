function validateForm() {
    function alert(){
        bootbox.alert({
            size: "small",
            message: "<h4>You made a mistake</h4>",
            callback: function(){ /* your callback code */ }
        })
    }
    function alertphone(){
        bootbox.alert({
            size: "small",
            message: "<h4>You made a phone</h4>",
            callback: function(){ /* your callback code */ }
        })
    }
    function alertname(){
        bootbox.alert({
            size: "small",
            message: "<h4>You made a name</h4>",
            callback: function(){ /* your callback code */ }
        })
    }
    function alertemail(){
        bootbox.alert({
            size: "small",
            message: "<h4>You made a email</h4>",
            callback: function(){ /* your callback code */ }
        })
    }
    function alertrate(){
        bootbox.alert({
            size: "small",
            message: "<h4>You made a email</h4>",
            callback: function(){ /* your callback code */ }
        })
    }
    function alertnumber(){
        bootbox.alert({
            size: "small",
            message: "<h4>You made a email</h4>",
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
            return false;
        }
        if(document.validate_Adminform.last_name.value == "") {
            alert();
            return false;
        }
        if(document.validate_Adminform.email.value == "") {
            alert();         
            return false;
        }
        if(document.validate_Adminform.phonenumber.value == "") {
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
        var name_reg_ex = /^([A-Za-z]{1,30}[ \-]?[A-Za-z]{1,32}){1,32}$/;
        var number_reg_ex = /^[0-9]*$/;
        var mobile_number_reg_ex = /^[\+]{1}[1-9]{1}[0-9\-]{9,18}$|^[0-9\-]{10,20}$/;
        var email_reg_ex = /^([A-Za-z0-9]{1}[A-Za-z0-9\.\_\-]{0,63}@[A-Za-z0-9]{1,80}[\.]{1}[A-Za-z]{2,20}){0,150}$/;
        
        if(name_reg_ex.test(document.validate_Adminform.first_name.value) == false){
            alertname();
            return false;
        }
        if(name_reg_ex.test(document.validate_Adminform.last_name.value) == false){
            alertname();
            return false;
        }
        if(email_reg_ex.test(document.validate_Adminform.email.value) == false){
            alertemail();
            return false;
        }
        if(mobile_number_reg_ex.test(document.validate_Adminform.phonenumber.value) == false){
            alertphone();
            return false;
        }
        if(number_reg_ex.test(document.validate_Adminform.room_num.value) == false){
            alertnumber();
            return false;
        }
        if(number_reg_ex.test(document.validate_Adminform.price_per_night.value) == false){
            alertrate();
            return false;
        }

        else{
            return true;
        }
    }

}