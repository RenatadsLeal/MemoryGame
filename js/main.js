let logo = document.querySelector("#logo");
let btnStart = document.querySelector("#btnStart");
let main = document.querySelector("main");
let body = document.body;


btnStart.addEventListener("click", () => {
    while (main.firstChild) {
        main.removeChild(main.firstChild);
    }

    // logo.style.display = "none";
    // btnStart.style.display = "none";

    openBoard();
})

let createDiv = (id) => {
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

let createButton = (id, text) => {
    let btn = document.createElement("button");
    btn.setAttribute("id", id);
    btn.innerText = text;
    return btn;
}

let objectLevel1 = {
    level: 1,
    numberOfCards: 6,
    minutes: 0,
    seconds: 5,
};

let objectLevel2 = {
    level: 2,
    numberOfCards: 10,
    minutes: 0,
    seconds: 5,
};

let objectLevel3 = {
    level: 3,
    numberOfCards: 14,
    minutes: 0,
    seconds: 3
};

let objectLevel4 = {
    level: 4,
    numberOfCards: 18,
    minutes: 0,
    seconds: 3,
};

let objectLevel5 = {
    level: 5,
    numberOfCards: 22,
    minutes: 0,
    seconds: 3,
};

let objectLevel6 = {
    level: 6,
    numberOfCards: 26,
    minutes: 0,
    seconds: 3,
};

let openBoard = () => {
    let initialBoard = createDiv("initialBoard");
    main.appendChild(initialBoard);

    let levels = createDiv("levels");
    initialBoard.appendChild(levels);

    let level1 = createLevels("level1", 1);
    levels.appendChild(level1);
    level1.addEventListener("click", () => openLevel(objectLevel1));

    let level2 = createLevels("level2", 2);
    levels.appendChild(level2);
    level2.addEventListener("click", () => openLevel(objectLevel2));

    let level3 = createLevels("level3", 3);
    levels.appendChild(level3);
    level3.addEventListener("click", () => openLevel(objectLevel3));

    let level4 = createLevels("level4", 4);
    levels.appendChild(level4);
    level4.addEventListener("click", () => openLevel(objectLevel4));

    let level5 = createLevels("level5", 5);
    levels.appendChild(level5);
    level5.addEventListener("click", () => openLevel(objectLevel5));

    let level6 = createLevels("level6", 6);
    levels.appendChild(level6);
    level6.addEventListener("click", () => openLevel(objectLevel6));

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

let gameOver = () => {
    gameMusic.pause();
    let gameOver = createDiv("gameOver");
    main.appendChild(gameOver);

    let btnLevelsMenu = createButton("btnLevelsMenu", "Back to menu");
    gameOver.appendChild(btnLevelsMenu);

    let btnTryAgain = createButton("btnTryAgain", "Try again");
    gameOver.appendChild(btnTryAgain);

    btnTryAgain.addEventListener("click", () => {
        while (main.firstChild) {
            main.removeChild(main.firstChild);
        }

        openLevel(currentLevel);
    })
}

let firstSelectedCard;
let secondSelectedCard;
let count = 0;
let allow = true;

let gameMusic = new Audio("./audios/game.mp3");
let musicPlaying = true;
let playMusic = () => {
    gameMusic.play();
    gameMusic.loop = true;
    musicPlaying = true;
}
let pauseMusic = () => {
    gameMusic.pause();
    musicPlaying = false;
}

let playPauseMusic = () => {
    if (musicPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
}

let verify = () => {
    if (musicPlaying) {
        playMusic();
    } else {
        pauseMusic();
    }
}

let openLevel = (object) => {
    while (main.firstChild) {
        main.removeChild(main.firstChild);
    }

    verify();
    let btnMusic = createButton("btnMusic", "play/pause");
    main.appendChild(btnMusic);
    btnMusic.addEventListener("click", () => {
        playPauseMusic();
    })

    currentLevel = object;
    minutesLeft = object.minutes;
    secondsLeft = object.seconds;

    countdown = createDiv("countdown");
    main.appendChild(countdown);

    startTimer();

    let gameBoard = createDiv(`boardLevel${object.level}`);
    gameBoard.setAttribute("class", "gameBoard");
    main.appendChild(gameBoard);

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
            if (allow == true && card.classList.contains("faceDown")) {
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
                        firstSelectedCard.classList.remove("faceDown");
                        secondSelectedCard.classList.remove("faceDown");
                        if (window.navigator && window.navigator.vibrate) {
                            setTimeout(function () { window.navigator.vibrate(200); }, 500);
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


// fazer o btnLevelsMenu funcionar
// armazenar score
// olhinho piscar
// cartas pulando no fim (maozinhas)