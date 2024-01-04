const express = require("express");
require("dotenv").config();
const { connection } = require("./connection/dbconnection");
const { userRouter } = require("./routes/user.routes");
const { productRouter } = require("./routes/product.routes");
const errorHandler = require("./middleware/error.middleware");

const app = express();

app.use(express.json());
app.use(errorHandler)
app.use("/api",userRouter,productRouter)

app.listen(process.env.PORT, async()=>{
    try {
        await connection;
        console.log('server is connected to database')
        console.log(`server is running at port ${process.env.PORT}`)
    } catch (error) {
        console.log(error)
    }
})