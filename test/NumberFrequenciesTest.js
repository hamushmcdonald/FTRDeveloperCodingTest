const assert = require('assert');
const recursiveNumbersFrequency = require('../NumberFrequencies').recursiveNumbersFrequency();
const displayNumbersFrequency = require('../NumberFrequencies').displayNumbersFrequency();
const updateNumbersFrequency = require('../NumberFrequencies').updateNumbersFrequency();
const isFibonnaci = require('../NumberFrequencies').isFibonnaci();

beforeEach(function() {
    var log = console.log;
    this.sinon.stub(console, 'log', function() {
      return log.apply(log, arguments);
    });
  });

describe('NumberFrequencies', function() {
    //unit tests for recursiveNumbersFrequency()
    it("should log nothing: false/false", function() {
        let NumbersFrequency = new LinkedList(1);
        let halted = false;
        let quitted = false;
        recursiveNumbersFrequency;
        assert(console.log.calledWith("")).to.be.true;
    });

    it("should log nothing: true/false", function() {
        let NumbersFrequency = new LinkedList(1);
        let halted = true;
        let quitted = false;
        recursiveNumbersFrequency;
        assert(console.log.calledWith("")).to.be.true;
    });

    it("should log nothing: false/true", function() {
        let NumbersFrequency = new LinkedList(1);
        let halted = false;
        let quitted = true;
        recursiveNumbersFrequency;
        assert(console.log.calledWith("")).to.be.true;
    });

    it("should log: 1:1 \n Please enter the next number", function() {
        let NumbersFrequency = new LinkedList(1);
        let halted = true;
        let quitted = true;
        recursiveNumbersFrequency;
        assert(console.log.calledWith("1:1 \n Please enter the next number")).to.be.true;
    });

    //integration tests for displayNumbersFrequency(), updateNumbersFrequency() and shiftIncremented()
    it("should log: 7:3", function() {
        let NumbersFrequency = new LinkedList(7);
        updateNumbersFrequency(7);
        updateNumbersFrequency(7);
        displayNumbersFrequency();
        assert(console.log.calledWith("7:3")).to.be.true;
    });

    it("should log: 3:2, 5:1, 4:1, 6:1", function() {
        let NumbersFrequency = new LinkedList(5);
        updateNumbersFrequency(4);
        updateNumbersFrequency(3);
        updateNumbersFrequency(3);
        updateNumbersFrequency(6);
        displayNumbersFrequency();
        assert(console.log.calledWith("3:2, 5:1, 4:1, 6:1")).to.be.true;
    });

    it("should log: 5:2, 3:2, 4:1", function() {
        let NumbersFrequency = new LinkedList(5);
        updateNumbersFrequency(5);
        updateNumbersFrequency(4);
        updateNumbersFrequency(3);
        updateNumbersFrequency(3);
        displayNumbersFrequency();
        assert(console.log.calledWith("5:2, 3:2, 4:1")).to.be.true;
    });

    it("should log: 5:4, 4:3, 2:2, 3:1, 1:1", function() {
        let NumbersFrequency = new LinkedList(5);
        updateNumbersFrequency(4);
        updateNumbersFrequency(3);
        updateNumbersFrequency(2);
        updateNumbersFrequency(1);
        updateNumbersFrequency(5);
        updateNumbersFrequency(5);
        updateNumbersFrequency(5);
        updateNumbersFrequency(4);
        updateNumbersFrequency(4);
        updateNumbersFrequency(2);
        displayNumbersFrequency();
        assert(console.log.calledWith("5:4, 4:3, 2:2, 3:1, 1:1")).to.be.true;
    });

    //unit tests for isFibonnaci()
    it("should return true for 0", function() {
        assert.equal(isFibonnaci(0), true);
    });

    it("should return true for 1", function() {
        assert.equal(isFibonnaci(1), true);
    });

    it("should return false for 4", function() {
        assert.equal(isFibonnaci(4), false);
    });

    it("should return true for 196418", function() {
        assert.equal(isFibonnaci(196418), true);
    });

    it("should return false for 196419", function() {
        assert.equal(isFibonnaci(196419), false);
    });
})