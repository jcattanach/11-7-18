const express = require('express')
const mustacheExpress = require('mustache-express')
const bodyParser = require('body-parser')
const app = express()
const models = require('./models')
const sessions = require('express-session')

app.use(sessions({ secret: 'asdfdsa', saveUninitialized: false, resave: false}))
app.use(express.static('css'))
app.use(bodyParser.urlencoded({ extended: false }))
app.engine('mustache',mustacheExpress())
app.set('views','./views')
app.set('view engine','mustache')

app.get('/logout', (req,res) =>{
  req.session.destroy(function(err){

  })

  res.redirect('/login')
})

app.get('/create-list', (req,res) => {
  if(req.session.userId == null){
    res.redirect('/login')
  } else {
  res.render('create-list')
}
})

app.post('/delete-item', (req,res) =>{
  storeID = req.body.storeID
  itemName = req.body.itemName
  models.items.destroy({
    where : {
      item : itemName
    }
  })
  res.redirect(`/show-lists/${storeID}`)
})

app.post('/add-item', function(req,res){
  itemName = req.body.itemName
  storeID = req.body.storeID

  let itemInfo = models.items.build({
    item: itemName,
    storelistid: storeID
  })

  itemInfo.save().then(function(){
    res.redirect(`/show-lists/${storeID}`)
  })
})

app.get('/show-lists/:storeID', function(req,res){
  storeID = req.params.storeID
  models.Grocery.findOne({
    where : {
      id : storeID
    },
    include: [
      {
        model : models.items,
        as : 'items'
      }
    ]
  }).then(function(store){
  res.render('list-details', { lists : store.items, name : store.name, storeID : store.id})
  })
})

app.post('/create-list', (req,res) => {
  let storeName = req.body.name
  let storeStreet = req.body.street
  let storeCity = req.body.city
  let storeState = req.body.state
  let userId = req.session.userId

  let listInfo = models.Grocery.build({
    name: storeName,
    street: storeStreet,
    city: storeCity,
    state: storeState,
    userID: userId
  })

  listInfo.save().then(function(){
    res.redirect('/show-lists')
  })
})

app.post('/show-lists', (req,res) => {
  let listID = req.body.listID

  models.items.destroy({
    where : {
      storelistid : listID
    }
  })
  models.Grocery.destroy({
    where : {
      id : listID
    }
  })
  res.redirect('/show-lists')
})

app.get('/show-lists', (req,res) => {
  if(req.session.userId == null){
    res.redirect('/login')
  } else {
  models.user.findOne({
    where : {
      id : req.session.userId
    },
    include: [
      {
        model : models.Grocery,
        as : 'stores'
      }
    ]
  }).then(function(user){
  res.render('show-lists', { lists : user.stores, userName : user.name })
  })
}})

app.get('/register', function(req,res){
  res.render('register')
})

app.post('/register', function(req,res){
  let registerUsername = req.body.username
  let registerPassword = req.body.password

  let userInfo = models.user.build({
    name: registerUsername,
    password: registerPassword
  })

  userInfo.save().then(function(){
    res.redirect('/login')
  })
})

app.get('/login', function(req,res){
  res.render('login')
})

app.post('/login', function(req,res){
  let loginUsername = req.body.username
  let loginPassword = req.body.password

  models.user.findOne({
    where : {
      name : loginUsername
    }
  }).then(function(userInfo){
    if(userInfo.password == loginPassword){
      console.log('login succesful')
      req.session.userId = userInfo.id
      res.redirect('/show-lists')

    } else {
      res.redirect('/login')
    }
  })

  })

app.get('/', (req,res) => {
  res.redirect('/login')
})

app.listen(3000, () => console.log('server is running...')
)
