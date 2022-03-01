const express = require('express');
const app = express();
const router = express.Router();
const User = require('../schema/User');
const fetchuser = require('../middleware/fetchuser');

require('dotenv').config()
const { body, validationResult } = require('express-validator');
const { response } = require('express');
const bcrypt = require('bcrypt');
const saltRounds = 10;
var jwt = require('jsonwebtoken');
const private_key=process.env.KEY

app.use(express.json());
app.use(express.urlencoded({extended: false}));
//registering a new user
router.post('/register',
    body('username').isEmail(),
    body('password').isLength({ min: 5 }),
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ success:false,errors: errors.array() });
            }
            
            let user = await User.findOne({ username: req.body.username })
            if (user) {
                return res.status(400).json({
                    success:"already",
                    error: "user with this mail already exists"
                })
            }
            const hash = bcrypt.hashSync(req.body.password, saltRounds);
            user = await User.create({
                username: req.body.username,
                password: hash
            })
            const data = {
                user: {
                  id: user.id
                }
              }
              const authtoken = jwt.sign(data, private_key);
          
            // user.save();
            // res.json(user);
            res.json({success:true,authtoken:authtoken});

        } catch (error) {
            res.status(500).send("some error occured");
            console.error(error.message);
        }

    })
    //logging in user
router.post('/login', async (req, res) => {
    try {
        let user = await User.findOne({ username: req.body.username })
        // console.log(user);
        let success=false;
        if (!user) {
            return res.status(400).json({
                success:success,
                error: "user does not exist"
            })
        }
            const a=bcrypt.compareSync(req.body.password,user.password);
            //req.body.password is converted to hash and matched with user.password which is already in hashed form

            const data={
                user:{
                    id:user.id
                }
            }
            let token = jwt.sign(data,private_key);
            if(a){
                res.json({success:true,token:token}); 
            }
            else{
                return res.status(400).json({
                    success:success,
                    error: "password is incorrect"
                })
            }
    } catch (error) {
        res.status(500).send("some error occured");
        console.error(error.message);
    }
})
//getting logged in user's data

router.post('/getuser', fetchuser,  async (req, res) => {

    try {
      let userId = req.user.id;
      const user = await User.findById(userId).select("-password")
      res.send(user)
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  })
  module.exports = router