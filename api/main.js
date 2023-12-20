import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());

app.get('/api/exampleMessage', (req, res) => {
    const randomNumber = Math.floor(Math.random() * 100);
    res.json({ message: "I am exampleMessage from the Express server", number: randomNumber });
});

app.listen(3000, () => {
    console.log(`[WEEEEWOOOOO] Server running`);
});

export default app;
