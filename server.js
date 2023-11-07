//Important libraries we installed using npm
const express = require ("express")
const app = express()
const bcrypt = require("bcrypt")
const users = []

app.use(express.urlencoded({extended: false}))

app.post("/login", async (req, res) => {

  try{
    const hashedPassword = await bcrypt.hash(req.body.Password)
    users.push({
      id: Date.now().toStriing(),
      name: req.body.name,
      email: req.body.email,
      Password: hashedPassword,
    })
  } catch {

  }
})

//Routes
app.get('/', (req, res) => {
  res.render("index.ejs")
})

app.get('/login', (req, res) => {
  res.render("login.ejs")
})

app.get('/contactus', (req, res) => {
    res.render("contactus.ejs")
})
//End Routes

app.delete("/logout", (req, res) => {
  req.logout(req.user, err => {
      if (err) return next(err)
      res.redirect("/")
  })
})

app.listen(3000)