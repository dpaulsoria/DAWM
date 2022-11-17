  let url = 'https://pokeapi.co/api/v2/pokemon/'
  let imgUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'



function getRandomPokemons() {
  let container = document.getElementById('container')
  let imgUrls = []
  if (container.hasChildNodes)
    removeChilds(container)

  
  let randomNumber = 0
  for (let times of [0, 1, 2]) {
    let card = document.createElement('div')
    card.className = 'card glass'

    randomNumber = Math.floor(Math.random() * 600 + 1)
    
    
    url = `https://pokeapi.co/api/v2/pokemon/${randomNumber}`
    console.log(`The random number is ${randomNumber}`)
    imgUrls.push(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${randomNumber}.png`)
    
    fetch(url)
    .then((data) => data.json())
    .then((data) => {
      let header = document.createElement('div')
      let img = document.createElement('div')
      let description = document.createElement('div')
      console.log(`Counts: ${times} and IMG URL: ${imgUrls[times]}`)

      header.className = 'header'
      let newH2 = document.createElement('h2')
      newH2.innerHTML = data.name.toUpperCase()
      header.appendChild(newH2)
      
      img.className = 'img'
      let newDiv = document.createElement('div')
      let newImg = document.createElement('img')
      newImg.src = imgUrls[times]
      newDiv.appendChild(newImg)
      img.appendChild(newDiv)

      
      let newH3 = document.createElement('h3')
      newH3.innerHTML = 'Abilities'

      let newUl = document.createElement('ul')
      Array.from(data.abilities).forEach((element, index) => {
        let newLi = document.createElement('li')
        /* console.log(element.ability.name.toUpperCase(), index); */
        newLi.innerHTML = capitalize(element.ability.name)
        newUl.appendChild(newLi)
      })

      description.className = 'Description'
      newDiv = document.createElement('div')
      newDiv.className = 'abilities'
      newDiv.appendChild(newH3)
      newDiv.appendChild(newUl)
      description.appendChild(newDiv)
      
      card.appendChild(header)
      
      img.className = 'img glass'
      card.appendChild(img)
      card.appendChild(description)
      container.appendChild(card)

      
      
    })
  }
}

function removeChilds(parent) {
  while (parent.lastChild) {
    parent.removeChild(parent.lastChild)
  }
}

function capitalize(str) {
/*   let c = 0
  let tmp = ''
  Array.from(str).forEach((element, index) => {
    if (c === 0)
      tmp += element.toUpperCase()
    else 
      tmp += element 
    c++
  })
  
  return tmp */
  return str[0].toUpperCase() + str.substring(1)
}

let timer = document.getElementById('timer')
timer.innerHTML = new Date().toLocaleTimeString()


setInterval(() => {
  let timer = document.getElementById('timer')
  timer.innerHTML = new Date().toLocaleTimeString()

}, 1000)
