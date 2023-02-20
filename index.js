const express = require('express');
const { connection } = require('./server/db');
const { userRouter } = require('./route/user.route');
const {postRouter} = require('./route/post.route')
const {Authenticate} = require("./middleware/Authenticate")
const app = express();

app.use(express.json())
require("dotenv").config()


app.get("/" , (req , res)=>{
    console.log("welcome")
    res.send("Home Page")
})

app.get("/users" , userRouter )
app.use(Authenticate)
app.get("/post" , postRouter )


app.listen(process.env.port , async (req, res) => {
    try{
        await connection 
        console.log("Db Is Connected")
    }catch(err){
        console.log(err)
        console.log("Something went wrong")
    }

    console.log(`Running port on ${process.env.port}`)
})