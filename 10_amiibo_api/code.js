
getData()

async function getData () {
  // Endpoint for all gameseries in the Amiibo API
  const url_gameseries = 'https://www.amiiboapi.com/api/gameseries/'
  // Fetch Get Request
  const response = await fetch(url_gameseries)
  const data = await response.json()
  console.log(data)
  showGames(data)
}

function showGames (data) {
  // Extract only the names (including duplicates)
  const names = []
  data.amiibo.forEach( game => {
    names.push(game.name)
  })
  // Create a new Set of unique names
  const uniqueNames = [... new Set(names)]

  // Create DOM Elements for each Game Name
  uniqueNames.forEach(gameName => {
    const li = document.createElement('li')
    // Add content to the li
    li.innerText = gameName
    // Insert Li to DOM
    document.querySelector('.gameseries').appendChild(li)
  })

  getAmiibos()

}


function getAmiibos () {
  // Getting Amiibos
  // Click event for all the li's
  const listItems = document.querySelectorAll('.gameseries > li')
  listItems.forEach(item => {
    item.addEventListener('click', async e => {
      console.log(item.innerText)

      const response = await fetch(`https://www.amiiboapi.com/api/amiibo/?gameseries=${item.innerText}`)
      const data = await response.json()

      console.log(data)
      showAmiibos(data)
    })
  })
}

function showAmiibos (data) {
  document.querySelector('.amiibos').innerHTML = ''
  data.amiibo.forEach( amiibo => {
    const div = document.createElement('div')

    const template = `
    <figure>
      <div>
        <img src="${amiibo.image}" alt="${amiibo.character}">
      </div>
      <figcaption>
        <ul>
          <li>Name: ${amiibo.character}</li>
          <li>Game Series: ${amiibo.gameSeries}</li>
          <li>Amiibo Series: ${amiibo.amiiboSeries}</li>
          <li>Type: ${amiibo.type}</li>
        </ul>
      </figcaption>
    </figure>
    `

    div.innerHTML = template
    document.querySelector('.amiibos').appendChild(div)
  })
}