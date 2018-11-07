const express = require('express')
const mustacheExpress = require('mustache-express')
const bodyParser = require('body-parser')
const app = express()
const models = require('./models')

app.use(express.static('css'))
app.use(bodyParser.urlencoded({ extended: false }))
app.engine('mustache',mustacheExpress())
app.set('views','./views')
app.set('view engine','mustache')

app.get('/create-list', (req,res) => {
  res.render('create-list')
})

app.post('/create-list', (req,res) => {
  let storeName = req.body.name
  let storeStreet = req.body.street
  let storeCity = req.body.city
  let storeState = req.body.state

  let listInfo = models.Grocery.build({
    name: storeName,
    street: storeStreet,
    city: storeCity,
    state: storeState
  })

  listInfo.save().then(function(){
    res.redirect('/show-lists')
  })
})

app.post('/show-lists', (req,res) => {
  let listID = req.body.listID

  models.Grocery.destroy({
    where : {
      id : listID
    }
  })
  res.redirect('/show-lists')
})

app.get('/show-lists', (req,res) => {
  models.Grocery.findAll().then(function(lists){
  res.render('show-lists', { lists : lists })
  })
})

app.get('/register', function(req,res){
  res.render('register')
})

app.post('/register', function(req,res){
  let registerUsername = req.body.username
  let registerPassword = req.body.password
})

app.get('/login', function(req,res){
  res.render('login')
})

app.post('/login', function(req,res){
  let loginUsername = req.body.username
  let loginPassword = req.body.password

  req.session.user = loginUsername
})

app.get('/', (req,res) => {
  res.redirect('/login')
})

app.listen(3000, () => console.log('server is running...')
)
