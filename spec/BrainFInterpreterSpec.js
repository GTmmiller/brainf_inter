// Found this trick from underscore
var BrainFInterpreter = typeof require == 'function' ?  require('..') : window.brainfinter;

describe("BrainFInterpreter", function() {
  var interpreter,
      output,
      input;
  
  var output_callback = function(c_output) { 
    output =  output + c_output; 
  };

  var input_callback = function() {
    var c_input = input[0];
    input = input.substring(1);
    return c_input; 
  }

  beforeEach(function() {
    output = "";
  });

  describe("when an interpreter is created without a program", function() {
    beforeEach(function() {
      interpreter = new BrainFInterpreter();
    });
    
    it("should be created", function() {
      expect(interpreter).toBeDefined();
    });
  });

  describe("when an interpreter runs the program: [->+<]", function() {
    beforeEach(function() {
      interpreter = new BrainFInterpreter("[->+<]");
      interpreter.execute();
    });

    it("should record nothing in memory", function() {
      expect(interpreter.dataMemory).toContain(0);
    });

    it("should move the instructionPointer to the end + 1 of the program", function() {
      expect(interpreter.instructionPointer).toEqual(interpreter.program.length);
    });

    it("shouldn't move the dataPointer", function() {
      expect(interpreter.dataPointer).toEqual(0);
    });
  });

  describe("when an interpreter runs the program: ++>+++++[<+>-]++++++++[<++++++>-]<.", function() {
    beforeEach(function() {
      interpreter = new BrainFInterpreter("++>+++++[<+>-]++++++++[<++++++>-]<.", null, output_callback);
      interpreter.execute();
    });

    it("should record a 55 in the first memory cell", function() {
      expect(interpreter.dataMemory[0]).toEqual(55);
    });

    it("should output the character '7' using the output callback", function() {
      expect(output).toEqual('7');
    });
  });

  describe("when an interpreter runs 'Hello World!'", function() {
    beforeEach(function() {
      interpreter = new BrainFInterpreter("++++++++[>++++[>++>+++>+++>+<<<<-]>+>+>->>+[<]<-]>>.>---.+++++++..+++.>>.<-.<.+++.------.--------.>>+.>++.",
      null, output_callback);
      interpreter.execute();
    });

    it("should output the text 'Hello World!'", function() {
      expect(output).toEqual('Hello World!\n');
    });
  });

  describe("when an interpreter runs ROT13 Encoding", function() {
    beforeEach(function() {
      interpreter = new BrainFInterpreter("",
      input_callback, output_callback);
    });

  });
});
  