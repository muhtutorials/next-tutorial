import { MongoClient } from 'mongodb';

async function handler(req, res) {
    if (req.method === 'POST') {
        const data = req.body;

        const { title, image, address, description } = data;

        const client = await MongoClient.connect('mongodb+srv://igor:spellbound@cluster0.vtkas.mongodb.net/meetups?retryWrites=true&w=majority');
        const db = client.db();

        const meetupsCollection = db.collection('meetups');

        meetupsCollection.insertOne({ title, image, address, description });
    }
}

export default handler