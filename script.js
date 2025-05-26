let selectedCharacters = [];
let selectedImage = null;
let selectedPhrase = null;
const matches = new Map();

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function renderImages() {
  const container = document.getElementById("images-container");
  container.innerHTML = "";
  shuffle([...selectedCharacters]).forEach(character => {
    const img = document.createElement("img");
    img.src = character.image;
    img.alt = character.character;
    img.dataset.name = character.character;

    img.addEventListener("click", () => {
      document.querySelectorAll("img").forEach(i => i.classList.remove("selected"));
      img.classList.add("selected");
      selectedImage = character.character;
      checkPair();
    });

    container.appendChild(img);
  });
}

function renderPhrases() {
  const container = document.getElementById("phrases-container");
  container.innerHTML = "";
  shuffle([...selectedCharacters]).forEach(character => {
    const div = document.createElement("div");
    div.textContent = character.quote;
    div.className = "phrase";
    div.dataset.name = character.character;

    div.addEventListener("click", () => {
      document.querySelectorAll(".phrase").forEach(p => p.classList.remove("selected"));
      div.classList.add("selected");
      selectedPhrase = character.character;
      checkPair();
    });

    container.appendChild(div);
  });
}

function checkPair() {
  if (selectedImage && selectedPhrase) {
    matches.set(selectedImage, selectedPhrase);
    selectedImage = null;
    selectedPhrase = null;
    document.querySelectorAll("img").forEach(i => i.classList.remove("selected"));
    document.querySelectorAll(".phrase").forEach(p => p.classList.remove("selected"));
  }
}

document.getElementById("verify-btn").addEventListener("click", () => {
  let correct = 0;
  selectedCharacters.forEach(char => {
    if (matches.get(char.character) === char.character) correct++;
  });

  const result = document.getElementById("result");
  if (correct === selectedCharacters.length) {
    result.textContent = "¡Perfecto! Todos los emparejamientos son correctos!";
  } else {
    result.textContent = `${correct} de ${selectedCharacters.length}. ¡Inténtalo de nuevo!`;
  }
});

function loadCharacters() {
  fetch("https://thesimpsonsquoteapi.glitch.me/quotes?count=5")
    .then(res => res.json())
    .then(data => {
      selectedCharacters = data;
      renderImages();
      renderPhrases();
    })
}
loadCharacters();
