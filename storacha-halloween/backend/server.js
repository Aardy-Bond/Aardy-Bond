import express from 'express';
import dotenv from 'dotenv';
import { delegateAccess, uploadFile } from './delegationService.js';

dotenv.config();

const app = express();
app.use(express.json());

app.post('/upload', async (req, res) => {
    const { file, agentDid } = req.body;
    try {
        await delegateAccess(agentDid);
        await uploadFile(file, agentDid);
        res.send({ message: 'Upload successful!' });
    } catch (error) {
        res.status(500).send({ error: 'Upload failed.' });
    }
});

app.listen(3000, () => console.log('Backend listening on port 3000'));
