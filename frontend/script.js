import { ethers } from "./ethers.js";

const provider = new ethers.providers.Web3Provider(window.ethereum);

const isMetaMaskInstalled = () => {
    return (typeof window.ethereum !== 'undefined') ? true : false;
}

const requestAccounts = async () => {
    try {
        await provider.send("eth_requestAccounts", []);
    } catch (error) {
        console.error("Request to access accounts failed:", error);
        throw error;
    }
}

const navigateToElectionPage = () => {
    window.location.href="election.html";
}

const initializeConnection = async () => {
    if (isMetaMaskInstalled()) {
        console.log('MetaMask is installed!');
        try {
            await requestAccounts();
            console.log("Sucessfully connected to MetaMask Wallet.")
            navigateToElectionPage();
        } catch (error) {
            console.error("Failed to connect to MetaMask Wallet.");
        }
    } else {
        console.log('MetaMask is not installed.');
    }
}

document.getElementById('connect').addEventListener('click', initializeConnection);
