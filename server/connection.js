import { log } from "console";
import mongoose from "mongoose";

export default async function connection() {
    const db = await mongoose.connect("mongodb://localhost:27017/Blog")
    console.log('DataBase connected');

    return db
    
}