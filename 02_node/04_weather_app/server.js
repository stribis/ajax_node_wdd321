const request = require('request')
const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const apiKey = '108c1179d5f49e7ba876cdd2b2e7f156'

app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended:true}))
app.set('view engine', 'ejs')


app.get('/', (req, res)=> {
  res.render('index.ejs', {
    data: null
  })
})


app.post('/', (req, res)=> {
  //console.log(req.body)
  const city = req.body.city
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=en`

  request(apiUrl, (err, response, body)=>{
    if ( err ) {
      // There was a connection error with the API
      console.log(err)
    } else {
      const weatherData = JSON.parse(body)
      console.log(weatherData)
      if (weatherData.cod == '404') {
        // The city was not found int he API
        console.log('City was not found in the API')
      } else {
        // Everything went well :)
        console.log(weatherData)
        const data = { 
          temp: weatherData.main.temp,
          description: weatherData.weather[0].description,
          icon: weatherData.weather[0].icon,
          feels: weatherData.main.feels_like
        }
        res.render('index.ejs', {
          data : data
        })
      }
    }
  })
})


// Foo
app.listen(3000, () => {
  console.log('Server has started at http://127.0.0.1:3000')
})