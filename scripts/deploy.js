const fs = require('fs')

async function main(){
    const [deployer] = await ethers.getSigners();
    console.log(`deploying with account: ${deployer.address}`);
    const balance = await deployer.getBalance();
    console.log(`account balance: ${balance.toString()}`);

    const Token = await ethers.getContractFactory('Token');
    const token = await Token.deploy();
    console.log(`Token address: ${token.address}`);
    let send = await token.transfer('0xc2f2F052eA0fd9FaB733c77A146905d25801d90A', 5000, "initialHash");
    let balanceOf = await token.balanceOf('0xc2f2F052eA0fd9FaB733c77A146905d25801d90A');
    console.log (balanceOf);
    const data ={
        address: token.address,
        abi: JSON.parse(token.interface.format('json'))
    };
    fs.writeFileSync('frontend/src/Token.json', JSON.stringify(data));
}

main()
    .then(()=> process.exit(0))
    .catch(error => {
        console.log(error);
        process.exit(1);
    });