const mongoose = require('mongoose')

const parcelSchema = new mongoose.Schema({
    sendername  : {
        type : String,
        required  : true
    },

    sendernumber  : {
        type : Number,
        required  : true
    },

    senderemail  : {
        type : String,
        required  : true
    },

    senderaddress  : {
        type : String,
        required : true
    },

    recievername  : {
        type : String,
        required : true
    },

    recievernumber  : {
        type : Number,
        required  : true
    },

    recieveremail  : {
        type : String,
        required : true
    },

    recieveraddress : {
        type : String,
        required : true
    },

    recieverlandmark : {
        type : String,
        required : true
    },

    parcelimage : {
        type : String,
    },

    cloudinaryId : {
        type : String,
    },

    parcelstation: {
        type : String,
        required : true
    },

    parcelstatus: {
        type : String,
        required : true
    },

    parcelcode: {
        type : Number,
    },

    parcelreference: {
        type : String,
    },

    eta: {
        type : String,
        required: true
    },

    state: {
        type : String,
    },

    comment: {
        type : String,
        required : true,
    },

    date: {
        type : String,
        required : true
    },

    time: {
        type : String,
        required : true
    }
})

module.exports = mongoose.model('Parcel', parcelSchema)