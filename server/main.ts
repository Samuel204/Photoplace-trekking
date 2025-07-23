
import express, { Request, Response } from 'express'
import cors from 'cors'
const app = express()
const port = 3000

// Enable CORS for all origins
app.use(cors())

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
})

app.get("/escursioni", (req: Request, res: Response) => {
  res.send(
    [{
      id: 1,
      name: "Escursione al Monte Bianco",
      description: "Una splendida escursione al Monte Bianco.",
      difficulty: "Alta"
    },
    {
      id: 2,
      name: "Escursione al Lago di Como",
      description: "Un'escursione panoramica attorno al Lago di Como.",
      difficulty: "Media"
    }
  ]);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})