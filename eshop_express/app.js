const express = require('express')
require('dotenv/config');
const mongoose = require('mongoose')

const app = express();

// Midleware
app.use(express.json());
const api = process.env.API_URL

app.get(api+'/product', (req, res)=>{
    res.send('Hello API')
})

mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser:true,
    useUnifiedTopology:true,
    dbName: 'shop_express'
})
.then(()=>{
    console.log('Database Connection')
})
.catch((err)=>{
    console.log(err)
})

app.listen(3000, ()=>{
    // console.log('server is running http://localhost:3000')
    console.log(api);
})