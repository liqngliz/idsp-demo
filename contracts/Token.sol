// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import 'hardhat/console.sol';

contract Token {
    string public name = 'My Hardhat Access Token Challenge';
    string public symbol = 'MHTC';
    uint public totalSupply = 99999999;
    //string[] hashes;
    uint currentHashNumber = 0;
    address public owner;
    mapping (address => uint) balances;
    mapping (address => string) tokenChallengeHash;

    constructor(){
        balances[msg.sender] = totalSupply;
        owner = msg.sender;
    }

    function transfer(address to, uint amount, string memory challengeHash) external {
        require((balances[msg.sender] >= amount), 'Not Enough Tokens');
        balances[msg.sender] -= amount;
        balances[to] += amount;
        /*
        if(currentHashNumber == 0){
            hashes.push('');
            currentHashNumber = currentHashNumber + 1;
        }
        */
        //hashes.push(challengeHash);
        tokenChallengeHash[msg.sender] = challengeHash;
        console.log('Current hash number', currentHashNumber);
        console.log('Sender tokenChallengeHash position', tokenChallengeHash[msg.sender] );
        currentHashNumber = currentHashNumber + 1;
        
    }

    function balanceOf(address account) external view returns(uint){
        return balances[account];
    }

    function HashOf(address account) external view returns(string memory){
        console.log('hash of', account);
        console.log('Sender tokenChallengeHash', tokenChallengeHash[account] );
        return tokenChallengeHash[account];
    }


}