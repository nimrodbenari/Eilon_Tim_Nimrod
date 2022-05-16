// if (process.env.NODE !== 'prodaction') {
//   require('dorenv').config()
// }
const express = require('express')
const app = express()
const port = 3000
const flash = require('express-flash')
const session = require('express-session')
const bcrypt = require('bcrypt')

const passport = require('passport')
const initializePassport = require('./passport-config.js')
initializePassport(
  passport,
  email => users.find(user => user.email === email)
)
const users =[]

app.use(express.urlencoded({ extended: false}))
app.use(express.static('public'))
app.use(flash())
app.use(session({
  resave: false,
  saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/login', (req, res) => {
  res.render('login.html')
})

app.get('/register', (req, res) => {
  res.render('register.html')
})

app.post('/login.html',passport.authenticate('local',{
  successRedirect:'/',
  failureRedirect:'/login.html',
  failureFlash: true
}
  ))

app.post('/register.html', async (req, res) => {
  try {
   const hashedPassword = await bcrypt.hash(req.body.password, 10) 
   users.push({
    name: req.body.username,
    email: req.body.email,
    password: hashedPassword
   })
   res.redirect('/login.html')
  } catch  {
    res.redirect('/register.html')
  }
  console.log(users)
}) 

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})