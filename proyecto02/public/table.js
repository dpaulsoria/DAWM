document.addEventListener(onload, completePokemonList());
document
  .querySelector("#cantd-pok")
  .value.addEventListener(onchange, completePokemonList());

function completePokemonList() {
  let body = document.querySelector("#pokemonListBody");
  let option = document.querySelector("#cantd-pok");
  if (body.hasChildNodes) removeChilds(body);
  for (let i of Array.from({ length: option.value }, (_, i) => i + 1)) {
    let tr = document.createElement("tr");
    fetch(url + i.toString())
      .then((data) => data.json())
      .then((pokemon) => {
        let tmpTypes = [];
        Array.from(pokemon.types).forEach((element) => {
          tmpTypes.push(capitalize(element.type.name));
        });
        tr.innerHTML = `
        <td>
          <img
            class="rounded-circle me-2"
            width="100"
            height="100"
            src="${pokemon.sprites.front_default}"
          />${capitalize(pokemon.name)}
        </td>
        <td>${pokemon.id}</td>
        <td>${tmpTypes.join(" ")}</td>
        <td>${pokemon.weight}</td>
        <td>${pokemon.height}</td>
        `;
        body.appendChild(tr);
      });
  }
}
