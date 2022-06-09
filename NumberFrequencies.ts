//class for a doubly linked list
class LinkedList {
    private headVal: Val;
    private tailVal: Val;

    public constructor(value: number) {
        const newVal = new Val(null, null, value);
        this.headVal = newVal;
        this.tailVal = newVal;
    }

    //appends a value to the end of the list
    public add(value: number) {
        let newVal = new Val(this.tailVal, null, value);
        this.tailVal.setNext(newVal);
        this.tailVal = newVal;
    }

    public getHeadVal(): Val {
        return this.headVal;
    }

    public getTailVal(): Val {
        return this.tailVal;
    } 

    public setHeadVal(newHead: Val) {
        this.headVal = newHead;
    }
}

//class for a value in a doubly linked list which contains a value and a frequency
class Val {
    private previousVal: Val;
    private nextVal: Val;
    private value: number;
    private frequency: number;

    public constructor(previous: Val, next: Val, value: number) {
        this.previousVal = previous;
        this.nextVal = next;
        this.value = value;
        this.frequency = 1;
    }

    public getPrevious(): Val {
        return this.previousVal;
    }

    public getNext(): Val {
        return this.nextVal;
    }

    public getValue(): number {
        return this.value;
    }

    public getFrequency(): number {
        return this.frequency;
    }

    public setPrevious(previous: Val) {
        this.previousVal = previous;
    }

    public setNext(next: Val) {
        this.nextVal = next;
    }

    public incrementFrequency() {
        this.frequency += 1
    }
}

let halted: boolean = false;
let quitted: boolean = false;
let userInput: any = null;
let emittingFrequency: number;
let numbersFrequency: LinkedList;

//prompt the user for the number of seconds between outputting the frequency of each number to the screen then multiplyed by 1000 to get milliseconds
console.log("Please input the amount of time in seconds between emitting numbers and their frequency");
process.stdin.on('data', frequencySeconds => {
    emittingFrequency = Number(frequencySeconds) * 1000;
    createNumbersFrequency();
    process.exit();
});

//create frequency descending order linked list of numbers and their frequencies
function createNumbersFrequency() {
    console.log("Please enter the first number");
    process.stdin.on('data', firstNumber => {
        numbersFrequency = new LinkedList(Number(firstNumber));
        //first call of recursiveNumbersFrequency after which it will call itself recursively ad infinitum
        setTimeout(recursiveNumbersFrequency, emittingFrequency);
        main();
        process.exit();
    });
}

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
function main() {
    console.log("Please enter the next number");
    while (userInput != "quit") {
        process.stdin.on('data', input => {
            if (userInput.toString() == 'halt') {
                if (!halted) {
                    halted = true;
                    console.log("timer halted");
                } else {
                    //throw error
                }  
            } else if (userInput.toString() == 'resume') {
                if (halted) {
                    halted = false;
                    setTimeout(recursiveNumbersFrequency, emittingFrequency);
                    console.log("timer resumed");
                } else {
                    //throw error
                }
            } else {
                try {
                    updateNumbersFrequency(Number(userInput));
                } catch (error) {
                    console.error(error);
                }
            }    
        });   
    }

    displayNumbersFrequency();
    console.log("Thanks for playing, press any key to exit.")
}

