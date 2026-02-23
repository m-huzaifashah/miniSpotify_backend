const mongoose=require('mongoose')

async function connectDb() {
    try {
        await mongoose.connect(process.env.MONGO_URI)
    console.log('Db connected')
    } catch (err) {
        console.error('db not connected with an error ',err)
    }
}

module.exports=connectDb