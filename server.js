const {sendMessage} = require("./send-whatsapp");
const express = require('express');
const bcrypt = require('bcrypt')
const db_adapter = require("./dbAdapter");
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');

// ----------------APP USE-----------------------
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false}))

// ----------------POST ROUTERS-----------------------
app.post('/register', async (req, res) => {
  try {
   const hashedPassword = await bcrypt.hash(req.body.password, 10);
   db_adapter.sendUser(req.body.username,req.body.email,req.body.rolle,hashedPassword);
   res.redirect('/login.html')
  } catch  {
    res.redirect('/register.html')
  }
}) 

app.post('/login', async (req, res) => {
  try {
   const result = db_adapter.checkUser(req.body.username,req.body.password);
   if (result=='manager') {
    res.redirect('/index.html');
   }
   else {
    console.log('customer was found')
   }
  } catch (error) {
    res.redirect('/index.html');
    console.log(error)
  }
}) 

app.post('/mangerpage.html', async (req, res) => {
  try {
   db_adapter.insertProduct(req.body.productname,req.body.productprice,req.body.quantity,req.body.category,req.body.url);
   res.redirect('/index.html')
   console.log('inserted')
  } catch  {
    console.log('no products was inserted')
    res.redirect('/index.html')
  }
})

app.post('/neworder', async (req, res) => {
  try {
   db_adapter.insertOrder(req.body);
   res.redirect('/index.html')
    console.log('new order inserted')
  } catch  {
    console.log('no order inserted')
    res.redirect('/index.html')
  }
})

app.post('/updateStatus', async (req, res) => {
  try {
   db_adapter.updateStatus(req.body.orderid);
  } catch  {
    console.log('not updated')
  }
})

app.post('/newsletter', async (req, res) => {
  try {
   db_adapter.sendNewsEmail(req.body.Email);
  } catch  {
    console.log('not updated')
  }
})

app.post('/homepage.html', async (req, res) => {
  try {
   db_adapter.newContact(req.body.Name,req.body.Email,req.body.Subject,req.body.Message);
   res.redirect('/index.html')
   console.log('inserted')
  } catch  {
    console.log('no products was inserted')
    res.redirect('/index.html')
  }
})
// ----------------GET ROUTERS-----------------------
app.get('/getproducts',(req, res) => {  
  db_adapter.getProducts()
  .then(function(response){
    res.send(response)
   })
})

app.get('/getorders',(req, res) => {  
    db_adapter.getOrders()
    .then(function(response){
      res.send(response)
     })
})

app.get('/sendMessage',(req, res) => {  
    sendMessage()
})

app.get('/login', (req, res) => {
  res.render('login.html');
})

app.get('/register', (req, res) => {
  res.render('register.html')
})

// -----------LISTEN---------
app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})

