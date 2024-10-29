import { Client } from '@web3-storage/w3up-client';
import { StoreMemory } from '@web3-storage/w3up-client/stores/memory';

let client;

async function initializeClient() {
    if (!client) {
        try {
            // Initialize the client if it's not already initialized
            client = new Client({ store: new StoreMemory() });

            // Retrieve existing spaces or create a new one if none exist
            let spaces = await client.spaces.list();
            if (spaces.length === 0) {
                console.log("No existing spaces found. Creating a new space...");
                const newSpace = await client.spaces.create("MySpace");
                await client.setCurrentSpace(newSpace.did());
                console.log("New space created and set as currentSpace:", newSpace.did());
            } else {
                await client.setCurrentSpace(spaces[0].did());
                console.log("Existing space set as currentSpace:", spaces[0].did());
            }
        } catch (error) {
            console.error("Error initializing client or setting currentSpace:", error);
            throw new Error("Failed to initialize storage client and set currentSpace.");
        }
    }
    return client;
}

async function delegateAccess(agentDid) {
    client = await initializeClient();
    try {
        const delegation = await client.createDelegation(agentDid, ['space/blob/add', 'upload/add']);
        console.log("Delegation created:", delegation);
        return delegation;
    } catch (error) {
        console.error("Error creating delegation:", error);
        throw new Error("Failed to create delegation.");
    }
}

async function uploadFile(file, agentDid) {
    client = await initializeClient();
    try {
        await client.setCurrentSpace(agentDid); // Set agent's DID as current space before uploading
        console.log("Uploading file to currentSpace...");
        await client.uploadFile(file);  // Upload file
        console.log("File uploaded successfully.");
    } catch (error) {
        console.error("Error uploading file:", error);
        throw new Error("Failed to upload file.");
    }
}

export { delegateAccess, uploadFile };
