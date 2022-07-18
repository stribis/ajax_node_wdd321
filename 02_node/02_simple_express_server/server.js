const express = require('express')
const app = express()

app.get('/', (req, res)=> {
  res.send('Hello Express :)')
})

app.get('/about', (req, res)=> {
  res.send('This is the about section')
})


app.listen(3000, ()=> {
  console.log(`Server has started on http://127.0.0.1:3000`)
})