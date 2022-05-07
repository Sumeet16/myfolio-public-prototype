const jwtoken = require("jsonwebtoken");
const User = require("../model/userSchema");

const Authentication = async (req, res, next) => {
    try {

        const token = req.cookies.jwToken;
        console.log(`TOKEN : ${token}`);

        const verify = jwtoken.verify(token, process.env.SCERET_KEY);

        const rootUser = await User.findOne({ _id: verify._id, "tokens.token": token });

        if (!rootUser) {
            throw new Error('User not found')
        }

        req.token = token;
        req.rootUser = rootUser;
        req.userID = rootUser._id;

        next();

    } catch (error) {
        console.log(error);
        res.status(404).send('Unauthorized: No token provided');
    }
}

module.exports = Authentication;