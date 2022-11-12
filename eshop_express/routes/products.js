const {Product} = require('../models/product.js')
const express = require('express');
const { Category } = require('../models/category.js');
const router = express.Router();

// API Router GET All Product
router.get(`/`,async (req, res)=>{
    const productList = await Product.find().populate('category');
    if(!productList){
        res.status(500).json({success: false})
    }
    res.send(productList)
})

// API Router GET Detail Product
router.get('/:id', async(req,res)=>{
    const detailProduct = await Product.findById(req.params.id);

    if(!detailProduct){
        res.status(500).json({message:'Detail Product Tidak Ditemukan karna ID product salah'})
    }
    res.status(200).send(detailProduct)
})

// API Router POST Product
router.post(`/`,async (req,res)=>{    
    try {
        const category = await Category.findById(req.body.category)
        if(!category) return res.status(400).send('Invalid Category')
        const product = new Product({
            name:req.body.name,
            description:req.body.description,
            richDescription:req.body.richDescription,
            image:req.body.image,
            brand:req.body.brand,
            price:req.body.price,
            category:req.body.category,
            countInStock:req.body.countInStock,
            rating:req.body.rating,
            numReviews:req.body.numReviews,
            isFeatured:req.body.isFeatured
        })
        const data = product
        await data.save()
        if(!data){
            return res.status(500).send("Product Cannot be Created")
        }
        res.status(200).json({data, message:'Berhasil Menyimpan Data', status:200})
    } catch (error) {
        res.status(400).json({message:error.message, Status:400})
    }
})

// API Update Product
router.put('/:id', async(req, res)=>{
    try {
    const category = await Category.findById(req.body.category)
    if(!category){
        return res.status(400).send('Invalid Category')
    } 
    const updateProduct = await Product.findByIdAndUpdate(
        req.params.id,{
            name:req.body.name,
            description:req.body.description,
            richDescription:req.body.richDescription,
            image:req.body.image,
            brand:req.body.brand,
            price:req.body.price,
            category:req.body.category,
            countInStock:req.body.countInStock,
            rating:req.body.rating,
            numReviews:req.body.numReviews,
            isFeatured:req.body.isFeatured
        },{new:true}
    )

    if(!updateProduct){
        res.status(500).json({success: false,message:"Product Cannot be Update"})
    }
    res.send(updateProduct)
    } catch (error) {
        res.status(400).json({message:error.message, Status:400})
    }
    
})

// API Router DELETE Product
router.delete('/:id', async(req,res)=>{
    try {
        const deleteProduct = await Product.findByIdAndRemove(req.params.id)
        if(deleteProduct){
            return res.status(200).json({success: true, message: 'Berhasil Menghapus Product'})
        }else{
            return res.status(404).json({success:false, message: 'Product Not Found'})
        }
    } catch (error) {
        return res.status(400).json({success: false, error: error, message:"Product Not Found"})
    }
})

module.exports = router;