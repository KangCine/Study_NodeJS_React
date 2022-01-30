const express = require('express')
const app = express()
const port = 3000

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://cine:cine@cluster0.7sr4t.mongodb.net/myFirstDatabase')
.then(() => console.log('MongoDB Connected...'))
.catch(arr => console.log(arr))

app.get('/', (req, res) => {
  res.send('Hello, Express!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
})