

document.querySelector('form').addEventListener('submit', function (e){
  e.preventDefault()

  const fd = new FormData(document.querySelector('form'))
  // console.log(fd)

  sendData (fd)
  
})

async function sendData (fd) {

  const response = await fetch('contact_me.php', { method : 'POST', body : fd})
  const data = await  response.json()

  console.log(data[0]) // Fail || Success

  if (data[0] == 'fail') {
    document.querySelector('form').append(data[1])
  } else if (data[0] == 'success') {
    document.querySelector('body').append(data[1])
  }
}


