// console.log(localStorage.userInfo);
(function displayInfo(){
let header = document.querySelector('#home h4');

header.innerText += `${JSON.parse(localStorage.userInfo).name}`; 
})();

let logOutBtn = document.getElementById('logOutBtn');

logOutBtn.addEventListener('click' ,()=> {
    window.location.pathname='signUp.html';

})