// import model category di folder model
const {User} = require('../models/user.js');
// import express
const express = require('express');
// import module router dari express
const router = express.Router();
// import bcrypt
const bcrypt = require('bcryptjs')


// API Router GET All Users
router.get(`/`,async (req, res)=>{
    try {
        const userList = await User.find();
        if(!userList){
            res.status(500).json({success: false, message:"Gagal Menampilkan list User"})
        }
        res.status(200).json({userList, message:'Berhasil Menyimpan Data', status:200})
    } catch (error) {
        res.status(400).json({message:error.message, Status:400})
    }
})

// API Router POST Category
router.post('/',async (req,res)=>{
    try {
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            passwordHash: bcrypt.hashSync(req.body.password, 10),
            phone: req.body.phone,
            isAdmin: req.body.isAdmin,
            apartment: req.body.apartment,
            zip: req.body.zip,
            city: req.body.city,
            country: req.body.country,
            street: req.body.street
        })
        const data = user
        await data.save()
        if(!data){
            return res.status(500).send("Product Cannot be Created")
        }
        res.status(200).json({data, message:'Berhasil Menyimpan Data', status:200})
    } catch (error) {
        res.status(400).json({message:error.message, Status:400})
    }
})

module.exports = router;