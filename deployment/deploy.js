const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log(`Starting deployment from account: ${deployer.address}`);

  const contestants = ['PRATHAM SAHU', 'DEVANSH JAIN', 'RAHUL JHA','RIDIN DATTA'];
  const PollContractFactory = await hre.ethers.getContractFactory("Poll");
  
  console.log("Deploying the contract...");
  const poll = await PollContractFactory.deploy(contestants);
  await poll.deployTransaction.wait();
  
  console.log(`Poll contract has been deployed to: ${poll.address}`);
}

main()
  .then(() => process.exit(0))
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
