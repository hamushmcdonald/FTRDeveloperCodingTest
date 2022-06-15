const assert = require('assert');
const recursiveNumbersFrequency = require('../NumberFrequencies').recursiveNumbersFrequency();
const displayNumbersFrequency = require('../NumberFrequencies').displayNumbersFrequency();
const updateNumbersFrequency = require('../NumberFrequencies').updateNumbersFrequency();

beforeEach(function() {
    var log = console.log;
    this.sinon.stub(console, 'log', function() {
      return log.apply(log, arguments);
    });
  });

describe('NumberFrequencies', function() {
    //tests for recursiveNumbersFrequency
    it("should log nothing for halted = true", function(){
        let halted = true;
        recursiveNumbersFrequency;
        assert(console.log.calledWith("")).to.be.true;
    });

    //tests for displayNumbersFrequency and updateNumbersFrequency
    it("should log numbersFrequency", function() {
        let NumbersFrequency = new LinkedList(1);
        updateNumbersFrequency(2);
        updateNumbersFrequency(3);
        updateNumbersFrequency(3);
        NumberFrequencies.displayNumbersFrequency();
        assert(console.log.calledWith("3:2, 1:1, 2:1")).to.be.true;


    });

})