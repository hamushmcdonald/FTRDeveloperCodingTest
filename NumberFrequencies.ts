import {LinkedList, Val} from './DataStructures';

let halted: boolean = false;
let quitted: boolean = false;
let userInput: any = null;
let emittingFrequency: number;
let numbersFrequency: LinkedList = new LinkedList(0);

// //prompt the user for the number of seconds between outputting the frequency of each number to the screen then multiplyed by 
// //1000 to get milliseconds
// let retrieveEmittingFrequency = new Promise((resolve, reject) => {
//     console.log("Please input the amount of time in seconds between emitting numbers and their frequency");
//     process.stdin.on('data', frequencySeconds => {
//     emittingFrequency = Number(frequencySeconds) * 1000;
//     if (emittingFrequency != undefined) {
//         resolve(emittingFrequency);
//     }

//     process.exit();
//     });
// });

// //create frequency descending order linked list of numbers and their frequencies
// let retrieveFirstNumber = new Promise((resolve, reject) => {
//     console.log("Please enter the first number");
//     process.stdin.on('data', firstNumber => {
//         numbersFrequency = new LinkedList(Number(firstNumber));
//         resolve(numbersFrequency);
//         process.exit()
//     });
// });

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

// function retrieveNextNumber() {
//     process.stdin.on('data', input => {
//         console.log("Please enter the next number");
//         if (userInput.toString() == 'halt') {
//             if (!halted) {
//                 halted = true;
//                 console.log("timer halted");
//             } else {
//                 //throw error
//             }  
//         } else if (userInput.toString() == 'resume') {
//             if (halted) {
//                 halted = false;
//                 setTimeout(recursiveNumbersFrequency, emittingFrequency);
//                 console.log("timer resumed");
//             } else {
//                 //throw error
//             }
//         } else {
//             try {
//                 updateNumbersFrequency(Number(userInput));
//             } catch (error) {
//                 console.error(error);
//             }
//         }
//         process.exit();    
//     });   
//}

let i = 0;
console.log("Please input the amount of time in seconds between emitting numbers and their frequency");
process.stdin.on('readable', () => {
    let chunk;
    while ((chunk = process.stdin.read()) !== null) {
        if (i == 0) {
            emittingFrequency = Number(chunk) * 1000;
            console.log("Please enter the first number");
            
        } else if (i == 1) {
            numbersFrequency = new LinkedList(Number(chunk));
            setTimeout(recursiveNumbersFrequency, emittingFrequency);
            console.log("Please enter the next number");

        } else {
            if (chunk.toString() == 'halt') {
                if (!halted) {
                    halted = true;
                    console.log("timer halted");
                } else {
                    //throw error
                }  
            } else if (chunk.toString() == 'resume') {
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
    
});

displayNumbersFrequency();
console.log("Thanks for playing, press any key to exit.")      

// retrieveEmittingFrequency.then(
//     function(value) {retrieveFirstNumber.then( 
//         function(value) {setTimeout(recursiveNumbersFrequency, emittingFrequency)
//     })
// });

// while (!quitted) {
//     retrieveNextNumber();
// } 

