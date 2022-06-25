const accountSid = 'AC36704eeeedc4c3efd869222cffbe4cc8'; 
const authToken = '9ecf14a94d060216f943712465fdae0b'; 
const client = require('twilio')(accountSid, authToken); 
const Nphone = '+972524846396';
const Ephone = '+972526336564';
 
function sendMessage(){
client.messages 
      .create({ 
         body: 'New order was insrted, go check the details! https://surf-center.herokuapp.com/orderspage.html', 
         from: 'whatsapp:+14155238886',       
         to: `whatsapp:${Ephone}` 
       }) 
      .then(message => console.log(message.sid)) 
      .done();

client.messages 
      .create({ 
         body: 'New order was insrted, go check the details! https://surf-center.herokuapp.com/orderspage.html', 
         from: 'whatsapp:+14155238886',       
         to: `whatsapp:${Nphone}` 
       }) 
      .then(message => console.log(message.sid)) 
      .done();


    }

exports.sendMessage = sendMessage;
