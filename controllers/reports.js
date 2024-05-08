const { response, request } = require('express')
const fs =  require('fs')
const path = require('path');
const { v4: uuidv4 } = require('uuid');
// const { response } = require('express');
const formart = require('../helpers/format');
const Report = require('../models/report');
const time = require('../middlewares/time');
const nesting = require('../middlewares/nesting');
// const { test } = require('media-typer');

const { GET_HELPDESK_ID } = require('../middlewares/data')
const { MICROSIP_DATE } = require('../middlewares/time');
const {createReportN, createReportWithFile} = require('../helpers/createReport')
const { GET_TIME_TIMEZONE } = require('../middlewares/time');
const { GET_TRANSPORTER, GET_TEMPLATES, SEND_MAIL } = require('../email-sender/index');
const DAY =  86400000;
const TIMEZONE_MX = 21600000;

// ==============================================================
// ####################### TYPE : GET ###########################
// ==============================================================

// GET MANY ALL REPORTS
const getAll = async (req = request, res = response) => {
    try {
        const reports = await Report.find({})
        return res.json({
            ok: true,
            reports
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Error to get Reports, check with your system Administrator',
            error
        });
    }
}

// GET MANY REPORTS FOR MONTH
const getReports = async (req = request, res = response) => {
    try {
        let departament = req.params.departament;
        let month = time.GET_CURRENT_MONTH(new Date());

        const reports = await Report.find({
            $and: [
                {
                    $or: [
                        { state: { $lte: 2 } },
                        { state: { $gte: 3 }, updatedAt: { $gte: month } }
                    ]
                },
                {
                    $or: [
                        { departament },
                        { departamentOrigin: departament }
                    ]
                }
            ]
        })
            .populate('creator', 'name lastname user')
            .populate('assigned', 'name lastname user')
            .populate('cancel', 'name lastname user')
            .populate('authorized', 'name lastname user')
            .populate('collaborates', 'name lastname user' )
            .populate('departament', 'name')
            .populate('departamentOrigin', 'name')

        return res.json({
            ok: true,
            reports
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error to get Reports, check with your system Administrator',
            error
        });
    }
}

// GET ONE REPORT FOR ID
const getReport = async (req = request, res = response) => {
    try {
        const report = await Report.findById(req.params.reportId)
            .populate('creator', 'name lastname user')
            .populate('assigned', 'name lastname user')
            .populate('cancel', 'name lastname user')
            .populate('authorized', 'name lastname user')
            .populate('collaborates', 'name lastname user' )
            .populate('departament', 'name')
            .populate('departamentOrigin', 'name')

        return res.json({
            ok: true,
            report
        })
    } catch (error) {
        console.log( error ) 
        return res.status(500).json({
            ok: false,
            msg: 'Error to get Reports, check with your system Administrator',
            error
        });
    }
}

// GET MANY REPORTS FOR RANGE OF TIME
const getReportsWithRange = async (req, res) => {
    const day = 86400000;
    try {
        const departament = req.params.departament;
        const start = parseInt(req.params.start);
        const end = parseInt(req.params.end) + day;
        
        // console.log( departament )
        // console.log( start )
        // console.log( new Date( start ) )
        // console.log( end )
        // console.log( new Date( end  ) )
        
        const reports = await Report.find({
            $and: [
                {
                    $or: [
                        {
                            $or: [
                                { state: { $lte: 2 } },
                                { state: { $eq: 4 } },
                            ]
                        },
                        {
                            $and: [
                                { state: { $gte: 3 } },
                                { updatedAt: { $gte: new Date(start) } },
                                { updatedAt: { $lte: new Date(end) } }
                            ]
                        }
                    ]
                },
                {
                    $or: [
                        { departament },
                        { departamentOrigin: departament }
                    ]
                }
            ]
        })
        .populate('creator', 'name lastname user')
        .populate('assigned', 'name lastname user')
        .populate('cancel', 'name lastname user')
        .populate('authorized', 'name lastname user')
        .populate('collaborates', 'name lastname user' )
        .populate('departament', 'name')
        .populate('departamentOrigin', 'name')

        return res.json({
            ok: true,
            reports
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error, check with your SYSDBA',
            error
        });
    }
}

// GET REPORT THAT DOES NOT HAVE FACE STATUS
const getMissingValue = async (req = request, res = response) => {
    try {
        let user = req.params.id;

        const reports = await Report.find({
            $or: [
                { state: 3, answerFace: { $eq: undefined }, creator: user },
                { $or: [ {state: 2}, {state: 4}], assigned: user },
            ]
        })
            .populate('creator', 'name lastname user')
            .populate('assigned', 'name lastname user')
            .populate('cancel', 'name lastname user')
            .populate('authorized', 'name lastname user')
            .populate('collaborates', 'name lastname user' )
            .populate('departament', 'name')
            .populate('departamentOrigin', 'name')

        return res.json({
            ok: true,
            reports
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error to get Reports, check with your system Administrator',
            error
        });
    }
}

// GET REPORTS TO EXCEL
const getReportsToExcel = async (req = request, res = response) => {
    try {        
        const reports = await Report.find({
            state: 1, 
            departament: req.params.departament     
        })
        .populate('creator', 'name lastname')
        .populate('authorized', 'name lastname')
        .populate('departament', 'name')
        .populate('departamentOrigin', 'name')

        return res.json({
            reports
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error to get Reports, check with your system Administrator',
            error
        });
    }
}

// ==============================================================
// ####################### TYPE : POST ##########################
// ==============================================================

// CREATE ONE REPORT
// const createReport = async (req, res = response) => {
//     console.log( req );
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

const createReport =  async (req, res ) => {
    // console.log('File',req.files);
    // console.log(req.body);

    if (!req.files || Object.keys(req.files).length === 0) {
        try {
            const report = new Report({
                ...req.body
            });
            const reportDB = await report.save();
            const reportResult = await Report.findById({ _id: reportDB._id })
                .populate('creator', 'name lastname user')
                .populate('departament', 'name')
                .populate('departamentOrigin', 'name')

            return res.json({
                ok: true,
                report: reportResult
            });
    
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                ok: false,
                msg: 'Error to create Report, check with your system Administrator',
                error
            });
        }
        
    } else { 

        const file = req.files.file;
        const cutName = file.name.split('.');
        const fileType = cutName[cutName.length -1 ];
        const validTypes = ['jpg', 'png', 'JPG', 'jpeg', 'pdf', 'csv', 'xlsx', 'xls', 'ods']
        if(!validTypes.includes(fileType)){
            return res.status(400).json({
                ok:false,
                msg: 'Not a valid file type'
            })
        }
        const fileName = `${uuidv4()}.${fileType}`;
        const path = `./uploads/${fileName}`;
        file.mv(path, function(err) {
            if (err){
                console.log(err);
                return res.status(500).json({
                    ok: false,
                    msg: 'Error to save img',
                    error: err
                })
            }
            // req.body.file = fileName;
        });
        try {
            const report = new Report({
                ...req.body,
                file: fileName,
                fileDescription: file.name
            });

            // console.log( report );
    
            const reportDB = await report.save();
            const reportResult = await Report.findById({ _id: reportDB._id })
                .populate('creator', 'name lastname user')
    
            return res.json  ({
                ok: true,
                report: reportResult
            });
    
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                ok: false,
                msg: 'Error to create Report, check with your system Administrator',
                error
            });
        }
    }
}

// CREATE ONE REPORT SOCKET
const createReportSocket = async ( data, file ) => {



    // if (!file) {
    //     createReportN()
    // } else {
    //     createReportWithFile(data, file)
    // }

    // try {
    //     const report = new Report( data );
    //     const reportDB = await report.save();
    //     const reportResult = await Report.findById({ _id: reportDB._id })
    //     .populate('creator', 'name lastname user')

    //     return reportResult;

    // } catch (error) {
    //     console.log(error);
    //     return {
    //         msg: 'Error to create Report, check with your system Administrator',
    //         error
    //     }
    // }
}


// ==============================================================
// ####################### TYPE : PUT ###########################
// ==============================================================

// UPDATE ONE REPORT FOR ID
const updateReport = async (req , res ) => {
    // console.log(req.body);
    let report = JSON.parse(req.body.data);
    // console.log(report);

    if (typeof req.body.data === 'string') {
        // console.log('entro');
        report = JSON.parse(report);
    }
    if (!req.files || Object.keys(req.files).length === 0) {
        try {
            const reportId = req.params.reportId;

            const oldReport = await Report.findById(reportId);

            if (oldReport.state == report.OLD_STATE) {
                const reportDB = await Report.findOneAndUpdate({ "_id": reportId }, report, { new: true })
                .populate('creator', 'name lastname user')
                .populate('assigned', 'name lastname user')
                .populate('cancel', 'name lastname user')
                .populate('authorized', 'name lastname user')
                .populate('collaborates', 'name lastname user' )
                .populate('departament', 'name')
                .populate('departamentOrigin', 'name')
                // console.log(reportDB);
                return res.json({
                    ok: true,
                    report: reportDB
                });
            } else {
                return res.json({
                    ok: false,
                    report: null,
                    message: "NOT_CURRENT_STATUS"
                });
            }
    
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                ok: false,
                msg: 'Error to get Reports, check with your system Administrator',
                error
            });
        }

    }else {
        const file = req.files.file;
        const cutName = file.name.split('.');
        const fileType = cutName[cutName.length -1 ];
        const validTypes = ['jpg', 'png', 'JPG', 'jpeg', 'pdf', 'csv', 'xlsx', 'xls', 'ods']
        if(!validTypes.includes(fileType)){
            return res.status(400).json({
                ok:false,
                msg: 'Not a valid file type'
            })
        }
        const fileName = `${uuidv4()}.${fileType}`;
        const path = `./uploads/${fileName}`;
        file.mv(path, function(err) {
            if (err){
                console.log(err);
                return res.status(500).json({
                    ok: false,
                    msg: 'Error to save img',
                    error: err
                })
            }
            // req.body.file = fileName;
        });
        try {
            const reportId = req.params.reportId;
            report.evidences = fileName;
            // console.log('Reporte',report);
    
            const oldReport = await Report.findById(reportId);
            if (oldReport.state === report.OLD_STATE) {
                const reportDB = await Report.findOneAndUpdate({ "_id": reportId }, report, { new: true })
                .populate('creator', 'name lastname user')
                .populate('assigned', 'name lastname user')
                .populate('cancel', 'name lastname user')
                .populate('authorized', 'name lastname user')
                .populate('collaborates', 'name lastname user' )
                // console.log(report);
    
                return res.json({
                    ok: true,
                    report: reportDB
                });
            } else {
                return res.json({
                    ok: false,
                    report: null,
                    message: "NOT_CURRENT_STATUS"
                });
            }
    
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                ok: false,
                msg: 'Error to get Reports, check with your system Administrator',
                error
            });
        }
    }
}





const updateReportSocket = async ( data, type ) => {
    try {
        const oldReport = await Report.findById( data._id );
        
        if ( oldReport.state === data.OLD_STATE ) {
            const reportDB = await Report.findOneAndUpdate({ "_id": data._id }, data, { new: true })
            .populate('creator', 'name lastname user')
            .populate('assigned', 'name lastname user')
            .populate('cancel', 'name lastname user')
            .populate('authorized', 'name lastname user')
            .populate('collaborates', 'name lastname user' )
            .populate('departament', 'name')
            .populate('departamentOrigin', 'name')

            return {
                ok: true,
                msg: reportDB,
                type: type
            }

        } else {
            return {
                ok: false,
                msg: 'NOT_CURRENT_STATUS',
            }
        }

    } catch (error) {
        console.log(error);
        return {
            ok: false,
            msg: error
        }
    }
}

const updateReportv2 = async (req , res ) => {

    try {
        const report = req.body
        const reportId = req.params.reportId;
        const oldReport = await Report.findById(reportId);

        if (oldReport.state == report.OLD_STATE) {
            const reportDB = await Report.findOneAndUpdate({ "_id": reportId }, report, { new: true })
            .populate('creator', 'name lastname user email')
            .populate('assigned', 'name lastname user email')
            .populate('cancel', 'name lastname user')
            .populate('authorized', 'name lastname user')
            .populate('collaborates', 'name lastname user' )
            .populate('departament', 'name')
            .populate('departamentOrigin', 'name')

            // SEND EMAIL TO NOTIFY                
            if( reportDB.state === 3 ){
                const to = `${ reportDB.creator.email }; ${ reportDB.assigned.email }`;
                const subject = `TU REPORTE: ${ GET_HELPDESK_ID( reportDB._id ) } ${ reportDB.problemCategory }, HA SIDO COMPLETADO`;
                const title = reportDB.problemCategory;
                const message =  `
                    Estimado <i>${ reportDB.creator.name } ${ reportDB.creator.lastname }</i>, notificamos que su ticket <i>${ GET_HELPDESK_ID( reportDB._id ) }</i> 
                    <i>${ reportDB.problemCategory }</i> creado el ${ MICROSIP_DATE( reportDB.createdAt ) } fue completado el día 
                    ${ MICROSIP_DATE( reportDB.endTime ) }

                    <p>
                        <i>${ reportDB.assigned.name } ${ reportDB.assigned.lastname }</i>:<br>
                        <b>${ reportDB.answer }</b>
                    </p>

                    <br>
                    Gracias por utilizar la plataforma de Jecor Helpdesk, si tienes alguna duda o comentario, 
                    por favor comunícate con el departamento de tecnologías de información.
                `
                const transporter = GET_TRANSPORTER( "NOTIFICACIONES_TI" );
                const template = GET_TEMPLATES( "NOTIFICATION", { title: title, message: message } );

                SEND_MAIL( transporter, template, { to, subject } )
            }

            return res.json({
                ok: true,
                report: reportDB
            });

        } else {
            return res.json({
                ok: false,
                report: null,
                message: "NOT_CURRENT_STATUS"
            });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error to get Reports, check with your system Administrator',
            error
        });
    }
}

// ==============================================================
// ####################### TYPE : DELETE ########################
// ==============================================================

// DELETE ONE REPORT FOR ID
const deleteReport = async (req = request, res = response) => {
    try {
        const reportId = req.params.reportId;
        const report = new Report({
            ...req.body
        });

        const reportDB = await Report.findOneAndDelete({ _id: reportId })
        return res.json({
            ok: true,
            report: reportDB
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Error to delete Reports, check with your system Administrator',
            error
        });
    }
}

// GET REPORT THAT DOES NOT HAVE FACE STATUS
const filter = async (req = request, res = response) => {
    try {
        let filter = JSON.parse(req.body.filter);
        console.log( filter );
        // let filter = req.body.filter;
        const reports = await Report.find( filter )
        .populate('creator', 'name lastname user')
        .populate('assigned', 'name lastname user')
        .populate('cancel', 'name lastname user')
        .populate('authorized', 'name lastname user')
        .populate('collaborates', 'name lastname user' )
        .populate('departament', 'name')
        .populate('departamentOrigin', 'name')

        return res.json({
            ok: true,
            reports
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error to get Reports, check with your system Administrator',
            error
        });
    }
}

const getReportsFilter = async (req, res) => {
    const start = GET_TIME_TIMEZONE( req.body.start + DAY + TIMEZONE_MX );
    const end = GET_TIME_TIMEZONE( req.body.end + (2 * DAY) + TIMEZONE_MX );
    const departaments = req.body.departament;
    const user = req.body.user;

    try {       
        const reports = await Report.find({
            $or: [
                // REPORTS WITH STATE 1, 2, 4 WITH DEPARTAMENT EQUALS TO USER
                { 
                    state: { $in: [ 1, 2, 4 ] },
                    ...formart.Or( "departament", departaments )
                },
                // REPORTS WITH STATE 3, 4, 4 WITH DEPARTAMENT EQUALS TO USER AND IN THE RANGE OF TIME
                { 
                    $and: [
                        { state: { $in: [ 3, 5 ] } },
                        { time: { $gte: start } },
                        { time: { $lte: end } },
                        { ...formart.Or( "departament", departaments ) }
                    ] 
                },
                // REPORTS MAKED FOR THE USER AND IN THE RANGE OF TIME
                { 
                    $and: [
                        { creator: user },
                        { time: { $gte: start } },
                        { time: { $lte: end } }
                    ] 
                }
            ]
        })
        .populate('creator', 'name lastname user')
        .populate('assigned', 'name lastname user')
        .populate('cancel', 'name lastname user')
        .populate('authorized', 'name lastname user')
        .populate('collaborates', 'name lastname user' )
        .populate('departament', 'name')
        .populate('departamentOrigin', 'name')
        
        return res.json({
            ok: true,
            reports
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error, check with your SYSDBA',
            error
        });
    }
}

module.exports = {
    createReport,
    createReportSocket,
    getReports,
    getReportsWithRange,
    getAll,
    getReports,
    getReport,
    getMissingValue,
    getReportsToExcel,
    updateReport,
    updateReportv2,
    updateReportSocket,
    deleteReport,
    filter,
    getReportsFilter
}