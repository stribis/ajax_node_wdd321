// When page loads, get all amiibos
getData ()
async function getData () {
  // Endpoint for all gameseries
  const url_gameseries = 'https://www.amiiboapi.com/api/gameseries'
  // Fetch GET Request
  const response = await fetch(url_gameseries)
  const data = await response.json()
  //console.log(data)
  showGames(data)
}

function showGames (data) {
  const names = []
  data.amiibo.forEach(game => {
    names.push(game.name)  
  });
  //console.log(names)
  const uniqueNames = [...new Set(names)]
  //1. Go through all names. For each game:
  uniqueNames.forEach(gameName => {
    //2. Create an <li>
    const li = document.createElement('li')
    // Optional: create an option element
    const option = document.createElement('option')
    //3. Add the current game name to the <li> as content
    li.innerText = gameName
    // Optional: add content to option
    option.setAttribute('value', gameName)
    //4. Append the current <li> in the <ul> in the HTML
    document.querySelector('.gameseries').appendChild(li)
    // Optional: add option to datalist
    document.querySelector('datalist').appendChild(option)
  })

  getAmiibos()
}

function getAmiibos () {
  // Getting Amiibos
  // Click event for the <li>
  const listItems = document.querySelectorAll('.gameseries > li')
  listItems.forEach( item => {
    item.addEventListener('click', async (e) => {
      // console.log(item.innerText)
      const response = await fetch(`https://www.amiiboapi.com/api/amiibo/?gameseries=${item.innerText}`)
      const data = await response.json()
      console.log(data)
      showAmiibos (data)
    })
  })

  document.querySelector('.search').addEventListener('submit', async (e) => {
    e.preventDefault()
    console.log(document.querySelector('#search').value)
    const response = await fetch(`https://www.amiiboapi.com/api/amiibo/?gameseries=${document.querySelector('#search').value}`)
    const data = await response.json()
    console.log(data)
    showAmiibos (data)
  })
}

function showAmiibos (data) {
  document.querySelector('.amiibos').innerHTML = ''
  document.querySelector('.amiibos').classList.toggle('show')
  data.amiibo.forEach(amiibo => {

    const div = document.createElement('div')

    const template = `
    <figure>
      <div>
        <img src="${amiibo.image}" alt="${amiibo.character}">
      </div>
      <figcaption>
        <ul>
          <li>Name: <span>${amiibo.character}</span></li>
          <li>Game Series: <span>${amiibo.gameSeries}</span></li>
          <li>Amiibo Series: <span>${amiibo.amiiboSeries}</span></li>
          <li>Amiibo Type: <span>${amiibo.type}</span></li>
        </ul>
        <p class="release-title">Release Dates:</p>
        <ul class="release-dates"><li>au: ${amiibo.release.au ? amiibo.release.au : 'N/A'}</li>
        <li>eu: ${amiibo.release.eu ? amiibo.release.eu : 'N/A'}</li>
        <li>jp: ${amiibo.release.jp ? amiibo.release.jp : 'N/A'}</li>
        <li>na: ${amiibo.release.na ? amiibo.release.na : 'N/A'}</li></p>
      </figcaption>
    </figure>
    `

    div.innerHTML = template
    document.querySelector('.amiibos').appendChild(div)

  })
}
// Open and close amiibos window
document.querySelector('.close').addEventListener('click', e => {
  console.log('clicked')
  document.querySelector('.amiibos').classList.toggle('show')
})