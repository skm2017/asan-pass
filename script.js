"use strict";

const CAP_LETTERS = charList('A', 'Z');
const SMALL_LETTERS = charList('a', 'z');
const NUMBERS = charList('0', '9');
const SPECIAL_CHARS = '!@#$%^&*_.';

function generatePassword() {
    const passLen = document.querySelector("#passLen").value;
    const includeCapLetter = document.querySelector("#capLetter").checked;
    const includeSmallLetter = document.querySelector("#smallLetter").checked;
    const includeNumber = document.querySelector("#nums").checked;
    const includeSpecialChar = document.querySelector("#specialChar").checked;
    const generatedPass = document.querySelector("#generatedPass");

    generatedPass.value = passwordGenerator(passLen, includeCapLetter, includeSmallLetter, includeNumber, includeSpecialChar);
}

function copyToClipboard() {
    const generatedPass = document.querySelector("#generatedPass");

    if (generatedPass.value.length > 0) {
        generatedPass.select();
        generatedPass.setSelectionRange(0, 99999);
        navigator.clipboard.writeText(generatedPass.value).then(() => {
            alert("Password Copied!");
        }).catch(() => {
            alert("Failed to copy password!");
        });
    } else {
        alert("Please generate a password first!");
    }
}

function passwordGenerator(passLen, incCap, incSmall, incNum, incSpecial) {
    let charSet = '';

    if (incCap) charSet += CAP_LETTERS;
    if (incSmall) charSet += SMALL_LETTERS;
    if (incNum) charSet += NUMBERS;
    if (incSpecial) charSet += SPECIAL_CHARS;

    if (charSet.length === 0) {
        alert("Please select at least one character type!");
        return '';
    }

    return Array.from({ length: passLen }, () => charSet[Math.floor(Math.random() * charSet.length)]).join('');
}

function charList(startChar, endChar) {
    const startCode = startChar.charCodeAt(0);
    const endCode = endChar.charCodeAt(0);
    return String.fromCharCode(...Array.from({ length: endCode - startCode + 1 }, (_, i) => startCode + i));
}

document.querySelector("#generateBtn").addEventListener("click", generatePassword);
document.querySelector("#copyBtn").addEventListener("click", copyToClipboard);
