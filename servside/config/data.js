const mongoose = require("mongoose")
const conncetDB = async ()=>{
    try{
        const conn = await mongoose.connect(process.env.db_string,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
           
         
        })
        console.log(`its connected :${conn.connection.host}`)
    }catch(err){
        console.error(err,process.env.db_string)
        process.exit(1)
    }
}
module.exports = conncetDB