import userSchema from "../models/user.model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const signUp = async function signUp(req, res) {

    console.log("Inside signup");

    console.log(req.body);
    
    
    try {
        const { username, email, password } = req.body;

        console.log(username);
        

        if (!(username && email && password)) {
            return res.status(400).json({ message: "Please fill all the details." });
        }

        const existingUser = await userSchema.findOne({ email });

        console.log(existingUser);
        

        if (existingUser) {
            return res.status(409).json({ message: "User already exists with this email." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await userSchema.create({
            username,
            email,
            password: hashedPassword
        });

        const token = jwt.sign(
            { userId: newUser._id, email: newUser.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        return res.status(201).json({
            message: "User created successfully",
            token,
            userId: newUser._id
        });

    } catch (err) {
        console.error("Signup Error:", err);
        return res.status(500).json({ message: "Server error while creating user." });
    }
};


export const logIn = async function logIn(req,res) {
    console.log("inside login",req.body);
    
    try {
        const {email, password} = req.body;
        console.log(email,password);
        
        const userExist = await userSchema.findOne({ email });
        console.log("----------------------------");
        

        if (!userExist) {
            return res.status(400).json({ message: "User not found" });

        }
        const ispassMatch = await bcrypt.compare(password, userExist.password);
        if(!ispassMatch){
            return res.status(400).json({ message: "Password is wrong "});
        }

        const token = await jwt.sign({ id: userExist._id }, process.env.JWT_SECRET,{
            expiresIn:"24h",
        })
        res.status(200).json({ message: "Logged in success" ,token});
            console.log('login Suucessfull');
            
    } catch (error) {
        console.error("Login Error:", error);
        res.status(400).json({ error: error.message });
    }
    
}