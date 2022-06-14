import {LinkedList, Val} from './DataStructures';

let halted: boolean = false;
let quitted: boolean = false;
let emittingFrequency: number;
let numbersFrequency: LinkedList = new LinkedList(-1);
let i = 0;

function recursiveNumbersFrequency(): void {
    while (!quitted) {
        while (!halted) {
            setTimeout(recursiveNumbersFrequency, emittingFrequency);
            displayNumbersFrequency();
        }
    }
}

function displayNumbersFrequency() {
    let currentVal: Val = numbersFrequency.getHeadVal();
    while (currentVal.getNext() != null) {
        console.log(currentVal.getValue() + ":" + currentVal.getFrequency() + ", ");
        currentVal = currentVal.getNext()
    }
}

function updateNumbersFrequency(newNumber: number) {
    let currentVal: Val = numbersFrequency.getHeadVal();
    if (currentVal.getValue() == newNumber) {
        currentVal.incrementFrequency();
        return;
    }
    while (currentVal.getNext() != null) {
        if (currentVal.getValue() == newNumber) {
            currentVal.incrementFrequency();
            let incrementedVal: Val = currentVal;
            do {
                currentVal = currentVal.getPrevious();
                if (currentVal == numbersFrequency.getHeadVal()) {
                    incrementedVal.setPrevious(null);
                    incrementedVal.setNext(currentVal);
                    currentVal.setPrevious(incrementedVal);
                    numbersFrequency.setHeadVal(incrementedVal);
                    return;
                }
            } while(incrementedVal.getFrequency() > currentVal.getFrequency());
            incrementedVal.getPrevious().setNext(incrementedVal.getNext());
            incrementedVal.getNext().setPrevious(incrementedVal.getPrevious());
            incrementedVal.setNext(currentVal.getNext());
            incrementedVal.setPrevious(currentVal);
            currentVal.getNext().setPrevious(incrementedVal);
            currentVal.setNext(incrementedVal);
        } else {
            numbersFrequency.add(newNumber);
        }
    }
}

console.log("Please input the amount of time in seconds between emitting numbers and their frequency");

process.stdin.on('readable', () => {
    let chunk;

    while ((chunk = process.stdin.read()) !== null && !quitted) {
        if (i == 0) {
            emittingFrequency = Number(chunk) * 1000;
            console.log("Please enter the first number");
            
        } else if (i == 1) {
            numbersFrequency = new LinkedList(Number(chunk));
            setTimeout(recursiveNumbersFrequency, emittingFrequency);
            console.log("Please enter the next number");

        } else {
            if (String(chunk) == "halt") {
                if (!halted) {
                    halted = true;
                    console.log("timer halted");
                } else {
                    //throw error
                }  
            } else if (String(chunk) == "resume") {
                if (halted) {
                    halted = false;
                    setTimeout(recursiveNumbersFrequency, emittingFrequency);
                    console.log("timer resumed");
                } else {
                    //throw error
                }
            } else {
                try {
                    updateNumbersFrequency(Number(chunk));
                } catch (error) {
                    console.error(error);
                }
            }
            console.log("Please enter the next number");
        }    
        i++; 
    }
    displayNumbersFrequency();
    console.log("Thanks for playing, press any key to exit.");  
});


