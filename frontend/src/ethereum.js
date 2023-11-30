import { Contract } from 'ethers';
import Token from './Token.json';


const ethers = require("ethers")

const getBlockchain = () =>
  new Promise((resolve, reject) => {
    window.addEventListener('load', async () => {
      if(window.ethereum) {
        await window.ethereum.enable();
        const provider =  new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const signerAddress = await signer.getAddress();
        const token = new ethers.Contract(
          Token.address,
          Token.abi,
          signer
        );
        resolve({signerAddress, token});
      }
      resolve({signerAddress: undefined, token: undefined});
    });
  });


export default getBlockchain;