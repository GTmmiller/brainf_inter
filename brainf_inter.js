"use strict";

(function() {
    var root = this;
    var previous_brainf_inter = root.brainf_inter;

    var brainf_inter = (function() {
        // Constructor and instance variables
        function BrainFInterpreter(program, input_callback, output_callback) {
            if (program === undefined) {
                program = "";
            }

            if (input_callback === undefined) {
                input_callback = function() {
                    window.prompt('Insert a one byte input');
                }
            }

            if (output_callback === undefined) {
                output_callback = function(output) {
                    console.log(output);
                }
            } 

            this.program = program;
            this.input_callback = input_callback;
            this.output_callback = output_callback;

            this.dataPointer = 0;
            this.instructionPointer = 0;

            this.dataMemory = new Array(BrainFInterpreter.prototype.DATA_MEMORY_SIZE);
            for(var i = 0; i < this.dataMemory.length; i++) {
                this.dataMemory[i] = 0;
            }
        }

        // Constants
        BrainFInterpreter.prototype.DATA_MEMORY_SIZE = 30000;

        // An interpreter for BrainF***. Based on this wikipedia page: https://en.wikipedia.org/wiki/Brainfuck
        BrainFInterpreter.prototype.INTERPRETER = {
            '>': function() { ++this.dataPointer; },
            '<': function() { --this.dataPointer; },
            '+': function() { ++this.dataMemory[this.dataPointer]; },
            '-': function() { --this.dataMemory[this.dataPointer]; },
            '.': function() { this.output_callback(String.fromCharCode(this.dataMemory[this.dataPointer])); },
            ',': function() {
                var input = this.input_callback(); 
                input = (typeof(input) === 'undefined') ? -1 : input.charCodeAt(0);
                this.dataMemory[this.dataPointer] = input;  
            },
            '[': function() {
                // This function finds the position of a matching right square bracket.
                // It jumps directly to the bracket's position to accomodate the instructionPointer
                // increment in the execution function 
                if (this.dataMemory[this.dataPointer] === 0) {
                    var bracketStack = new Array();
                    bracketStack.push('[');
                    for (var i = this.instructionPointer + 1; i < this.program.length; i++) {
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
                }
            }
        };

        BrainFInterpreter.prototype.execute = function() { 
            while(this.instructionPointer < this.program.length) {
                this.INTERPRETER[this.program[this.instructionPointer]].bind(this)();
                this.instructionPointer++;
            }
        }

        BrainFInterpreter.prototype.reset = function() {
            this.dataPointer = 0;
            this.instructionPointer = 0;
            this.dataMemory = new Array(BrainFInterpreter.prototype.DATA_MEMORY_SIZE);
        }
        
        return BrainFInterpreter;
    })();

    // Make sure we can avoid conflicts like jQuery
    brainf_inter.noConflict = function() {
        root.brainf_inter = previous_brainf_inter;
        return brainf_inter;
    };

    // Module export for nodejs and window object export for browser
    if(typeof exports !== 'undefined') {
        if(typeof module !== 'undefined' && module.exports) {
            exports = module.exports = brainf_inter;
        }
        exports.brainf_inter = brainf_inter;
    }
    else {
        root.brainf_inter = brainf_inter;
    }

}).call(this);
