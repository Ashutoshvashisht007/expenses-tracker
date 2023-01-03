import User from "../models/User.js";
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";

const categories = [
    { label: "Travel", icon: "user" },
    { label: "Shppping", icon: "user" },
    { label: "Investment", icon: "user" },
    { label: "Bills", icon: "user" },
]

export const register = async (req,res) => {
    // get all form data
    const {email, password, firstname, lastname} = req.body;

    // check if user exists with same email
    const userExists = await User.findOne({email});
    if(userExists)
    {
        res.status(406).json({message: "User already exists."});
        return;
    }
    
    // hash the password
    const saltRounds = 10;
    const salt = await bcrypt.genSaltSync(saltRounds);
    const hashedPassword = await bcrypt.hashSync(password,salt);
    console.log(hashedPassword);

    // creating user
    const user = await User({
        email,
        password: hashedPassword, 
        firstname, 
        lastname,
        categories,
    });
    await user.save();
    // store user
    res.status(201).json({message: "User Created"});
}

export const login = async (req,res)=> {
    const {email, password} = req.body;

    const userExists = await User.findOne({email});
    if(!userExists)
    {
        res.status(406).json({message: "Credentials not found"});
        return;
    }

    const matched = await bcrypt.compare(password,userExists.password);
    if(!matched)
    {
        res.status(406).json({message: "Either password is wrong or email does not exists"});
        return;
    }

    // create jwt token

    const payload = {
        username: email,
        _id: userExists._id,
    }
    const token = jwt.sign(payload,process.env.JWT_SECRET);
    res.json({message: "Successfully loggen in", token, userExists});
}