const express = require('express')
const app = express();
const mongoose = require('mongoose')

require('dotenv/config'); test2
const api = process.env.API_URL;
const productsRouter = require('./routes/products');

// Midleware
app.use(express.json());

// Routers
app.use(`${api}/products`, productsRouter)
// const productsRoutes = require('./routes/products')

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