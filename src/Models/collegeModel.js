const mongoose= require('mongoose')
// require('mongoose-type-url');


const collegeSchema= new mongoose.Schema({

    name: {
        type: String,
        required: true,
        lowerCase: true,
        trim: true,
        unique: true
    },
    fullName: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    logoLink: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
 },  {timestamps: true});



 module.exports= mongoose.model('college', collegeSchema)