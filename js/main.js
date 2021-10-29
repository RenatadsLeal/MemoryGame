let logo = document.querySelector("#logo");
let btnStart = document.querySelector("#btnStart");
let main = document.querySelector("main");
let body = document.body;

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

let createImage = (src, id, parent) => {
    let image = document.createElement("img");
    image.setAttribute("src", src);
    image.setAttribute("id", id);
    parent.appendChild(image);
    return image;
}

let clearMain = () => {
    while (main.firstChild) { main.removeChild(main.firstChild) }
}

let introMusic = new Audio("./audios/intro.wav");
let clickSound = new Audio("./audios/click.mp3");
let gameMusic = new Audio("./audios/game.wav");
let gameOverSound = new Audio("./audios/gameOver.mp3");

let soundPreference = true;
let soundOn;
let soundOff;

let playMusic = (music) => {
    music.play();
    music.loop = true;
    soundPreference = true;
    soundOn.style.display = "block";
    soundOff.style.display = "none";
}
let pauseMusic = (music) => {
    music.pause();
    soundPreference = false;
    soundOn.style.display = "none";
    soundOff.style.display = "block";
}

let playPauseMusic = (music) => {
    if (soundPreference) { pauseMusic(music) }
    else { playMusic(music) }
}

let verifySoundPreference = (music) => {
    if (soundPreference) { playMusic(music) }
    else { pauseMusic(music) }
}

btnStart.addEventListener("click", () => {

    clickSound.play();
    openMenu();
})

function Level(number, numberOfCards, minutes, seconds, blocked) {
    this.number = number;
    this.numberOfCards = numberOfCards;
    this.minutes = minutes;
    this.seconds = seconds;
    this.blocked = blocked;
    // this.starsRequired = starsRequired;
    this.score = 0;
    this.starsWon = 0;
};

let levels = [ 
    new Level(1, 6, 1, 0, false),
    new Level(2, 10, 0, 5, false),
    new Level(3, 14, 0, 10, true),
    new Level(4, 18, 1, 0, true),
    new Level(5, 22, 1, 0, true),
    new Level(6, 26, 1, 0, true)
]

let createBtnSound = (music) => {
    let btnMusic = createDivId("btnMusic", main);
    soundOn = createImage("./imgs/sound_on.webp", "soundOn", btnMusic);
    soundOn.style.display = "block";
    soundOff = createImage("./imgs/sound_off.webp", "soundOff", btnMusic);
    soundOff.style.display = "none";
    let sound = createImage("./imgs/sound.webp", "sound", btnMusic);
    btnMusic.addEventListener("click", () => { playPauseMusic(music) });
    verifySoundPreference(music);
}

let createLevels = (level, parent) => {
    let btnLevel = createDivId(`level${level.number}`, parent);
    btnLevel.setAttribute("class", "btnLevel");
    btnLevel.innerText = level.number;
    if(!level.blocked) {
        btnLevel.addEventListener("click", () => openLevel(level));
        btnLevel.style.opacity = "1";
        btnLevel.style.cursor = "pointer";
    } else {
        btnLevel.style.opacity = "0.5";
    }
    return btnLevel;
}

let openMenu = () => {
    clearMain();

    createBtnSound(introMusic);

    let menu = createDivId("menu", main);
    let btnsLevels = createDivId("btnsLevels", menu);

    for (i = 0; i <= 5; i++) { createLevels(levels[i], btnsLevels) };

    let message = createDivId("message", menu);
    message.innerHTML = "Complete levels to unlock new ones";
}

const cards = ["./imgs/banana.webp",
    "./imgs/avocado.webp",
    "./imgs/cherry.webp",
    "./imgs/strawberry.webp",
    "./imgs/watermelon.webp",
    "./imgs/orange.webp",
    "./imgs/broccoli.webp",
    "./imgs/carrot.webp",
    "./imgs/radish.webp",
    "./imgs/tomato.webp",
    "./imgs/lollipop.webp",
    "./imgs/cupcake.webp",
    "./imgs/donut.webp",
    "./imgs/ice_cream.webp",
    "./imgs/sun.webp",
    "./imgs/star.webp",
    "./imgs/cloud.webp",
    "./imgs/moon.webp",
    "./imgs/sunflower.webp",
    "./imgs/mushroom.webp",
    "./imgs/hazelnut.webp",
    "./imgs/cactus.webp",
    "./imgs/soda.webp",
    "./imgs/hamburger.webp",
    "./imgs/fries.webp",
    "./imgs/hot_dog.webp"];

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
let currentLevelIndex;
let minutesLeft = 0;
let secondsLeft = 0;

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
    if (soundPreference) { gameOverSound.play() };
    // verifySoundPreference(gameOverSound);

    let opaqueBackground = createDivId("opaqueBackground", main);
    let gameOver = createDivId("gameOver", opaqueBackground);
    let imgGameOver = document.createElement("img");
    imgGameOver.setAttribute("id", "imgGameOver");
    imgGameOver.setAttribute("src", "./imgs/game_over.webp");
    gameOver.appendChild(imgGameOver);

    let btnLevelsMenu = createButton("btnLevelsMenu", "Back to menu", gameOver);
    let btnTryAgain = createButton("btnTryAgain", "Try again", gameOver);

    btnTryAgain.addEventListener("click", () => {
        openLevel(levels[currentLevelIndex]);
    });
    btnLevelsMenu.addEventListener("click", () => openMenu());
}

let youWin = (level) => {
    gameMusic.pause();
    if (soundPreference) { gameOverSound.play() };
    // verifySoundPreference(gameOverSound);

    levels[currentLevelIndex+1].blocked = false;
    // console.log(levels[currentLevelIndex+1].blocked);
    
    let opaqueBackground = createDivId("opaqueBackground", main);
    let youWin = createDivId("youWin", opaqueBackground);
    let imgYouWin = document.createElement("img");
    imgYouWin.setAttribute("id", "imgYouWin");
    imgYouWin.setAttribute("src", "./imgs/you_win.webp");
    youWin.appendChild(imgYouWin);

    let scoreboard = createDivId("scoreboard", youWin);
    let starContainer = createDivId("starContainer", scoreboard);
    let imgStarScore = document.createElement("img");
    imgStarScore.setAttribute("class", "starScore");
    imgStarScore.setAttribute("src", "./imgs/star_score.webp");
    starContainer.appendChild(imgStarScore);

    let imgStarScore2 = document.createElement("img");
    imgStarScore2.setAttribute("class", "starScore");
    imgStarScore2.setAttribute("src", "./imgs/star_score.webp");
    starContainer.appendChild(imgStarScore2);

    let imgStarScore3 = document.createElement("img");
    imgStarScore3.setAttribute("class", "starScore");
    imgStarScore3.setAttribute("src", "./imgs/star_score.webp");
    starContainer.appendChild(imgStarScore3);

    let imgStarScore4 = document.createElement("img");
    imgStarScore4.setAttribute("class", "starScore");
    imgStarScore4.setAttribute("src", "./imgs/star_score.webp");
    starContainer.appendChild(imgStarScore4);

    let imgStarScore5 = document.createElement("img");
    imgStarScore5.setAttribute("class", "starScore");
    imgStarScore5.setAttribute("src", "./imgs/star_score.webp");
    starContainer.appendChild(imgStarScore5);

    
    let scoreContainer = createDivId("scoreContainer", scoreboard);
    scoreContainer.innerHTML = level.score;

    let btns = createDivId("btnsEndLevel", youWin)
    let btnLevelsMenu = createButton("btnLevelsMenu", "Back to menu", btns);
    let btnNextLevel = createButton("btnNextLevel", "Next level", btns);

    btnNextLevel.addEventListener("click", () => {
        openLevel(levels[currentLevelIndex+1]);
    });
    btnLevelsMenu.addEventListener("click", () => openMenu());
}

// let firstSelectedCard;
// let secondSelectedCard;
// let cardCount = 1;
let clickCountScore = 1;
// let allow = true;
// let matchingCards = 0;

let calculateScore = (level) => {
    let score = (((minutesLeft * 60) + secondsLeft) / clickCountScore).toFixed(3);
    level.score = score;
    console.log(level.score);
}

let openLevel = (level) => {
    // console.log(levels.indexOf(level));
    // console.log(level.level+=1);
    // console.log(level.level);

    clearMain();
    let firstSelectedCard;
    let secondSelectedCard;
    let cardCount = 1;
    let allow = true;
    let matchingCards = 0;

    introMusic.pause();
    createBtnSound(gameMusic);

    // verifySoundPreference(gameMusic);
    // let btnMusic = createButton("btnMusic", "play/pause", main);
    // btnMusic.addEventListener("click", () => {
    //     playPauseMusic(gameMusic);
    // })

    currentLevelIndex = levels.indexOf(level);
    // console.log(levels[currentLevelIndex+1].blocked);
    minutesLeft = level.minutes;
    secondsLeft = level.seconds;

    countdown = createDivId("countdown", main);

    startTimer();

    let gameBoard = createDivId(`boardLevel${level.number}`, main);
    gameBoard.setAttribute("class", "gameBoard");

    let doubledCards = duplicateCards(level.numberOfCards);

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


                if (cardCount == 1) {
                    card.style.transform = "rotateY(180deg)";
                    firstSelectedCard = card;
                    cardCount++;
                }
                // if (cards.indexOf(firstSelectedCard) == cards.indexOf(card)) {
                //     cardCount = 1;
                //     console.log("TequilA!!");
                // }
                if (cardCount == 2) {
                    if (cards.indexOf(firstSelectedCard) == cards.indexOf(card)) {
                        // cardCount = 1;
                        return;
                    }
                    card.style.transform = "rotateY(180deg)";
                    secondSelectedCard = card;
                    clickCountScore++;
                    
                    if (firstSelectedCard.innerHTML == secondSelectedCard.innerHTML) {
                        cardCount = 1;
                        matchingCards++;
                        firstSelectedCard.classList.remove("faceDown");
                        secondSelectedCard.classList.remove("faceDown");
                        if (window.navigator && window.navigator.vibrate) {
                            setTimeout(function () { window.navigator.vibrate(200); }, 500);
                        }
                        if (matchingCards == level.numberOfCards) {
                            clearInterval(timer);
                            calculateScore(level);
                            youWin(level);
                        }
                    } else {
                        allow = false;
                        setTimeout(function () { firstSelectedCard.style.transform = ""; }, 1000);
                        setTimeout(function () { secondSelectedCard.style.transform = ""; allow = true; }, 1000);
                        cardCount = 1;
                    }
                }
            }
        })
    })
}

// instrucoes
// win score, estrelas
// score local storage
// bordinha da carta
// mexer cor botao start
// alinhar coisas
// cartas pulando no fim (maozinhas)
// olhinho piscar