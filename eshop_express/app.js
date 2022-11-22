const express = require('express')
const app = express();
const mongoose = require('mongoose')
const cors = require('cors')
const productsRouter = require('./routes/products');
const categoryRouter = require('./routes/categories');
const usersRouter = require('./routes/user');
require('dotenv/config'); 
const authJwt = require('./helpers/jwt');
const errorHandler = require('./helpers/error-handler')


const api = process.env.API_URL;


// Midleware
app.use(express.json());
app.use(cors());
app.use(authJwt());
app.use(errorHandler)

// Routers
app.use(`${api}/products`, productsRouter)
app.use(`${api}/category`, categoryRouter)
app.use(`${api}/users`, usersRouter)

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

