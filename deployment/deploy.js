const { ethers } = require('hardhat');

async function main() {
  await ethers.getContractFactory('Ballot');
  const [deployerAccount] = await ethers.getSigners();
  console.log('Deploying the Ballot contract with the account:', deployerAccount.address);
  const contestantNames = ['PRATHAM SAHU', 'DEVANSH JAIN', 'RAHUL JHA','RIDIN DATTA'];

  const Ballot = await ethers.getContractFactory('Ballot');
  const ballot = await Ballot.deploy(contestantNames);
  await ballot.deployed();
  console.log('Ballot contract deployed to:', ballot.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
