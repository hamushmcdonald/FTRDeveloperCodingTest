import {LinkedList, Val} from './DataStructures';

//recursively calls displayNumberFrequencies in intervals set by emittingFrequency provided program is not halted
function recursiveNumbersFrequency(): void {
    console.log("recursiveNumbersFrequency()");
    //if halted do nothing
    if (!halted) {
        //if not halted calls itself to be run again in emittingFrequency ms and calls displayNumbersFrequency
        setTimeout(recursiveNumbersFrequency, emittingFrequency);
        displayNumbersFrequency();
        //after displaying numbers and their frequencies asks the user to enter the next number (actually handled in main)
        console.log("Please enter the next number");
    }
}

//displays numbers and their frequency in the form number:frequency, number:frequency, etc.
function displayNumbersFrequency() {
    console.log("displayNumbersFrequency()");
    //set the first number in the list to be printed
    let currentVal: Val = numbersFrequency.getHeadVal();
    //while the current element is not the final element in the list
    while (currentVal.getNext() != null) {
        //log the value and frequency of the element and increment the element
        console.log(currentVal.getValue() + ":" + currentVal.getFrequency() + ", ");
        currentVal = currentVal.getNext();
    }
    //log the value and frequency of the final element
    console.log(currentVal.getValue() + ":" + currentVal.getFrequency());
    
}

//updates numbersFrequency LinkedList to include or increment the number newNumber
function updateNumbersFrequency(newNumber: number) {
    console.log("updateNumbersFrequency()");
    //set the first number in the list to be searched
    let currentVal: Val = numbersFrequency.getHeadVal();
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
            let incrementedVal: Val = currentVal;
            //go back until the frequency of the incremented element is less than or equal to the current value
            do {
                currentVal = currentVal.getPrevious();
                //if the current value is the head node of the list replace the incremented value as the head node and return
                if (currentVal == numbersFrequency.getHeadVal()) {
                    incrementedVal.getPrevious().setNext(incrementedVal.getNext());
                    incrementedVal.getNext().setPrevious(incrementedVal.getPrevious());
                    incrementedVal.setPrevious(null);
                    incrementedVal.setNext(currentVal);
                    currentVal.setPrevious(incrementedVal);
                    numbersFrequency.setHeadVal(incrementedVal);
                    return;
                }
            } while(incrementedVal.getFrequency() > currentVal.getFrequency());
            //shift the incremented value to the correct position in the list and return
            incrementedVal.getPrevious().setNext(incrementedVal.getNext());
            incrementedVal.getNext().setPrevious(incrementedVal.getPrevious());
            incrementedVal.setNext(currentVal.getNext());
            incrementedVal.setPrevious(currentVal);
            currentVal.getNext().setPrevious(incrementedVal);
            currentVal.setNext(incrementedVal);
            return;
        }
    }
    //if number to be added is not in the list
    numbersFrequency.add(newNumber);
}

//is the program halted?: false if no, true if yes
let halted: boolean = false;
//the frequency in milliseconds between displaying the numbers and their frequencies
let emittingFrequency: number;
//LinkedList of numbers recieved by the user and their frequency in frequency descending order
let numbersFrequency: LinkedList;
//index keeping track of how many total user inputs have been recieved
let i = 0;

function main() {

    //prompt the user to enter a value in seconds between displaying the numbers and frequencies
    console.log("Please input the amount of time in seconds between emitting numbers and their frequency");

    //start waiting for user input
    process.stdin.on('readable', () => {
        let chunk;

        //assign user input to chunk and make sure its not empty
        while ((chunk = process.stdin.read()) !== null) {
            console.log(i);
            //if the user entered halt and halted is false set halted to true
            if (String(chunk) == "halt") {
                if (!halted) {
                    halted = true;
                    console.log("timer halted");
                } else {
                    //throw error
                }  
            //if the user entered resume and halted is true set halted to false and restart recursiveNumbersFrequency
            } else if (String(chunk) == "resume") {
                if (halted) {
                    halted = false;
                    setTimeout(recursiveNumbersFrequency, emittingFrequency);
                    console.log("timer resumed");
                } else {
                    //throw error
                }
            //if the user entered quit display the numbers frequency and exit program
            } else if (String(chunk) == "quit") {
                displayNumbersFrequency();
                console.log("Thanks for playing, press any key to exit.");
                return;
            //otherwise only valid input is an number to be added to frequency list 
            } else {
                //assigns user input to emitting frequency * 1000
                if (i == 0) {
                    emittingFrequency = Number(chunk) * 1000;
                    console.log("Please enter the first number");
                //uses user input to initialise numbers frequency   
                } else if (i == 1) {
                    numbersFrequency = new LinkedList(Number(chunk));
                    setTimeout(recursiveNumbersFrequency, emittingFrequency);
                    console.log("Please enter the next number");
                //adds user input to existing linked list
                } else {
                    try {
                        updateNumbersFrequency(Number(chunk));
                    } catch (error) {
                        console.error(error);
                    }
                    console.log("Please enter the next number");
                }
                i++;    
            }
             
        }
    });
}

main();



