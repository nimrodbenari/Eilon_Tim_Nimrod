const express = require('express');
const bcrypt = require('bcrypt');
const db_adapter = require("./dbAdapter");
const app = express();
const port = 3000;

app.use(express.static('public'))

app.use(express.urlencoded({ extended: false}))

app.get('/login', (req, res) => {
  res.render('login.html');
})

app.get('/register', (req, res) => {
  res.render('register.html')
})

// app.post('/register.html', async (req, res) => {
//   try {
//    const hashedPassword = await bcrypt.hash(req.body.password, 10);
//    db_adapter.sendUser(req.body.username,req.body.email,hashedPassword);
//    res.redirect('/login.html')
//   } catch  {
//     res.redirect('/register.html')
//   }
// }) 

app.post('/login.html', async (req, res) => {
  try {
  //  const hashedPassword = await bcrypt.hash(req.body.password, 10);
   const result = db_adapter.checkUser(req.body.username,req.body.password);
   if (result) {
    // window.sessionStorage.setItem("username", result);
    res.redirect('/index.html');
   }
   else {
    console.log('no customer was found 1 ')
   }
  } catch (error) {
    res.redirect('/index.html')
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

app.post('/neworder.html', async (req, res) => {
  try {
   db_adapter.insertOrder(req.body.productmodel,req.body.customername,req.body.shipingaddres,req.body.phonenumber,req.body.email,req.body.cardnumber,req.body.cvv,req.body.expire);
   db_adapter.updateQuantity(req.body.productmodel);
   res.redirect('/index.html')
    console.log('new order inserted')
  } catch  {
    console.log('no order inserted')
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