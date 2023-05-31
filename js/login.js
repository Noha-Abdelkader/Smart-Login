let signUpPage = document.getElementById("signUpPage");
let loginMail = document.getElementById("loginMail");
let loginPass = document.getElementById("loginPass");
let loginPassAlert = document.getElementById("loginPassAlert");
let loginMailAlert = document.getElementById("loginMailAlert");
let mailAlert = document.getElementById("mailAlert");
let passAlert = document.getElementById("passAlert");
let LoginBtn = document.getElementById("loginBtn");
let successMsg = document.getElementById('successMsg');
let userInfo;


// ========= get local storage =====================================
let userData = localStorage.getItem("userData") ? JSON.parse(localStorage.getItem("userData")): [];
console.log(userData);


// ===== events =================================
loginMail.addEventListener("keyup", mailValidation);
loginPass.addEventListener('keyup' , passValidation);
signUpPage.addEventListener("click", goToSignUp);
LoginBtn.addEventListener("click", confirmData);

// ====== move to next page =================================
function goToSignUp() {
  signUpPage.href = "signUp.html";
}

// =========== mailValidation =====================================
function mailValidation() {
  let regex = /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/;
  if (regex.test(loginMail.value)) {
    loginMailAlert.classList.replace("d-block", "d-none");
    loginMail.classList.remove("is-invalid");
    loginMail.classList.add("is-valid");
    return true;
  } else {
    loginMailAlert.classList.replace("d-none", "d-block");
    loginMail.classList.remove("is-valid");
    loginMail.classList.add("is-invalid");
    return false;
  }
}

// ===== check if mail exist ==================================
function checkMailStatus() {
  let status = false;
  userData.map((user) => {
    if (user.mail == loginMail.value) {
      status = true;
    }
  });
  console.log(status, "exist mail");
  if (status == false) {
    mailAlert.classList.replace("d-none", "d-block");
    loginMail.classList.remove("is-valid");
    loginMail.classList.add("is-invalid");
    return false;
  } else {
    mailAlert.classList.replace("d-block", "d-none");
    loginMail.classList.remove("is-invalid");
    loginMail.classList.add("is-valid");
    return true;
  }
}


//======= pass validation =========================================
function passValidation(){
let regex =  /^(?=.*\d)(?=.*[a-zA-Z])(.{5,50})$/;
if(regex.test(loginPass.value)){
    loginPassAlert.classList.replace('d-block' , 'd-none');
    loginPass.classList.remove('is-invalid');
    loginPass.classList.add('is-valid');
    return true;
}
else{
    loginPassAlert.classList.replace('d-none' , 'd-block');
    loginPass.classList.remove('is-valid');
    loginPass.classList.add('is-invalid');
    return false;
}
}

// ==== checkPassValidate =========================================

function checkPassValidate(){
let status= false;
    userData.map(user=>{
        if( user.mail == loginMail.value ){
            if( user.pass == loginPass.value){
                userInfo=user;
            status=true;
                 }       
             }
    })
    console.log(status, "exist & pass mail");

    if(status== true){
        passAlert.classList.replace('d-block' , 'd-none');
        loginPass.classList.remove('is-invalid');
        loginPass.classList.add('is-valid');
        return true;
    }
    else{
        passAlert.classList.replace('d-none' , 'd-block');
        loginPass.classList.remove('is-valid');
        loginPass.classList.add('is-invalid');
        return false;
    }
}

// ======== confirm function ===============================
function confirmData() {
  if (!checkMailStatus() ){
    successMsg.classList.replace('d-block' ,'d-none' );
    loginPass.classList.remove('is-valid');
    loginPass.classList.add('is-invalid');
    return;}
  
    if( !checkPassValidate()){
    successMsg.classList.replace('d-block' ,'d-none' );
        return;}
        localStorage.setItem('userInfo' , JSON.stringify(userInfo))
    successMsg.classList.replace('d-none' , 'd-block');
    nextPage();

}

// ==== nextPage ==================
function nextPage(){
    // localStorage.setItem('userInfo' , userInfo);
    window.location.pathname='home.html';


}