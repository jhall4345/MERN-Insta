import Express from 'express';
import cors from 'cors'
import mongoose from "mongoose";
import Pusher from "pusher";
import dbModel from './dbModel.js';

const app = express();
const port =  process.env.Port || 8080;

app.use(express.json())
app.use (cors())

const connection_url = 'mongodb+srv://jh4345:Jh131820!@cluster0.ape1m.mongodb.net/instaDB?retryWrites=true&w=majority'
mongoose.connect(connection_url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.once('open',()=>{
    console.log('DB Connected');
});

app.get('/', (req, res) => res.status(200).send("hello world"))

app.post('/upload',(req, res)=>{
    const body = req.body;

    dbModel.create(body, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send(data);
        }  
    });
});

app.get('/sync', (req, res) => {
    dbModel.find((err,data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        } 
    })
})

app.listen(port, () => console.log(`listening on localhost:${port}`))