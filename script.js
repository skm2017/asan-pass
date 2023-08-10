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
    let capLetters = charList('A', 'Z', 1);
    let smallLetters = charList('a', 'z', 1);
    let numbers = charList('0', '9', 1);
    let specialChars = '!@#$%^&*_.'; 
    let passStr = '';

    for (let i = 0; i < passLen; i++) {
        let charSet = '';
        if (incCap) charSet += capLetters;
        if (incSmall) charSet += smallLetters;
        if (incNum) charSet += numbers;
        if (incSpecial) charSet += specialChars;

        if (charSet.length > 0) {
            passStr += charSet[Math.floor(Math.random() * charSet.length)];
        }
    }

    return passStr;
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
