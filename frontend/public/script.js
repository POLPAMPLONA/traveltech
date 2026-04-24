
const API = "https://restcountries.com/v3.1/name/";

const SERVICES = {
  favorites: window.ENV?.FAVORITES || "http://localhost:3001",
  comments: window.ENV?.COMMENTS || "http://localhost:3002",
  history: window.ENV?.HISTORY || "http://localhost:3003"
};

async function searchCountry() {
  const name = document.getElementById("search").value;

  const res = await fetch(API + name);
  const data = await res.json();

  document.getElementById("result").innerHTML = `
    <h3>${data[0].name.common}</h3>
    <button onclick="addFavorite('${name}')">Favorite</button>
    <button onclick="addComment('${name}')">Comment</button>
  `;

  await fetch(SERVICES.history + "/history", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({country: name})
  });

  loadAll();
}

async function addFavorite(name) {
  await fetch(SERVICES.favorites + "/favorites", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({country: name})
  });
  loadAll();
}

async function addComment(name) {
  const text = prompt("Comment:");
  await fetch(SERVICES.comments + "/comments", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({country: name, comment: text})
  });
  loadAll();
}

async function loadAll() {
  const fav = await (await fetch(SERVICES.favorites + "/favorites")).json();
  document.getElementById("favorites").innerHTML = fav.map(f => `<li>${f.country}</li>`).join("");

  const com = await (await fetch(SERVICES.comments + "/comments")).json();
  document.getElementById("comments").innerHTML = com.map(c => `<li>${c.country}: ${c.comment}</li>`).join("");

  const hist = await (await fetch(SERVICES.history + "/history")).json();
  document.getElementById("history").innerHTML = hist.map(h => `<li>${h.country}</li>`).join("");
}

loadAll();
