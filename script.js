let numberOfCards;
let cardContainer = document.querySelector(".container");
let cardCollection = [
  "bobrossparrot",
  "explodyparrot",
  "fiestaparrot",
  "metalparrot",
  "revertitparrot",
  "tripletsparrot",
  "unicornparrot",
];
let cardHTML;
let numberOfTries = 0;

askNumber();

function askNumber() {
  numberOfCards = prompt("Quantas cartas você quer jogar?");
  if (numberOfCards % 2 === 0 && numberOfCards >= 4 && numberOfCards <= 14) {
    renderCards();
  } else {
    alert("Escolha um número par entre 4 e 14.");
    askNumber();
  }
}

function randomizer() {
  return Math.random() - 0.5;
}

function renderCards() {
  // Randomizando o array cardCollection
  cardCollection.sort(randomizer);

  // Garantindo que o conteúdo do container é nulo
  cardContainer.textContent = "";

  // Criando o array que receberá cartas sorteadas
  let drawnCards = [];

  // Loop que insere a mesma carta sorteada em drawnCards 2 vezes!
  for (let i = 0; i < numberOfCards / 2; i++) {
    cardHTML = `<div class="card" onclick="flipCard(this);">
                    <div class="front-face face">
                      <img src="assets/back.png" />
                    </div>
                    <div class="back-face face">
                      <img src="assets/${cardCollection[i]}.gif" />
                    </div>
                  </div>`;
    drawnCards.push(cardHTML);
    drawnCards.push(cardHTML);
  }

  // Embaralhamento das cartas sorteadas
  drawnCards.sort(randomizer);

  // Renderização das cartas
  for (let i = 0; i < drawnCards.length; i++) {
    cardContainer.innerHTML += drawnCards[i];
  }
}

function flipCard(card) {
  if (card.classList.contains("active") || card.classList.contains("matched"))
    return;

  let activeElements = document.querySelectorAll(".card.active");
  if (activeElements.length < 2) {
    card.classList.add("active");
    numberOfTries++;
  }

  if (activeElements.length === 1) {
    setTimeout(() => {
      let cardOne = activeElements[0];
      let cardTwo = card;
      confirmCards(cardOne, cardTwo);
    }, 500);
  }
}

function confirmCards(cardOne, cardTwo) {
  if (cardOne.innerHTML !== cardTwo.innerHTML) {
    setTimeout(() => {
      cardOne.classList.remove("active");
      cardTwo.classList.remove("active");
    }, 1000);
  } else {
    cardOne.classList.add("matched");
    cardTwo.classList.add("matched");
    cardOne.classList.remove("active");
    cardTwo.classList.remove("active");
    const matchedElements = document.querySelectorAll(".card.matched").length;
    console.log(matchedElements);
    if (matchedElements === Number(numberOfCards)) {
      alert(`Você venceu em ${numberOfTries} jogadas!`);
    }
  }
}

// console.log(`Você venceu em ${numberOfTries} jogadas!`);
