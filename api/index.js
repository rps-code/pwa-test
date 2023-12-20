import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());

app.get('/api/exampleMessage', (req, res) => {
    // res.setHeader('Content-Type', 'text/html');
    // res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');

    const randomNumber = Math.floor(Math.random() * 100);

    res.json({ message: `I am exampleMessage woohoo ${randomNumber}` });
});

app.listen(3000, () => {
    console.log(`[WEEEEWOOOOO] Server running`);
});

export default app;
