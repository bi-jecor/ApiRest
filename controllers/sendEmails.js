const { response } = require('express');
const nodemailer = require('nodemailer');
const fs =  require('fs')
const path = require('path');

// ============================================================
// Emial Configuracion
// ============================================================
const transporter = nodemailer.createTransport({
  
    name: 'mail.jecor.com.mx',
    host: 'mail.jecor.com.mx',
    port: 587,
    secure: false,
    ignoreTLS: true,
    tls :{rejectUnauthorized: false},
    sendMail:true,
    auth: {
      user: 'sistemas2@jecor.com.mx',
      pass: 'Girasol-42#'
    }
  });
  

const sendEmail = async (req = request, res = response) => {
  const date = new Date();
  const year = date.getFullYear();
  const mes = date.getMonth()+1;
  const dia = date.getDate();
  const horario ={
    hora: date.getHours(),
    minutos: date.getMinutes(),
    segundos: date.getSeconds()
  }
//   let img = new Image();
// img.src = "https://jecor.com.mx/wp-content/uploads/2021/06/Jecor-Web.svg";
// img.style =" margin-left: auto; margin-right: auto; display: block; width: 18%; margin-top: 10px;"

  const { fecha, titulo, dato, estimado, email} = req.body;

  const fullpath = path.join(__dirname, `../uploads/jecorsade.png`)
  console.log(fecha, titulo, estimado, email);

  var mailOptions = {
    from: 'sistemas2@jecor.com.mx',
    to: email,
    subject: 'Avisos de sistemas Jecor',
    attachments: [{
      filename: 'jecorsade.png',
      path: fullpath,
      cid: 'jec' //same cid value as in the html img src
  }],
    html: `<body>
    <div>               
    <img style="display: block; margin: auto; height: 80px; margin-right:auto; margin-left: auto;" src="cid:jec">   

        
        <p style=" color:rgb(110, 110, 110); font-family:Verdana, Geneva, Tahoma, sans-serif; font-size: 20px; font-weight: bold;                     
            text-align: center;" >
          ${titulo}
        </p>
        <hr style="width: 95%">
<!-- FECHA         -->             
<p style="margin-left: 5%; font-family:Calibri; font-weight: bold; font-size: 18px; color:rgb(110, 110, 110);">
            FECHA: ${fecha} ${estimado} min.             
        </p>           
            <p style="font-family:Calibri; font-size: 20px; text-align: justify; margin-left: 5%;
            margin-right: 5%; color: rgb(110, 110, 110);">
             La actividad consiste en: ${dato}
        </p>
        
        <hr style="width: 95%">        
        <p style="color:rgb(110, 110, 110); font-family:Verdana, Geneva, Tahoma, sans-serif; font-size: 20px; font-weight: bold;                    
        text-align: center" >
          Departamento TIC
        </p>
        <p style="text-align: center; color:rgb(110, 110, 110); font-family:Verdana, Geneva, Tahoma, sans-serif; font-weight: bold; font-size: 10px; margin-bottom: 1px;">            
            ${dia}/${mes}/${year}
            <br>
            ${horario.hora}:${horario.minutos}:${horario.segundos}
        </p>        
    </div>
    </body>`
  };
  transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
          return res.status(200).json({
            ok:true
        });
        }
  });
    
}


module.exports = {
    sendEmail
}