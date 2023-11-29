/** @type import('hardhat/config').HardhatUserConfig */
require('@nomiclabs/hardhat-waffle');

const INFURA_URL = 'https://goerli.infura.io/v3/331d2a30ee2647df9af791e053749f12';
const PRIVATE_KEY = 'c771b332c71f057e147dab0a0c5bfabd50af119d212e1c9e17ab45bd9cedbf7e';

module.exports = {
  solidity: "0.8.17",
  networks:{
    goerli:{
      url: INFURA_URL,
      accounts: [`0x${PRIVATE_KEY}`]
    }
  }
}
