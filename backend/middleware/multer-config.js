const multer = require('multer')
const sharp = require('sharp')
const path = require('path')
const fs = require('fs')

const storage = multer.diskStorage({ 
    destination: (req, file, callback) => {
        callback(null, 'images')
    },

    filename: (req, file, callback) => { 
        const fileName = file.originalname.split(' ').join('_').split('.')[0] //photo de moi.jpeg => photo_de_moi
        callback(null, fileName + Date.now() + '.'+ 'webp') 
    }
});

module.exports = multer({storage}).single('image');

module.exports.resizeImage = (req, res, next) => {
    if(!req.file){
        console.log("No file added")
        return next()
    }

    const filePath = req.file.path
    const fileName = req.file.filename
    const outputFilePath = path.join('images', `resized_${fileName}`) // chemin du fichier optimisé

    sharp(filePath)
    .resize({width: 206, height: 260 })
    .toFile(outputFilePath)
    .then( () => {
        fs.unlink(filePath, (error) => {
            if(error){
                console.log("Erreur lors de la suppression ancien fichier", error)
            } else {
                console.log("L'ancien fichier a bien été supprimé")
                req.file.path = outputFilePath
                next()
            }
            
        })
        
    })
    .catch(error => {
        console.log(error)
        next()
    })
   
}
