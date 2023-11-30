import logo from './logo.svg';
import './App.css';
import React, { useRef, useEffect, useState } from "react";
import getBlockchain from './ethereum.js';
import digestMessage from './crypto.js';

function App() {
  const [token, setToken] = useState("");
  const [signerAddress, setWallet] = useState("");
  const [sendTo, setSend] = useState("");
  const [hash, sethash] = useState("");
  const [secret, setSecret] = useState("");
  const [hashOnChain, sethashChain] = useState("");

  const inputRefHash = useRef();
  const inputSendTo = useRef();

  const submitHandler = async(e) => {
    e.preventDefault();
    setSend(inputSendTo.current.value);
    let secret = await digestMessage(Math.floor(Math.random() * 9999999999999999999).toString());
    await setSecret(secret)
    let hashed = await digestMessage(inputRefHash.current.value + secret);
    await sethash(hashed);
    await token.transfer(inputSendTo.current.value, 1, hashed);
    console.log(await token.HashOf(signerAddress));
  }

  const checkHashOnChain = async(e) => {
    e.preventDefault();
    let chainHash = await token.HashOf(signerAddress);    
    sethashChain(chainHash);
  }

  useEffect(() => {
    const init = async () => {
      const { signerAddress, token } = await getBlockchain();
      setToken(token);
      setWallet(signerAddress);
    };
    init();
  }, []);

  let text = '';

  if(typeof token === 'undefined') {
    text = 'Loading...';
  } else 
  {
    
    text = 'Loaded contract at ' + token.target + ' with wallet ' + signerAddress;
  }
  

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {text}
        </p>
        <form onSubmit={submitHandler}>
          <input ref={inputSendTo} placeholder='Crypto Address'/>
          <input ref={inputRefHash} placeholder='Session Secret'/>
          <button type="submit">Submit</button>
        </form>

      <p> Sent address: <b>{sendTo}</b></p>
      <p> Hash: <b>{hash}</b></p>
      <p> Secret: <b>{secret}</b></p>
      <br></br>
      <button onClick={checkHashOnChain}>Check Chain Hash</button>
      <p> Has on Chain: <b>{hashOnChain}</b></p>
      </header>
    </div>
  );
}

export default App;
