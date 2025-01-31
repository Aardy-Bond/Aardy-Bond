
# Storacha Skeleton Vault 🎃

Storacha Skeleton Vault is a decentralized file storage application built for the **Storacha Halloween Hackathon 2024**. The project leverages **Storacha's blazing-fast decentralized storage** and **Ethereum Sepolia testnet** for secure, verifiable access control. Inspired by the Halloween theme, the spooky-themed interface allows users to upload their "skeletons" (files) securely into decentralized storage, accessible only through proper permissions granted via Ethereum smart contracts.

Storacha is the backbone of the **Storacha Skeleton Vault**, providing a decentralized, resilient, and high-speed storage solution that fits perfectly with the project’s Halloween-inspired theme of securely storing files (or "skeletons") beyond traditional means. Here’s a breakdown of how Storacha is used and highlighted within the project:

### Key Uses of Storacha in the Project

1. **Decentralized File Storage**: Storacha’s decentralized network handles the actual storage of uploaded files, ensuring they are encrypted, safely distributed, and always retrievable. When users upload their files, Storacha processes these files by assigning unique, immutable identifiers, making it possible to retrieve them securely whenever needed.

2. **Data Resilience and Security**: Storacha’s infrastructure is designed to keep files safe from both central server failures and unauthorized access. This aligns with the spooky, “untouchable” theme of storing skeletons safely, ensuring that files aren’t only secure but also resistant to deletion or modification by unauthorized users.

3. **Integration with Ethereum for Access Control**: By combining Storacha with Ethereum smart contracts, users control who can access each file directly from the blockchain. The Storacha platform works seamlessly with the **MetaMask wallet** for authentication, enabling users to authorize and restrict access based on permissions set in the Ethereum Sepolia testnet.

4. **Halloween-Themed Storage Interface**: Storacha’s decentralized storage adds depth to the Halloween theme by offering fast, decentralized “skeleton” storage, where users can store their files confidently in a spooky, reliable storage network, highlighted through a hauntingly simple interface built with **HTML, CSS, and JavaScript**.

### Highlighted Storacha Advantages

Storacha’s **speed, security, and verifiability** make it the perfect solution for a decentralized storage project focused on user-controlled access. By leveraging Storacha, this project emphasizes Storacha's hot storage capabilities and compatibility with Ethereum blockchain interactions, showcasing it as a powerful tool for secure, user-friendly decentralized applications.


## Features

- **Decentralized Storage**: Files are stored securely using Storacha’s Web3 storage network.
- **Access Control via Smart Contract**: The Ethereum Sepolia testnet manages permissions, ensuring only authorized users can upload files.
- **Halloween-Themed UI**: A spooky interface with animations and a creepy design to match the Halloween spirit.
- **MetaMask Integration**: Connects to MetaMask for wallet authentication and transactions.

## Technologies Used

- **React**: Frontend framework for the user interface.
- **Node.js and Express**: Backend server for delegation and storage requests.
- **Web3 Storage (Storacha)**: Decentralized storage solution.
- **Ethereum Smart Contract**: Access control on the Sepolia testnet.
- **MetaMask**: For user wallet authentication and blockchain interactions.
- **Ethers.js**: Library for interacting with Ethereum and Sepolia networks.

---

## Installation

### Prerequisites

- **Node.js** and **pnpm** package manager.
- **MetaMask** browser extension (connected to Sepolia testnet).
- **Ethereum Sepolia Test ETH** for test transactions (obtainable from a Sepolia faucet).

### Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Aardy-Bond/Storacha-Hackathon-2024.git
   cd storacha-skeleton-vault
   ```

2. **Install Dependencies**:
   - **Backend**:
     ```bash
     cd backend
     pnpm install
     ```
   - **Frontend**:
     ```bash
     cd ../frontend
     pnpm install
     ```

3. **Set Up Environment Variables**:
   In the `backend/.env` file, add your MetaMask private key and Infura project ID:
   ```plaintext
   PRIVATE_KEY=<Your_MetaMask_Private_Key>
   INFURA_PROJECT_ID=<Your_Infura_Project_ID>
   ```

4. **Deploy the Smart Contract**:
   - Deploy `AccessControl.sol` to Sepolia using Remix or Hardhat.
   - Copy the deployed contract address and ABI for frontend integration.

5. **Start the Application**:
   - **Backend**:
     ```bash
     cd backend
     pnpm start
     ```
   - **Frontend**:
     ```bash
     cd ../frontend
     pnpm start
     ```

6. **Configure MetaMask**:
   - Ensure MetaMask is connected to Sepolia testnet.
   - Fund MetaMask with Sepolia ETH from a faucet if necessary.

---

## Usage

1. **Connect Wallet**: Click **Connect MetaMask** in the frontend.
2. **Request Access**: If not already authorized, request access by interacting with the smart contract. MetaMask will prompt you to confirm the transaction.
3. **Upload File**: After authorization, select a file and click **Upload to Storacha**.
4. **Transaction Fees**: Transactions on Sepolia are covered by test ETH from MetaMask.

---

## Troubleshooting

1. **"Cannot read properties of undefined (reading 'currentSpace')"**:
   - Ensure `currentSpace` is correctly initialized in `delegationService.js`.
   - Check for console logs indicating issues during space creation or retrieval.

2. **"Failed to upload" Error**:
   - Confirm that the `w3up-client` is configured correctly and initialized in `delegationService.js`.
   - Verify the contract is deployed and the address is correct in `App.js`.

3. **Address Already in Use**:
   - If you see an error indicating port 3000 is in use, kill the existing process or change the port in `server.js`.

4. **MetaMask Network Issues**:
   - Ensure MetaMask is set to Sepolia.
   - Use the `wallet_switchEthereumChain` method in the frontend code to prompt users to switch networks if needed.

---

## Future Enhancements

- **Add Multi-User Access Control**: Enable file upload permissions for multiple users.
- **Implement File Encryption**: Add an encryption layer to enhance data security.
- **Automated Testing**: Add tests for smart contract interactions and frontend functions.
- **Expand Theme Options**: Provide more themes for different holidays or events.

---

## License

This project is open-source under the MIT License.
