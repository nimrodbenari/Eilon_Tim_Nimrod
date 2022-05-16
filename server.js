// if (process.env.NODE !== 'prodaction') {
//   require('dorenv').config()
// }
const express = require('express')
const app = express()
const port = 3000
const db_adapter = require("./dbAdapter");

const bcrypt = require('bcrypt')

const users =[]

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
  console.log(users)
}) 

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})