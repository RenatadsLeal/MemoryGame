let logo = document.querySelector("#logo");
let btnStart = document.querySelector("#btnStart");
let main = document.querySelector("main");
let body = document.body;

let clickSound = new Audio("./audios/click.mp3");

let clearMain = () => {
    while (main.firstChild) {
        main.removeChild(main.firstChild);
    }
}

btnStart.addEventListener("click", () => {
    clearMain();
    clickSound.play();
    openMenu();
})

let createDivId = (id, parent) => {
    let levelDiv = document.createElement("div");
    levelDiv.setAttribute("id", id);
    parent.appendChild(levelDiv);
    return levelDiv;
}

let createDivClass = (divClass, parent) => {
    let levelDiv = document.createElement("div");
    levelDiv.setAttribute("class", divClass);
    parent.appendChild(levelDiv);
    return levelDiv;
}

let createButton = (id, text, parent) => {
    let btn = document.createElement("button");
    btn.setAttribute("id", id);
    btn.innerText = text;
    parent.appendChild(btn);
    return btn;
}

function Level(level, numberOfCards, minutes, seconds){
    this.level = level;
    this.numberOfCards = numberOfCards;
    this.minutes = minutes;
    this.seconds = seconds;
};

let levels = [
    new Level(1, 6, 1, 0),
    new Level(2, 10, 0, 5),
    new Level(3, 14, 1, 0),
    new Level(4, 18, 1, 0),
    new Level(5, 22, 1, 0),
    new Level(6, 26, 1, 0)
]

let createLevels = (object, parent) => {
    let btnLevel = createDivId(`level${object.level}`, parent);
    btnLevel.setAttribute("class", "btnLevel");
    btnLevel.innerText = object.level;
    btnLevel.addEventListener("click", () => openLevel(object));
    return btnLevel;
}

let openMenu = () => {
    clearMain();
    
    let menu = createDivId("menu", main);

    let btnsLevels = createDivId("btnsLevels", menu);

    for(i=0; i<=5; i++) {
        createLevels(levels[i], btnsLevels);
    }

    let message = createDivId("message", menu);
    message.innerHTML = "Complete levels to unlock new ones";
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

    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
}

let createCard = element => {
    // let flipContainer = document.createElement("div");
    // flipContainer.setAttribute("class", "flipContainer");

    let flipper = document.createElement("div");
    flipper.setAttribute("class", "flipper faceDown");
    // flipContainer.appendChild(flipper);

    let cardFront = createDivClass("cardFront", flipper);
    let cardBack = createDivClass("cardBack", flipper);
 
    let image = document.createElement("img");
    image.setAttribute("src", element);
    cardFront.appendChild(image);
    return flipper;
}

let countdown;
let timer;

let currentLevel;
let minutesLeft;
let secondsLeft;

let updateTimer = () => {
    if (secondsLeft == 0 && minutesLeft > 0) {
        minutesLeft--;
        secondsLeft = 59;
    } else if (secondsLeft == 0 && minutesLeft == 0) {
        clearInterval(timer);
        gameOver();
    } else {
        secondsLeft--;
    }
    countdown.innerHTML = minutesLeft + ":" + (("0" + secondsLeft).slice(-2));
}

let startTimer = () => {
    timer = setInterval(updateTimer, 1000);
    updateTimer();
}

let gameOverSound = new Audio("./audios/gameOver.mp3");

let gameOver = () => {
    gameMusic.pause();
    gameOverSound.play();
    let gameOver = createDivId("gameOver", main);

    let btnLevelsMenu = createButton("btnLevelsMenu", "Back to menu", gameOver);
    let btnTryAgain = createButton("btnTryAgain", "Try again", gameOver);

    btnTryAgain.addEventListener("click", () => openLevel(currentLevel));

    btnLevelsMenu.addEventListener("click", () => openMenu());
}

let firstSelectedCard;
let secondSelectedCard;
let cardCount = 0;
let clickCount = 0;
let allow = true;
let matchingCards = 0;

let gameMusic = new Audio("./audios/game.wav");
let soundOn = true;
let playMusic = () => {
    gameMusic.play();
    gameMusic.loop = true;
    soundOn = true;
}
let pauseMusic = () => {
    gameMusic.pause();
    soundOn = false;
}

let playPauseMusic = () => {
    if (soundOn) {
        pauseMusic();
    } else {
        playMusic();
    }
}

let verifySoundPreference = () => {
    if (soundOn) {
        playMusic();
    } else {
        pauseMusic();
    }
}

let openLevel = (object) => {
    clearMain();

    verifySoundPreference();
    let btnMusic = createButton("btnMusic", "play/pause", main);
    btnMusic.addEventListener("click", () => {
        playPauseMusic();
    })

    currentLevel = object;
    minutesLeft = object.minutes;
    secondsLeft = object.seconds;

    countdown = createDivId("countdown", main);

    startTimer();

    let gameBoard = createDivId(`boardLevel${object.level}`, main);
    gameBoard.setAttribute("class", "gameBoard");

    let doubledCards = duplicateCards(object.numberOfCards);

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
            if (allow && card.classList.contains("faceDown")) {
                card.style.transform = "rotateY(180deg)";
                cardCount++;
                if (cardCount == 1) {
                    firstSelectedCard = card;
                }
                if (cards.indexOf(firstSelectedCard) == cards.indexOf(card)) {
                    cardCount = 1;
                }
                if (cardCount == 2) {
                    secondSelectedCard = card;
                    clickCount++;

                    if (firstSelectedCard.innerHTML == secondSelectedCard.innerHTML) {
                        cardCount = 0;
                        matchingCards++;
                        firstSelectedCard.classList.remove("faceDown");
                        secondSelectedCard.classList.remove("faceDown");
                        if (window.navigator && window.navigator.vibrate) {
                            setTimeout(function () { window.navigator.vibrate(200); }, 500);
                        }
                        if(matchingCards == object.numberOfCards) {
                            clearInterval(timer);
                        }
                    } else {
                        allow = false;
                        setTimeout(function () { firstSelectedCard.style.transform = ""; }, 1000);
                        setTimeout(function () { secondSelectedCard.style.transform = ""; allow = true; }, 1000);
                        cardCount = 0;
                    }
                }
            }

        })
    })
}

// armazenar score
// bordinha da carta
// mexer cor botao start
// botao play/pause
// alinhar coisas
// cartas pulando no fim (maozinhas)
// olhinho piscar

// tempo restante / numero de clicks * 100 (Marquinho)