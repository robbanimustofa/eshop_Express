const {Product} = require('../models/product.js')
const express = require('express');
const { Category } = require('../models/category.js');
const router = express.Router();

router.get(`/`,async (req, res)=>{
    const productList = await Product.find();
    if(!productList){
        res.status(500).json({success: false})
    }
    res.send(productList)
    // res.send('Test Products')
})

router.post(`/`,async (req,res)=>{
    try {
        const categoryid = await Category.findById(req.body.category)
        // if(!category) return res.status(400).send('Invalid Category')
        res.send(categoryid)
        try {
            const product = new Product({
                name:req.body.name,
                description:req.body.description,
                richDescription:req.body.richDescription,
                image:req.body.image,
                brand:req.body.brand,
                price:req.body.price,
                category:categoryid,
                countInStock:req.body.countInStock,
                rating:req.body.rating,
                numReviews:req.body.numReviews,
                isFeatured:req.body.isFeatured
            })
            product = await product.save()
            if(!product)
            return res.status(500).send("Product Cannot be Created")
    
            res.send(product)
            // await product.save()
            // res.status(200).json({product, message:'Berhasil Menyimpan Data', status:200})
        } catch (error) {
            res.status(400).json({message:error.message, Status:400})
        }
    } catch (error) {
        res.status(400).json({message:error.message, Status:400})
    }
})


module.exports = router;