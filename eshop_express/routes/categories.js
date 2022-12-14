// import model category di folder model
const {Category} = require('../models/category.js');
// import express
const express = require('express');
// import module router dari express
const router = express.Router();

// API Router GET List Categories
router.get('/', async (req, res)=>{
    const categoryList = await Category.find()

    if(!categoryList){
        res.status(500).json({success: false})
    }
    res.status(200).send(categoryList)
})

// API Router GET Detail Category
router.get('/:id', async(req,res)=>{
    const detailCategory = await Category.findById(req.params.id);

    if(!detailCategory){
        res.status(500).json({message:'Detail Category Tidak Ditemukan karna ID category salah'})
    }
    res.status(200).send(detailCategory)
})

// API Router POST Category
router.post('/',async (req,res)=>{
    let category = new Category({
        name: req.body.name,
        icon: req.body.icon,
        color: req.body.color
    })
    category = await category.save();

    if(!category){
        res.status(500).json({success: false})
    }
    res.send(category)
})

// API Router DELETE Category
router.delete('/:id', (req,res)=>{
    Category.findByIdAndRemove(req.params.id).then(category =>{
        if(category){
            return res.status(200).json({success: true, message: 'Berhasil Menghapus Categori'})
        }else{
            return res.status(404).json({success:false, message: 'Category Not Found'})
        }
    }).catch(err=>{
        return res.status(400).json({success: false, error: err})
    })
})

// API Update Category
router.put('/:id', async(req, res)=>{
    const updateCategory = await Category.findByIdAndUpdate(
        req.params.id,{
            name: req.body.name,
            icon:req.body.icon,
            color: req.body.color,
        },{new:true}
    )

    if(!updateCategory){
        res.status(500).json({success: false})
    }
    res.send(updateCategory)
})

module.exports = router;

