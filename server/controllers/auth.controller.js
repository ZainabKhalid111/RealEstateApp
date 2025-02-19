import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";

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
        password: hashedPassword,
      },
    });

    // console.log(newUser);
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to create User" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    //check if user exists
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    //  check if the password is correct
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    //if user and password is valid then generate cookie token and send to the user

    const age = 1000 * 60 * 60 * 24 * 7; // 1 week
    const secretKey = process.env.JWT_SECRET_KEY;
    // setting jwt token instead of cookies
    const token = jwt.sign(
      {
        id: user.id,
        isAdmin:false //if role is admin
      },
      secretKey,
      {
        expiresIn: age,
      }
    );

    // res.setHeader("Set-Cookie", "test=" + "myValue").json("Success!")

    const { password: userPassword, ...userInfo } = user;
    res
      .cookie("token", token, {
        httpOnly: true,
        // secure:true // can use it with https url
        maxAge: age,
      })
      .status(200)
      .json(userInfo);
  } catch (error) {
    res.status(500).json({ message: "Failed to login!" });
  }
};

export const logout = (req, res) => {
  res
    .clearCookie("token")
    .status(200)
    .json({ message: "Logout successfully!" });
};
