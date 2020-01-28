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
        if(document.validate_Adminform.first_name.value == "") {
            alert( "Please provide your firstname!" );
            return false;
        }
        if(document.validate_Adminform.last_name.value == "") {
            alert( "Please provide your lastname!" );
            return false;
        }
        if(document.validate_Adminform.email.value == "") {
            alert( "Please provide your email!" );
            return false;
        }
        if(document.validate_Adminform.phonenumber.value == "") {
            alert("Please provide your phonenumber!");
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
        
        if(name_reg_ex.test(document.validate_Adminform.first_name.value) == false){
            alert("First name is not valid");
            return false;
        }
        if(name_reg_ex.test(document.validate_Adminform.last_name.value) == false){
            alert("Last name is not valid");
            return false;
        }
        if(email_reg_ex.test(document.validate_Adminform.email.value) == false){
            alert("Email is not valid");
            return false;
        }
        if(number_reg_ex.test(document.validate_Adminform.phonenumber.value) == false){
            alert("Phonenumber is not valid");
            return false;
        }
        else{
            return true;
        }
    }
}