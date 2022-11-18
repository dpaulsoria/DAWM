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
  card.className = "card flex";

  let header = document.createElement("div");
  let img = document.createElement("div");
  let description = document.createElement("div");

  header.className = "header";
  let newH2 = document.createElement("h2");
  newH2.className = "card-title color-white rounded p-2";
  newH2.innerHTML = data.name.toUpperCase() + " #" + data.id;
  header.appendChild(newH2);

  img.className = "img";
  let newDiv = document.createElement("div");
  let newImg = document.createElement("img");
  newImg.src = imgs[0];
  newDiv.appendChild(newImg);
  img.appendChild(newDiv);

  let newH3 = document.createElement("h3");
  newH3.className = 'card-title color-white rounded p-2'
  newH3.innerHTML = "Abilities";

  let newUl = document.createElement("ul");
  newUl.className = "flex";
  Array.from(data.abilities).forEach((element, index) => {
    let newLi = document.createElement("li");
    newLi.innerHTML = capitalize(element.ability.name);
    newLi.className = "card-text";
    newUl.appendChild(newLi);
  });

  description.className = "Description";
  newDiv = document.createElement("div");
  newDiv.className = "abilities card-body";
  newDiv.appendChild(newH3);
  newDiv.appendChild(newUl);
  description.appendChild(newDiv);

  card.appendChild(header);

  img.className = "img glass";
  card.appendChild(img);
  card.appendChild(description);
  let typesContainer = document.createElement('div')
  typesContainer.className = "container";
  typesContainer.innerHTML = `
    <div id="types" class=""></div>
  `;
  card.appendChild(typesContainer)
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
      typesBanner.className = `flex-row`;
      typesBanner.innerHTML = "";
      Array.from(res.types).forEach((element, index) => {
        typesBanner.innerHTML += `
        <div class="rounded col color-white ${element.type.name}">
            <h2 class="fs-3 fw-bold mb-0 p-1">${capitalize(
              element.type.name
            )}</h2>
        </div>
        `;
      });
    });
}

function getStyleFromType(type) {}

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
