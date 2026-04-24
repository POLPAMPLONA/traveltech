const API = "https://restcountries.com/v3.1/name/";

const SERVICES = {
  favorites: "https://service-favorites-65uh.onrender.com/",
  comments: "https://service-comments.onrender.com/",
  history: "https://service-history.onrender.com/"
};

async function searchCountry() {
  const name = document.getElementById("search").value;

  try {
    const res = await fetch(API + name);
    const data = await res.json();

    if (!data || data.status === 404) {
      document.getElementById("result").innerHTML = "Country not found";
      return;
    }

    const country = data[0];

    document.getElementById("result").innerHTML = `
      <h3>${country.name.common}</h3>
      <img src="${country.flags.png}" width="150"/>
      <p>Capital: ${country.capital?.[0] || "N/A"}</p>
      <p>Region: ${country.region}</p>

      <button onclick="addFavorite('${country.name.common}')">⭐ Favorite</button>
      <button onclick="addComment('${country.name.common}')">💬 Comment</button>
    `;

    // Guardar en historial
    await fetch(SERVICES.history + "/history", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ country: country.name.common })
    });

    loadAll();

  } catch (err) {
    console.error(err);
    document.getElementById("result").innerHTML = "Error loading country";
  }
}

// FAVORITES
async function addFavorite(name) {
  await fetch(SERVICES.favorites + "/favorites", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ country: name })
  });

  loadAll();
}

// COMMENTS
async function addComment(name) {
  const text = prompt("Write a comment:");

  if (!text) return;

  await fetch(SERVICES.comments + "/comments", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      country: name,
      comment: text
    })
  });

  loadAll();
}

// LOAD ALL DATA
async function loadAll() {
  try {
    // FAVORITES
    const fav = await (await fetch(SERVICES.favorites + "/favorites")).json();
    document.getElementById("favorites").innerHTML =
      fav.map(f => `<li>${f.country}</li>`).join("");

    // COMMENTS
    const com = await (await fetch(SERVICES.comments + "/comments")).json();
    document.getElementById("comments").innerHTML =
      com.map(c => `<li>${c.country}: ${c.comment}</li>`).join("");

    // HISTORY
    const hist = await (await fetch(SERVICES.history + "/history")).json();
    document.getElementById("history").innerHTML =
      hist.map(h => `<li>${h.country}</li>`).join("");

  } catch (err) {
    console.error("Error loading services:", err);
  }
}

// cargar al iniciar
loadAll();
