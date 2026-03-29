
const mongoose  = require("mongoose");



async function connectToDB() {
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Connected to DB")
    })
    .catch(err=>{
        return console.log("Error : Failed Connection - DB", err)
    })
}


module.exports = connectToDB