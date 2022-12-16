const {Order} = require('../models/order.js');
// import express
const express = require('express');
const { OrderItem } = require('../models/order-item.js');
// import module router dari express
const router = express.Router();


//  API Router Get Order
router.get('/', async (req,res)=>{
    try {
        // populate order collection with user collection and display newest to older
        const orderList = await Order.find().populate('user', 'name').sort({'dateOrdered':-1})
        if(!orderList){
            res.status(500).json({success: false, message:"Gagal Menampilkan list User"})
        }
        res.status(200).json({orderList, message:'Berhasil Mendapatkan Data List Order', status:200})
    } catch (error) {
        res.status(400).json({message:error.message, Status:400})
        
    }
})


//  API Router Get Detail Order
router.get('/:id', async (req,res)=>{
    try {
        // populate order collection with user collection and display newest to older
        const detailOrder = await Order.findById(req.params.id).populate('user', 'name').populate({ path: 'orderItems', populate: { path:'product', populate:'category'}})
        if(!detailOrder){
            res.status(500).json({success: false, message:"Gagal Menampilkan list User"})
        }
        res.status(200).json({detailOrder, message:'Berhasil Mendapatkan Data List Order', status:200})
    } catch (error) {
        res.status(400).json({message:error.message, Status:400})
        
    }
})

// API Router POST Order
router.post('/',async (req,res)=>{
    try {
        const orderItemsIds = Promise.all(req.body.orderItems.map(async orderItem =>{
            let newOrderItem = new OrderItem({
                quantity: orderItem.quantity,
                product: orderItem.product
            })
            // const data_OrderItem = newOrderItem
            // await data_OrderItem.save()
            // return data_OrderItem._id
            newOrderItem = await newOrderItem.save()
            return newOrderItem._id
        })) 
        const orderIdsItems = await orderItemsIds
        const order = new Order({
            orderItems:orderIdsItems,
            shippingAddress1:req.body.shippingAddress1,
            shippingAddress2:req.body.shippingAddress2,
            city:req.body.city,
            zip:req.body.zip,
            country:req.body.country,
            phone:req.body.phone,
            status:req.body.status,
            totalPrice:req.body.totalPrice,
            user:req.body.user,
        })
        const data = order
        await data.save()
    
        if(!data){
            return res.status(500).send("Order Cannot be Created")
        }
        res.status(200).json({data, message:'Berhasil Menyimpan Data Order', status:200})
    } catch (error) {
        res.status(400).json({message:error.message, Status:400})
    }
    
})


module.exports = router;
