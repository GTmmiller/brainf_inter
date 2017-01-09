describe("BrainFInterpreter", function() {
  var interpreter

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
  });
});
  