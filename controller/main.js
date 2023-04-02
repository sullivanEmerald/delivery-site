const cloudinary = require('../middlewares/cloudinary')
const parcel =  require('../model/parcel')

function generatecode(){
    let result = '';
    for (let i = 0; i < 12; i++) {
        result += Math.floor(Math.random() * 10);
    }

    return +result
}

function referenceNo(){
    let result = '';
    for (let i = 0; i < 10; i++) {
        result += Math.floor(Math.random() * 10);
    }

    return `EUR${result}`
}

module.exports = {
    getIndex : async (req, res) => {
        try {
            res.render('index.ejs', { title : "Home Page"})
        } catch (error) {
            console.error(error)
        }
    },

    adminIndex : async (req, res) => {
        try {
            res.render('admin.ejs',  { title : 'Admin Page'})
        } catch (error) {
            console.error(error)
        }
    },

    createparcel : async (req, res) => {
        const date = new Date();
        const day = date.getDate();
        const month = date.getMonth() + 1; // add 1 because getMonth() returns 0-11 for Jan-Dec
        const year = date.getFullYear();  
        const time = date.toLocaleTimeString();  
        const result = await cloudinary.uploader.upload(req.file.path)
        try {
            await parcel.create({
                sendername : req.body.sendername,
                sendernumber : req.body.sendernumber,
                senderemail : req.body.senderemail,
                senderaddress : req.body.senderaddress,
                recievername : req.body.recievername,
                recievernumber  : req.body.recievernumber,
                recieveremail : req.body.recieveremail,
                recieveraddress : req.body.recieveraddress,
                recieverlandmark : req.body.recieverlandmark,
                parcelimage : result.secure_url,
                cloudinaryId : result.public_id,
                parcelstation : req.body.parcelstation,
                parcelstatus : req.body.parcelstatus,
                parcelcode : generatecode(),
                parcelreference : referenceNo(),
                eta : req.body.date,
                state : req.body.arrival,
                date : `${day}/${month}/${year}`,
                time : time,
            })
            console.log('succesfully added to the database')
            const luggage =  await parcel.find()
            const lastluggage =  luggage[luggage.length - 1]
            res.redirect(`/parcel/${lastluggage._id}`)
        } catch (error) {
            console.error(error)
        }
    },

    getParcel : async (req, res) => {
        try {
            const luggage = await parcel.findById(req.params.id)
            res.render('luggage.ejs', { title : 'Luggages', luggage : luggage})
        } catch (error) {
            console.error(error)
        }
    },

    editParcel : async (req, res) =>{
        try {
            const parcels =  await parcel.findById(req.params.id)
            res.render('edit.ejs', { title : parcels.recievername , user : parcels})
        } catch (error) {
            console.error(error)
        }
    },

    savechanges : async (req, res) => {
        try {
            await parcel.findByIdAndUpdate(req.params.id, {
                sendername : req.body.sendername,
                sendernumber : req.body.sendernumber,
                senderemail : req.body.senderemail,
                senderaddress : req.body.senderaddress,
                recievername : req.body.recievername,
                recievernumber  : req.body.recievernumber,
                recieveremail : req.body.recieveremail,
                recieveraddress : req.body.recieveraddress,
                recieverlandmark : req.body.recieverlandmark,
                parcelstation : req.body.parcelstation,
                parcelstatus : req.body.parcelstatus,
            })
            console.log('Successfully updated')
            const user =  await parcel.findById(req.params.id)
            res.redirect(`/parcel/${user._id}`)
        } catch (error) {
            console.error(error)
        }
    },

    findparcel : async (req, res) => {
        try {
            let parcelno = +req.body.parcel
            const parcelinfo =  await parcel.find({ parcelcode : parcelno})
            const user = parcelinfo[0]
            res.redirect(`/parcel/${user._id}`)
        } catch (error) {
            console.error(error)
        }
    },

    clientParcel : async (req, res) => {
        try {
            let parcelno = req.body.parcel
            console.log(parcelno)
            const parcelinfo =  await parcel.find({ parcelcode : parcelno})
            const user = parcelinfo[0]
            res.redirect(`/parcel/user/${user._id}`)
        } catch (error) {
            console.error(error)
        }
    },

    viewparcel : async (req, res) => {
        try {
            const user =  await parcel.findById(req.params.id)
            res.render('parcel.ejs', { title : user.recievername, user : user})
        } catch (error) {
            console.error(error)
        }
    }
}