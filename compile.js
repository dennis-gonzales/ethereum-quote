const path = require('path');
const fs = require('fs');
const solc = require('solc');

const animePath = path.resolve(__dirname, 'contracts', 'Quote.sol');
const source = fs.readFileSync(animePath, 'utf-8');

module.exports = solc.compile(source, 1).contracts[':Quote'];

/*
    Requiring compile.sj script(Creating an instance) returns a:
    Interface ->  ABI
    Bytecode -> Compiled contract 
*/