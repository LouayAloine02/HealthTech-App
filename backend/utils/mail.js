const nodemailer = require("nodemailer");

exports.generateOTP = () => {
    let otp =''
        
            for(let i = 0; i<= 3; i++){
                const randVal = Math.round(Math.random( )* 9)
                otp = otp + randVal
            }
            return otp;
    
}

exports.mailTransport = () => nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "2ed0b6258953e4",
    pass: "0f0e589cd2ad2e"
  }
      });
    
exports.generateEmailTemplate = code => {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
     
      
    </head>
    <body>
        <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
    
            <div style="margin:50px auto;width:70%;padding:20px 0">
              <div style="border-bottom:1px solid #eee">
                <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">FYSALI</a>
              </div>
              <p style="font-size:1.1em">Hi,</p>
              <p>You registered an account on FYSALI App, before being able to use your account, please use the verification code below:</p>
              <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${code}</h2>
              <p>If you didn't request this, you can ignore this email!</p>
            
              <p style="font-size:0.9em;">Regards,<br />FYSALI team.</p>
              <hr style="border:none;border-top:1px solid #eee" />
              <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
               
                <p>FYSALI,Eurasanté</p>
                <p>Lille, France</p>
              
              </div>
            </div>
          </div>
    </body>
    </html>
    `
;
};

exports.planeEmailTemplate = (heading, message) => {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
   
    
  </head>
  <body>
      <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
  
          <div style="margin:50px auto;width:70%;padding:20px 0">
            <div style="border-bottom:1px solid #eee">
              <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">FYSALI</a>
            </div>
            <p style="font-size:1.1em">Hi,</p>
            <p>${heading}</p>
            <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">Thank you<h2>
            <p>${message}</p>
          
            <p style="font-size:0.9em;">Regards,<br />FYSALI team.</p>
            <hr style="border:none;border-top:1px solid #eee" />
            <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
             
              <p>FYSALI,Eurasanté</p>
              <p>Lille, France</p>
            
            </div>
          </div>
        </div>
  </body>
  </html>
  `
;
};

exports.generatePasswordResetTemplate = (url) => {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
   
    
  </head>
  <body>
      <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
  
          <div style="margin:50px auto;width:70%;padding:20px 0">
            <div style="border-bottom:1px solid #eee">
              <a  style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">FYSALI</a>
            </div>
            <p style="font-size:1.1em">Hi,</p>
            <p>Trouble signing in?</p>
            <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;"></h2>
            <p>Need to reset your password?</p>
          <p>Please use the following link to reset your password:</p>
          <div style="text-align:center ; ">
          <a href = "${url}" style="front-family:sans-serif ; margin:0 auto ; padding:20px ; text-align:center ;
          background: #e63946 ; border-radius :5px ; font-size : 20 px  ; color :#fff ; cursor:pointer ; text-decoration: none ; display : inline-block ; " > Reset Password </a>
          </div>
            <p style="font-size:0.9em;">Regards,<br />FYSALI team.</p>
            <hr style="border:none;border-top:1px solid #eee" />
            <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
             
              <p>FYSALI,Eurasanté</p>
              <p>Lille, France</p>
            
            </div>
          </div>
        </div>
  </body>
  </html>
  `
;
};

exports.generateEmail=(email) => {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
   
    
  </head>
  <body>
      <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
  
          <div style="margin:50px auto;width:70%;padding:20px 0">
            <div style="border-bottom:1px solid #eee">
              <a  style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">FYSALI</a>
            </div>
            <p style="font-size:1.1em">Bonjour,</p>
            <p>Un nouveau patient est ajouté ! </p>
            <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;"></h2>
            <p>Son adresse Email est :</p>
          <p style="font-size:1.4em;color: #e06666;text-decoration:none;font-weight:600" > &nbsp &nbsp &nbsp ${email}</p>
          
            <p style="font-size:0.9em;">Regards,<br />FYSALI team.</p>
            <hr style="border:none;border-top:1px solid #eee" />
            <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
             
              <p>FYSALI,Eurasanté</p>
              <p>Lille, France</p>
            
            </div>
          </div>
        </div>
  </body>
  </html>
  `
;
};

exports.ajoutEmail=(nom, email2) => {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
   
    
  </head>
  <body>
      <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
  
          <div style="margin:50px auto;width:70%;padding:20px 0">
            <div style="border-bottom:1px solid #eee">
              <a  style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">FYSALI</a>
            </div>
            <p style="font-size:1.1em">Bonjour, Hopital ${nom}</p>
            <p>Un nouveau patient est ajouté à votre Hopital ! </p>
            <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;"></h2>
            <p>Son adresse Email est :</p>
          <p style="font-size:1.4em;color: #e06666;text-decoration:none;font-weight:600" > &nbsp &nbsp &nbsp ${email2}</p>
          
            <p style="font-size:0.9em;">Regards,<br />FYSALI team.</p>
            <hr style="border:none;border-top:1px solid #eee" />
            <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
             
              <p>FYSALI,Eurasanté</p>
              <p>Lille, France</p>
            
            </div>
          </div>
        </div>
  </body>
  </html>
  `
;
};

