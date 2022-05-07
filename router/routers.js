const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwtoken = require('jsonwebtoken');
const cookieParser = require("cookie-parser");
const Authentication = require("../middleware/auth");


require("../db/conn");

const User = require("../model/userSchema");

router.post("/register", async (req, res) => {
    const { name, email, password, domain } = req.body;

    if (!name || !email || !password || !domain) {
        return res.status(422).json({ error: "Plz fill the required fields" })
    }

    try {
        const userExist = await User.findOne({ email: email });

        if (userExist) {
            return res.status(422).json({ error: "Email Already Exiat" });
        } else {
            const user = new User({ name, email, password, domain });
            // password hashing

            await user.save();
            res.status(201).json({ message: "user created" });
        }
    } catch (error) {
        console.log(error);
    }

})

// login router

router.post("/signin", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json({ error: "Plz fill the field properly" })
        }

        const userLogin = await User.findOne({ email: email })

        const userId = userLogin._id;

        if (userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password);
            const token = await userLogin.generateAuthToken();
            console.log(token);

            res.cookie("jwToken", token, {
                expires: new Date(Date.now() + 25892000000),
                httpOnly: true,
            });

            if (!isMatch) {
                return res.status(400).json({ error: "Invalid Credentials" })
            } else {
                return res.status(200).json({ error: "User SignIn Successful", _id: userId });
            }
        } else {
            return res.status(400).json({ error: "Invalid Credentials" })
        }

    } catch (error) {
        console.log(error);
    }
})

// Dashboard Page
router.get("/dashboard", Authentication , (req, res) => {
    console.log("Dashboard Page");
    res.send(req.rootUser);
})

// Get Data from Domain Name
router.post("/domain", async (req, res) => {
    console.log("Domain Page");
    try {
        const {subDomain} = req.body;

        console.log(subDomain[0]);
        
        if (!subDomain) {
            res.status(400).json({ error: "Domain Not Get" })
        }else{
            const userResult =  await User.findOne({ domain: subDomain })
            res.status(200).json({ userResult })
        }

    } catch (error) {
        console.log(error);
    }
})

module.exports = router;