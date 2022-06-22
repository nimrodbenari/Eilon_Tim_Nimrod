const accountSid = 'AC36704eeeedc4c3efd869222cffbe4cc8'; 
const authToken = '9ecf14a94d060216f943712465fdae0b'; 
const client = require('twilio')(accountSid, authToken); 
 
function sendMessage(){
client.messages 
      .create({ 
         body: 'Thanks for buyieng Chab surf! your order number is: 123456', 
         from: 'whatsapp:+14155238886',       
         to: 'whatsapp:+972526336564' 
       }) 
      .then(message => console.log(message.sid)) 
      .done();
    }

exports.sendMessage = sendMessage;
