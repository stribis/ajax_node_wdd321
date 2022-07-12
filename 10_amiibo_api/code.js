
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
}