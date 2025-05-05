import express from 'express'
import connection from './connection.js';
import router from './routes/router.js';
import cors from 'cors'
import dotenv from 'dotenv';

const app = express()
const port = 3000;
app.use(cors())
app.use(express.json())
dotenv.config();


app.use("/api",router)
connection().then(()=>{
    app.listen(port,()=>{
        console.log(`Server is running on http://localhost:${port}`);
        
    })
})