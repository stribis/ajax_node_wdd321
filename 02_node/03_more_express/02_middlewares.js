const express = require('express')
const app = express()


let requestTime = function (req, res, next) {
  req.requestTime = Date.now()
  next()
}

app.use(requestTime)

// Main Page Route 
app.get('/', (req, res)=> {
  let responseText = `
    <h1>Hello user,<br> You accessed this website at ${req.requestTime}</h1>
  `
  res.send(responseText)
})

// Starting the server
app.listen(3000, ()=> {
  'App is running :)'
})


