import bcrypt from 'bcrypt';


export const register = async(req, res) => {
    const {username, email, password} = req.body;
    //hash the password
const hashedPassword = await bcrypt.hash(password, 10);
    //create new user
    console.log(hashedPassword)
}

export const login = (req, res) => {
    console.log("login")
}

export const logout = (req, res) => {
    console.log("logout")
}