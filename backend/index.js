const mongoose=require('mongoose');
const express=require('express');
const app=express();
var cors = require('cors')
require('dotenv').config(); 
app.use(cors())
require('dotenv').config()
const mongoURI="mongodb+srv://admin-harsh:Test123@cluster0.ktkjn.mongodb.net/db-01?authSource=admin&replicaSet=atlas-zt41jy-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true";
mongoose.connect(mongoURI,()=>{
    console.log("connected to mongoDb");
})
let port = process.env.PORT;
if (port == null || port == "") {
  port = 5000;
}
app.listen(port);
// app.listen(process.env.PORT || 5000,()=>{
//     console.log(`app listening on port`);
// })
app.use(express.json());
app.use('/api',require('./routes/auth'));
app.use('/api/notes',require('./routes/notecrud'));
