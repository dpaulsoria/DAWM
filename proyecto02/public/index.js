let url = "https://pokeapi.co/api/v2/pokemon/";

let currentId = 1

function getRandomPokemons() {
  let container = document.getElementById("container");
  if (container.hasChildNodes) removeChilds(container);

  let randomNumber = 0;
  for (let times of [0, 1, 2]) {
    let card = document.createElement("div");
    card.className = "card glass";

    randomNumber = Math.floor(Math.random() * 998 + 1);

    url = `https://pokeapi.co/api/v2/pokemon/${randomNumber}`;
    // console.log(`The random number is ${randomNumber}`);

    fetch(url)
      .then((data) => data.json())
      .then((data) => {
        generatePokemonCard(data);
      });
  }
}

function generatePokemonCard(data) {

  let cardTitle = document.querySelector("#card-title");
  cardTitle.innerHTML = data.name.toUpperCase() + " #" + data.id;
  currentId = data.id;

  let cardImg = document.querySelector("#card-img");
  cardImg.src = data.sprites.front_default;

  let abilities = document.querySelector("#abilities");
  if (abilities.hasChildNodes) removeChilds(abilities)
  Array.from(data.abilities).forEach((element, index) => {
    let tmpLi = document.createElement('li')

    fetch(element.ability.url)
      .then(data => data.json())
      .then(data => {
        let info = 'No info'
        Array.from(data.effect_entries).forEach((element) => {
          if (element.language.name === "en") {
            info = element.effect
          }
        })
        let h4 = document.createElement('h4')
        h4.className = 'fw-bold'
        h4.innerHTML = capitalize(element.ability.name);
        let div = document.createElement('div')
        let p = document.createElement('p')
        p.innerHTML = info
        div.appendChild(p)
        
        tmpLi.appendChild(h4)
        tmpLi.appendChild(div)

        abilities.appendChild(tmpLi);
      })
    
    
    updateBarChart(data)
    
  });
  
 
}

function updateBar() {
  // console.log(currentId);
  // updateBarChart()
  fetch(url + currentId)
    .then(data => data.json())
    .then(data => { 
      updateBarChart(data);
    });
}

function updateBarChart(data) {

  let move = document.querySelector("#select-move");
  move.innerHTML = "";
  let counter = 0;
  let moves = [];
  for (let element of data.moves) {
    // console.log(element.move);
    if (counter < 10) {
      moves.push([capitalize(element.move.name), element.move.url]);
      counter++;
    } else {
      break;
    }
  }
  console.log(moves);
  counter = 0;

  for (let element of moves) {
    if (counter < 10) {
      move.innerHTML += `
          <option ${counter === 0 ? 'selected' : ""}>${element[0]}</option>
          `;
      counter++;
    } else {
      break;
    }
  }
  
  let currentMove = []
  for (let m of moves) {
    if (m[0] === move.value) {
      currentMove = [move.value, m[1]]
      break
    }
  }

  console.log(currentMove);
  
  fetch(currentMove[1])
    .then((res) => res.json())
    .then((info) => {
      // console.log(info);

      let barChart = new Chart(
        document.getElementById("bar").getContext("2d"),
        {
          type: "bar",
          data: {
            labels: ["Accuracy", "Power", "PP"],
            datasets: [
              {
                label: capitalize(info.name),
                data: [info.accuracy, info.power, info.pp],
                backgroundColor: [
                  getColorByType(data.types[0].type.name),
                  data.types[1]
                    ? getColorByType(data.types[1].type.name)
                    : "#4E73DF",
                  "#2f2f2f",
                ],
              },
            ],
          },
          options: {
            indexAxis: "y",
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        }
      );
    });
}

function getColorByType(type) {
  if (type === 'normal') return "#A4AcAF"
  else if (type === 'psychic') return "#F366B9"
  else if (type === 'steel') return "#9EB7B8"
  else if (type === "dark") return "#707070";
  else if (type === "electric") return "#EED535";
  else if (type === "fighting") return "#fighting";
  else if (type === "flying") return "#3DC7EF";
  else if (type === "grass") return "#9BCC50";
  else if (type === "ice") return "#51C4E7";
  else if (type === "poison") return "#B97FC9";
  else if (type === "rock") return "#A38C21";
  else if (type === "water") return "#4592C4";
  else if (type === "ground") return "#F7DE3F";
  else if (type === "ghost") return "#7B62A3";
  else if (type === "fire") return "#FD7D24";
  else if (type === "fairy") return "#FDB9E9";
  else if (type === "dragon") return "#53A4CF";
  else if (type === "bug") return "#729F3F";
  else return null
}


function removeChilds(parent) {
  while (parent.lastChild) {
    parent.removeChild(parent.lastChild);
  }
}

function capitalize(str) {
  return str[0].toUpperCase() + str.substring(1);
}

/* getRandomPokemons(); */

// setInterval(() => {
//   let timer = document.getElementById("timer");
//   timer.innerHTML = new Date().toLocaleTimeString();
// }, 1000);

function searchPokemon(id = undefined) {
  
  let pokemonName;
  if (id === undefined)
    pokemonName = document.querySelector("#search-input").value.toLowerCase();
  else pokemonName = id;
  currentId = pokemonName;

  // console.log(pokemonName);
  let tmpUrl = url + pokemonName;
  // console.log(tmpUrl);

  fetch(tmpUrl)
    .then((res) => res.json())
    .then((res) => {
      // console.log(res.stats);
      let stats = res.stats;
      let tmp = [];
      let statNames = [];
      let statPoints = [];
      Array.from(stats).forEach((element, index) => {
        tmp.push({
          name: element.stat.name,
          base_stat: element.base_stat,
          url: element.stat.url,
        });
        if (element.stat.name.includes("-")) {
          let name = element.stat.name.split("-");
          element.stat.name = capitalize(name[0]) + " " + capitalize(name[1]);
        }
        statNames.push(capitalize(element.stat.name));
        statPoints.push(element.base_stat);
      });
      generatePokemonCard(res);
      let chart = new Chart(
        document.getElementById("canvas").getContext("2d"),
        generateChart(statNames, statPoints)
      );
      // console.log(tmp);

      let typesBanner = document.querySelector("#types");
      typesBanner.className = 'flex';
      if (typesBanner.hasChildNodes) removeChilds(typesBanner)
      Array.from(res.types).forEach((element, index) => {
        typesBanner.innerHTML += `
        <h4 class="fw-bold p-1 m-2 text-center rounded col color-white type-container ${
          element.type.name
        }">
            ${capitalize(element.type.name)}
        </h4>
        `;
      });
      
      
      // console.log(res.abilities);
      // let abilitiesBanner = document.querySelector("#abilitiesBanner");
      // if (abilitiesBanner.hasChildNodes) removeChilds(abilitiesBanner);
      // Array.from(res.abilities).forEach((element, index) => {
      //   let ability = document.createElement("div");
      //   ability.className = "col-md-6 col-xl-3 mb-4";
      //   ability.innerHTML = `
      //   <div class="card shadow border-start-primary py-2">
      //     <div class="card-body">
      //       <div class="row align-items-center no-gutters">
      //         <div class="col me-2">
      //           <div
      //             class="text-uppercase text-primary fw-bold text-xs mb-1"
      //           >
      //             <span>${capitalize(element.ability.name)}</span>
      //           </div>
      //           <!-- <div class="text-dark fw-bold h5 mb-0">
      //             <span>$40,000</span>
      //           </div> -->
      //         </div>
      //         <!-- <div class="col-auto">
      //           <i class="fas fa-calendar fa-2x text-gray-300"></i>
      //         </div> -->
      //       </div>
      //     </div>
      //   </div>
      // `;
      //   abilitiesBanner.appendChild(ability);
      // });
    });
}


function download(content, fileName, contentType) {
  var a = document.createElement("a");
  var file = new Blob([content], { type: contentType });
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  a.click();
}

function getReport() {
  let pokemonId = ''
  try {
    pokemonId = document.querySelector('#currentPokemon').innerHTML.split('#')[1]
  } catch (error) {
    pokemonId = document.querySelector("#search-input").value;
  }
  fetch(url + pokemonId)
    .then(data => data.json())
    .then(data => {
      download(JSON.stringify(data), `${data.name}_pokemon.json`, "text/json");
    })
}

function generateChart(labelsX, labelsY) {
  /*   const config = {
    type: "radar",
    data: data,
    options: {
      plugins: {
        filler: {
          propagate: false,
        },
        "samples-filler-analyser": {
          target: "chart-analyser",
        },
      },
      interaction: {
        intersect: false,
      },
    },
  };
  const labels = labelsX;
  const data = {
    labels: generateLabels(),
    datasets: [
      {
        label: labelsX[0].toUpperCase(),
        data: labelsY[0],
        borderColor: Utils.CHART_COLORS.red,
        backgroundColor: Utils.transparentize(Utils.CHART_COLORS.red),
      },
      {
        label: labelsX[1].toUpperCase(),
        data: labelsY[1],
        borderColor: Utils.CHART_COLORS.orange,
        hidden: true,
        backgroundColor: Utils.transparentize(Utils.CHART_COLORS.orange),
        fill: "-1",
      },
      {
        label: labelsX[2].toUpperCase(),
        data: labelsY[2],
        borderColor: Utils.CHART_COLORS.yellow,
        backgroundColor: Utils.transparentize(Utils.CHART_COLORS.yellow),
        fill: 1,
      },
      {
        label: labelsX[3].toUpperCase(),
        data: labelsY[3],
        borderColor: Utils.CHART_COLORS.green,
        backgroundColor: Utils.transparentize(Utils.CHART_COLORS.green),
        fill: false,
      },
      {
        label: labelsX[4].toUpperCase(),
        data: labelsY[4],
        borderColor: Utils.CHART_COLORS.blue,
        backgroundColor: Utils.transparentize(Utils.CHART_COLORS.blue),
        fill: "-1",
      },
      {
        label: labelsX[5].toUpperCase(),
        data: labelsY[5],
        borderColor: Utils.CHART_COLORS.purple,
        backgroundColor: Utils.transparentize(Utils.CHART_COLORS.purple),
        fill: "-1",
      },
      {
        label: labelsX[6].toUpperCase(),
        data: labelsY[6],
        borderColor: Utils.CHART_COLORS.grey,
        backgroundColor: Utils.transparentize(Utils.CHART_COLORS.grey),
        fill: { value: 85 },
      },
    ],
  };

  let smooth = false;
  let propagate = false;

  const actions = [
    {
      name: "Randomize",
      handler(chart) {
        inputs.from = [];
        chart.data.datasets.forEach((dataset) => {
          dataset.data = generateData();
        });
        chart.update();
      },
    },
    {
      name: "Propagate",
      handler(chart) {
        propagate = !propagate;
        chart.options.plugins.filler.propagate = propagate;
        chart.update();
      },
    },
    {
      name: "Smooth",
      handler(chart) {
        smooth = !smooth;
        chart.options.elements.line.tension = smooth ? 0.4 : 0;
        chart.update();
      },
    },
  ];
 */

  return {
    type: "radar",
    data: {
      labels: labelsX,
      datasets: [
        {
          label: "Points",
          fill: true,
          data: labelsY,
          backgroundColor: "rgba(78, 115, 223, 0.05)",
          borderColor: "rgba(78, 115, 223, 1)",
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      legend: {
        display: false,
        labels: {
          fontStyle: "normal",
        },
      },
      title: {
        fontStyle: "normal",
      },
      scales: {
        xAxes: [
          {
            gridLines: {
              color: "rgb(234, 236, 244)",
              zeroLineColor: "rgb(234, 236, 244)",
              drawBorder: false,
              drawTicks: false,
              borderDash: ["2"],
              zeroLineBorderDash: ["2"],
              drawOnChartArea: false,
            },
            ticks: {
              fontColor: "#858796",
              fontStyle: "normal",
              padding: 20,
            },
          },
        ],
        yAxes: [
          {
            gridLines: {
              color: "rgb(234, 236, 244)",
              zeroLineColor: "rgb(234, 236, 244)",
              drawBorder: false,
              drawTicks: false,
              borderDash: ["2"],
              zeroLineBorderDash: ["2"],
            },
            ticks: {
              fontColor: "#858796",
              fontStyle: "normal",
              padding: 20,
            },
          },
        ],
      },
    },
  };
}