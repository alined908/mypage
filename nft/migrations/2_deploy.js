const AlinedTicket = artifacts.require("AlinedTicket");

module.exports = function(deployer) {
    deployer.deploy(AlinedTicket);
  };