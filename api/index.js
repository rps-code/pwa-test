import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());

app.get('/api/exampleMessage', (req, res) => {
    res.setHeader('Content-Type', 'text/html');

    // Tells the CDN to serve from the cache and update in the background at most once per second
    res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');

    // Return some dummy message for the time being with a random number.
    const randomNumber = Math.floor(Math.random() * 100);
    res.json({ message: `Your random number is ${randomNumber}` });
});

// Listen to port 3000
app.listen(3000, () => {
    console.log(`[WEEEEWOOOOO] Express server running`);
});

export default app;
