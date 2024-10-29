import { Client } from '@web3-storage/w3up-client';
import { StoreMemory } from '@web3-storage/w3up-client/stores/memory';

// Initialize client with memory storage
export const client = new Client({ store: new StoreMemory() });

// Function to ensure a current space is set before any upload
async function initializeCurrentSpace() {
    try {
        // List available spaces
        const spaces = await client.spaces.list();
        
        if (spaces.length === 0) {
            // Create a new space if none exists
            console.log("No spaces found. Creating a new space...");
            const newSpace = await client.spaces.create("MySpace");
            await client.setCurrentSpace(newSpace.did());
            console.log("New space created and set as currentSpace:", newSpace.did());
        } else {
            // Set the first existing space as current space
            await client.setCurrentSpace(spaces[0].did());
            console.log("Existing space set as currentSpace:", spaces[0].did());
        }
    } catch (error) {
        console.error("Error in initializeCurrentSpace:", error);
        throw new Error("Failed to initialize current space for file upload.");
    }
}

// Function to handle file upload
export async function uploadFile(file) {
    try {
        // Ensure currentSpace is set before uploading
        await initializeCurrentSpace();

        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            
            reader.onload = async () => {
                try {
                    const buffer = reader.result;
                    const cid = await client.uploadFile(new Blob([buffer]));
                    console.log("File uploaded successfully with CID:", cid);
                    resolve(cid);
                } catch (error) {
                    console.error("Error uploading file:", error);
                    reject(error);
                }
            };

            reader.onerror = () => {
                reject(new Error("Failed to read file"));
            };

            reader.readAsArrayBuffer(file);
        });
    } catch (error) {
        console.error("Upload failed in uploadFile:", error);
        throw error;
    }
}