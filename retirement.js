/*******************************
 Name: Taylor Rath
 Program: Retirement Countdown
 Date: 03/24/2026
 Program Description:
 This program collects your information to calculate a countdown for your retirement.<br>
 Providing your Name, Email, Current Savings, Monthly Contribution, Estimated Rate Percentage, and lastly
 your Retirement Date.<br>Using this information that you've provided, you will then be able to
 calculate when you will be able to retire.
 Use this program as a fun way to determine
 when you'll be able to end working and let the fun in life begin!
 GitHub: https://github.com/tarath01/CH89_Retirement
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

const processEntries = (evt) => {
    let isValid = true;
    let years = 0;

    //prevent form from being submitted to server
    evt.preventDefault();
    resetForm()

    //name validation
    if (nameIn.value.trim() === "") {
        $("#name_error").textContent = nameIn.title;
        isValid = false;
    }
    //email validation
    const emailPattern = /^[\w\.\-]+@[\w\.\-]+\.[a-zA-Z]+$/;
    if (!emailPattern.test(emailIn.value.trim())) {
        $("#email_error").textContent = emailIn.title;
        isValid = false;
    }
    //date validation
    if (new Date(dateIn.value).toString() === "Invalid Date" || years < 0 || years > 75) {
        $("#retire_date_error").textContent = dateIn.title;
        isValid = false;
        years = new Date(dateIn.value).getFullYear() - new Date().getFullYear();
    }

    //investment validation
    if (investIn.value === "" || isNaN(investIn.value) || investIn.value < 0) {
        $("#investment_error").textContent = investIn.title;
        isValid = false;
    }

    //rate validation
    if (rateIn.value === "" || isNaN(rateIn.value) || rateIn.value < 0) {
        $("#rate_error").textContent = rateIn.title;
        isValid = false;
    }

    //monthly add validation
    if (addIn.value === "" || isNaN(addIn.value) || addIn.value < 0) {
        $("#add_error").textContent = addIn.title;
        isValid = false;
    }

    //try catch logic
    try {
        if (!isValid) {
            throw new Error("Please correct the entries highlighted below.");
        }
        document.body.style.width = "350px";
        startProjection(nameIn.value,
            Number(investIn.value),
            Number(addIn.value),
            Number(rateIn.value),years);
    } catch (e) {
        document.body.style.width = "700px";
        errBox.textContent = e.message;
    }
};

const startProjection = (name, bal, add, rate, years) => {
    statusMsg.textContent = `Live Projection: ${name}`;
    statusMsg.style.color = "black";
    let count = 1;

    //start year = current date
    const startYear = new Date().getFullYear();

    // format balance & year output
    let formattedBal = formatter.format(bal);
    output.textContent = `Year ${startYear} = ${formattedBal}`;

    projectionTimer = setInterval(() => {
        //for balance
        for (let i = 0; i < 12; i++) {
            bal = ((bal + add) * (1 + (rate / 12 / 100))).toFixed(2);
        }
        //format balance
        let formattedBal = formatter.format(bal);
        output.textContent = `Year ${startYear + count} = ${formattedBal}`;

        //if count years
        if (count >= years) {
            clearInterval(projectionTimer);
            statusMsg.textContent = "Calculation Completed!";
            statusMsg.style.color = "black";
        }
        //add count
        count++;

    }, 1000);
};

const setTestData = () => {
    resetForm();
    //default data
    nameIn.value = "Taylor Rath";
    emailIn.value = "tarath01@wsc.edu";
    investIn.value = 100_000.00;
    addIn.value = 500.00;
    rateIn.value = 5.5;

    //calculate retirement date
    const retireDate = new Date();
    retireDate.setFullYear(retireDate.getFullYear() + 10);
    dateIn.value = retireDate.toISOString().split('T')[0];

};

const resetForm = () => {
    errBox.textContent = "";
    output.textContent = "";
    statusMsg.textContent = "";

    document.querySelectorAll(".error").forEach(s => s.textContent = "*");
    document.body.style.width = "350px";
    statusMsg.style.color = "red";
    //reset focus
    nameIn.focus();
    //clear interval within reset
    clearInterval(projectionTimer);
};

document.addEventListener("DOMContentLoaded", () => {
    form.addEventListener("submit", processEntries);
    form.addEventListener("reset", resetForm);
    testData.addEventListener("click", setTestData);
});