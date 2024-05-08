const fs = require('fs');

const verifySesion = (req, res) => {

    try {
        const data = req.body;
        console.log(data);
        if (`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`  !==  data.date) {
            return res.status(401).json({
                ok:false,
                error : '401 Unauthorized',
                msg : 'La fecha no corresponde al dia de hoy'
            })
        }
        const sesions =  JSON.parse(fs.readFileSync('sesions.txt', 'latin1'));
        const index = sesions.findIndex( sesion => sesion.user === data.user &&  sesion.warehouse === data.warehouse && sesion.date === data.date);
        if (index >= 0 && sesions[index].sessionId === data.sessionId) {
            console.log(sesions[index].sesionId, data.sesionId);
            return res.json({
                ok : true,
                msg : 'Sesion Valida'
            });
        }else if (index >= 0 && sesions[index].sessionId !== data.sessionId){
            return res.status(401).json({
                ok:false,
                error : '401 Unauthorized',
                msg : 'Ya existe una Sesion el dia de hoy para ese usuario y almacen'
            })
        }else {
            const i = sesions.findIndex( sesion => sesion.user === data.user &&  sesion.warehouse === data.warehouse);
            if (i  >= 0 ) {
                sesions[i] = data;
                fs.writeFileSync('sesions.txt', JSON.stringify(sesions))
            }else {
                sesions.push(data);
                console.log(sesions);
                fs.writeFileSync('sesions.txt', JSON.stringify(sesions))
            }
            return res.json({
                ok : true,
                msg : 'Se registro una nueva sesion'
            });
        }   
    } catch (error) {
        return res.status(500).json({
            ok:false,
            error : '401 Unauthorized',
            msg : 'Error consulte con su administrador de sistema'
        })
    }
}

module.exports = {
    verifySesion
}