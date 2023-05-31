let signUpName = document.getElementById("signUpName");
let signUpMail = document.getElementById("signUpMail");
let signUpPass = document.getElementById("signUpPass");
let submitBtn = document.getElementById("submitBtn");
let loginPage = document.getElementById("loginPage");
let userData = localStorage.getItem("userData")? JSON.parse(localStorage.getItem("userData")) : [];

console.log(userData);

// ==== events ================================
signUpName.addEventListener("keyup", checkNameValidation);
signUpMail.addEventListener("keyup", checkMailValidation);
signUpPass.addEventListener("keyup", checkPassValidation);
submitBtn.addEventListener("click", add);
loginPage.addEventListener("click", loginPageFunc);

// ======== validation =====================================

// ========== name validation ===============
function nameValidation() {
  let regex = /^[A-Z][A-Za-z\s]{2,22}$/;
  if (regex.test(signUpName.value)) {
    return true;
  } else {
    return false;
  }
}

// ====== mail validation =========

function mailValidation() {
  let regex = /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/;
  if (regex.test(signUpMail.value)) {
    return true;
  } else {
    return false;
  }
}

// ===== pass validation ===============

function passValidation() {
  let regex = /^(?=.*\d)(?=.*[a-zA-Z])(.{5,50})$/;
  if (regex.test(signUpPass.value)) {
    return true;
  } else {
    return false;
  }
}

// ======= checkNameValidation =============
function checkNameValidation() {
  let signUpNameAlert = document.getElementById("signUpNameAlert");
  if (nameValidation()) {
    signUpNameAlert.classList.replace("d-block", "d-none");
    signUpName.classList.remove("is-invalid");
    signUpName.classList.add("is-valid");
    submitBtn.removeAttribute("disabled");
    return true;
  } else {
    signUpNameAlert.classList.replace("d-none", "d-block");
    signUpName.classList.add("is-invalid");
    signUpName.classList.remove("is-valid");
    submitBtn.disabled = "true";
    return false;
  }
}

// ====== checkMailValidation ==============
function checkMailValidation() {
  let signUpMailAlert = document.getElementById("signUpMailAlert");

  if (mailValidation()) {
    signUpMailAlert.classList.replace("d-block", "d-none");
    signUpMail.classList.remove("is-invalid");
    signUpMail.classList.add("is-valid");
    submitBtn.removeAttribute("disabled");
    return true;
  } else {
    signUpMailAlert.classList.replace("d-none", "d-block");
    signUpMail.classList.add("is-invalid");
    signUpMail.classList.remove("is-valid");
    submitBtn.disabled = "true";
    return false;
  }
}

// ======checkPassValidation ==========
function checkPassValidation() {
  let signUpPassAlert = document.getElementById("signUpPassAlert");
  if (passValidation()) {
    signUpPassAlert.classList.replace("d-block", "d-none");
    signUpPass.classList.remove("is-invalid");
    signUpPass.classList.add("is-valid");
    submitBtn.removeAttribute("disabled");
    return true;
  } else {
    signUpPassAlert.classList.replace("d-none", "d-block");
    signUpPass.classList.remove("is-valid");
    signUpPass.classList.add("is-invalid");
    submitBtn.disabled = "true";
    return false;
  }
}
// =========== validateAll =========================================
function validateAll() {
  if (checkNameValidation() && checkMailValidation() && checkPassValidation()) {
    return true;
  } else {
    return false;
  }
}
//   ======== checkAllInputs ============================================
function checkIfEmpty() {
  let allRequiredAlert = document.getElementById("allRequiredAlert");
  if ((signUpName.value == "" && signUpMail.value == "" && signUpPass.value == "") ||
    signUpName.value == "" ||
    signUpMail.value == "" ||
    signUpPass.value == "" 
  ) {
    allRequiredAlert.classList.replace("d-none", "d-block");
    return true;
  } else {
    allRequiredAlert.classList.replace("d-block", "d-none");
    return false;
  }
}

// ========= exist mail ================================
function existMail() {
  let existMailMsg = document.getElementById("existMailMsg");
  let exist = false;

  // for (let i = 0; i < userData.length; i++) {
  //   if (userData[i].mail == signUpMail.value) {
  //   // console.log(userData[i].mail,signUpMail.value,"exist from exist mail func");
  //     exist = true;
  //     // break;
  //   }
  // }
  userData.find(user=>{
  if(user.mail === signUpMail.value){
exist=true;
  }  
  })

  if (exist == true) {
    console.log(signUpMail.value,"exist from exist mail func");

    existMailMsg.classList.replace("d-none", "d-block");
    signUpMail.classList.remove("is-valid");
    signUpMail.classList.add("is-invalid");
    return true;
  } else {
    console.log(signUpMail.value,"not exist mail from exist mail fun");
    existMailMsg.classList.replace("d-block", "d-none");
    signUpMail.classList.remove("is-invalid");
    signUpMail.classList.add("is-valid");
    return false;
  }
}
// ===== clear data ================================================
function clearData(){
  signUpName.value='';
   signUpMail.value='';
   signUpPass.value='';

};

//   ======= add =========================================
let successMsg = document.getElementById("successMsg");

function add() {  

 if(checkIfEmpty())return;
 if(!validateAll()) return;
 
  if ( !existMail()) {
    let data = {
      name: signUpName.value,
      mail: signUpMail.value,
      pass: signUpPass.value,
    };

    userData.push(data);
    localStorage.setItem("userData", JSON.stringify(userData));
    successMsg.classList.replace("d-none", "d-block");
    signUpName.classList.remove("is-valid");
    signUpMail.classList.remove("is-valid");
    signUpPass.classList.remove("is-valid");

    console.log(userData, "userdata from add func");
    clearData();
    successMsg.classList.replace("d-block", "d-none");
  }
  else{
        successMsg.classList.replace("d-block", "d-none");
    console.log("canot add" ,userData, "userdata from add func");
  }
}

//   ======= nextHtmlPage ===========================================
function loginPageFunc() {
  
  loginPage.setAttribute("href", "index.html");
  // window.location.pathname='index.html';
}

// -----------------------------
AOS.init();
