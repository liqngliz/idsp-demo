async function main(){
    const [deployer] = await ethers.getSigners();
    console.log(`deploying with account: ${deployer.address}`);
    const balance = await deployer.getBalance();
    console.log(`account balance: ${balance.toString()}`);

    const myContract = await hre.ethers.getContractAt("Token", '0x5FbDB2315678afecb367f032d93F642f64180aa3');
  
    const mintToken = await myContract.transfer('0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266', 1000, 'someHash1');
    console.log("Trx hash:", mintToken.hash);
    console.log("balance:", await myContract.balanceOf('0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'));

}

main()
    .then(()=> process.exit(0))
    .catch(error => {
        console.log(error);
        process.exit(1);
    });