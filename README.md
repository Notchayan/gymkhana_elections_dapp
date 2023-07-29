# Decentralized Gymkhana Election DApp

## Introduction

The Decentralized Gymkhana Election DApp is a comprehensive application aimed at democratising Gymkhana elections through blockchain technology. Utilizing the Ethereum blockchain, this DApp provides a secure and transparent platform for participants to elect their SNT Council General Secretary. The election process is facilitated by smart contracts, ensuring an immutable and accountable voting procedure.

This README file offers an in-depth insight into the functionalities, usage, and underlying technologies of the Gymkhana Elections DApp.

## Features

### 1. Voter Registration

Users can connect their MetaMask wallet to the DApp and register as voters. The Ethereum address from MetaMask will be used for registration. Registration is open only for those who have not yet cast their votes.

### 2. Vote Casting

Registered users can cast votes for their preferred candidates by entering the index numbers of their first, second, and third preferences. Points allocation for preferences are 5, 3, and 1 respectively. Once the "Cast Vote" button is clicked, the votes get registered for the respective candidates.

### 3. Current Standings

Post voting, users can view the current standings of candidates by clicking the "Update Standings" button. This feature displays the candidates' scores and their current positions in a tabular layout.

## Using the DApp

### 1. Prerequisites

Before accessing the DApp, ensure you have the MetaMask extension installed in your web browser and an Ethereum account with sufficient ETH for gas fees.

### 2. Accessing the DApp

You can access the DApp frontend hosted at https://gymkhanaelections.netlify.app/ or open index.html from the frontend folder. To connect your MetaMask wallet to the DApp, click the "Connect to MetaMask Account" button. Grant the DApp access to your Ethereum account when prompted by MetaMask.

### 3. Registration

Once connected to MetaMask, you will be redirected to the election.html page. Click the "Register" button to register as a voter. Registration is a one-time process and cannot be performed after voting.

### 4. Casting Votes

Input the index numbers of your top three candidates into the given fields. After entering your preferences, click the "Cast Vote" button. Confirm the transaction on the MetaMask popup. Voting is restricted to once per registered account.

### 5. Viewing Current Standings

After voting, you can view the current standings by clicking the "Update Standings" button. The updated candidate scores will be shown in a table format.

### 6. Post Voting

For security reasons, it's recommended to disconnect your MetaMask account and refresh the page after casting your vote.

## Conclusion

The Decentralized Gymkhana Election DApp offers a secure and transparent platform for users to participate in the election process. With seamless connectivity to MetaMask wallets, easy voter registration, vote casting, and real-time standings, the DApp ensures a user-friendly experience.

The integrity of the election process is preserved through the Ethereum blockchain and smart contracts, making the DApp a trusted tool for conducting Gymkhana elections.

Please note, the provided code snippets and DApp are for demonstration purposes. In a real-world scenario, considerations for security, voter authentication, vote duplication prevention, and voter anonymity would be critical. The DApp should be thoroughly audited and tested before being deployed in a live environment.
