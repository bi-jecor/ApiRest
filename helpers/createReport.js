const { response, request } = require('express')
const fs =  require('fs')
const path = require('path');
const Report = require('../models/report');
const { v4: uuidv4 } = require('uuid');

const createReportN = async (req, res, data ) => {
    try {
        const report = new Report({
            ...req.data
        });

        const reportDB = await report.save();
        const reportResult = await Report.findById({ _id: reportDB._id })
            .populate('creator', 'name lastname user')

        return resultado =  {
            ok: true,
            report: reportResult
        };

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error to create Report, check with your system Administrator',
            error
        });
    }

}

// const createReportN = async (data ) => {
//     try {
//         const report = new Report({
//             ...req.body
//         });

//         const reportDB = await report.save();
//         const reportResult = await Report.findById({ _id: reportDB._id })
//             .populate('creator', 'name lastname user')

//         return res.json({
//             ok: true,
//             report: reportResult
//         });
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({
//             ok: false,
//             msg: 'Error to create Report, check with your system Administrator',
//             error
//         });
//     }
// }

const createReportWithFile = async (req, res, data, files ) => {

    console.log('Archivos', files);

    //         // Procesar Imagen
            const file = req.files.file;
            const cutName = file.name.split('.');
            const fileType = cutName[cutName.length -1 ];
            const validTypes = ['jpg', 'png', 'JPG']
            if(!validTypes.includes(fileType)){
                return res.status(400).json({
                    ok:false,
                    msg: 'Not a valid file type'
                })
            }
            const fileName = `${uuidv4()}.${fileType}`;
            // const path = '' + fileName;
            // mongodb://localhost:27017/jecorDB
            const path = `./uploads/${fileName}`;
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
                req.body.file = fileName;
                createReportN(req, res, data)
                // return res.json({
                //     ok: true,
                //     fileName,
                //     file,
                //     path
                // })
            });



}




module.exports = { 
    createReportN,
    createReportWithFile
}
