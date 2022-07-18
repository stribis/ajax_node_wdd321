const express = require('express')
const app = express()

// Main Page Route 

app.get('/', (req, res)=> {
  res.send('Accessed the MAIN page')
})

app.get('/about', (req, res)=> {
  res.send('Accessed the ABOUT page')
})

app.get('/about/me', (req, res)=> {
  res.send('Martin')
})

// Example with post

app.post('/api', (req, res)=> {
  res.send('Sending data')
})

app.listen(3000, ()=> {
  'App is running :)'
})



