import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import db from "./mongoC.js";

dotenv.config();

const port = 4000;
const app = express();

// const corsOptions = {
//   origin: 'http://3.83.248.93:3000', // Replace with the allowed origin
//   optionsSuccessStatus: 200 // Some legacy browsers choke on 204
// };
app.use(cors({
    origin: '*', // Allow all origins
    optionsSuccessStatus: 200
  }));

app.use(cors(corsOptions));

// Parses the text as url encoded data
app.use(bodyParser.urlencoded({ extended: true }));

// Parses the text as json
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World, from express shakil');
});

app.post('/addUser', async (req, res) => {
  try {
    const collection = await db.collection("users");
    const newDocument = req.body;
    newDocument.date = new Date();
    const result = await collection.insertOne(newDocument);
    console.log("Request body:", req.body);
    res.status(201).send(result); // 201 Created
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/getUsers', async (req, res) => {
  try {
    const collection = await db.collection("users");
    const results = await collection.find({}).toArray();
    res.status(200).send(results); // 200 OK
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is listening at port: ${port}`);
});
