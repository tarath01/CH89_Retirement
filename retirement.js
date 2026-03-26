/*******************************
 Name: Taylor Rath
 Program: Retirement Countdown
 Date: 03/24/2026
 Program Description:

 *******************************/


"use strict";

// Defer in HTML allows us to grab these immediately at the top
const $ = selector => document.querySelector(selector);

const nameIn = $("#client_name");
const emailIn = $("#email");
const investIn = $("#investment");
const addIn = $("#monthly_add");
const rateIn = $("#rate");
const dateIn = $("#retirement_date");
const errBox = $("#error_message");
const statusMsg = $("#status_message");
const output = $("#projection_output");
const form = $("#projection_form");
const testData = $("#test_data");

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

    // TODO: Validate Name
    if (nameIn.value.trim() === "") {
        $("#name_error").textContent = nameIn.title;
        isValid = false;
    }
    // TODO: Validate Email - const emailPattern = /^[\w\.\-]+@[\w\.\-]+\.[a-zA-Z]+$/;
    const emailPattern = /^[\w\.\-]+@[\w\.\-]+\.[a-zA-Z]+$/;
    if (!emailPattern.test(emailIn.value.trim())) {
        $("#email_error").textContent = emailIn.title;
        isValid = false;
    }
    // TODO: Validate Date
    if(isNaN(dateIn) || dateIn < 0) {
        $("#retire_date_error").textContent = dateIn.title;
        isValid = false;
    } else {
    }
    /* if date is empty
     display error similar to name logic
 else
     years = user's year - the current year
     if years is less or equal to 0 || greater than 75
     display error similar to name logic
     */

    if (isNaN(investIn) || investIn < 0) {
        $("#investment_error").textContent = investIn.title;
        isValid = false;
    }
// TODO: Numeric Validations
    /*TODO: do the same for the other two numeric input values
    based on the input field's title data validation message
    */

    if (isNaN(rateIn) || rateIn < 0) {
        $("#rate_error").textContent = rateIn.title;
        isValid = false;
    }
    if (isNaN(addIn) || addIn <= 0) {
        $("#add_error").textContent = addIn.title;
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
            Error("Please correct the entries highlighted below.");
        }
        document.body.style.width = "350px";
        startProjection(nameIn.value, investIn, addIn, rateIn, years);
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

    projectionTimer = setInterval(() => {

        for (let i = 0; i < 12; i++) {
            bal = (bal + add) * (1 + (rate / 12 / 100)).toFixed(2);
        }

        output.innerHTML += `${formattedBal}`;
        if (count >= years) {
            output.textContent = "";
            statusMsg.textContent = `Calculation Completed!`;
            statusMsg.style.color = "green";
            let count = 1;
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

    });

    const setTestData = () => {
        resetForm();
        nameIn.value = "Taylor Rath";
        emailIn.value = "tarath01@wsc.edu";
        investIn.value = 100_000.00;
        addIn.value = 500.00;
        rateIn.value = 5.5;

        const retireDate = new Date();
       retireDate. setFullYear(retireDate.getFullYear() + 10);
        dateIn.value = retireDate.toISOString().split('T')[0];

        // TODO: set default values for all input fields
        /* TODO: set default value for all input fields
Setup the future date to 10 years from now:
(1) create a const variable named future and set it to the current date (Ch
8)
(2) add 10 years to the future date variable (Ch 8)
(3) use toISOString().split('T')[0] to display the future date (Ch 8)
*/
    };

    const resetForm = () => {
        errBox.textContent = "";
        output.textContent = "";
        statusMsg.textContent = "";

        document.querySelectorAll(".error").forEach(s => s.textContent = "*");
        document.body.style.width = "350px";
        statusMsg.style.color = "red";
        nameIn.focus();
        /* TODO:
            clear all input fields
            clear the interval
            document.querySelectorAll(".error").forEach(s => s.textContent = "*");
            set the body width to 350px (like code above)
            set the focus to the name input field
         */
    };

    document.addEventListener("DOMContentLoaded", () => {
        form.addEventListener("submit", processEntries);
        form.addEventListener("reset", resetForm);
        testData.addEventListener("click", setTestData);
    });