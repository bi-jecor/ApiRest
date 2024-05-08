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



  const sendEmailToVerify = async (_id, title, message, startDate) => {
    var mailOptions = {
      from: 'sistemas2@jecor.com.mx',
      to: 'jonathan.merlos@jecor.com.mx',
      subject: title,
      attachments: [],
      html: `<html>
      <head>
      <title>Comunicado Institucional - 2801A-22SUB.DIR</title>
      <link rel="important stylesheet" href="chrome://messagebody/skin/messageBody.css">
      </head>
      <body>
      <table border=0 cellspacing=0 cellpadding=0 width="100%" class="moz-header-part1 moz-main-header"><tr><td><b>Asunto: </b>Comunicado Institucional - 2801A-22SUB.DIR</td></tr><tr><td><b>De: </b>&quot;JECOR S.A. de C.V.&quot; &lt;no-reply@jecor.com.mx&gt;</td></tr><tr><td><b>Fecha: </b>13/10/2022 09:31 a. m.</td></tr></table><table border=0 cellspacing=0 cellpadding=0 width="100%" class="moz-header-part2 moz-main-header"><tr><td><b>Para: </b>JAIME GALINDO BETANCOURT &lt;JAIME.GALINDO@JECOR.COM.MX&gt;</td></tr></table><br>
      <!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" "http://www.w3.org/TR/REC-html40/loose.dtd">
      <html>
      <head>
          <title>Comunicado Institucional - 2801A-22SUB.DIR </title>
          <!--[if !mso]><!-->
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <!--<![endif]-->
          <meta http-equiv="Content-Type" content="text/html; ">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style type="text/css">
            #outlook a { padding:0; }
            body { margin:0;padding:0;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%; }
            table, td { border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt; }
            img { border:0;height:auto;line-height:100%; outline:none;text-decoration:none;-ms-interpolation-mode:bicubic; }
            p { display:block;margin:13px 0; }
          </style>
          <!--[if mso]>
          <noscript>
          <xml>
          <o:OfficeDocumentSettings>
            <o:AllowPNG/>
            <o:PixelsPerInch>96</o:PixelsPerInch>
          </o:OfficeDocumentSettings>
          </xml>
          </noscript>
          <![endif]-->
          <!--[if lte mso 11]>
          <style type="text/css">
            .mj-outlook-group-fix { width:100% !important; }
          </style>
          <![endif]-->
          
            <!--[if !mso]><!-->
              <link href="https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700" rel="stylesheet" type="text/css">
              <style type="text/css">
                @import url(https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700);
              </style>
            <!--<![endif]-->
      
          
          
          <style type="text/css">
            @media only screen and (min-width:480px) {
              .mj-column-per-100 { width:100% !important; max-width: 100%; }
            }
          </style>
          <style media="screen and (min-width:480px)">
            .moz-text-html .mj-column-per-100 { width:100% !important; max-width: 100%; }
          </style>
          
        
          <style type="text/css">
          
          
      
          @media only screen and (max-width:480px) {
            table.mj-full-width-mobile { width: 100% !important; }
            td.mj-full-width-mobile { width: auto !important; }
          }
        
          </style>
          <style type="text/css">
          
          </style>
          
        </head>

        <a href="http://jecortraspasos.ddns.net:3000/mail-generator/validator/${_id}" target="_blank" style="color: #337ab7; text-decoration: none;">
        Completar Comunicado
        </a>
        <body style="word-spacing:normal;background-color:#ffffff;">
          
          
            <div style="background-color:#ffffff;">
              
            <table align="center" class="ed-section ed-section-header" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#ffffff;background-color:#ffffff;width:100%;">
              <tbody>
                <tr>
                  <td>
                    
              
            <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="ed-section-outlook ed-section-header-outlook" role="presentation" style="width:700px;" width="700" bgcolor="#ffffff" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
          
              
            <div style="margin:0px auto;max-width:700px;">
              
              <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                <tbody>
                  <tr>
                    <td style="direction:ltr;font-size:0px;padding:20px 0;padding-bottom:0px;padding-top:0px;text-align:center;">
                      <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="ed-block-outlook ed-block-a1490d6a-6f88-4b63-a8c9-85dda1c1f943-outlook" width="700px" ><table align="center" border="0" cellpadding="0" cellspacing="0" class="ed-block-outlook ed-block-a1490d6a-6f88-4b63-a8c9-85dda1c1f943-outlook" role="presentation" style="width:700px;" width="700" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
          
            
            <div class="ed-block ed-block-a1490d6a-6f88-4b63-a8c9-85dda1c1f943" style="margin:0px auto;max-width:700px;">
              
              <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                <tbody>
                  <tr>
                    <td style="direction:ltr;font-size:0px;padding:20px 0;padding-bottom:0px;padding-top:20px;text-align:center;">
                      <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:700px;" ><![endif]-->
                  
            <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
              
            <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
              <tbody>
                
                    <tr>
                      <td align="center" class="ed-text-container ed-column-number-0" style="color: #111111; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; text-align: center; font-size: 0px; padding: 0 10px; word-break: break-word;">
                        
            <div style="font-family:Helvetica;font-size:16px;line-height:normal;text-align:center;color:#111111;"><p style="margin: 0 0 10px; text-align: right;"><span style="color:#27ae60"><strong>NEWSLETTER</strong></span><br>
      <span style="color:#7f8c8d">Experiencia ¡WOW!</span></p></div>
          
                      </td>
                    </tr>
                  
              </tbody>
            </table>
          
            </div>
          
                <!--[if mso | IE]></td></tr></table><![endif]-->
                    </td>
                  </tr>
                </tbody>
              </table>
              
            </div>
          
            
            <!--[if mso | IE]></td></tr></table></td></tr><tr><td class="ed-block-outlook ed-block-6-outlook" width="700px" ><table align="center" border="0" cellpadding="0" cellspacing="0" class="ed-block-outlook ed-block-6-outlook" role="presentation" style="width:700px;" width="700" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
          
            
            <div class="ed-block ed-block-6" style="margin:0px auto;max-width:700px;">
              
              <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                <tbody>
                  <tr>
                    <td style="direction:ltr;font-size:0px;padding:20px 0;padding-bottom:20px;padding-top:20px;text-align:center;">
                      <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:700px;" ><![endif]-->
                  
            <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
              
            <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
              <tbody>
                
                    <tr>
                      <td align="center" style="font-size:0px;padding:0 10px;word-break:break-word;">
                        
            <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
              <tbody>
                <tr>
                  <td style="width:180px;">
                    
            <img alt="LogoJecorColores.png" height="auto" src="https://jecor.mx-router-i.com/data/b7c4b3bde6d4c4f03df758bae555d94661b5045c/media_files/2/original/LogoJecorColores.png" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" width="180">
          
                  </td>
                </tr>
              </tbody>
            </table>
          
                      </td>
                    </tr>
                  
              </tbody>
            </table>
          
            </div>
          
                <!--[if mso | IE]></td></tr></table><![endif]-->
                    </td>
                  </tr>
                </tbody>
              </table>
              
            </div>
          
            
            <!--[if mso | IE]></td></tr></table></td></tr><tr><td class="ed-block-outlook ed-block-3a81bab0-5a86-4b00-8b6f-f44fe5db53f0-outlook" width="700px" ><table align="center" border="0" cellpadding="0" cellspacing="0" class="ed-block-outlook ed-block-3a81bab0-5a86-4b00-8b6f-f44fe5db53f0-outlook" role="presentation" style="width:700px;" width="700" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
          
            
            <div class="ed-block ed-block-3a81bab0-5a86-4b00-8b6f-f44fe5db53f0" style="margin:0px auto;max-width:700px;">
              
              <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                <tbody>
                  <tr>
                    <td style="direction:ltr;font-size:0px;padding:20px 0;padding-bottom:20px;padding-top:20px;text-align:center;">
                      <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:700px;" ><![endif]-->
                  
            <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
              
            <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
              <tbody>
                
                    <tr>
                      <td align="center" class="ed-text-container ed-column-number-0" style="color: #111111; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; text-align: center; font-size: 0px; padding: 0 10px; word-break: break-word;">
                        
            <div style="font-family:Helvetica;font-size:16px;line-height:normal;text-align:center;color:#111111;"><p style="margin: 0 0 10px;"><span style="font-size:22px"><span style="font-family:Arial,Helvetica,sans-serif"><span style="color:#7f8c8d">COMUNICADO</span></span></span><br>
                <span style="font-size:28px"><strong>${title}</strong></span></p>
            </div>
          
                      </td>
                    </tr>
                  
              </tbody>
            </table>
          
            </div>
          
                <!--[if mso | IE]></td></tr></table><![endif]-->
                    </td>
                  </tr>
                </tbody>
              </table>
              
            </div>
          
            
            <!--[if mso | IE]></td></tr></table></td></tr><tr><td class="ed-block-outlook ed-block-b7454a57-e139-477b-9494-d8843caa2c63-outlook" width="700px" ><table align="center" border="0" cellpadding="0" cellspacing="0" class="ed-block-outlook ed-block-b7454a57-e139-477b-9494-d8843caa2c63-outlook" role="presentation" style="width:700px;" width="700" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
          
            
            <div class="ed-block ed-block-b7454a57-e139-477b-9494-d8843caa2c63" style="margin:0px auto;max-width:700px;">
              
              <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                <tbody>
                  <tr>
                    <td style="direction:ltr;font-size:0px;padding:20px 0;padding-bottom:20px;padding-top:20px;text-align:center;">
                      <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:700px;" ><![endif]-->
                  
            <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
              
            <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
              <tbody>
                
                    <tr>
                      <td align="center" style="font-size:0px;padding:0 10px;word-break:break-word;">
                        
            <p style="border-top:solid 5px #31bb5d;font-size:1px;margin:0px auto;width:100%;">
            </p>
            
            <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" style="border-top:solid 5px #31bb5d;font-size:1px;margin:0px auto;width:680px;" role="presentation" width="680px" ><tr><td style="height:0;line-height:0;"> &nbsp;
      </td></tr></table><![endif]-->
          
          
                      </td>
                    </tr>
                  
              </tbody>
            </table>
          
            </div>
          
                <!--[if mso | IE]></td></tr></table><![endif]-->
                    </td>
                  </tr>
                </tbody>
              </table>
              
            </div>
          
            
            <!--[if mso | IE]></td></tr></table></td></tr><tr><td class="ed-block-outlook ed-block-ccfc949c-c46d-4514-8c31-c79254311976-outlook" width="700px" ><table align="center" border="0" cellpadding="0" cellspacing="0" class="ed-block-outlook ed-block-ccfc949c-c46d-4514-8c31-c79254311976-outlook" role="presentation" style="width:700px;" width="700" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
          
            
            <div class="ed-block ed-block-ccfc949c-c46d-4514-8c31-c79254311976" style="margin:0px auto;max-width:700px;">
              
              <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                <tbody>
                  <tr>
                    <td style="direction:ltr;font-size:0px;padding:20px 0;padding-bottom:20px;padding-top:20px;text-align:center;">
                      <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:700px;" ><![endif]-->
                  
            <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
              
            <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
              <tbody>
                
                    <tr>
                      <td align="center" class="ed-text-container ed-column-number-0" style="color: #111111; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; text-align: center; font-size: 0px; padding: 0 10px; word-break: break-word;">
                        
            <div style="font-family:Helvetica;font-size:16px;line-height:normal;text-align:center;color:#111111;">
      <p style="margin: 0 0 10px; margin-top: 0px; margin-bottom: 10px; line-height: 150%; text-align: justify;"><span style="color:#444444">¡Buen día!</span></p>
      
      <p style="margin: 0 0 10px; margin-top: 0px; margin-bottom: 0px; line-height: 150%; text-align: justify;"><span style="color:#444444">El presente comunicado es emitido desde<strong> Subdirección, </strong>tiene como fin transmitirte <strong>${message}.</strong></span></p>
      </div>
          
                      </td>
                    </tr>
                  
              </tbody>
            </table>
          
            </div>
          
                <!--[if mso | IE]></td></tr></table><![endif]-->
                    </td>
                  </tr>
                </tbody>
              </table>
              
            </div>
          
            
            <!--[if mso | IE]></td></tr></table></td></tr><tr><td class="ed-block-outlook ed-block-d55f606b-220d-45df-903d-508b6944caa5-outlook" width="700px" ><table align="center" border="0" cellpadding="0" cellspacing="0" class="ed-block-outlook ed-block-d55f606b-220d-45df-903d-508b6944caa5-outlook" role="presentation" style="width:700px;" width="700" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
          
            
            <div class="ed-block ed-block-d55f606b-220d-45df-903d-508b6944caa5" style="margin:0px auto;max-width:700px;">
              
              <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                <tbody>
                  <tr>
                    <td style="direction:ltr;font-size:0px;padding:20px 0;padding-bottom:20px;padding-top:20px;text-align:center;">
                      <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:700px;" ><![endif]-->
                  
            <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
              

          
            </div>
          
                <!--[if mso | IE]></td></tr></table><![endif]-->
                    </td>
                  </tr>
                </tbody>
              </table>
              
            </div>
          
            
            <!--[if mso | IE]></td></tr></table></td></tr></table><![endif]-->
                    </td>
                  </tr>
                </tbody>
              </table>
              
            </div>
          
              
            <!--[if mso | IE]></td></tr></table><![endif]-->
          
            
                  </td>
                </tr>
              </tbody>
            </table>
          
            
            <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="ed-section-outlook ed-section-contentWithBackground-outlook" role="presentation" style="width:700px;" width="700" bgcolor="#2f9c33" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
          
            
            <div class="ed-section ed-section-contentWithBackground" style="background:#2f9c33;background-color:#2f9c33;margin:0px auto;max-width:700px;">
              
              <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#2f9c33;background-color:#2f9c33;width:100%;">
                <tbody>
                  <tr>
                    <td style="direction:ltr;font-size:0px;padding:20px 0;padding-bottom:0px;padding-top:0px;text-align:center;">
                      <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="ed-block-outlook ed-block-6095556f-1eac-4f32-8865-303506600667-outlook" width="700px" ><table align="center" border="0" cellpadding="0" cellspacing="0" class="ed-block-outlook ed-block-6095556f-1eac-4f32-8865-303506600667-outlook" role="presentation" style="width:700px;" width="700" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
          
            
            <div class="ed-block ed-block-6095556f-1eac-4f32-8865-303506600667" style="margin:0px auto;max-width:700px;">
              
              <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                <tbody>
                  <tr>
                    <td style="direction:ltr;font-size:0px;padding:20px 0;padding-bottom:10px;padding-top:20px;text-align:center;">
                      <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:700px;" ><![endif]-->
                  
            <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
              
            <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
              <tbody>
                
                    <tr>
                      <td align="left" class="ed-text-container ed-column-number-0" style="color: #111111; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 0px; padding: 0 10px; word-break: break-word;">
                        
            <div style="font-family:Helvetica;font-size:16px;line-height:normal;text-align:left;color:#111111;"><p style="margin: 0 0 10px; text-align: center;"><strong><span style="color:#ffffff">Este comunicado tendrá efecto a partir del dia ${startDate}</span></strong></p></div>
          
                      </td>
                    </tr>
                  
              </tbody>
            </table>
          
            </div>
          
                <!--[if mso | IE]></td></tr></table><![endif]-->
                    </td>
                  </tr>
                </tbody>
              </table>
              
            </div>
          
            
            <!--[if mso | IE]></td></tr></table></td></tr></table><![endif]-->
                    </td>
                  </tr>
                </tbody>
              </table>
              
            </div>
          
            
            <!--[if mso | IE]></td></tr></table><![endif]-->
          
          
            <table align="center" class="ed-section ed-section-content" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#ffffff;background-color:#ffffff;width:100%;">
              <tbody>
                <tr>
                  <td>
                    
              
            <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="ed-section-outlook ed-section-content-outlook" role="presentation" style="width:700px;" width="700" bgcolor="#ffffff" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
          
              
            <div style="margin:0px auto;max-width:700px;">
              
              <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                <tbody>
                  <tr>
                    <td style="direction:ltr;font-size:0px;padding:20px 0;padding-bottom:0px;padding-top:0px;text-align:center;">
                      <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="ed-block-outlook ed-block-eb3a5844-32d2-4133-b8ec-d5d2474d21ce-outlook" width="700px" ><table align="center" border="0" cellpadding="0" cellspacing="0" class="ed-block-outlook ed-block-eb3a5844-32d2-4133-b8ec-d5d2474d21ce-outlook" role="presentation" style="width:700px;" width="700" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
          
            
            <div class="ed-block ed-block-eb3a5844-32d2-4133-b8ec-d5d2474d21ce" style="margin:0px auto;max-width:700px;">
              
              <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                <tbody>
                  <tr>
                    <td style="direction:ltr;font-size:0px;padding:20px 0;padding-bottom:20px;padding-top:20px;text-align:center;">
                      <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:700px;" ><![endif]-->
                  
            <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
              
            <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
              <tbody>
                
                    <tr>
                      <td align="left" class="ed-text-container ed-column-number-0" style="color: #111111; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 0px; padding: 0 10px; word-break: break-word;">
                        
            <div style="font-family:Helvetica;font-size:16px;line-height:normal;text-align:left;color:#111111;">
      <p style="margin: 0 0 10px;"><span style="color:#444444">Agradecemos tu atención a esta información presentada.</span></p>
      
      <p style="margin: 0 0 10px;"><span style="color:#444444">Te extendemos un cordial saludo.</span></p>
      </div>
          
                      </td>
                    </tr>
                  
              </tbody>
            </table>
          
            </div>
          
                <!--[if mso | IE]></td></tr></table><![endif]-->
                    </td>
                  </tr>
                </tbody>
              </table>
              
            </div>
          
            
            <!--[if mso | IE]></td></tr></table></td></tr><tr><td class="ed-block-outlook ed-block-bc9f9dad-b7ba-42de-8a14-e8d2f359f8cd-outlook" width="700px" ><table align="center" border="0" cellpadding="0" cellspacing="0" class="ed-block-outlook ed-block-bc9f9dad-b7ba-42de-8a14-e8d2f359f8cd-outlook" role="presentation" style="width:700px;" width="700" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
          
            
            <div class="ed-block ed-block-bc9f9dad-b7ba-42de-8a14-e8d2f359f8cd" style="margin:0px auto;max-width:700px;">
              
              <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                <tbody>
                  <tr>
                    <td style="direction:ltr;font-size:0px;padding:20px 0;padding-bottom:20px;padding-top:20px;text-align:center;">
                      <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:700px;" ><![endif]-->
                  
            <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
              
            <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
              <tbody>
                
                    <tr>
                      <td align="center" style="font-size:0px;padding:0 10px;word-break:break-word;">
                        
            <p style="border-top:solid 5px #31bb5d;font-size:1px;margin:0px auto;width:100%;">
            </p>
            
            <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" style="border-top:solid 5px #31bb5d;font-size:1px;margin:0px auto;width:680px;" role="presentation" width="680px" ><tr><td style="height:0;line-height:0;"> &nbsp;
      </td></tr></table><![endif]-->
          
          
                      </td>
                    </tr>
                  
              </tbody>
            </table>
          
            </div>
          
                <!--[if mso | IE]></td></tr></table><![endif]-->
                    </td>
                  </tr>
                </tbody>
              </table>
              
            </div>
          
            
            <!--[if mso | IE]></td></tr></table></td></tr><tr><td class="ed-block-outlook ed-block-6bb1cfda-a741-4854-a441-40c3d3a459a6-outlook" width="700px" ><table align="center" border="0" cellpadding="0" cellspacing="0" class="ed-block-outlook ed-block-6bb1cfda-a741-4854-a441-40c3d3a459a6-outlook" role="presentation" style="width:700px;" width="700" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
          
            
            <div class="ed-block ed-block-6bb1cfda-a741-4854-a441-40c3d3a459a6" style="margin:0px auto;max-width:700px;">
              
              <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                <tbody>
                  <tr>
                    <td style="direction:ltr;font-size:0px;padding:20px 0;padding-bottom:20px;padding-top:0px;text-align:center;">
                      <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:700px;" ><![endif]-->
                  
            <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
              
            <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
              <tbody>
                
                    <tr>
                      <td align="left" class="ed-text-container ed-column-number-0" style="color: #111111; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 0px; padding: 0 10px; word-break: break-word;">
                        
            <div style="font-family:Helvetica;font-size:16px;line-height:normal;text-align:left;color:#111111;"><table align="center" bgcolor="#ffffff" border="0" cellpadding="0" cellspacing="0" class="mlContentTable mlContentTableDefault" style="width:640px">
        <tbody>
          <tr>
            <td class="mlContentTableCardTd">
            <table align="center" bgcolor="#ffffff" border="0" cellpadding="0" cellspacing="0" class=" ml-default mlContentTable" style="min-width:640px; width:640px">
              <tbody>
                <tr>
                  <td>
                  <table align="center" border="0" cellpadding="0" cellspacing="0" class="mlContentTable" role="presentation" style="min-width:640px; width:640px">
                    <tbody>
                      <tr>
                        <td align="center" class="mlContentOuter" style="padding:0px 40px">
                        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%">
                          <tbody>
                            <tr>
                              <td class="bodyTitle" id="bodyText-22" style="color:#71a67e; font-family:'Inter',sans-serif; font-size:16px; line-height:100%">
                              <p style="margin: 0 0 10px; margin-top: 0px; margin-bottom: 10px; line-height: 100%; text-align: center;"><strong>ENTRE TODOS CONSTRUIMOS UNA EXPERIENCIA </strong></p>
      
                              <p style="margin: 0 0 10px; margin-top: 0px; margin-bottom: 0px; line-height: 100%; text-align: center;"><strong>¡WOW!</strong></p>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  </td>
                </tr>
              </tbody>
            </table>
            </td>
          </tr>
        </tbody>
      </table></div>
          
                      </td>
                    </tr>
                  
              </tbody>
            </table>
          
            </div>
          
                <!--[if mso | IE]></td></tr></table><![endif]-->
                    </td>
                  </tr>
                </tbody>
              </table>
              
            </div>
          
            
            <!--[if mso | IE]></td></tr></table></td></tr></table><![endif]-->
                    </td>
                  </tr>
                </tbody>
              </table>
              
            </div>
          
              
            <!--[if mso | IE]></td></tr></table><![endif]-->
          
            
                  </td>
                </tr>
              </tbody>
            </table>
          
            
            <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="ed-section-outlook ed-section-footer-outlook" role="presentation" style="width:700px;" width="700" bgcolor="#f5f5f5" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
          
            
            <div class="ed-section ed-section-footer" style="background:#f5f5f5;background-color:#f5f5f5;margin:0px auto;max-width:700px;">
              
              <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#f5f5f5;background-color:#f5f5f5;width:100%;">
                <tbody>
                  <tr>
                    <td style="direction:ltr;font-size:0px;padding:20px 0;padding-bottom:0px;padding-top:0px;text-align:center;">
                      <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="ed-block-outlook ed-block-5-outlook" width="700px" ><table align="center" border="0" cellpadding="0" cellspacing="0" class="ed-block-outlook ed-block-5-outlook" role="presentation" style="width:700px;" width="700" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
          
            
            <div class="ed-block ed-block-5" style="margin:0px auto;max-width:700px;">
              
              <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                <tbody>
                  <tr>
                    <td style="direction:ltr;font-size:0px;padding:20px 0;padding-bottom:20px;padding-top:20px;text-align:center;">
                      <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:700px;" ><![endif]-->
                  
            <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
              
            <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
              <tbody>
                
                    <tr>
                      <td align="left" class="ed-text-container ed-column-number-0" style="color: #919191; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 0px; padding: 0 10px; word-break: break-word;">
                        
            <div style="font-family:Helvetica;font-size:15px;line-height:normal;text-align:left;color:#ffffff;"><div style="text-align: center;">
      <span style="color:#999999">Este es un correo de comunicación interna de Grupo JECOR.</span><br>
       
      <p style="margin: 0 0 10px;"><span style="color:#999999">JECOR S.A. de C.V.<br>
      Marcos Gordoa 10, Zapotlán el Grande.<br>
      Jalisco, México.</span></p>


      
      <p style="margin: 0 0 10px;"><a href="https://jecor.mx-router-i.com/unsubscribe/4d6o/form?token=rfdpc4vp" target="_blank" style="color: #337ab7; text-decoration: none;"><span style="color:#ecf0f1">Baja</span></a></p>
      </div></div>
          
                      </td>
                    </tr>
                  
              </tbody>
            </table>


          
            </div>
          
                <!--[if mso | IE]></td></tr></table><![endif]-->
                    </td>
                  </tr>
                </tbody>
              </table>
              
            </div>
          
            
            <!--[if mso | IE]></td></tr></table></td></tr></table><![endif]-->
                    </td>
                  </tr>
                </tbody>
              </table>
              
            </div>
          
            
            <!--[if mso | IE]></td></tr></table><![endif]-->
          
          
            </div>
          
        
      
        <img src="https://jecor.mx-router-i.com/i/4d6o/rfdpc4vp.gif" width="1" height="1" alt="">
      </body>
      </html>
      
      </body>
      </html>
      </table></div>`
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

  const sendEmail = async (_id, title, message, startDate, link, emails) => {
    var mailOptions = {
      from: 'sistemas2@jecor.com.mx',
      to: emails,
      subject: title,
      attachments: [],
      html: `<html>
      <head>
      <title>Comunicado Institucional - 2801A-22SUB.DIR</title>
      <link rel="important stylesheet" href="chrome://messagebody/skin/messageBody.css">
      </head>
      <body>
      <table border=0 cellspacing=0 cellpadding=0 width="100%" class="moz-header-part1 moz-main-header"><tr><td><b>Asunto: </b>Comunicado Institucional - 2801A-22SUB.DIR</td></tr><tr><td><b>De: </b>&quot;JECOR S.A. de C.V.&quot; &lt;no-reply@jecor.com.mx&gt;</td></tr><tr><td><b>Fecha: </b>13/10/2022 09:31 a. m.</td></tr></table><table border=0 cellspacing=0 cellpadding=0 width="100%" class="moz-header-part2 moz-main-header"><tr><td><b>Para: </b>JAIME GALINDO BETANCOURT &lt;JAIME.GALINDO@JECOR.COM.MX&gt;</td></tr></table><br>
      <!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" "http://www.w3.org/TR/REC-html40/loose.dtd">
      <html>
      <head>
          <title>Comunicado Institucional - 2801A-22SUB.DIR </title>
          <!--[if !mso]><!-->
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <!--<![endif]-->
          <meta http-equiv="Content-Type" content="text/html; ">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style type="text/css">
            #outlook a { padding:0; }
            body { margin:0;padding:0;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%; }
            table, td { border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt; }
            img { border:0;height:auto;line-height:100%; outline:none;text-decoration:none;-ms-interpolation-mode:bicubic; }
            p { display:block;margin:13px 0; }
          </style>
          <!--[if mso]>
          <noscript>
          <xml>
          <o:OfficeDocumentSettings>
            <o:AllowPNG/>
            <o:PixelsPerInch>96</o:PixelsPerInch>
          </o:OfficeDocumentSettings>
          </xml>
          </noscript>
          <![endif]-->
          <!--[if lte mso 11]>
          <style type="text/css">
            .mj-outlook-group-fix { width:100% !important; }
          </style>
          <![endif]-->
          
            <!--[if !mso]><!-->
              <link href="https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700" rel="stylesheet" type="text/css">
              <style type="text/css">
                @import url(https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700);
              </style>
            <!--<![endif]-->
      
          
          
          <style type="text/css">
            @media only screen and (min-width:480px) {
              .mj-column-per-100 { width:100% !important; max-width: 100%; }
            }
          </style>
          <style media="screen and (min-width:480px)">
            .moz-text-html .mj-column-per-100 { width:100% !important; max-width: 100%; }
          </style>
          
        
          <style type="text/css">
          
          
      
          @media only screen and (max-width:480px) {
            table.mj-full-width-mobile { width: 100% !important; }
            td.mj-full-width-mobile { width: auto !important; }
          }
        
          </style>
          <style type="text/css">
          
          </style>
          
        </head>

        <body style="word-spacing:normal;background-color:#ffffff;">
          
          
            <div style="background-color:#ffffff;">
              
            <table align="center" class="ed-section ed-section-header" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#ffffff;background-color:#ffffff;width:100%;">
              <tbody>
                <tr>
                  <td>
                    
              
            <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="ed-section-outlook ed-section-header-outlook" role="presentation" style="width:700px;" width="700" bgcolor="#ffffff" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
          
              
            <div style="margin:0px auto;max-width:700px;">
              
              <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                <tbody>
                  <tr>
                    <td style="direction:ltr;font-size:0px;padding:20px 0;padding-bottom:0px;padding-top:0px;text-align:center;">
                      <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="ed-block-outlook ed-block-a1490d6a-6f88-4b63-a8c9-85dda1c1f943-outlook" width="700px" ><table align="center" border="0" cellpadding="0" cellspacing="0" class="ed-block-outlook ed-block-a1490d6a-6f88-4b63-a8c9-85dda1c1f943-outlook" role="presentation" style="width:700px;" width="700" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
          
            
            <div class="ed-block ed-block-a1490d6a-6f88-4b63-a8c9-85dda1c1f943" style="margin:0px auto;max-width:700px;">
              
              <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                <tbody>
                  <tr>
                    <td style="direction:ltr;font-size:0px;padding:20px 0;padding-bottom:0px;padding-top:20px;text-align:center;">
                      <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:700px;" ><![endif]-->
                  
            <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
              
            <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
              <tbody>
                
                    <tr>
                      <td align="center" class="ed-text-container ed-column-number-0" style="color: #111111; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; text-align: center; font-size: 0px; padding: 0 10px; word-break: break-word;">
                        
            <div style="font-family:Helvetica;font-size:16px;line-height:normal;text-align:center;color:#111111;"><p style="margin: 0 0 10px; text-align: right;"><span style="color:#27ae60"><strong>NEWSLETTER</strong></span><br>
      <span style="color:#7f8c8d">Experiencia ¡WOW!</span></p></div>
          
                      </td>
                    </tr>
                  
              </tbody>
            </table>
          
            </div>
          
                <!--[if mso | IE]></td></tr></table><![endif]-->
                    </td>
                  </tr>
                </tbody>
              </table>
              
            </div>
          
            
            <!--[if mso | IE]></td></tr></table></td></tr><tr><td class="ed-block-outlook ed-block-6-outlook" width="700px" ><table align="center" border="0" cellpadding="0" cellspacing="0" class="ed-block-outlook ed-block-6-outlook" role="presentation" style="width:700px;" width="700" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
          
            
            <div class="ed-block ed-block-6" style="margin:0px auto;max-width:700px;">
              
              <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                <tbody>
                  <tr>
                    <td style="direction:ltr;font-size:0px;padding:20px 0;padding-bottom:20px;padding-top:20px;text-align:center;">
                      <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:700px;" ><![endif]-->
                  
            <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
              
            <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
              <tbody>
                
                    <tr>
                      <td align="center" style="font-size:0px;padding:0 10px;word-break:break-word;">
                        
            <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
              <tbody>
                <tr>
                  <td style="width:180px;">
                    
            <img alt="LogoJecorColores.png" height="auto" src="https://jecor.mx-router-i.com/data/b7c4b3bde6d4c4f03df758bae555d94661b5045c/media_files/2/original/LogoJecorColores.png" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" width="180">
          
                  </td>
                </tr>
              </tbody>
            </table>
          
                      </td>
                    </tr>
                  
              </tbody>
            </table>
          
            </div>
          
                <!--[if mso | IE]></td></tr></table><![endif]-->
                    </td>
                  </tr>
                </tbody>
              </table>
              
            </div>
          
            
            <!--[if mso | IE]></td></tr></table></td></tr><tr><td class="ed-block-outlook ed-block-3a81bab0-5a86-4b00-8b6f-f44fe5db53f0-outlook" width="700px" ><table align="center" border="0" cellpadding="0" cellspacing="0" class="ed-block-outlook ed-block-3a81bab0-5a86-4b00-8b6f-f44fe5db53f0-outlook" role="presentation" style="width:700px;" width="700" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
          
            
            <div class="ed-block ed-block-3a81bab0-5a86-4b00-8b6f-f44fe5db53f0" style="margin:0px auto;max-width:700px;">
              
              <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                <tbody>
                  <tr>
                    <td style="direction:ltr;font-size:0px;padding:20px 0;padding-bottom:20px;padding-top:20px;text-align:center;">
                      <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:700px;" ><![endif]-->
                  
            <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
              
            <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
              <tbody>
                
                    <tr>
                      <td align="center" class="ed-text-container ed-column-number-0" style="color: #111111; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; text-align: center; font-size: 0px; padding: 0 10px; word-break: break-word;">
                        
            <div style="font-family:Helvetica;font-size:16px;line-height:normal;text-align:center;color:#111111;"><p style="margin: 0 0 10px;"><span style="font-size:22px"><span style="font-family:Arial,Helvetica,sans-serif"><span style="color:#7f8c8d">COMUNICADO</span></span></span><br>
                <span style="font-size:28px"><strong>${title}</strong></span></p>
            </div>
          
                      </td>
                    </tr>
                  
              </tbody>
            </table>
          
            </div>
          
                <!--[if mso | IE]></td></tr></table><![endif]-->
                    </td>
                  </tr>
                </tbody>
              </table>
              
            </div>
          
            
            <!--[if mso | IE]></td></tr></table></td></tr><tr><td class="ed-block-outlook ed-block-b7454a57-e139-477b-9494-d8843caa2c63-outlook" width="700px" ><table align="center" border="0" cellpadding="0" cellspacing="0" class="ed-block-outlook ed-block-b7454a57-e139-477b-9494-d8843caa2c63-outlook" role="presentation" style="width:700px;" width="700" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
          
            
            <div class="ed-block ed-block-b7454a57-e139-477b-9494-d8843caa2c63" style="margin:0px auto;max-width:700px;">
              
              <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                <tbody>
                  <tr>
                    <td style="direction:ltr;font-size:0px;padding:20px 0;padding-bottom:20px;padding-top:20px;text-align:center;">
                      <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:700px;" ><![endif]-->
                  
            <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
              
            <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
              <tbody>
                
                    <tr>
                      <td align="center" style="font-size:0px;padding:0 10px;word-break:break-word;">
                        
            <p style="border-top:solid 5px #31bb5d;font-size:1px;margin:0px auto;width:100%;">
            </p>
            
            <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" style="border-top:solid 5px #31bb5d;font-size:1px;margin:0px auto;width:680px;" role="presentation" width="680px" ><tr><td style="height:0;line-height:0;"> &nbsp;
      </td></tr></table><![endif]-->
          
                      </td>
                    </tr>
                  
              </tbody>
            </table>
          
            </div>
          
                <!--[if mso | IE]></td></tr></table><![endif]-->
                    </td>
                  </tr>
                </tbody>
              </table>
              
            </div>
          
            
            <!--[if mso | IE]></td></tr></table></td></tr><tr><td class="ed-block-outlook ed-block-ccfc949c-c46d-4514-8c31-c79254311976-outlook" width="700px" ><table align="center" border="0" cellpadding="0" cellspacing="0" class="ed-block-outlook ed-block-ccfc949c-c46d-4514-8c31-c79254311976-outlook" role="presentation" style="width:700px;" width="700" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
          
            
            <div class="ed-block ed-block-ccfc949c-c46d-4514-8c31-c79254311976" style="margin:0px auto;max-width:700px;">
              
              <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                <tbody>
                  <tr>
                    <td style="direction:ltr;font-size:0px;padding:20px 0;padding-bottom:20px;padding-top:20px;text-align:center;">
                      <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:700px;" ><![endif]-->
                  
            <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
              
            <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
              <tbody>
                
                    <tr>
                      <td align="center" class="ed-text-container ed-column-number-0" style="color: #111111; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; text-align: center; font-size: 0px; padding: 0 10px; word-break: break-word;">
                        
            <div style="font-family:Helvetica;font-size:16px;line-height:normal;text-align:center;color:#111111;">
      <p style="margin: 0 0 10px; margin-top: 0px; margin-bottom: 10px; line-height: 150%; text-align: justify;"><span style="color:#444444">¡Buen día!</span></p>
      
      <p style="margin: 0 0 10px; margin-top: 0px; margin-bottom: 0px; line-height: 150%; text-align: justify;"><span style="color:#444444">El presente comunicado es emitido desde<strong> Subdirección, </strong>tiene como fin transmitirte <strong>${message}.</strong></span></p>
      </div>
          
                      </td>
                    </tr>
                  
              </tbody>
            </table>
          
            </div>
          
                <!--[if mso | IE]></td></tr></table><![endif]-->
                    </td>
                  </tr>
                </tbody>
              </table>
              
            </div>
          
            
            <!--[if mso | IE]></td></tr></table></td></tr><tr><td class="ed-block-outlook ed-block-d55f606b-220d-45df-903d-508b6944caa5-outlook" width="700px" ><table align="center" border="0" cellpadding="0" cellspacing="0" class="ed-block-outlook ed-block-d55f606b-220d-45df-903d-508b6944caa5-outlook" role="presentation" style="width:700px;" width="700" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
          
            
            <div class="ed-block ed-block-d55f606b-220d-45df-903d-508b6944caa5" style="margin:0px auto;max-width:700px;">
              
              <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                <tbody>
                  <tr>
                    <td style="direction:ltr;font-size:0px;padding:20px 0;padding-bottom:20px;padding-top:20px;text-align:center;">
                      <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:700px;" ><![endif]-->
                  
            <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">

            <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
            <tbody>
              
                  <tr>
                    <td align="center" vertical-align="middle" style="font-size:0px;padding:0 10px;word-break:break-word;">
          ${link === '' ? '<br></br>' :              
          `<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:separate;line-height:100%;">
            <tbody>
              <tr>
                <td align="center" bgcolor="#25922b" role="presentation" style="border:none;border-radius:4px;cursor:auto;mso-padding-alt:10px;text-align:center;background:#25922b;" valign="middle">
                  <a href="${link}" style="display:inline-block;background:#25922b;color:#ffffff;font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;font-weight:normal;line-height:120%;margin:0;text-decoration:none;text-transform:none;padding:10px;mso-padding-alt:0px;border-radius:4px;" target="_blank">
                    VER COMUNICADO
                  </a>
                </td>
              </tr>
            </tbody>
            </div>
          `}
                <!--[if mso | IE]></td></tr></table><![endif]-->
                    </td>
                  </tr>
                </tbody>
            </table>
        }
            </div>
          
            
            <!--[if mso | IE]></td></tr></table></td></tr></table><![endif]-->
                    </td>
                  </tr>
                </tbody>
              </table>
              
            </div>
          
              
            <!--[if mso | IE]></td></tr></table><![endif]-->
          
            
                  </td>
                </tr>
              </tbody>
            </table>
          
            
            <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="ed-section-outlook ed-section-contentWithBackground-outlook" role="presentation" style="width:700px;" width="700" bgcolor="#2f9c33" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
          
            
            <div class="ed-section ed-section-contentWithBackground" style="background:#2f9c33;background-color:#2f9c33;margin:0px auto;max-width:700px;">
              
              <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#2f9c33;background-color:#2f9c33;width:100%;">
                <tbody>
                  <tr>
                    <td style="direction:ltr;font-size:0px;padding:20px 0;padding-bottom:0px;padding-top:0px;text-align:center;">
                      <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="ed-block-outlook ed-block-6095556f-1eac-4f32-8865-303506600667-outlook" width="700px" ><table align="center" border="0" cellpadding="0" cellspacing="0" class="ed-block-outlook ed-block-6095556f-1eac-4f32-8865-303506600667-outlook" role="presentation" style="width:700px;" width="700" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
          
            
            <div class="ed-block ed-block-6095556f-1eac-4f32-8865-303506600667" style="margin:0px auto;max-width:700px;">
              
              <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                <tbody>
                  <tr>
                    <td style="direction:ltr;font-size:0px;padding:20px 0;padding-bottom:10px;padding-top:20px;text-align:center;">
                      <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:700px;" ><![endif]-->
                  
            <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
              
            <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
              <tbody>
                
                    <tr>
                      <td align="left" class="ed-text-container ed-column-number-0" style="color: #111111; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 0px; padding: 0 10px; word-break: break-word;">
                        
            <div style="font-family:Helvetica;font-size:16px;line-height:normal;text-align:left;color:#111111;"><p style="margin: 0 0 10px; text-align: center;"><strong><span style="color:#ffffff">Este comunicado tendrá efecto a partir del dia ${startDate}</span></strong></p></div>
          
                      </td>
                    </tr>
                  
              </tbody>
            </table>
          
            </div>
          
                <!--[if mso | IE]></td></tr></table><![endif]-->
                    </td>
                  </tr>
                </tbody>
              </table>
              
            </div>
          
            
            <!--[if mso | IE]></td></tr></table></td></tr></table><![endif]-->
                    </td>
                  </tr>
                </tbody>
              </table>
              
            </div>
          
            
            <!--[if mso | IE]></td></tr></table><![endif]-->
          
          
            <table align="center" class="ed-section ed-section-content" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#ffffff;background-color:#ffffff;width:100%;">
              <tbody>
                <tr>
                  <td>
                    
              
            <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="ed-section-outlook ed-section-content-outlook" role="presentation" style="width:700px;" width="700" bgcolor="#ffffff" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
          
              
            <div style="margin:0px auto;max-width:700px;">
              
              <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                <tbody>
                  <tr>
                    <td style="direction:ltr;font-size:0px;padding:20px 0;padding-bottom:0px;padding-top:0px;text-align:center;">
                      <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="ed-block-outlook ed-block-eb3a5844-32d2-4133-b8ec-d5d2474d21ce-outlook" width="700px" ><table align="center" border="0" cellpadding="0" cellspacing="0" class="ed-block-outlook ed-block-eb3a5844-32d2-4133-b8ec-d5d2474d21ce-outlook" role="presentation" style="width:700px;" width="700" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
          
            
            <div class="ed-block ed-block-eb3a5844-32d2-4133-b8ec-d5d2474d21ce" style="margin:0px auto;max-width:700px;">
              
              <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                <tbody>
                  <tr>
                    <td style="direction:ltr;font-size:0px;padding:20px 0;padding-bottom:20px;padding-top:20px;text-align:center;">
                      <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:700px;" ><![endif]-->
                  
            <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
              
            <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
              <tbody>
                
                    <tr>
                      <td align="left" class="ed-text-container ed-column-number-0" style="color: #111111; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 0px; padding: 0 10px; word-break: break-word;">
                        
            <div style="font-family:Helvetica;font-size:16px;line-height:normal;text-align:left;color:#111111;">
      <p style="margin: 0 0 10px;"><span style="color:#444444">Agradecemos tu atención a esta información presentada.</span></p>
      
      <p style="margin: 0 0 10px;"><span style="color:#444444">Te extendemos un cordial saludo.</span></p>
      </div>
          
                      </td>
                    </tr>
                  
              </tbody>
            </table>
          
            </div>
          
                <!--[if mso | IE]></td></tr></table><![endif]-->
                    </td>
                  </tr>
                </tbody>
              </table>
              
            </div>
          
            
            <!--[if mso | IE]></td></tr></table></td></tr><tr><td class="ed-block-outlook ed-block-bc9f9dad-b7ba-42de-8a14-e8d2f359f8cd-outlook" width="700px" ><table align="center" border="0" cellpadding="0" cellspacing="0" class="ed-block-outlook ed-block-bc9f9dad-b7ba-42de-8a14-e8d2f359f8cd-outlook" role="presentation" style="width:700px;" width="700" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
          
            
            <div class="ed-block ed-block-bc9f9dad-b7ba-42de-8a14-e8d2f359f8cd" style="margin:0px auto;max-width:700px;">
              
              <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                <tbody>
                  <tr>
                    <td style="direction:ltr;font-size:0px;padding:20px 0;padding-bottom:20px;padding-top:20px;text-align:center;">
                      <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:700px;" ><![endif]-->
                  
            <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
              
            <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
              <tbody>
                
                    <tr>
                      <td align="center" style="font-size:0px;padding:0 10px;word-break:break-word;">
                        
            <p style="border-top:solid 5px #31bb5d;font-size:1px;margin:0px auto;width:100%;">
            </p>
            
            <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" style="border-top:solid 5px #31bb5d;font-size:1px;margin:0px auto;width:680px;" role="presentation" width="680px" ><tr><td style="height:0;line-height:0;"> &nbsp;
      </td></tr></table><![endif]-->
          
          
                      </td>
                    </tr>
                  
              </tbody>
            </table>
          
            </div>
          
                <!--[if mso | IE]></td></tr></table><![endif]-->
                    </td>
                  </tr>
                </tbody>
              </table>
              
            </div>
          
            
            <!--[if mso | IE]></td></tr></table></td></tr><tr><td class="ed-block-outlook ed-block-6bb1cfda-a741-4854-a441-40c3d3a459a6-outlook" width="700px" ><table align="center" border="0" cellpadding="0" cellspacing="0" class="ed-block-outlook ed-block-6bb1cfda-a741-4854-a441-40c3d3a459a6-outlook" role="presentation" style="width:700px;" width="700" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
          
            
            <div class="ed-block ed-block-6bb1cfda-a741-4854-a441-40c3d3a459a6" style="margin:0px auto;max-width:700px;">
              
              <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                <tbody>
                  <tr>
                    <td style="direction:ltr;font-size:0px;padding:20px 0;padding-bottom:20px;padding-top:0px;text-align:center;">
                      <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:700px;" ><![endif]-->
                  
            <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
              
            <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
              <tbody>
                
                    <tr>
                      <td align="left" class="ed-text-container ed-column-number-0" style="color: #111111; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 0px; padding: 0 10px; word-break: break-word;">
                        
            <div style="font-family:Helvetica;font-size:16px;line-height:normal;text-align:left;color:#111111;"><table align="center" bgcolor="#ffffff" border="0" cellpadding="0" cellspacing="0" class="mlContentTable mlContentTableDefault" style="width:640px">
        <tbody>
          <tr>
            <td class="mlContentTableCardTd">
            <table align="center" bgcolor="#ffffff" border="0" cellpadding="0" cellspacing="0" class=" ml-default mlContentTable" style="min-width:640px; width:640px">
              <tbody>
                <tr>
                  <td>
                  <table align="center" border="0" cellpadding="0" cellspacing="0" class="mlContentTable" role="presentation" style="min-width:640px; width:640px">
                    <tbody>
                      <tr>
                        <td align="center" class="mlContentOuter" style="padding:0px 40px">
                        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%">
                          <tbody>
                            <tr>
                              <td class="bodyTitle" id="bodyText-22" style="color:#71a67e; font-family:'Inter',sans-serif; font-size:16px; line-height:100%">
                              <p style="margin: 0 0 10px; margin-top: 0px; margin-bottom: 10px; line-height: 100%; text-align: center;"><strong>ENTRE TODOS CONSTRUIMOS UNA EXPERIENCIA </strong></p>
      
                              <p style="margin: 0 0 10px; margin-top: 0px; margin-bottom: 0px; line-height: 100%; text-align: center;"><strong>¡WOW!</strong></p>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  </td>
                </tr>
              </tbody>
            </table>
            </td>
          </tr>
        </tbody>
      </table></div>
          
                      </td>
                    </tr>
                  
              </tbody>
            </table>
          
            </div>
          
                <!--[if mso | IE]></td></tr></table><![endif]-->
                    </td>
                  </tr>
                </tbody>
              </table>
              
            </div>
          
            
            <!--[if mso | IE]></td></tr></table></td></tr></table><![endif]-->
                    </td>
                  </tr>
                </tbody>
              </table>
              
            </div>
          
              
            <!--[if mso | IE]></td></tr></table><![endif]-->
          
            
                  </td>
                </tr>
              </tbody>
            </table>
          
            
            <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="ed-section-outlook ed-section-footer-outlook" role="presentation" style="width:700px;" width="700" bgcolor="#f5f5f5" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
          
            
            <div class="ed-section ed-section-footer" style="background:#f5f5f5;background-color:#f5f5f5;margin:0px auto;max-width:700px;">
              
              <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#f5f5f5;background-color:#f5f5f5;width:100%;">
                <tbody>
                  <tr>
                    <td style="direction:ltr;font-size:0px;padding:20px 0;padding-bottom:0px;padding-top:0px;text-align:center;">
                      <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="ed-block-outlook ed-block-5-outlook" width="700px" ><table align="center" border="0" cellpadding="0" cellspacing="0" class="ed-block-outlook ed-block-5-outlook" role="presentation" style="width:700px;" width="700" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
          
            
            <div class="ed-block ed-block-5" style="margin:0px auto;max-width:700px;">
              
              <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                <tbody>
                  <tr>
                    <td style="direction:ltr;font-size:0px;padding:20px 0;padding-bottom:20px;padding-top:20px;text-align:center;">
                      <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:700px;" ><![endif]-->
                  
            <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
              
            <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
              <tbody>
                
                    <tr>
                      <td align="left" class="ed-text-container ed-column-number-0" style="color: #919191; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 0px; padding: 0 10px; word-break: break-word;">
                        
            <div style="font-family:Helvetica;font-size:15px;line-height:normal;text-align:left;color:#ffffff;"><div style="text-align: center;">
      <span style="color:#999999">Este es un correo de comunicación interna de Grupo JECOR.</span><br>
       
      <p style="margin: 0 0 10px;"><span style="color:#999999">JECOR S.A. de C.V.<br>
      Marcos Gordoa 10, Zapotlán el Grande.<br>
      Jalisco, México.</span></p>


      
      <p style="margin: 0 0 10px;"><a href="https://jecor.mx-router-i.com/unsubscribe/4d6o/form?token=rfdpc4vp" target="_blank" style="color: #337ab7; text-decoration: none;"><span style="color:#ecf0f1">Baja</span></a></p>
      </div></div>
          
                      </td>
                    </tr>
                  
              </tbody>
            </table>


          
            </div>
          
                <!--[if mso | IE]></td></tr></table><![endif]-->
                    </td>
                  </tr>
                </tbody>
              </table>
              
            </div>
          
            
            <!--[if mso | IE]></td></tr></table></td></tr></table><![endif]-->
                    </td>
                  </tr>
                </tbody>
              </table>
              
            </div>
          
            
            <!--[if mso | IE]></td></tr></table><![endif]-->
          
          
            </div>
          
        
      
        <img src="https://jecor.mx-router-i.com/i/4d6o/rfdpc4vp.gif" width="1" height="1" alt="">
      </body>
      </html>
      
      </body>
      </html>
      </table></div>`
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
    sendEmailToVerify,
    sendEmail
  }