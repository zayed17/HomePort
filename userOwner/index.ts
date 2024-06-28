import express, { Request, Response } from 'express';

const app = express();
const PORT = 5001;

// Middleware
app.use(express.json());

// Routes
app.get('/user/', (req: Request, res: Response) => {
  res.send('Hello World! This is your Express server running on port ' + PORT);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
