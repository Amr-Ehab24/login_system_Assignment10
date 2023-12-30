var signIn = document.getElementById("form-signIn");//sign in form page
var signUp=document.getElementById("form-signUp"); ///sign up form page
var login=document.getElementById("loginSignIn"); //login in sign in page
var signUpbtn=document.getElementById("SignUpIn");// sign up in sign in page 
var signUpspare=document.getElementById("signUpspare"); //sign up in sign up page
var loginSignUp=document.getElementById("loginSignUp");//sign in sign up page 
var nameSignIn=document.getElementById("nameSignIn");
var passwordSignIn =document.getElementById("passwordSignIn");
var nameSignUp =document.getElementById("nameSignUp");
var emailSignUp =document.getElementById("emailSignUp");
var passwordSignUp =document.getElementById("passwordSignUp");
var welcomePage=document.getElementById("welcomePage");
var basicBack=document.getElementById("basicBack");
var secondBack=document.getElementById("secondBack");
var logOut =document.getElementById("logOut");

var signUpUSer = {}; // Initialize an empty object
//==========================================================================================
signUpbtn.addEventListener("click",function(){
    signIn.classList.add('d-none');
    signUp.classList.remove("d-none");
})
//==========================================================================================
loginSignUp.addEventListener("click",function () {
    signIn.classList.remove('d-none');
    signUp.classList.add("d-none");
    
})
//===========================================================================================
var signUpArr = []
if (localStorage.getItem('users') == null) {
    signUpArr = []
} else {
    signUpArr = JSON.parse(localStorage.getItem('users'))
}

//===========================================================================================

//for check inputs is empty or not
function isEmpty() {

    if (nameSignUp.value == "" || emailSignUp.value == "" || passwordSignUp.value == "") {
        return false
    } else {
        return true
    }
}





// for check email is exist
function isEmailExist() {
    for (var i = 0; i < signUpArr.length; i++) {
        if (signUpArr[i].email.toLowerCase() == emailSignUp.value.toLowerCase()) {
            return false
        }
    }
}
function clearSignUp(){
    nameSignUp.value="";
    emailSignUp.value="";
     passwordSignUp.value="";
}


signUpspare.addEventListener("click", function () {
    
    if (isEmpty() == false) {
        document.getElementById('exist').innerHTML = '<span class="text-danger m-3">All inputs is required</span>'
        return false
    }
    signUpUSer = {
        name: nameSignUp.value,
        email: emailSignUp.value,
        password: passwordSignUp.value,
    };
    if (signUpArr.length == 0) {
        signUpArr.push(signUpUSer)
        localStorage.setItem('users', JSON.stringify(signUpArr))
        document.getElementById('exist').innerHTML = '<span class="text-success m-3">Success</span>'
        clearSignUp();
        return true
        
    }
    if (isEmailExist() == false) {
        document.getElementById('exist').innerHTML = '<span class="text-danger m-3">email already exists</span>'
        

    } else {
        signUpArr.push(signUpUSer)
        localStorage.setItem('users', JSON.stringify(signUpArr))
        document.getElementById('exist').innerHTML = '<span class="text-success m-3">Success</span>'
        clearSignUp();

    }


});
//====================================================================================================================
function isLoginEmpty() {

    if (passwordSignIn.value == "" || nameSignIn.value == "") {
        return false
    } else {
        return true
    }
}
loginSignIn.addEventListener('click',function(){
    if (isLoginEmpty() == false) {
        document.getElementById('error').innerHTML = '<span class="text-danger m-3">All inputs is required</span>'
        return false
    }
    var password = passwordSignIn.value
    var email = nameSignIn.value
    var isLoggedIn = false;
    for (var i = 0; i < signUpArr.length; i++) {
        if (signUpArr[i].email.toLowerCase() == email.toLowerCase() && signUpArr[i].password.toLowerCase() == password.toLowerCase()) {
            localStorage.setItem('sessionUsername', signUpArr[i].name)
            welcomePage.innerHTML=`<p>Welcome,${signUpArr[i].name}<p>`
            secondBack.classList.remove("d-none");
            basicBack.classList.add("d-none");
            isLoggedIn = true;
            clearSignIn();
            break;
            

            
        }} if(!isLoggedIn) {
            document.getElementById('error').innerHTML = '<span class="p-2 text-danger">incorrect email or password</span>'
            clearSignIn();
        }
    }




);
//===================================================================================================================
logOut.addEventListener("click",function(){
    secondBack.classList.add('d-none');
    basicBack.classList.remove("d-none");
})
//===================================================================================================================
function clearSignIn(){
    nameSignIn.value = "";
    passwordSignIn.value = "";
}
//===================================================================================================================