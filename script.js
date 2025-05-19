const characters = [
    { name: "Homero", image: "img/homero.png", phrase: "-homero-" },
    { name: "Bart", image: "img/bart.png", phrase: "-bart-" },
    { name: "Lisa", image: "img/lisa.png", phrase: "-lisa-" },
    { name: "Marge", image: "img/marge.png", phrase: "-marge-" },
    { name: "Milhouse", image: "img/milhouse.png", phrase: "-milhouse-" },
    { name: "Nelson", image: "img/nelson.png", phrase: "-nelson-" },
    { name: "Ralph", image: "img/ralph.png", phrase: "-ralph-" },
    { name: "Apu", image: "img/apu.png", phrase: "-apu-" },
    { name: "Moe", image: "img/moe.png", phrase: "-moe-" },
    { name: "Abuelo", image: "img/abuelo.png", phrase: "-abuelo-" }
  ];
  
  function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
  }
  
  const selectedCharacters = shuffle([...characters]).slice(0, 5);
  
  let selectedImage = null;
  let selectedPhrase = null;
  const matches = new Map();
  
  function renderImages() {
    const container = document.getElementById("images-container");
    container.innerHTML = "";
    shuffle([...selectedCharacters]).forEach(character => {
      const img = document.createElement("img");
      img.src = character.image;
      img.alt = character.name;
      img.dataset.name = character.name;
  
      img.addEventListener("click", () => {
        document.querySelectorAll("img").forEach(i => i.classList.remove("selected"));
        img.classList.add("selected");
        selectedImage = character.name;
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
      div.textContent = character.phrase;
      div.className = "phrase";
      div.dataset.name = character.name;
  
      div.addEventListener("click", () => {
        document.querySelectorAll(".phrase").forEach(p => p.classList.remove("selected"));
        div.classList.add("selected");
        selectedPhrase = character.name;
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
      if (matches.get(char.name) === char.name) correct++;
    });
  
    const result = document.getElementById("result");
    if (correct === selectedCharacters.length) {
      result.textContent = "¡Perfecto! Todos los emparejamientos son correctos!";
    } else {
      result.textContent = `${correct} de ${selectedCharacters.length}. ¡Inténtalo de nuevo!`;
    }
  });
  
  renderImages();
  renderPhrases();