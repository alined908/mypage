const AlinedTicket = artifacts.require("AlinedTicket");
const truffleAssert = require('truffle-assertions');

contract('AlinedTicket', (accounts) => {

    beforeEach(async () => {
        alinedTicket = await AlinedTicket.new();
        instance = alinedTicket;
        await instance.mint(accounts[0]);
     });

    it ('should allow user to mint nft', async() => {
        const numTokens = await instance.balanceOf.call(accounts[0]);
        assert.equal(numTokens, 1);
    })

    it ('should allow anyone to check tokenID of ticked owned by address', async () => {
        const tokenID = await instance.tokenIDOwnedByAddress.call(accounts[0]);
        assert.equal(tokenID, 1);
    }) 

    it ('should not allow anyone to hold more than one ticket', async () => {
        await truffleAssert.reverts(instance.mint(accounts[0]), null, "Account must not have minted before");
    })

    it('should allow user to burn', async () => {
        const tokenID = await instance.tokenIDOwnedByAddress.call(accounts[0]);
        await instance.burn(tokenID);
        const numOwned = await instance.balanceOf.call(accounts[0]);
        assert.equal(numOwned, 0);
    })

    it ('should not allow user to mint after burn', async() => {
        const tokenID = await instance.tokenIDOwnedByAddress.call(accounts[0]);
        await instance.burn(tokenID);
        await truffleAssert.reverts(instance.mint(accounts[0]), null, "Account must not have minted before");
    })
})