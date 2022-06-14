//class for a doubly linked list
var LinkedList = /** @class */ (function () {
    function LinkedList(value) {
        var newVal = new Val(null, null, value);
        this.headVal = newVal;
        this.tailVal = newVal;
    }
    //appends a value to the end of the list
    LinkedList.prototype.add = function (value) {
        var newVal = new Val(this.tailVal, null, value);
        this.tailVal.setNext(newVal);
        this.tailVal = newVal;
    };
    LinkedList.prototype.getHeadVal = function () {
        return this.headVal;
    };
    LinkedList.prototype.getTailVal = function () {
        return this.tailVal;
    };
    LinkedList.prototype.setHeadVal = function (newHead) {
        this.headVal = newHead;
    };
    return LinkedList;
}());
//class for a value in a doubly linked list which contains a value and a frequency
var Val = /** @class */ (function () {
    function Val(previous, next, value) {
        this.previousVal = previous;
        this.nextVal = next;
        this.value = value;
        this.frequency = 1;
    }
    Val.prototype.getPrevious = function () {
        return this.previousVal;
    };
    Val.prototype.getNext = function () {
        return this.nextVal;
    };
    Val.prototype.getValue = function () {
        return this.value;
    };
    Val.prototype.getFrequency = function () {
        return this.frequency;
    };
    Val.prototype.setPrevious = function (previous) {
        this.previousVal = previous;
    };
    Val.prototype.setNext = function (next) {
        this.nextVal = next;
    };
    Val.prototype.incrementFrequency = function () {
        this.frequency += 1;
    };
    return Val;
}());
var halted = false;
var quitted = false;
var userInput = null;
var emittingFrequency;
var numbersFrequency = new LinkedList(0);
//prompt the user for the number of seconds between outputting the frequency of each number to the screen then multiplyed by 
//1000 to get milliseconds
var retrieveEmittingFrequency = new Promise(function (resolve, reject) {
    console.log("Please input the amount of time in seconds between emitting numbers and their frequency");
    process.stdin.on('data', function (frequencySeconds) {
        emittingFrequency = Number(frequencySeconds) * 1000;
        if (emittingFrequency != undefined) {
            resolve(emittingFrequency);
        }
        process.exit();
    });
});
//create frequency descending order linked list of numbers and their frequencies
var retrieveFirstNumber = new Promise(function (resolve, reject) {
    console.log("Please enter the first number");
    process.stdin.on('data', function (firstNumber) {
        numbersFrequency = new LinkedList(Number(firstNumber));
        resolve(numbersFrequency);
        process.exit();
    });
});
function recursiveNumbersFrequency() {
    while (!quitted) {
        while (!halted) {
            setTimeout(recursiveNumbersFrequency, emittingFrequency);
            displayNumbersFrequency();
        }
    }
}
function displayNumbersFrequency() {
    var currentVal = numbersFrequency.getHeadVal();
    while (currentVal.getNext() != null) {
        console.log(currentVal.getValue() + ":" + currentVal.getFrequency() + ", ");
        currentVal = currentVal.getNext();
    }
}
function updateNumbersFrequency(newNumber) {
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
function retrieveNextNumber() {
    process.stdin.on('data', function (input) {
        console.log("Please enter the next number");
        if (userInput.toString() == 'halt') {
            if (!halted) {
                halted = true;
                console.log("timer halted");
            }
            else {
                //throw error
            }
        }
        else if (userInput.toString() == 'resume') {
            if (halted) {
                halted = false;
                setTimeout(recursiveNumbersFrequency, emittingFrequency);
                console.log("timer resumed");
            }
            else {
                //throw error
            }
        }
        else {
            try {
                updateNumbersFrequency(Number(userInput));
            }
            catch (error) {
                console.error(error);
            }
        }
        process.exit();
    });
}
function main() {
    // process.stdin.on('readable', () => {
    //     let chunk;
    //     if ((chunk = process.stdin.read()) !== null) {
    //         process.stdout.write("Please input the amount of time in seconds between emitting numbers and their frequency");
    //         emittingFrequency = Number(chunk) * 1000;
    //     }
    //     if ((chunk = process.stdin.read()) !== null) {
    //         process.stdout.write("Please enter the first number");
    //         numbersFrequency = new LinkedList(Number(chunk));
    //         setTimeout(recursiveNumbersFrequency, emittingFrequency);
    //     }
    //     while (!quitted) {
    //         while ((chunk = process.stdin.read()) !== null) {
    //             process.stdout.write("Please enter the next number");
    //             if (chunk.toString() == 'halt') {
    //                 if (!halted) {
    //                     halted = true;
    //                     console.log("timer halted");
    //                 } else {
    //                     //throw error
    //                 }  
    //             } else if (chunk.toString() == 'resume') {
    //                 if (halted) {
    //                     halted = false;
    //                     setTimeout(recursiveNumbersFrequency, emittingFrequency);
    //                     console.log("timer resumed");
    //                 } else {
    //                     //throw error
    //                 }
    //             } else {
    //                 try {
    //                     updateNumbersFrequency(Number(chunk));
    //                 } catch (error) {
    //                     console.error(error);
    //                 }
    //             }
    //         }
    //     }
    //     displayNumbersFrequency();
    //     console.log("Thanks for playing, press any key to exit.")      
    // });
    retrieveEmittingFrequency.then(function (value) {
        retrieveFirstNumber.then(function (value) {
            setTimeout(recursiveNumbersFrequency, emittingFrequency);
        });
    });
    while (!quitted) {
        retrieveNextNumber();
    }
}
main();
