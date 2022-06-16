"use strict";
exports.__esModule = true;
var DataStructures_1 = require("./DataStructures");
//recursively calls displayNumberFrequencies in intervals set by emittingFrequency provided program is not halted
function recursiveNumbersFrequency() {
    //if quitted do nothing
    if (!quitted) {
        //if halted do nothing
        if (!halted) {
            //if not halted calls itself to be run again in emittingFrequency ms and calls displayNumbersFrequency
            setTimeout(recursiveNumbersFrequency, emittingFrequency);
            displayNumbersFrequency();
            //after displaying numbers and their frequencies asks the user to enter the next number (actually handled in main)
            console.log("Please enter the next number");
        }
    }
}
//displays numbers and their frequency in the form number:frequency, number:frequency, etc.
function displayNumbersFrequency() {
    //set the first number in the list to be printed
    var currentVal = numbersFrequency.getHeadVal();
    //while the current element is not the final element in the list
    while (currentVal.getNext() != null) {
        //log the value and frequency of the element and increment the element
        process.stdout.write(currentVal.getValue() + ":" + currentVal.getFrequency() + ", ");
        currentVal = currentVal.getNext();
    }
    //log the value and frequency of the final element
    console.log(currentVal.getValue() + ":" + currentVal.getFrequency());
}
//updates numbersFrequency LinkedList to include or increment the number newNumber
function updateNumbersFrequency(newNumber) {
    //set the first number in the list to be searched
    var currentVal = numbersFrequency.getHeadVal();
    //if number to be added is the first number in the list
    if (currentVal.getValue() == newNumber) {
        //increment frequency and return
        currentVal.incrementFrequency();
        return;
    }
    //if number to be added is not the first  number in the list
    //while there is a next element in the list
    while (currentVal.getNext() != null) {
        //check the next element in the list
        currentVal = currentVal.getNext();
        //if the next element is the number to be added
        if (currentVal.getValue() == newNumber) {
            //increment the element
            currentVal.incrementFrequency();
            //remeber the element which has been incremented
            var incrementedVal = currentVal;
            //go back until the frequency of the incremented element is less than or equal to the current value
            do {
                currentVal = currentVal.getPrevious();
                //if the current value is the head node of the list replace the incremented value as the head node and return
                if (currentVal == numbersFrequency.getHeadVal() && incrementedVal.getFrequency() > currentVal.getFrequency()) {
                    //only set the next elements previous if the incremented element has a next ie not the tail
                    if (incrementedVal.getNext() != null) {
                        incrementedVal.getNext().setPrevious(incrementedVal.getPrevious());
                    }
                    incrementedVal.getPrevious().setNext(incrementedVal.getNext());
                    incrementedVal.setPrevious(null);
                    incrementedVal.setNext(currentVal);
                    currentVal.setPrevious(incrementedVal);
                    numbersFrequency.setHeadVal(incrementedVal);
                    numbersFrequency.resetTailVal();
                    return;
                }
                else if (currentVal == numbersFrequency.getHeadVal() && incrementedVal.getFrequency() <= currentVal.getFrequency()) {
                    shiftIncremented(incrementedVal, currentVal);
                    return;
                }
            } while (incrementedVal.getFrequency() >= currentVal.getFrequency());
            shiftIncremented(incrementedVal, currentVal);
            return;
        }
    }
    //if number to be added is not in the list
    numbersFrequency.add(newNumber);
}
//shifts the incremented value to the correct position in the list
function shiftIncremented(incrementedVal, currentVal) {
    incrementedVal.getPrevious().setNext(incrementedVal.getNext());
    //only set the next elements previous if the incremented element has a next ie not the tail
    if (incrementedVal.getNext() != null) {
        incrementedVal.getNext().setPrevious(incrementedVal.getPrevious());
    }
    incrementedVal.setNext(currentVal.getNext());
    incrementedVal.setPrevious(currentVal);
    currentVal.getNext().setPrevious(incrementedVal);
    currentVal.setNext(incrementedVal);
    numbersFrequency.resetTailVal();
}
function isFibonnaci(num) {
    var twoPreviousFib = 0;
    var previousFib = 1;
    var currentFib = null;
    var j = 2;
    if (num === twoPreviousFib || num === previousFib) {
        return true;
    }
    while (j <= 1000) {
        currentFib = previousFib + twoPreviousFib;
        if (currentFib === num) {
            return true;
        }
        twoPreviousFib = previousFib;
        previousFib = currentFib;
        j++;
    }
    return false;
}
//is the program halted?: false if no, true if yes
var halted = false;
//has the user quit the program?: false if no, true if yes
var quitted = false;
//the frequency in milliseconds between displaying the numbers and their frequencies
var emittingFrequency;
//LinkedList of numbers recieved by the user and their frequency in frequency descending order
var numbersFrequency;
//index keeping track of how many total user inputs have been recieved
var i = 0;
//index keeping track
function main() {
    //prompt the user to enter a value in seconds between displaying the numbers and frequencies
    console.log("Please input the amount of time in seconds between emitting numbers and their frequency");
    //start waiting for user input
    process.stdin.on('readable', function () {
        var chunk;
        //assign user input to chunk and make sure its not empty
        while ((chunk = process.stdin.read()) !== null) {
            //if the user entered halt and halted is false set halted to true
            if (String(chunk).trim() === "halt") {
                if (!halted) {
                    halted = true;
                    console.log("timer halted");
                }
                else {
                    console.log("Error: program is already halted");
                    console.log("Please enter the next number");
                }
                //if the user entered resume and halted is true set halted to false and restart recursiveNumbersFrequency
            }
            else if (String(chunk).trim() === "resume") {
                if (halted) {
                    halted = false;
                    setTimeout(recursiveNumbersFrequency, emittingFrequency);
                    console.log("timer resumed");
                    console.log("Please enter the next number");
                }
                else {
                    console.log("Error: program is not halted");
                    console.log("Please enter the next number");
                }
                //if the user entered quit display the numbers frequency and exit program
            }
            else if (String(chunk).trim() == "quit") {
                displayNumbersFrequency();
                console.log("Thanks for playing, Ctrl + C to exit.");
                quitted = true;
                return;
                //otherwise only valid input is an number to be added to frequency list 
            }
            else {
                //assigns user input to emitting frequency * 1000
                if (i == 0) {
                    emittingFrequency = Number(chunk) * 1000;
                    console.log("Please enter the first number");
                    //uses user input to initialise numbers frequency   
                }
                else if (i == 1) {
                    numbersFrequency = new DataStructures_1.LinkedList(Number(chunk));
                    if (isFibonnaci(Number(chunk))) {
                        console.log("FIB");
                    }
                    setTimeout(recursiveNumbersFrequency, emittingFrequency);
                    console.log("Please enter the next number");
                    //adds user input to existing linked list
                }
                else {
                    try {
                        updateNumbersFrequency(Number(chunk));
                    }
                    catch (error) {
                        console.error(error);
                    }
                    if (isFibonnaci(Number(chunk))) {
                        console.log("FIB");
                    }
                    console.log("Please enter the next number");
                }
                i++;
            }
        }
    });
}
main();
