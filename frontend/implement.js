import { ethers } from "./ethers.js";

async function init() {
  const accounts = await ethereum.request({ method: "eth_accounts" });
  if (accounts.length === 0) {
    window.location.href = "index.html";
    return;
  }

  if (window.ethereum) {
    console.log('MetaMask is installed!');
  }

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const network = await provider.getNetwork();
  console.log(network);

  const signer = provider.getSigner();
  const account = await signer.getAddress();
  console.log(account);

  const balance = ethers.utils.formatEther(await signer.getBalance());
  console.log(balance);

  document.getElementById('user').textContent = `Currently Connected to : ${account}`;

  const contractAddress = "0x87e94802E452678E2d48B1184f0c10577C6F6F03"
  const abi = [];

  const contract = new ethers.Contract(contractAddress, abi, signer);

  setupEventHandlers(contract, account);
}

function setupEventHandlers(contract, account) {
  document.getElementById('register').addEventListener('click', async () => {
    try {
      const registerVoterTx2 = await contract.registerVoter(account);
      console.log("Registered");
      alert("Transaction in progress. You will receive a confirmatory message from MetaMask once you have been successfully registered.");
      await registerVoterTx2.wait();
    } catch (err) {
      console.error(err);
      alert("An error occurred while registering the voter.");
    }
  });

  document.getElementById('castVote').addEventListener('click', async () => {
    try {
      const pref1 = document.getElementById('candidate1').value;
      const pref2 = document.getElementById('candidate2').value;
      const pref3 = document.getElementById('candidate3').value;
      const castVoteTx2 = await contract.castVote(pref1 - 1, pref2 - 1, pref3 - 1);
      console.log("Voted");
      alert("Transaction in progress. You will receive a confirmatory message from MetaMask once your response has been successfully registered.");
      await castVoteTx2.wait();
    } catch (err) {
      console.error(err);
      alert("An error occurred while accepting response.");
    }
  });

  document.getElementById('winningCandidate').addEventListener('click', async () => {
    try {
      const voterInfo = await contract.voters(account);
      if (!voterInfo.voted) {
        alert("Error. Cant Fetch the current standings as the voter has not yet voted.");
        return;
      }

      const currentStandings = await contract.currentStanding();
      ['pratham', 'devansh', 'rahul', 'ridin'].forEach((id, i) => {
        document.getElementById(id).textContent = currentStandings[i].score;
      });
    } catch (err) {
      console.error(err);
      alert("Can't get the currently winning candidate as no votes have been cast yet.");
    }
  });
}

init();
