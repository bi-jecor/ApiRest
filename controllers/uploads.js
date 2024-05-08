const { v4: uuidv4 } = require('uuid');
const fs =  require('fs')
const path = require('path');
const { response } = require('express');

const fileUpload = (req, res) => {

    console.log('File',req.files);

    // Validar que exista un archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        console.log('noimage');
        return res.status(400).json({
            ok:false,
        })
    }
    // Procesar Imagen
    const file = req.files.imagen
    console.log('tipo',typeof file );
    const cutName = file.name.split('.');
    const fileType = cutName[cutName.length -1 ];
    const validTypes = ['jpg', 'png', 'JPG', 'pdf', 'PDF']
    if(!validTypes.includes(fileType)){
        return res.status(400).json({
            ok:false,
            msg: 'Not a valid file type'
        })
    }
    const fileName = `${uuidv4()}.${fileType}`;
    // const path = '' + fileName;
    // mongodb://localhost:27017/jecorDB
    const path = `192.168.1.199/uploads/${fileName}`;
    // const path = '//192.168.1.199/uploads/' + fileName;
    file.mv(path, function(err) {
        if (err){
        console.log(err);
          return res.status(500).json({
              ok: false,
              msg: 'Error to save img',
              error: err
          })
        }
        return res.json({
            ok: true,
            fileName,
            file,
            path
        })
      });
}

const getImg = (req, res = response) => {
    const file = req.params.fileName;
    console.log(file);
    const pathFile =  path.join(__dirname,'../uploads/' + file);
    if (fs.existsSync(pathFile)) {
        res.sendFile(pathFile)
    } else {
        console.log(pathFile);
        return res.status(500).json({
            ok:false,
            msg: 'Img not found'
        })
    }
}

const getImgName = (req, res = response) => {
    const file = req.params.fileName;
    console.log(file);
    const pathFile =  path.join(__dirname,'../uploads/' + file);
    if (fs.existsSync(pathFile)) {
        // res.sendFile(pathFile)
        return res.status(400).json({
            ok: true,
            msg: 'hola'
        })
    } else {
        console.log(pathFile);
        return res.status(500).json({
            ok:false,
            msg: 'Img not found'
        })
    }
}

module.exports = {
    fileUpload,
    getImg,
    getImgName
}