function validateForm() {
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
        if((document.validate_Adminform.first_name.value == "") && (document.validate_Adminform.last_name.value == "")) {
            alertname();
            return false;
        }
        if(document.validate_Adminform.email.value == "") {
            alertemail();         
            return false;
        }
        if(document.validate_Adminform.phone_num.value == "") {
            alertphone();
            return false;
        }
        if(document.validate_Adminform.from.value == "") {
            alertempty();
            return false;
        }
        if(document.validate_Adminform.to.value == "") {
            alertempty();
            return false;
        }
        // if(document.validate_Adminform.room_num.value == "") {
        //     alertnumber();
        //     return false;
        // }
        // if(document.validate_Adminform.price_per_night.value == "") {
        //     alertrate();
        //     return false;
        // }
        // if(document.validate_Adminform.total_price.value == "") {
        //     alerttotal_price();
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
        var email_reg_ex = /^([A-Za-z0-9]{1}[A-Za-z0-9._-]{0,63}@[A-Za-z0-9]{1,80}[\.]{1}[A-Za-z]{2,20}){0,150}$/;
        
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
        if(mobile_number_reg_ex.test(document.validate_Adminform.phone_num.value) == false){
            alertphone();
            return false;
        }
        // if(number_reg_ex.test(document.validate_Adminform.room_num.value) == false){
        //     alertnumber();
        //     return false;
        // }
        // if(number_reg_ex.test(document.validate_Adminform.price_per_night.value) == false){
        //     alertrate();
        //     return false;
        // }
        else{
            return true;
        }
    }

    // ALERTS
    function alertname(){
        bootbox.alert({
            size: "small",
            message: "<h4>You have made a mistake with your first of last name</h4>",
            callback: function(){ /* your callback code */ }
        })
    }
    function alertempty(){
        bootbox.alert({
            size: "small",
            message: "<h4>Something went wrong, you forgot the fill in a field</h4>",
            callback: function(){ /* your callback code */ }
        })
    }
    function alertphone(){
        bootbox.alert({
            size: "small",
            message: "<h4>You have made a mistake with your telephone number</h4>",
            callback: function(){ /* your callback code */ }
        })
    }
    function alertemail(){
        bootbox.alert({
            size: "small",
            message: "<h4>You have made a mistake with your email address</h4>",
            callback: function(){ /* your callback code */ }
        })
    }
    function alertrate(){
        bootbox.alert({
            size: "small",
            message: "<h4>You have made a mistake with the room rate</h4>",
            callback: function(){ /* your callback code */ }
        })
    }
    function alertnumber(){
        bootbox.alert({
            size: "small",
            message: "<h4>You have made a mistake with the room number</h4>",
            callback: function(){ /* your callback code */ }
        })
    }
    function alerttotal_price(){
        bootbox.alert({
            size: "small",
            message: "<h4>You have made a mistake with the total price</h4>",
            callback: function(){ /* your callback code */ }
        })
    }

}