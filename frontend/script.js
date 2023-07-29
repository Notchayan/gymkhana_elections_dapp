import { ethers } from "./ethers.js";

class WalletConnector {
  constructor(provider) {
    this.provider = provider;
  }

  isWalletInstalled() {
    return typeof window.ethereum !== 'undefined';
  }

  async requestAccounts() {
    try {
      await this.provider.send("eth_requestAccounts", []);
    } catch (error) {
      console.error("Failed to access user's accounts:", error);
      throw error;
    }
  }

  redirectTo(page) {
    window.location.href = page;
  }

  async connect() {
    if (this.isWalletInstalled()) {
      console.log('Wallet is installed!');
      try {
        await this.requestAccounts();
        console.log("Successfully connected to the wallet.")
        this.redirectTo("secondpage.html");
      } catch (error) {
        console.error("Failed to connect to the wallet.");
      }
    } else {
      console.log('Wallet is not installed.');
    }
  }
}

const provider = new ethers.providers.Web3Provider(window.ethereum);
const connector = new WalletConnector(provider);
document.getElementById('connect').addEventListener('click', () => connector.connect());
