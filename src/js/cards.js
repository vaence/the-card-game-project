class Card {
  constructor(suit, rank) {
    this.suit = suit;
    this.rank = rank;
  }
}

class Deck {
  constructor() {
    this.cards = [];
  }

  createDeck() {
    let suits = ["clubs", "diamonds", "hearts", "spades"];
    let ranks = ["6", "7", "8", "9", "10", "J", "Q", "K", "A"];

    for (let i = 0; i < suits.length; i++) {
      for (let j = 0; j < ranks.length; j++) {
        this.cards.push(new Card(suits[i], ranks[j]));
      }
    }
  }

  shuffleDeck() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = this.cards[i];
      this.cards[i] = this.cards[j];
      this.cards[j] = temp;
    }
  }
}

const deck = new Deck();
deck.createDeck();
deck.shuffleDeck();
console.log(deck.cards);

class Field {
  constructor() {
    this.hand = [];
  }

  createField(num) {
    let selection = [];

    for (let i = 0; i < num; i++) {
      selection.push(deck.cards[i]);
    }

    let clone = [...selection];

    this.hand = clone.concat(selection);

    for (let i = this.hand.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = this.hand[i];
      this.hand[i] = this.hand[j];
      this.hand[j] = temp;
    }
  }
}

const field = new Field();
let savedLevel = localStorage.getItem("level");
field.createField(savedLevel);
console.log(field.hand);

//---screen render

let playField = document.querySelector(".gamescreen__field");

function renderCards() {
  for (let i = 0; i < field.hand.length; i++) {
    const card = document.createElement("div");
    card.classList.add("gamescreen__field_card");

    const rank = document.createElement("div");
    rank.textContent = field.hand[i].rank;
    rank.classList.add("rank");
    card.appendChild(rank);

    const flipRank = document.createElement("div");
    flipRank.textContent = field.hand[i].rank;
    flipRank.classList.add("backwards");
    card.appendChild(flipRank);

    if (field.hand[i].suit === "diamonds") {
      card.classList.add("card__diamond");
    } else if (field.hand[i].suit === "spades") {
      card.classList.add("card__spade");
    } else if (field.hand[i].suit === "hearts") {
      card.classList.add("card__heart");
    } else {
      card.classList.add("card__club");
    }

    playField.appendChild(card);
  }
}

renderCards();

// eslint-disable-next-line prettier/prettier
let currentHand = Array.from(
  document.querySelectorAll(".gamescreen__field_card"),
);
let currentRank = Array.from(document.querySelectorAll(".rank"));
let currentFlipRank = Array.from(document.querySelectorAll(".backwards"));

function showBack() {
  currentHand.forEach((element) => {
    element.classList.add("back_of_a_card");
  });

  currentRank.forEach((rank) => {
    rank.classList.add("hidden");
  });

  currentFlipRank.forEach((flip) => {
    flip.classList.add("hidden");
  });
}

setTimeout(showBack, 5000);

let comparison = [];
let clickedCard = {};

currentHand.forEach((item) => {
  item.addEventListener("click", function (event) {
    event.target = this.target;

    item.classList.remove("back_of_a_card");
    let i = currentHand.indexOf(item);
    currentRank[i].classList.remove("hidden");
    currentFlipRank[i].classList.remove("hidden");

    let fieldHand = field.hand;
    clickedCard = fieldHand[i];
    comparison.push(clickedCard);

    if (comparison.length === 2) {
      compare(comparison[0], comparison[1]);
    } else if (comparison.length === 1) {
      console.log("no pair yet");
    } else {
      comparison = [];
      comparison.push(clickedCard);
    }
  });
});

function compare(card1, card2) {
  let keys1 = Object.keys(card1);
  let keys2 = Object.keys(card2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    const val1 = card1[key];
    const val2 = card2[key];
    const areObjects = isObject(val1) && isObject(val2);

    if (
      (areObjects && !compare(val1, val2)) ||
      (!areObjects && val1 !== val2)
    ) {
      comparison = [];
      getResult(false);
      return;
    }
  }
  getResult(true);
  comparison = [];

  function isObject(object) {
    return object !== null && typeof object === "object";
  }

  function getResult(result) {
    if (result === true) {
      setTimeout(() => alert("WIN"));
    } else {
      setTimeout(() => alert("LOSE"));
    }
  }
}
