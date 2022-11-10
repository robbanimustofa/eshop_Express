const express = require('express')
const app = express();
const mongoose = require('mongoose')
const cors = require('cors')
const productsRouter = require('./routes/products');
const categoryRouter = require('./routes/categories')

require('dotenv/config'); 
const api = process.env.API_URL;


// Midleware
app.use(express.json());
app.use(cors());

// Routers
app.use(`${api}/products`, productsRouter)
app.use(`${api}/category`, categoryRouter)

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