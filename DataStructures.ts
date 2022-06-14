//class for a doubly linked list
export class LinkedList {
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
export class Val {
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