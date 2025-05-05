import userSchema from "../models/user.model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const signUp = async function signUp(req, res) {
    try {
        const { username, email, password } = req.body;

        if (!(username && email && password)) {
            return res.status(400).json({ message: "Please fill all the details." });
        }

        const existingUser = await userSchema.findOne({ email });

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
