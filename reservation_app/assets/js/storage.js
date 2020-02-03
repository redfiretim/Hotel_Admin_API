function saveForm() {
    
    //nothing to work with, get out of here
    if(typeof window.sessionStorage === "undefined"){
        return;
    }
    setValues("input");
    setValuesInHtml();
    return true;
}
function saveFormStep2() {
    //nothing to work with, get out of here
    if(typeof window.sessionStorage === "undefined"){
        return;
    }
    setValues("input");
    return true;
}


function loadForm() {
    //nothing to work with, get out of here
    if(typeof window.sessionStorage === "undefined"){
        return;
    }
    getValues("input");
}

function setValues(tag){
    var inputs = document.getElementsByTagName(tag);
    for(var i = 0; i < inputs.length; i++){
        window.sessionStorage.setItem(inputs[i].name, inputs[i].value);
    }
}

function getValues(tag){
    var inputs = document.getElementsByTagName(tag);
    for(var i = 0; i < inputs.length; i++){
        inputs[i].value = window.sessionStorage.getItem(inputs[i].name);
    }
}
 
// function setValuesInHtml(tag){
//     // var inputs=document.getElementsByTagName(tag);
//     // for(var i=0;i<inputs.length;i++){
//     //     inputs[i].value = window.sessionStorage.getItem(inputs[i].name);
//     // }
//     document.getElementById("demo").innerHTML = "testing input";
// }
  




// function createItem() {
//     window.sessionStorage.mytime = Date.now();
// }

// function myFunction() {
//     var x = window.sessionStorage.getItem("mytime");
//     document.getElementById("demo").innerHTML = x;
// }