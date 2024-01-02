import express from 'express';
import bodyParser from 'body-parser';
import MailRoute from "./routes/MailRoute.js";
import dotenv from 'dotenv';
dotenv.config();
const app = express();
app.use(bodyParser.json());


app.use(bodyParser.urlencoded({ extended: false }));

const PORT = process.env.PORT || 8000;

app.use(MailRoute)
app.get("/", (req, res) => {
    res.status(201).json({msg: "welcome to triangle sneacare api"})
})
app.listen(PORT, () => {
    console.log("Server start in " + PORT + " Port")
})
