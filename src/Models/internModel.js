const mongoose= require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const internSchema= new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    },
    mobile: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: /^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/
    },
    collegeId: {
        type: ObjectId,
        required: true,
        ref: "college"
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
},  {timestamps: true});


module.exports= mongoose.model('intern', internSchema)