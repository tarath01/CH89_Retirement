/*******************************
Name: Taylor Rath
Program: Retirement Countdown
Date: 03/24/2026
Program Description:

*******************************/


"use strict";

// Defer in HTML allows us to grab these immediately at the top
const getElement = selector => document.querySelector(selector);

const nameIn    = getElement("#client_name");
const emailIn   = getElement("#email");
const investIn  = getElement("#investment");
const addIn     = getElement("#monthly_add");
const rateIn    = getElement("#rate");
const dateIn    = getElement("#retirement_date");
const errBox    = getElement("#error_message");
const statusMsg = getElement("#status_message");
const output    = getElement("#projection_output");
const form      = getElement("#projection_form");
const testData  = getElement("#test_data");

let projectionTimer = null;

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
});

//error message fields
const nameErr = document.querySelector("#name_error");
const emailErr = document.querySelector("#email_error");
const investmentErr = document.querySelector("#investment_error");
const rateErr = document.querySelector("#rate_error");
const addErr = document.querySelector("#add_error");
const retireErr = document.querySelector("#retire_date_error");


const processEntries = (evt) => {
    let isValid = true;
    let years = 0;

    //prevent form from being submitted to server
    evt.preventDefault();
    resetForm()

    const name = nameIn.value.trim();
    const email = emailIn.value.trim();
    const investment = parseInt(investIn.value);
    const add = parseFloat(addIn.value);
    const rate = parseFloat(rateIn.value);

    // TODO: Validate Name
if (name === "") {
    nameErr.textContent = "Please enter your full name";
    isValid = false;
}
    // TODO: Validate Email - const emailPattern = /^[\w\.\-]+@[\w\.\-]+\.[a-zA-Z]+$/;
const emailPattern = /^[\w\.\-]+@[\w\.\-]+\.[a-zA-Z]+$/;
if (!emailPattern.test(email)) {
    emailErr.textContent = "Enter your valid college email address.";
    isValid = false;
}
    // TODO: Validate Date
if (years <=0) {
    retireErr.textContent = "Greater than 0 & less than 75 years";
    isValid = false;
}
    // TODO: Numeric Validations
if (isNaN(rate) || rate < 0) {
    rateErr.textContent = "Annual interest rate, not less than 0 or greater than 20";
    isValid = false;
}
if (isNaN(add) || add <= 0) {
    addErr.textContent = "How much you add each month, not less than 0.";
    isValid = false;
}
    if (isNaN(investment) || investment < 0) {
        investmentErr.textContent = "Current Savings total, not less than 0";
        isValid = false;
}
    /* TODO: Code try-catch logic
        try
            if not valid then throw error "Please correct the entries highlighted below."
            document.body.style.width = "350px";
            startProjection(nameIn.value, invest, add, rate, years);
         catch(e)
            set the body width to 700px (like code above)
            errBox.innerText = e.message;
     */
    try {
        if (!isValid) {
            new Error("Please correct the entries highlighted below.");
        }
        document.body.style.width = "350px";
        startProjection(nameIn.value, investIn.value, addIn.value, rateIn.value, years);
    } catch (e) {
        document.body.style.width = "700px";
        errBox.textContent = e.message;
    }
};

const startProjection = (name, bal, add, rate, years) => {
    statusMsg.textContent = `Live Projection: ${name}`;
    statusMsg.style.color = "red";
    let count = 1;

    // TO-DO: startYear = the current year
    const startYear = new Date().getFullYear();

    let formattedBal = formatter.format(bal);
    output.innerHTML = `Year ${startYear} = ${formattedBal}`;

    for (let i = 0; i < 12; i++) {
        bal = (bal + add) * (1 + (rate / 12 / 100)).toFixed(2);
    }

    output.innerHTML += `${formattedBal}`;
    if (count >= years) {

    }

    /* TODO: setup an interval to do the following
        for (let i = 0; i < 12; i++) {
            bal = ((bal + add) * (1 + (rate / 12 / 100))).toFixed(2);
        }
        format the balance like the starting code above
        update the output like the starting code above
        if count is >= years
            clear interval
            update the statusMsg like the starting code above
            set the statusMsg color to green like the starting code above
        end if
        add one to the count
     */
};

const setTestData = () => {
    resetForm();
    // TODO: set default values for all input fields
};

const resetForm = () => {
    /* TODO:
        clear all input fields
        clear the interval
        document.querySelectorAll(".error").forEach(s => s.textContent = "*");
        set the body width to 350px (like code above)
        set the focus to the name input field
     */
}

document.addEventListener("DOMContentLoaded", () => {
    form.addEventListener("submit", processEntries);
    form.addEventListener("reset", resetForm);
    testData.addEventListener("click", setTestData);
});