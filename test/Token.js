const { inputToConfig } = require('@ethereum-waffle/compiler');
const{expect} = require('chai');
const { ethers } = require('hardhat');


describe('Token contract', ()=>{
    let Token, token, owner, addr1, addr2;

    beforeEach(async ()=>{
        Token = await ethers.getContractFactory('Token');
        token = await Token.deploy();
        [owner, addr1, addr2, _] = await ethers.getSigners();
    });

    describe('Deployment', ()=>{
        it('Should set the right owner', async ()=>{
            expect(await token.owner()).to.equal(owner.address);
        }); 

        it('assign total supply to owner', async ()=>{
            const ownerBalance = await token.balanceOf(owner.address);
            expect(await token.totalSupply()).to.equal(ownerBalance);
        });
    });

    describe('Transactions', () => {
        it('transfer tokens between accounts', async () => {
            await token.transfer(addr1.address, 50, 'someHash');
            let addr1Balance = await token.balanceOf(addr1.address);
            let ownerHash = await token.HashOf(owner.address);
            expect(addr1Balance).to.equal(50);
            expect(ownerHash).to.equal('someHash');
            

            await token.connect(addr1).transfer(addr2.address, 50, 'someOtherHash');
            const addr2Balance = await token.balanceOf(addr2.address);
            addr1Balance = await token.balanceOf(addr1.address);
            let addr1Hash = await token.HashOf(addr1.address);

            expect(addr2Balance).to.equal(50);
            expect(addr1Balance).to.equal(0);
            expect(addr1Hash).to.equal('someOtherHash');

            await token.transfer(addr1.address, 50, 'someHash33');
            ownerHash = await token.HashOf(owner.address);
            expect(ownerHash).to.equal('someHash33');

        });
    });

    describe('Insufficient funds', () => {
        it('fail on insufficient funs', async () => {
            const initialBalanceOwner = await token.balanceOf(owner.address);

            await expect(
                token.connect(addr1).transfer(addr2.address, 1, 'someHash')
            ).to.be.revertedWith('Not Enough Tokens');
            
            expect(
                await token.balanceOf(owner.address)
            ).to.equal(initialBalanceOwner);

        });

        it('updates balance after transfers', async () =>{
            const initialBalanceOwner = await token.balanceOf(owner.address);

            await token.transfer(addr1.address, 100, 'someHash');
            await token.transfer(addr2.address, 50, 'someHash2');

            const finalBalanceOwner = await token.balanceOf(owner.address);

            expect(finalBalanceOwner).to.equal(initialBalanceOwner - 150);

            const addr1Balance = await token.balanceOf(addr1.address);
            expect(addr1Balance).to.equal(100);
            const addr2Balance = await token.balanceOf(addr2.address);
            const addr2hash = await token.HashOf(addr2.address);
            expect(addr2Balance).to.equal(50);

        });
    });

});