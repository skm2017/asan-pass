"use strict";

function generatePassword() {
    let passLen = document.querySelector("#passLen").value;
    let includeCapLetter = document.querySelector("#capLetter").checked;
    let includeSmallLetter = document.querySelector("#smallLetter").checked;
    let includeNumber = document.querySelector("#nums").checked;
    let includeSpecialChar = document.querySelector("#specialChar").checked;
    let generatedPass = document.querySelector("#generatedPass");

    generatedPass.value = passwordGenerator(passLen, includeCapLetter, includeSmallLetter, includeNumber, includeSpecialChar);

}

function copyToClipboard() {
    let generatedPass = document.querySelector("#generatedPass");

    generatedPass.select();
    generatedPass.setSelectionRange(0, 99999);
    if ((generatedPass.value).length > 0) {
        navigator.clipboard.writeText(generatedPass.value);
        alert("Password Copied!");
    } else {
        alert("Please generate a password first!");
    }
}

function passwordGenerator(passLen, incCap, incSmall, incNum, incSpecial) {
    passLen = Math.abs(passLen);
    console.log("passLen: ", passLen)
    let charCount = calcCharCount(passLen, incCap, incSmall, incNum, incSpecial);
    let repeatStr = (passLen / 10) + 1;
    console.log("repeatStr: ", repeatStr)
    let capLetters = charList('A', 'Z', 1).repeat(repeatStr);
    let smallLetters = charList('a', 'z', 1).repeat(repeatStr);
    let numbers = charList('0', '9', 1).repeat(repeatStr);
    let specialChars = '!@#$%^&*_.'.repeat(repeatStr);
    let passStr = '';

    if (incCap) passStr += shuffleString(capLetters).substring(0, passLen);
    if (incSmall) passStr += shuffleString(smallLetters).substring(0, passLen);
    if (incNum) passStr += shuffleString(numbers).substring(0, passLen);
    if (incSpecial) passStr += shuffleString(specialChars).substring(0, passLen);

    console.log("passStr: ", passStr)
    return shuffleString(passStr);
}

function charList(startChar, endChar, step = 1) {
    startChar = startChar.charCodeAt(); endChar = endChar.charCodeAt();
    return [...Array(Math.floor((endChar - startChar) / step) + 1)].map((_, i) => {
        return String.fromCharCode(startChar + i * step);
    }).join("");
}

function shuffleString(str) {
    return [...str].sort(() => Math.random()-.5).join('');
}

function calcCharCount(passLen, incCap, incSmall, incNum, incSpecial) {
    let count = 0;
    if (incCap) count++;
    if (incSmall) count++;
    if (incNum) count++;
    if (incSpecial) count++;

    if (count == 0) alert("Please select your characters of choice!");
    console.log("count ", count);
    return passLen / count;
}