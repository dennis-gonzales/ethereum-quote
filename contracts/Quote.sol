pragma solidity ^0.4.17;

contract Quote {
    string public quote;

    function Quote(string initialQuote) public {
        quote = initialQuote;
    }

    function updateQuote(string newQuote) public {
        quote = newQuote;
    }
}