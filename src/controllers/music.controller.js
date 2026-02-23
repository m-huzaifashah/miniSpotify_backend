const jwt=require('jsonwebtoken')
const uploadFile=require('../services/storage.service')
const musicModel=require('../models/music.model')
const albumModel=require('../models/album.model')
async function createMusic(req,res) {
   
        const {title}=req.body
        const file=req.file
        const result =await uploadFile(file.buffer.toString('base64'))

        const musicUpload=await musicModel.create({
            uri:result.url,
            title,
            artist:req.user.id
        })

        res.status(200).json({
            message:'music uploaded',
            musicUpload
        })

        
    
}

async function createAlbum(req,res){



const {title,musicIds}=req.body

const album=await albumModel.create({
    title,
    artist:req.user.id,
    musics:musicIds
})

res.status(200).json({
    message:'Album created',
    album:{
        id:album._id,
        title:album.title,
        artist:album.artist,
        musics:album.musics
    }
})





}

async function getMusic(req,res){
    const music =await musicModel.find().populate('artist',"username email")
    res.status(200).json({
        music
    })
}

async function getAlbum(req,res){
    const album =await albumModel.find().select('-musics').populate('artist',"username email")
    res.status(200).json({
        album
    })
}

async function getAlbumById(req,res){
    const id=req.params.id

    const album=await albumModel.findById(id).populate('artist','username,email').populate('musics','title uri')

    console.log(album)
    res.status(200).json({
        message:'success',
        album
    })
}
module.exports={createMusic,createAlbum,getMusic,getAlbum,getAlbumById}