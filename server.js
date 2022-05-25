// if (process.env.NODE !== 'prodaction') {
//   require('dorenv').config()
// }
const express = require('express')
const app = express()
const port = 3000
const db_adapter = require("./dbAdapter");

const bcrypt = require('bcrypt')

app.use(express.urlencoded({ extended: false}))
app.use(express.static('public'))


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/login', (req, res) => {
  res.render('login.html')
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
   const hashedPassword = await bcrypt.hash(req.body.password, 10);
   db_adapter.checkUser(req.body.username,hashedPassword);
   res.redirect('/index.html');
  } catch  {
    res.redirect('/login.html')
    console.log('no customer was found')
  }
}) 

app.post('/mangerpage.html', async (req, res) => {
  try {
   db_adapter.insertProduct(req.body.productname,req.body.productprice,req.body.quantity,req.body.category);
   res.redirect('/index.html')
  } catch  {
    res.redirect('/mangerpage.html')
  }
}) 
app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})