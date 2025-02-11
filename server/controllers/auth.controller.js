import bcrypt from 'bcrypt';
import prisma from '../lib/prisma.js';


export const register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        //hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        //create new user
        const newUser = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword
            }
        })

        console.log(newUser);
        res.status(201).json({ message: "User created successfully" })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to create User" })
    }
}

export const login = (req, res) => {
    const { email, password } = req.body;
    try {
        //check if user exists
        const user = prisma.user.findUnique({ where: { email } });

        if (!user) res.status(401).json({ message: "Invalid credentials" })

        //  check if the password is correct

        const passwordValid = bcrypt.compare(password, user.password);
        if (!passwordValid) res.status(401).json({ message: "Invalid credentials" })


        //generate cookie token and send to the user
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to login!" })
    }

}

export const logout = (req, res) => {
    console.log("logout")
}