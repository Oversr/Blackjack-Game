let player = {
    name: "John Appleseed",
    chips: 200,
};

let cards = [];
let sum = 0;
let hasBlackjack = false;
let isAlive = false;
let message = "";
let messageEl = document.querySelector("#messageEl");
let cardEl = document.querySelector("#cardEl");
let sumEl = document.querySelector("#sumEl");
let newRound = document.querySelector("#new-round");
let playerEl = document.querySelector("#playerEl");
let checkEl = document.querySelector("#checkEl");

function startGame () {
    let firstCard = getRandomCard();
    let secondCard = getRandomCard();
    cards = [firstCard, secondCard];
    sum = firstCard + secondCard;
    isAlive = true;
    renderGame();
}

function getRandomCard () {
    let randomNumber = Math.floor(Math.random() * 13) + 1;
    if (randomNumber > 10) {
        return 10;
    } else if (randomNumber === 1) {
        return 11;
    } else {
        return randomNumber;
    }
}

function renderGame () {
    cardEl.textContent = "Cards: "
    sumEl.textContent = "Sum: " + sum;
    playerEl.textContent = player.name + ": $" + player.chips
    for (let i = 0; i < cards.length; i ++) {
        cardEl.textContent += cards[i] + " ";
    }
    if (sum <= 20) {
        message = "Do you want to draw another card or check?";
        hasBlackjack = false;
    } else if (sum === 21) {
        hasBlackjack = true;
        message = "Blackjack";
        calcChips();
    }
     else {
        isAlive = false;
        message = "You're out";
        calcChips();
    }
    messageEl.textContent = message;
}

function newCard () {
    if (isAlive && !hasBlackjack) {
        let newCard = getRandomCard();
        cards.push(newCard);
        sum += newCard;
        renderGame();
    }
}

function nextRound () {
    renderGame();
}

function playerCheck () {
    if (sum < 21) {
        calcChips();
        startGame();
    }
}

function calcChips () {
    if (sum > 21) {
        player.chips -= 50;
    } else if (hasBlackjack) {
        player.chips += 150;
    } else {
        player.chips += 50;
    }
}