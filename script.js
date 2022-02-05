// import { data } from "./modules/dataModule.js"
let dataJSON = JSON.parse(localStorage.getItem("names"));

const url = "http://hp-api.herokuapp.com/api/characters";
fetch(url)
  .then((response) => response.json())
  .then((result) => {
    data = result;
    console.log(data);
    allData(data);
  });

let color = "white";
setInterval(() => {
  let img = document.querySelectorAll(".img");
  img.forEach((elem) => {
    if (color === "white") {
      color = "gray";
    } else {
      color = "white";
    }
    elem.style.boxShadow = "10px 10px 15px " + color;
  });
}, 300);

function allData(data) {
  localStorage.setItem("data", JSON.stringify(data));

  const cards = document.querySelector(".cards");
  const input = document.querySelector(".search__input");
  const select = document.querySelector(".search__select");
  input.value = localStorage.getItem("input");

   function unique(elem) {
    let array = [];
    elem.forEach(function (item) {
      if (!array.includes(item.house)) {
        array.push(item.house);
      }
    });
    return array;
  }
  let uniqueHouse = unique(data);

  select.value = localStorage.getItem("select");

  let options = "";
  uniqueHouse.forEach((ind) => {
    options += `<select name="school">
                  <option>${ind}</option></select>`;
    select.innerHTML = `<option>All</option>` + options;
  });

  function render(data) {
    let users = "";
    data.map((item) => {
      users += `<div class="block"><div><img class="img" src = "${
        item.image
      }"></div>
                  <div class="blockText"><h2>Name: ${item.name}</h2>
                  <p>Actor: ${item.actor}</p>
                  <p>Gender: ${item.gender}</p>
                  <p>House: ${item.house}</p>
                  <p>Wand.core: ${item.wand.core}</p>
                  <p>Alive: ${item.alive ? "yes" : "no"}</p></div></div>`;
    });
    cards.innerHTML = users;
  }

  render(dataFilter(select.value, input.value.toLowerCase()));

  select.addEventListener("input", () => {
    let school = select.value;
    localStorage.setItem("select", school);
    render(dataFilter(school, input.value));
  });

  function dataFilter(school, name) {
    if (select.value === "") {
      return data.filter(
        (element) =>
          element.house === "" && element.name.toLowerCase().includes(name)
      );
    } else if (select.value === "All") {
      return data.filter((element) =>
        element.name.toLowerCase().includes(name)
      );
    } else {
      return data.filter(
        (element) =>
          element.house.includes(school) &&
          element.name.toLowerCase().includes(name)
      );
    }
  }

  input.addEventListener("input", () => {
    let searchName = input.value.toLowerCase();
    localStorage.setItem("input", searchName);
    render(dataFilter(select.value, searchName));
  });
}
allData(data)