describe("BrainFInterpreter", function() {
  var interpreter;

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
      //TODO: called x times? Make every symbol a function?
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
      interpreter = new BrainFInterpreter("++>+++++[<+>-]++++++++[<++++++>-]<.");
      interpreter.execute();
    });

    it("should record a 55 in the first memory cell", function() {
      console.log(interpreter.dataMemory[1]);
      expect(interpreter.dataMemory[0]).toEqual(55);
    });

    it("should output the character '7' in the output buffer", function() {
      expect(interpreter.outputBuffer[0]).toEqual('7');
    });
  });
});
  