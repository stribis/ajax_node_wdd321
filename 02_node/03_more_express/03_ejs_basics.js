const express = require('express')
const app = express()

app.set('view engine', 'ejs')
app.use(express.static('public'))
// Main page
app.get('/', (req, res)=> {

  let studentData = [
    {name: 'Petar', note: '10'},
    {name: 'Cécile', note: '5'},
    {name: 'Yassine', note: '6'},
    {name: 'Anika', note: '8'}
  ]

  let message = 'Express is ver simple to use : P '

  res.render('index.ejs', {
    students: studentData,
    message: message
  })
})

// About page
app.get('/about', (req, res)=> {
  res.render('about.ejs')
})

// Starting the server
app.listen(3000, ()=> {
  console.log('App is running :)')
})
