const Product = require('../models/product')
const express = require('express');
const router = express.Router();

router.get(`/`,async (req, res)=>{
    const productList = await Product.find();
    // if(!productList){
    //     res.status(500).json({success: false})
    // }
    res.send(productList)
})

router.post(`/`,async (req,res)=>{
    try {
        const product = new Product({
            name:req.body.name,
            image:req.body.name,
            cointInStock:req.body.countInStock
        })
        await product.save()
        res.status(200).json({product, message:'Berhasil Menyimpan Data', status:200})
    } catch (error) {
        res.status(400).json({message:error.message, Status:400})
    }
})


module.exports = router;