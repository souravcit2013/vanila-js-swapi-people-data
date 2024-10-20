import "./styles.css";

// document.getElementById("app").innerHTML = `
// <h1>Hello JavaScript!</h1>
// `;

const getUserData = () => {
  fetch(`https://swapi.dev/api/people/`)
    .then((response) => response.json())
    .then(({ results }) => {
      console.log(results);
      renderTheTable(results);
    })
    .catch((err) => console.error(err));
};

getUserData();

const getMultipleCall = (apis = []) => {
  let films = [];
  if (apis.length > 0) {
    let promiseArr = [];
    apis.forEach((api) => {
      const promise = new Promise((resolve, reject) => {
        fetch(api)
          .then((res) => res.json())
          .then((results) => resolve(results))
          .catch((err) => console.error(err));
      });
      promiseArr = [...promiseArr, promise];
    });
    // return promiseArr;
    Promise.all(promiseArr).then((response) => {
      //   console.log("promise All....", response);
      response.forEach(({ title = "" }) => {
        films = [...films, title];
        console.log("films ", films);
        return films;
      });
    });
    // console.log("films ", films);
  }
};

const renderTheTable = (results) => {
  const trElm = document.createElement("tr");
  results.forEach(({ name = "", films = [], vehicles = [] }) => {
    const textNode = document.createTextNode(name);
    const tdNode = document.createElement("td");

    const filmsResp = getMultipleCall(films);
    console.log("filmsResp  ", filmsResp);
  });
};
