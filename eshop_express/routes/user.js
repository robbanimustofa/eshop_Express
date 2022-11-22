// import model category di folder model
const {User} = require('../models/user.js');
// import express
const express = require('express');
// import module router dari express
const router = express.Router();
// import bcrypt
const bcrypt = require('bcryptjs')
// import jsonwebtoken
const jwt = require('jsonwebtoken')

// API Router GET All Users
router.get(`/`,async (req, res)=>{
    try {
        const data = await User.find().select('-passwordHash');
        if(!data){
            res.status(500).json({success: false, message:"Gagal Menampilkan list User"})
        }
        res.status(200).json({data, message:'Berhasil Menyimpan Data', status:200})
    } catch (error) {
        res.status(400).json({message:error.message, Status:400})
    }
})

// API Router GET Detail User
router.get('/:id', async(req,res)=>{
    try {
        const data = await User.findById(req.params.id).select('-passwordHash');;
        if(!data){
        res.status(500).json({success: false, status:500, message:`User ID ${req.params.id} Tidak Ditemukan`})
        }
        res.status(200).json({data, message:'Berhasil Menampilkan Detail User', status:200})
    } catch (error) {
        res.status(400).json({message:`User ID ${req.params.id} Tidak Sesuai`, Status:400})
    }
})

// API Router Create User / Register
router.post('/register',async (req,res)=>{
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
            res.status(500).json({success: false, status:500, message:`Terdapat Input Yang Kosong!`})
        }
        res.status(200).json({data, message:'Berhasil Membuat User Baru!', status:200})
    } catch (error) {
        res.status(400).json({success: false, status:400, message:`Gagal Membuat User Baru (Name and Email already exist)`})
    }
})

// API Router GET Users Login
router.post(`/login`,async (req, res)=>{
    try {
        // Check email if passed then Check Password if passed then login
        const data = await User.findOne({email: req.body.email})
        const secret = process.env.secret
        if(!data){
            res.status(500).json({success: false, message:"User Tidak Ditemukan atau belum Terdaftar!"})
        }else if (data && bcrypt.compareSync(req.body.password, data.passwordHash)) {
            const token = jwt.sign({
                userId: data._id
            }, secret,{expiresIn:'1d'}
            )
            res.status(200).json({data: data.email, token:token})
        }else{
            res.status(500).json({success: false, message:"Password salah!"})
        }
        // Compare password on db if passed then login success
        // if(data && bcrypt.compareSync(req.body.password, data.passwordHash)){
        //     const token = jwt.sign({
        //         userId: data._id
        //     }, 'secret',{expiresIn:'1d'}
        //     )
        //     res.status(200).json({data: data.email, token:token})
        // }else{
        //     res.status(500).json({success: false, message:"Password salah!"})
        // }
    } catch (error) {
        res.status(400).json({message:error.message, Status:400})
    }
})



module.exports = router;