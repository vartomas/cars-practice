const express = require('express')
const app = express()
const mongoose = require('mongoose')
const routes = require('./routes/routes')

mongoose.connect('mongodb://localhost/my_database', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})

app.use(express.json())
app.use('/', routes)

app.listen(3000)