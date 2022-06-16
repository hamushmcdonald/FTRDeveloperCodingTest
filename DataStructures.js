"use strict";
exports.__esModule = true;
exports.Val = exports.LinkedList = void 0;
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
    LinkedList.prototype.resetTailVal = function () {
        var currentVal = this.headVal;
        while (currentVal.getNext() != null) {
            currentVal = currentVal.getNext();
        }
        this.tailVal = currentVal;
    };
    return LinkedList;
}());
exports.LinkedList = LinkedList;
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
exports.Val = Val;
