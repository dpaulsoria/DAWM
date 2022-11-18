let url = "https://pokeapi.co/api/v2/pokemon/";

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
  console.log(data.types);
  let imgs = [
    data.sprites.other["official-artwork"].front_default,
    data.sprites.other["dream_world"].front_default,
    data.sprites.other["home"].front_default,
  ];
  let card = document.createElement("div");
  card.className = "pokemon-card card flex p-2";

  let firstDiv = document.createElement('div');
  let secondDiv = document.createElement('div');
  firstDiv.className = 'flex space-between'
  secondDiv.className = 'flex space-between'
  let header = document.createElement("div");
  let img = document.createElement("div");
  let description = document.createElement("div");

  header.className = "header";
  let newH2 = document.createElement("h2");
  newH2.className = "card-title color-white rounded p-2";
  newH2.id = "currentPokemon"
  newH2.innerHTML = data.name.toUpperCase() + " #" + data.id;
  header.appendChild(newH2);

  img.className = "img";
  let newDiv = document.createElement("div");
  let newImg = document.createElement("img");
  newImg.src = imgs[0];
  newDiv.appendChild(newImg);
  img.appendChild(newDiv);

  if (firstDiv.hasChildNodes) removeChilds(firstDiv)
  firstDiv.appendChild(header)
  firstDiv.appendChild(img)

  let newH3 = document.createElement("h3");
  newH3.className = 'card-title-alpha color-white rounded p-2'
  newH3.innerHTML = "Abilities";

  let newUl = document.createElement("ul");
  newUl.className = "flex";
  Array.from(data.abilities).forEach((element, index) => {
    let newLi = document.createElement("li");
    newLi.innerHTML = capitalize(element.ability.name);
    newLi.className = "card-text p-1";
    newUl.appendChild(newLi);
  });

  description.className = "description";
  newDiv = document.createElement("div");
  newDiv.className = "abilities card-body";
  newDiv.appendChild(newH3);
  newDiv.appendChild(newUl);
  description.appendChild(newDiv);

  // card.appendChild(header);

  img.className = "img glass";
  // card.appendChild(img);
  // card.appendChild(description);
  let typesContainer = document.createElement('div')
  typesContainer.className = "container";
  typesContainer.innerHTML = `
    <div id="types" class=""></div>
  `;
  // card.appendChild(typesContainer)

  if (secondDiv.hasChildNodes) removeChilds(secondDiv);
  secondDiv.appendChild(description);
  secondDiv.appendChild(typesContainer);

  card.appendChild(firstDiv)
  card.appendChild(secondDiv)

  container.appendChild(card);
}

function removeChilds(parent) {
  while (parent.lastChild) {
    parent.removeChild(parent.lastChild);
  }
}

function capitalize(str) {
  return str[0].toUpperCase() + str.substring(1);
}

let timer = document.getElementById("timer");
timer.innerHTML = new Date().toLocaleTimeString();

searchPokemon(Math.floor(Math.random() * 894 + 1));
/* getRandomPokemons(); */

setInterval(() => {
  let timer = document.getElementById("timer");
  timer.innerHTML = new Date().toLocaleTimeString();
}, 1000);

function searchPokemon(id = undefined) {
  let container = document.getElementById("container");
  if (container.hasChildNodes) removeChilds(container);
  let pokemonName;
  if (id === undefined)
    pokemonName = document.querySelector("#search-input").value.toLowerCase();
  else pokemonName = id;

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
        <div class="rounded col color-white type-container ${element.type.name}">
            <h4 class="fw-bold mb-0 p-1">${capitalize(
              element.type.name
            )}</h4>
        </div>
        `;
      });
      
      
      console.log(res.abilities);
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
    type: "line",
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
