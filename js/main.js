let logo = document.querySelector("#logo");
let btnStart = document.querySelector("#btnStart");
let main = document.querySelector("main");
let body = document.body;

let clickSound = new Audio("./audios/click.mp3");

btnStart.addEventListener("click", () => {
    while (main.firstChild) {
        main.removeChild(main.firstChild);
    }

    // logo.style.display = "none";
    // btnStart.style.display = "none";
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

// let objectLevel1 = {
//     level: 1,
//     numberOfCards: 6,
//     minutes: 1,
//     seconds: 0,
// };

// let objectLevel2 = {
//     level: 2,
//     numberOfCards: 10,
//     minutes: 0,
//     seconds: 5,
// };

// let objectLevel3 = {
//     level: 3,
//     numberOfCards: 14,
//     minutes: 0,
//     seconds: 3
// };

// let objectLevel4 = {
//     level: 4,
//     numberOfCards: 18,
//     minutes: 0,
//     seconds: 3,
// };

// let objectLevel5 = {
//     level: 5,
//     numberOfCards: 22,
//     minutes: 0,
//     seconds: 3,
// };

// let objectLevel6 = {
//     level: 6,
//     numberOfCards: 26,
//     minutes: 0,
//     seconds: 3,
// };

let createLevels = (object, parent) => { // (object, parent)
    let btnLevel = createDivId(`level${object.level}`, parent);
    btnLevel.setAttribute("class", "btnLevel");
    btnLevel.innerText = object.level;
    btnLevel.addEventListener("click", () => openLevel(object));
    return btnLevel;
}

// let createLevels = (id, number, objectLevel, parent) => { // (object, parent)
//     let level = createDivId(id, parent); // createDivId(`level${object.level}`, parent)
//     level.setAttribute("class", "levelBtn");
//     level.innerText = number; // object.level
//     level.addEventListener("click", () => openLevel(objectLevel)); // object
//     return level;
// }

let openMenu = () => {
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

    btnTryAgain.addEventListener("click", () => {
        while (main.firstChild) {
            main.removeChild(main.firstChild);
        }

        openLevel(currentLevel);
    })

    btnLevelsMenu.addEventListener("click", () => {
        while (main.firstChild) {
            main.removeChild(main.firstChild);
        }

        openMenu();
    })
}

let firstSelectedCard;
let secondSelectedCard;
let count = 0;
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

// let Card = (image) => {
//     this.image = image;
//     this.isFaceDown = true;
//     this.isActive = true;

//     this.onclick = () => {
//         if (!this.isActive) {
//             return;
//         }
//         this.isFaceDown = false;
//         // animacao
//         if (count == 0) {
//             firstSelectedCard = this;
//             count = 1;
//             return;
//         }
//         if (count == 1) {
//             secondSelectedCard = this;
//             // avalia se sao iguais
//             count = 0;
//             evaluateRound();
//         }
//     }
    
// }

// let evaluateRound = (object) => {
//     if (firstSelectedCard.image === secondSelectedCard.image) {
//         count = 0;
//         matchingCards++;
//         firstSelectedCard.isActive = false;
//         secondSelectedCard.isActive = false;

//         if (window.navigator && window.navigator.vibrate) {
//             setTimeout(function () { window.navigator.vibrate(200); }, 500);
//         }
//         if(matchingCards == object.numberOfCards) {
//             clearInterval(timer);
//         }
//     } else {
//         firstSelectedCard.isFaceDown = true;
//         secondSelectedCard.isFaceDown = true;

       
//         setTimeout(function () { firstSelectedCard.style.transform = ""; }, 1000);
//         setTimeout(function () { secondSelectedCard.style.transform = ""; allow = true; }, 1000);
//         count = 0;
//     }
// }

let openLevel = (object) => {
    while (main.firstChild) {
        main.removeChild(main.firstChild);
    }

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
                count++;
                if (count == 1) {
                    firstSelectedCard = card;
                }
                if (cards.indexOf(firstSelectedCard) == cards.indexOf(card)) {
                    count = 1;
                }
                if (count == 2) {
                    secondSelectedCard = card;

                    if (firstSelectedCard.innerHTML == secondSelectedCard.innerHTML) {
                        count = 0;
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
                        count = 0;
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