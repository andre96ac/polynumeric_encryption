const yargs = require('yargs')



const{ decryptCmd } = require('../src/commands/decrypt.js')
const{ encryptCmd } = require('../src/commands/encrypt.js')

encryptCmd(yargs);
decryptCmd(yargs);

yargs.parse();
