(function() {
	var dataPointer = 0;
  var instructionPointer = 0;
  var dataMemory = [30000];
  // Should do nothing
  var program = "[->+<]";
  
  var tokenizer = {
  	'>': function() { ++dataPointer; },
  	'<': function() { --dataPointer; },
    '+': function() { ++dataMemory[dataPointer]; },
    '-': function() { --dataMemory[dataPointer]; },
    '.': function() { console.log(dataMemory[dataPointer]); },
    ',': function() { dataMemory[dataPointer] =  window.prompt('Insert a one byte input'); },
    '[': function() { if(dataMemory[dataPointer] == 0) {
    var bracketStack.push('[');
    var jumpTo = instructionPointer + 1;
    for(var i = 0; i < program.length(); i++) {
    	if()		
    }
    } },
    ']': function() {}
}
    
    
  }
  console.
  // Process a character
  while(instructionPointer < program.length()) {
  	break
  }
})();