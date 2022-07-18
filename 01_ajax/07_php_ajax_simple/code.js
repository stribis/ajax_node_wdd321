document.querySelector('.do').addEventListener('click', getData)

async function getData() {

  const response = await fetch('send_data.php')
  const data = await response.text()

  console.log(data)
}