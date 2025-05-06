import express from 'express'
import connection from './connection.js';
import router from './routes/router.js';
import cors from 'cors'
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';





const app = express()
const port = 3010;
app.use(cors())
app.use(express.json())
dotenv.config();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// console.log(__dirname);


app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use("/api",router)
connection().then(()=>{
    app.listen(port,()=>{
        console.log(`Server is running on http://localhost:${port}`);
        
    })
})