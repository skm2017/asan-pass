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
    let password = '';

    if (incCap) {
        charSet += CAP_LETTERS;
        password += CAP_LETTERS[Math.floor(Math.random() * CAP_LETTERS.length)];
    }
    if (incSmall) {
        charSet += SMALL_LETTERS;
        password += SMALL_LETTERS[Math.floor(Math.random() * SMALL_LETTERS.length)];
    }
    if (incNum) {
        charSet += NUMBERS;
        password += NUMBERS[Math.floor(Math.random() * NUMBERS.length)];
    }
    if (incSpecial) {
        charSet += SPECIAL_CHARS;
        password += SPECIAL_CHARS[Math.floor(Math.random() * SPECIAL_CHARS.length)];
    }

    if (charSet.length === 0) {
        alert("Please select at least one character type!");
        return '';
    }

    for (let i = password.length; i < passLen; i++) {
        password += charSet[Math.floor(Math.random() * charSet.length)];
    }

    return shuffleString(password);
}

function charList(startChar, endChar) {
    const startCode = startChar.charCodeAt(0);
    const endCode = endChar.charCodeAt(0);
    return String.fromCharCode(...Array.from({ length: endCode - startCode + 1 }, (_, i) => startCode + i));
}

function shuffleString(str) {
    return [...str].sort(() => Math.random() - 0.5).join('');
}

document.querySelector("#generateBtn").addEventListener("click", generatePassword);
document.querySelector("#copyBtn").addEventListener("click", copyToClipboard);
