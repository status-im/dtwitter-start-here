// our DTwitter contract object to test
const DTwitter = require('Embark/contracts/DTwitter');

// contract methods we'll be testing
const { createAccount, users, owners, userExists, editAccount, tweet } = DTwitter.methods;

// variables that will be updated in the tests
let accounts;

// set up our config test parameters
config({
  contracts: {
    DTwitter: {
      // would pass constructor args here if needed
    }
  }
}, (err, theAccounts) => {
  // this is the list of accounts our node / wallet controls.
  accounts = theAccounts;
});

// other test parameters
const username = 'testhandle';
const description = 'test description';
const tweetContent = 'test tweet';

// Embark exposes a global contract method as an alias
// for Mocha.describe
contract("DTwitter contract", function () {
  this.timeout(0);

  it("transaction to create a dtwitter user 'testhandle' with description 'test description' should be successful", async function () {

    // do the create account
    const createAccountTx = await createAccount(username, description).send();

    // assert that the transaction was successful
    assert.equal(createAccountTx.status, true);

  });

  it("should have created a user 'testhandle'", async function () {

    // TODO: get user details from contract

    // check the values returned from the contract are correct
    assert.equal(user.username, username);
    assert.equal(user.description, description);

  });

  it("should have created an owner for our defaultAccount", async function () {
    
    // TODO: read from the owners mapping using web3.eth.defaultAccount

    // check the return value from owners mapping matches
    assert.equal(usernameHash, web3.utils.keccak256(username));
  });

  it("should know 'testhandle' exists", async function () {
    const usernameHash = web3.utils.keccak256(username);

    // TODO: call the contract method 'userExists' with the username 
    // hash to see if that username hash exists in the users mapping
    
    // check that the contract agrees the user exists
    assert.equal(exists, true);
  });


  it("should be able to edit 'testhandle' user details", async function () {
    const usernameHash = web3.utils.keccak256(username);
    const updatedDescription = description + ' edited';
    const updatedImageHash = 'QmWvPtv2xVGgdV12cezG7iCQ4hQ52e4ptmFFnBK3gTjnec';

    // TODO: update the account details in our contract using the editAccount
    // function in the contract
    
    // TODO: retrieve the updated user details from the user mapping in the contract

    // check our updated values match the input
    assert.equal(updatedUserDetails.description, updatedDescription);
    assert.equal(updatedUserDetails.picture, updatedImageHash);
  });

  it("should be able to add a tweet as 'testhandle' and receive it via contract event", async function () {
    const usernameHash = web3.utils.keccak256(username);
    
    // TODO: Subscribe to the NewTweet contract event using the
    // usernameHash as the _from filter. When data is received
    // from the subscription, check that the tweet value from the
    // contract is the same as the tweeted content.

    // TODO: send the tweet to the contract which should trigger
    // the NewTweet event subscription above
  });

});
