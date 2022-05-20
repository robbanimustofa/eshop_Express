// import model category di folder model
const {Category} = require('../models/category');
// import express
const express = require('express');
// import module router dari express
const router = express.Router

// API Router GET List Categories
router.get('/', async (req, res)=>{
    const categoryList = await Category.find()

    if(!categoryList){
        res.status(500).json({success: false})
    }
    res.send(categoryList)
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

