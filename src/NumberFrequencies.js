"use strict";
exports.__esModule = true;
var DataStructures_1 = require("./DataStructures");
function recursiveNumbersFrequency() {
    console.log("recursiveNumbersFrequency()");
    if (!halted) {
        console.log("inside recursiveNumbersFrequency");
        setTimeout(recursiveNumbersFrequency, emittingFrequency);
        displayNumbersFrequency();
    }
}
function displayNumbersFrequency() {
    console.log("displayNumbersFrequency");
    var currentVal = numbersFrequency.getHeadVal();
    while (currentVal.getNext() != null) {
        console.log(currentVal.getValue() + ":" + currentVal.getFrequency() + ", ");
        currentVal = currentVal.getNext();
    }
}
function updateNumbersFrequency(newNumber) {
    console.log("updateNumbersFrequency()");
    var currentVal = numbersFrequency.getHeadVal();
    if (currentVal.getValue() == newNumber) {
        currentVal.incrementFrequency();
        return;
    }
    while (currentVal.getNext() != null) {
        if (currentVal.getValue() == newNumber) {
            currentVal.incrementFrequency();
            var incrementedVal = currentVal;
            do {
                currentVal = currentVal.getPrevious();
                if (currentVal == numbersFrequency.getHeadVal()) {
                    incrementedVal.setPrevious(null);
                    incrementedVal.setNext(currentVal);
                    currentVal.setPrevious(incrementedVal);
                    numbersFrequency.setHeadVal(incrementedVal);
                    return;
                }
            } while (incrementedVal.getFrequency() > currentVal.getFrequency());
            incrementedVal.getPrevious().setNext(incrementedVal.getNext());
            incrementedVal.getNext().setPrevious(incrementedVal.getPrevious());
            incrementedVal.setNext(currentVal.getNext());
            incrementedVal.setPrevious(currentVal);
            currentVal.getNext().setPrevious(incrementedVal);
            currentVal.setNext(incrementedVal);
        }
        else {
            numbersFrequency.add(newNumber);
        }
    }
}
var halted = false;
var emittingFrequency;
var numbersFrequency;
var i = 0;
function main() {
    console.log("Please input the amount of time in seconds between emitting numbers and their frequency");
    process.stdin.on('readable', function () {
        var chunk;
        while ((chunk = process.stdin.read()) !== null) {
            console.log(i);
            if (String(chunk) == "halt") {
                if (!halted) {
                    halted = true;
                    console.log("timer halted");
                }
                else {
                    //throw error
                }
            }
            else if (String(chunk) == "resume") {
                if (halted) {
                    halted = false;
                    setTimeout(recursiveNumbersFrequency, emittingFrequency);
                    console.log("timer resumed");
                }
                else {
                    //throw error
                }
            }
            else if (String(chunk) == "quit") {
                displayNumbersFrequency();
                console.log("Thanks for playing, press any key to exit.");
                return;
            }
            else {
                if (i == 0) {
                    emittingFrequency = Number(chunk) * 1000;
                    console.log("Please enter the first number");
                }
                else if (i == 1) {
                    numbersFrequency = new DataStructures_1.LinkedList(Number(chunk));
                    setTimeout(recursiveNumbersFrequency, emittingFrequency);
                    console.log("timeout started");
                    console.log("Please enter the next number");
                }
                else {
                    try {
                        updateNumbersFrequency(Number(chunk));
                    }
                    catch (error) {
                        console.error(error);
                    }
                    console.log("Please enter the next number");
                }
            }
            i++;
        }
    });
}
main();
