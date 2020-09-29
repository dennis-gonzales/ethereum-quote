const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const { interface, bytecode } = require('../compile.js');

const INITIAL_QUOTE = 'When words fail, action speaks';

let accounts;
let inbox;

beforeEach(async () => {
    // get list of accounts
    accounts = await web3.eth.getAccounts();

    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: [INITIAL_QUOTE] })
        .send({ from: accounts[0], gas: '1000000' });
});

describe('Quote', () => {
    it('is deployed', () => {
        assert.ok(inbox._address);
    });
    it('has a quote', async () => {
        const message = await inbox.methods.quote().call();
        assert.ok(message);
    });
    it('can quote change', async () => {
        await inbox.methods.updateQuote('Hello World!').send({from: accounts[0]});
        const message = await inbox.methods.quote().call();
        assert.strictEqual(message, 'Hello World!');
    });
})