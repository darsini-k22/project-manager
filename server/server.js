const express=require('express');
const dbConnection = require('./config/dbConnection');
const dotenv=require('dotenv').config();

dbConnection();
const app=express();
const port=process.env.PORT || 3000

app.use(express.json());
app.use('/api/projects',require('./routes/projectRoutes'))


app.listen(port,()=>{
    console.log(`Server is up and running in port:${port}`);
})
