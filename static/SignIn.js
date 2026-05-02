"use strict";

const signUpButton = document.getElementById("signUp");
const confirmationInput = document.getElementById("confirmation");
const form = document.getElementsByTagName("form")[0];
const loginButton = document.getElementById("signIn");

signUpButton.addEventListener("click", (e)=>{
    confirmationInput.hidden=false;
    form.style.height="350px";
    signUpButton.textContent="";
    loginButton.textContent="Sign Up"
})

