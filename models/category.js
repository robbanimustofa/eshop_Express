// Import Mongoose
const mongoose = require('mongoose')

const categirySchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    icon:{
        type: String,
        required: true
    },
    color:{
        type: String,
        required: true
    }
})

exports.Category = mongoose.model('Category', categirySchema)