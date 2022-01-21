require("dotenv/config");
const { BN, constants, expectEvent, expectRevert } = require('@openzeppelin/test-helpers');
const RugPullFrens = artifacts.require("RugPullFrens");

async function getCurTime() {
    const blockNum = await web3.eth.getBlockNumber();
    const curTime = (await web3.eth.getBlock(blockNum)).timestamp;
    return curTime;
}

async function mint(quantity, mintPrice, targetAccount) {
    await contract.mintFrens(quantity, {from: targetAccount, value: quantity.mul(mintPrice), gas: 208349});
    let balance = await contract.balanceOf(targetAccount);
    console.log(targetAccount, balance.toString());
    expect(balance).to.be.bignumber.gte(new BN('1'));
}

async function iterMint(quantity, mintPrice, accountsList) {
    await Promise.all(accountsList.slice(0, 3).map(async (account) => {
        await mint(quantity, mintPrice, account);
    }));
}

async function startPublicSale() {
    //let now = Math.floor(new Date().getTime() / 1000);
    const now = await getCurTime();
    const timeInterval = 60;
    const end = now + timeInterval*60;
    await contract.setPublicSale(true, now.toString(), end.toString());
    expect(await contract.isPublicSaleActive()).to.be.equal(true);
}

async function distributeAllBudget(accountsList) {
    for (let i=1; i<accountsList.length; i++) {
        if (parseFloat(web3.utils.fromWei(await web3.eth.getBalance(accountsList[i]), 'ether')) < 0.35) {
            await web3.eth.sendTransaction({to: accountsList[i], from: accountsList[0], value: web3.utils.toWei("0.35", "ether")});
            expect(parseFloat(web3.utils.fromWei(await web3.eth.getBalance(accountsList[i]), 'ether'))).to.be.gte(0.35);
        }
    }
}

//console.log(Math.floor(new Date().getTime() / 1000));

describe("Mint NFT with robot", function() {
    let accounts;
    let mintPrice;
    beforeEach(async function () {
        accounts = await web3.eth.getAccounts();
        owner = accounts[0];
        mintPrice = new BN(web3.utils.toWei('0'));
        quantity = new BN('1');
        contract = await RugPullFrens.at(process.env.MURMURCAT_TESTCONTRACT_ADDR);
    });

    describe("Minting", function() {
        /*it("Deploy new contract", async function() {
            const contract = await MurMurCat.new();
        });*/
        it("Mint 3 MMC should return 3 with balanceOf", async function() {
            console.log(accounts);
            //await startPublicSale();
            //let initBalance = web3.utils.fromWei(await web3.eth.getBalance(owner), 'ether');
            //await distributeAllBudget(accounts);
            await iterMint(quantity, mintPrice, accounts);
            //await contract.mintFrens(new BN('1'), {from: accounts[0], value: new BN('1').mul(mintPrice)});
            //await contract.mintFrens(new BN('2'), {from: accounts[0], value: new BN('2').mul(mintPrice)});
            //await contract.mintFrens(new BN('3'), {from: accounts[0], value: new BN('3').mul(mintPrice)});
        });
    });
})