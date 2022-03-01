const jwt=require("jsonwebtoken");

require('dotenv').config()
const private_key=process.env.KEY
const fetchuser = (req, res, next) => {
    // Get the user from the jwt token and add id to req object
    const token = req.header('auth-token');
    // console.log(token);
    if (!token) {
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }
    try {
        const data = jwt.verify(token, private_key);
        
        // console.log(data);
        req.user = data.user;
        // console.log(req.user);
        next();
    } catch (error) {
        console.log(error)
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }

}


module.exports = fetchuser;