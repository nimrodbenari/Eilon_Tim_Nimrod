const express = require('express');
const bcrypt = require('bcrypt');
const db_adapter = require("./dbAdapter");
const ejs = require('ejs');
const app = express();
const port = 3000;
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false}))
app.use(express.static('public'))
// db_adapter.getProducts();
// db_adapter.getOrders();


app.get('/login', (req, res) => {
  
  res.render('login.html');
})

app.get('/register', (req, res) => {
  res.render('register.html')
})

app.post('/register.html', async (req, res) => {
  try {
   const hashedPassword = await bcrypt.hash(req.body.password, 10);
   db_adapter.sendUser(req.body.username,req.body.email,hashedPassword);
   res.redirect('/login.html')
  } catch  {
    res.redirect('/register.html')
  }
}) 

app.post('/login.html', async (req, res) => {
  try {
  //  const hashedPassword = await bcrypt.hash(req.body.password, 10);
   const result = db_adapter.checkUser(req.body.username,req.body.password);
   if (result) {
    // window.sessionStorage.setItem("username", result);
    res.redirect('/index.html');
   }
   else {
    res.redirect('/login.html')
    console.log('no customer was found')
   }
  } catch (error) {
    res.redirect('/login.html')
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

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})