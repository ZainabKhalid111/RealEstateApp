import prisma from "../lib/prisma.js";
import bcrypt from 'bcrypt'

export const getUsers = async (req, res) => {
    try {

        const users = await prisma.user.findMany();
        res.status(200).json(users);

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Failed to get users" })
    }
}

export const getUser = async (req, res) => {
    const id = req.params.id
    try {
        const users = await prisma.user.findUnique({
            where: { id }
        });
        res.status(200).json(users);

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Failed to get user" })
    }
}

export const updateUser = async (req, res) => {
    const id = req.params.id; //id from params
    const userId = req.userId; //id from cookies
    const { password, avatar, ...inputs } = req.body;

    if (id !== userId) {
        return res.status(403).json({ message: "Not Authorized" });
    }
    let updatedPassword = null;

    try {

        if (password) {
            updatedPassword = await bcrypt.hash(password, 10)
        }
        const updateUser = await prisma.user.update({
            where: { id },
            data: {
                ...inputs,
                ...(updatedPassword && { password: updatedPassword }),
                ...(avatar && { avatar })
            }
        });

        const {password:userPassowrd, ...rest} = updateUser
        res.status(200).json(rest);

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Failed to update user" })
    }
}

export const deleteUser = async (req, res) => {
    const id = req.params.id; //id from params
    const userId = req.userId; //id from cookies

    if (id !== userId) {
        return res.status(403).json({ message: "Not Authorized" });
    }
    try {
        const updateUser = await prisma.user.delete({
            where: { id },
        })

        res.status(200).json({ message: "User Deleted" });

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Failed to delete user" })
    }
}