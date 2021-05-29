const express=require('express')
const app =express();
const connectDB=require('./config/connectDB')
require('dotenv/config')
const personRouter=require('./routes/person')

app.use(express.json());

connectDB();
app.use("/api/persons", personRouter)



const port=process.env.port;
app.listen(port,()=>{
    console.log(`server running on port ${port}`)
})
