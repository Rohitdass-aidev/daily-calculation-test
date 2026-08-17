function isCorrect(userInput, expectedValue) {
    if (userInput.trim() === '') return false;
    let num = parseFloat(userInput);
    if (isNaN(num)) return false;
    
    if (num === expectedValue) return true;
    if (Math.abs(num - expectedValue) < 0.0000001) return true;
    
    for (let i = 2; i <= 5; i++) {
        let factor = Math.pow(10, i);
        if (num === Math.floor(expectedValue * factor) / factor) return true;
        if (num === Math.ceil(expectedValue * factor) / factor) return true;
        if (num === Math.round(expectedValue * factor) / factor) return true;
    }
    return false;
}

let allPass = true;
function assert(name, condition) {
    console.log(name, condition ? "PASS" : "FAIL");
    if (!condition) allPass = false;
}

assert("87^2 == 7569", 87*87 === 7569);
assert("125^2 == 15625", 125*125 === 15625);
assert("17^3 == 4913", 17*17*17 === 4913);
assert("30^3 == 27000", 30*30*30 === 27000);
assert("17*8 == 136", 17*8 === 136);
assert("25*10 == 250", 25*10 === 250);
assert("11*12 == 132", 11*12 === 132);
assert("19*20 == 380", 19*20 === 380);

assert("1/2 == 50", isCorrect("50", 1/2 * 100) && isCorrect("50.0", 1/2 * 100) && isCorrect("50.00", 1/2 * 100));
assert("1/4 == 25", isCorrect("25", 1/4 * 100) && isCorrect("25.0", 1/4 * 100));
assert("3/4 == 75", isCorrect("75", 3/4 * 100));
assert("5/6 == 83.33...", isCorrect("83.33", 5/6 * 100) && isCorrect("83.333", 5/6 * 100));
assert("7/12 == 58.33...", isCorrect("58.33", 7/12 * 100));
assert("3/14 == 21.42...", isCorrect("21.42", 3/14 * 100));

assert("1/2 != 0.5", !isCorrect("0.5", 1/2 * 100));
assert("1/2 != 45", !isCorrect("45", 1/2 * 100));
assert("1/2 != 55", !isCorrect("55", 1/2 * 100));

if (allPass) console.log("ALL MATH TESTS PASSED");
else console.log("SOME MATH TESTS FAILED");
