let logo = document.querySelector("#logo");
let btnStart = document.querySelector("#btnStart");
let main = document.querySelector("main");


btnStart.addEventListener("click", () => {
    logo.style.display = "none";
    btnStart.style.display = "none";

    openBoard();
})

let createDiv = (id) =>  {
    let levelDiv = document.createElement("div");
    levelDiv.setAttribute("id", id);
    return levelDiv;
}

let createLevels = (id, number) => {
    let level = createDiv(id);
    level.setAttribute("class", "levelBtn");
    level.innerText = number;
    return level;
}

let openBoard = () => {
    let initialBoard = createDiv("initialBoard");
    main.appendChild(initialBoard);

    let levels = createDiv("levels");
    initialBoard.appendChild(levels);

    let level1 = createLevels("level1", 1);
    levels.appendChild(level1);
    level1.addEventListener("click", () => openLevel(1, 6, 0, 15));
    
    let level2 = createLevels("level2", 2);
    levels.appendChild(level2);
    level2.addEventListener("click", () => openLevel(2, 10));

    let level3 = createLevels("level3", 3);
    levels.appendChild(level3);
    
    let level4 = createLevels("level4", 4);
    levels.appendChild(level4);

    let level5 = createLevels("level5", 5);
    levels.appendChild(level5);
    
    let level6 = createLevels("level6", 6);
    levels.appendChild(level6);

    let message = createDiv("message");
    message.innerHTML = "Complete levels to unlock new ones";
    initialBoard.appendChild(message);
}

const cards = ["./imgs/banana.png",
"./imgs/avocado.png",
"./imgs/cherry.png",
"./imgs/strawberry.png",
"./imgs/watermelon.png",
"./imgs/orange.png",
"./imgs/broccoli.png",
"./imgs/carrot.png",
"./imgs/radish.png",
"./imgs/tomato.png"];

let duplicateCards = number => {
    let selectedCards = cards.slice(0, number);
    let doubledCards = selectedCards.concat(selectedCards);
    return doubledCards;
}

let shuffle = array => {
    let currentIndex = array.length;
    let randomIndex;

    while(currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] =  [array[randomIndex], array[currentIndex]];
    }
}

let createCard = element => {
    // let flipContainer = document.createElement("div");
    // flipContainer.setAttribute("class", "flipContainer");

    let flipper = document.createElement("div");
    flipper.setAttribute("class", "flipper");
    // flipContainer.appendChild(flipper);

    let cardFront = document.createElement("div");
    cardFront.setAttribute("class", "cardFront");
    flipper.appendChild(cardFront);

    let cardBack = document.createElement("div");
    cardBack.setAttribute("class", "cardBack");
    flipper.appendChild(cardBack);

    let image = document.createElement("img");
    image.setAttribute("src", element);
    cardFront.appendChild(image);
    return flipper;
}

let countdown;
let timer;
let minutesLeft;
let secondsLeft;

let updateTimer = () => {
    secondsLeft--;
    
    if(secondsLeft == 0 && minutesLeft > 0) {
        minutesLeft--;
        secondsLeft = 60;
    } else if(secondsLeft == 0 && minutesLeft == 0){
        clearInterval(timer);
    }
    countdown.innerHTML = minutesLeft + ":" + (("0" + secondsLeft).slice(-2));
}

let startTimer = () => {
    timer = setInterval(updateTimer, 1000);
    updateTimer();
}

let firstSelectedCard;
let secondSelectedCard;
let count = 0;
let allow = true;

let openLevel = (level, numberOfCards, minutes, seconds) => {
    secondsLeft = seconds;
    minutesLeft = minutes;
    initialBoard.style.display = "none";

    countdown = createDiv("countdown");
    main.appendChild(countdown);

    startTimer();

    let gameBoard = createDiv(`boardLevel${level}`);
    gameBoard.setAttribute("class", "gameBoard");
    main.appendChild(gameBoard);

    let doubledCards = duplicateCards(numberOfCards);
    
    shuffle(doubledCards);

    let cards = [];

    for (let element of doubledCards) {
        let flipContainer = document.createElement("div");
        flipContainer.setAttribute("class", "flipContainer");

        let flipper = createCard(element);
        flipContainer.appendChild(flipper);
        gameBoard.appendChild(flipContainer);
        cards.push(flipper);
    }

    cards.forEach(card => {
        card.addEventListener("click", () => {
            if (allow == true) {
            card.style.transform = "rotateY(180deg)";
            count++;
            if(count == 1) {
                firstSelectedCard = card;
            }
            if(cards.indexOf(firstSelectedCard) == cards.indexOf(card)) {
                count = 1;
            }
            if(count == 2) {
                secondSelectedCard = card;

                if(firstSelectedCard.innerHTML == secondSelectedCard.innerHTML) {
                    // firstSelectedCard.remove();
                    // secondSelectedCard.remove();
                    count = 0;
                    if(window.navigator && window.navigator.vibrate){
                        setTimeout(function() {window.navigator.vibrate(200);}, 500);
                    }
                } else {
                    allow = false;
                    setTimeout(function() {firstSelectedCard.style.transform = "";}, 1000);
                    setTimeout(function() {secondSelectedCard.style.transform = ""; allow = true;}, 1000);
                    count = 0;
                }
            }
        }
        })
    })
}

// tempo do jogo
// olhinho piscar
// cartas pulando no fim
