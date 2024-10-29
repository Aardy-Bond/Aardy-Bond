import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { client } from './api';
import './styles.css';
import { uploadFile } from './api';

const CONTRACT_ADDRESS = "0x4aC093E5c35A9B7cD0B59a15bF4E6cF5710cA74d"; 
const CONTRACT_ABI = [
  [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "user",
          "type": "address"
        }
      ],
      "name": "AccessGranted",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "user",
          "type": "address"
        }
      ],
      "name": "AccessRevoked",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_user",
          "type": "address"
        }
      ],
      "name": "grantAccess",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_user",
          "type": "address"
        }
      ],
      "name": "revokeAccess",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "authorizedUsers",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_user",
          "type": "address"
        }
      ],
      "name": "isAuthorized",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ], 
  {
    "inputs": [{"internalType": "address","name": "_user","type": "address"}],
    "name": "grantAccess",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
},
{
    "inputs": [{"internalType": "address","name": "_user","type": "address"}],
    "name": "revokeAccess",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
},
{
    "inputs": [{"internalType": "address","name": "_user","type": "address"}],
    "name": "isAuthorized",
    "outputs": [{"internalType": "bool","name":"","type":"bool"}],
    "stateMutability": "view",
    "type": "function"
}
];

function App() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('Upload your skeletons... if you dare!');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [account, setAccount] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
      if (account) checkAuthorization();
  }, [account]);

  const connectWallet = async () => {
      try {
          if (window.ethereum) {
              const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
              setAccount(accounts[0]);
              setStatus(`Connected with ${accounts[0]}`);
          } else {
              setStatus("MetaMask is not installed.");
          }
      } catch (error) {
          console.error("Failed to connect MetaMask:", error);
          setStatus(`Failed to connect MetaMask: ${error.message || "Unknown error"}`);
      }
  };

  const checkAuthorization = async () => {
      try {
          const provider = new ethers.BrowserProvider(window.ethereum);
          const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
          const authorized = await contract.isAuthorized(account);
          setIsAuthorized(authorized);
          setStatus(authorized ? "You are authorized to upload!" : "You need to request access to upload.");
      } catch (error) {
          console.error("Authorization check failed:", error);
          setStatus(`Authorization check failed: ${error.message || "Unknown error"}`);
      }
  };

  const grantAccess = async () => {
      if (!account) await connectWallet();

      try {
          const provider = new ethers.BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();
          const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

          setStatus("Requesting access...");
          const tx = await contract.grantAccess(account);
          await tx.wait();
          setIsAuthorized(true);
          setStatus("Access granted! You can now upload.");
      } catch (error) {
          console.error("Failed to grant access:", error);
          setStatus(`Failed to grant access: ${error.message || "Unknown error"}`);
      }
  };

  const handleFileChange = (event) => setFile(event.target.files[0]);

  const handleUpload = async () => {
      if (!isAuthorized) {
          setStatus("Access not granted. Requesting access...");
          await grantAccess();
          return;
      }

      if (!file) {
          setStatus("Please select a file to upload.");
          return;
      }

      try {
          setUploading(true);
          setStatus('Initializing upload process...');
          const cid = await uploadFile(file);
          setStatus(`Success! Your skeleton has been stored with CID: ${cid}`);
      } catch (error) {
          console.error("Upload failed:", error);
          if (error.message.includes("verify")) {
              setStatus("Please check your email and click the verification link, then try again.");
          } else {
              setStatus(`Upload failed: ${error.message}`);
          }
      } finally {
          setUploading(false);
      }
  };

  return ( <div className="app">
    <div className="header">
        <h1 className="title">🎃 STORACHA VAULT 🎃</h1>
        <p className="subtitle">Store your spooky skeletons in the fiery depths.</p>
    </div>
    <div className="content">
        <button className="connect-button" onClick={connectWallet} disabled={uploading}>
            {account ? `Connected: ${account}` : "Connect MetaMask"}
        </button>
        <input
            className="file-input"
            type="file"
            onChange={handleFileChange}
            disabled={uploading}
        />
        <button
            className="upload-button"
            onClick={handleUpload}
            disabled={uploading || !file}
        >
            {uploading ? "Uploading..." : "Upload to Storacha"}
        </button>
        <p className="status">{status}</p>
    </div>
    <div className="footer">
        <div className="footer-content">
            <h2 className="footer-title">About Storacha Vault</h2>
            <p className="footer-text">
            Storacha Skeleton Vault is a Halloween-themed decentralized storage application built for the Storacha Halloween Hackathon 2024. The app enables users to securely upload files ("skeletons") into a decentralized storage network while enforcing access control through an Ethereum smart contract on the Sepolia testnet. With a spooky interface and seamless integration with MetaMask, Storacha Skeleton Vault combines the power of Web3 storage with blockchain-based access control, ensuring only authorized users can upload and manage data. It’s a fast, secure, and festive solution for storing “skeletons” in the Web3 closet!
            </p>
            <div className="footer-animations">
                <div className="bat-container">
                    <div className="bat-1"></div>
                </div>
                <div className="skull-container">
                    <div className="skull-1"></div>
                </div>
            </div>
        </div>
    </div>
    <div className="animations">
        <div className="bat-container">
            <div className="bat-2"></div>
        </div>
        <div className="skull-container">
            <div className="skull-2"></div>
        </div>
    </div>
</div>
  );
}

export default App;