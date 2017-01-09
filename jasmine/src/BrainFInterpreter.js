
// Constructor and instance variables
function BrainFInterpreter(program) {
    if (program === undefined) {
        program = "";
    }
    this.program = program;

    this.dataPointer = 0;
    this.instructionPointer = 0;
    this.dataMemory = new Array(BrainFInterpreter.prototype.DATA_MEMORY_SIZE);
}

// Constants
BrainFInterpreter.prototype.DATA_MEMORY_SIZE = 30000;

// An interpreter for BrainF***. Based on the code [wikipedia page]
BrainFInterpreter.prototype.INTERPRETER = {
    '>': function() { ++this.dataPointer; },
  	'<': function() { --this.dataPointer; },
    '+': function() { ++this.dataMemory[this.dataPointer]; },
    '-': function() { --this.dataMemory[this.dataPointer]; },
    '.': function() { console.log(this.dataMemory[this.dataPointer]); },
    ',': function() { this.dataMemory[this.dataPointer] =  window.prompt('Insert a one byte input'); },
    '[': function() {
        // This function finds the position of a matching right square bracket.
        // It jumps directly to the bracket's position to accomodate the instructionPointer
        // increment in the execution function 
        if (this.dataMemory[this.dataPointer] === 0) {
            var bracketStack = new Array();
            bracketStack.push('[');
            for (var i = this.instructionPointer + 1; i < this.program.length(); i++) {
                if (this.program[i] === '[') {
                    bracketStack.push('[');
                }
                else if (this.program[i] === ']') {
                    bracketStack.pop();
                }

                if (bracketStack.length === 0) {
                    this.instructionPointer = i;
                    break;
                }
            }
            // TODO: Add an error when a match can't be found
        }
    },
    ']': function() {
        // This function finds the position of a matching left square bracket.
        // It jumps directly to the bracket's position to accomodate the instructionPointer
        // increment in the execution function
        if (this.dataMemory[this.dataPointer] !== 0) {
            var bracketStack = new Array();
            bracketStack.push(']');
            for (var i = this.instructionPointer - 1; i >= 0; i--) {
                if (this.program[i] === ']') {
                    bracketStack.push(']');
                }
                else if (this.program[i] === '[') {
                    bracketStack.pop();
                }

                if (bracketStack.length === 0) {
                    this.instructionPointer = i;
                    break;
                }
            }
            // TODO: Add an error when a match can't be found
        }
    }
};

BrainFInterpreter.prototype.execute = function() { 
    while(this.instructionPointer < this.program.length) {
        this.INTERPRETER[this.program[this.instructionPointer]]();
        this.instructionPointer++;
    }
}

BrainFInterpreter.prototype.reset = function() {
    this.dataPointer = 0;
    this.instructionPointer = 0;
    this.dataMemory = new Array(BrainFInterpreter.prototype.DATA_MEMORY_SIZE);
}

// // Prototype functions
// Player.prototype.play = function(song) {
//   this.currentlyPlayingSong = song;
//   this.isPlaying = true;
// };

// Player.prototype.pause = function() {
//   this.isPlaying = false;
// };

// Player.prototype.resume = function() {
//   if (this.isPlaying) {
//     throw new Error("song is already playing");
//   }

//   this.isPlaying = true;
// };

// Player.prototype.makeFavorite = function() {
//   this.currentlyPlayingSong.persistFavoriteStatus(true);
// };