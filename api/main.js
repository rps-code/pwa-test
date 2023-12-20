import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());

app.get('/api/exampleMessage', (req, res) => {
	res.json({ message: "I am exampleMessage from the Express server" });
});

const port = 3000;
app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`);
});

export default app;