# brainf_inter

A basic JavaScript-based interpreter for the BrainFuck language

## Installation
With [node](https://nodejs.org/en/) installed:

`npm install brainf_inter`

With [bower](https://bower.io/) installed:

`bower install brainf_inter`

## Usage

In node:

```javascript
# require the module
var BrainFInterpreter = require(brainf_inter);
# make an instance of an interpreter with a program
var interpreter = new BrainFInterpreter("++>+++++[<+>-]++++++++[<++++++>-]<.");
# execute a program
interpreter.execute();
```

With bower:

```javascript 
<script type="text/javascript" src="brainf_inter.js"></script>

// Somewhere in some javascript
var interpreter = new brainf_inter("++>+++++[<+>-]++++++++[<++++++>-]<.");
interpreter.execute();
```

Check out the spec tests in `spec/BrainFInterpreterSpec.js` for how to use the advanced features like input/output callbacks. 

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## History

`0.0.1 - original version`

## Credits

The [Brainfuck language article](https://en.wikipedia.org/wiki/Brainfuck) on wikipedia

[This article](http://www.richardrodger.com/2013/09/27/how-to-make-simple-node-js-modules-work-in-the-browser/) for making a code base work for node.js and in the browser

## License

Copyright (c) 2016-2017 Steven Miller

Licensed under the MIT License
