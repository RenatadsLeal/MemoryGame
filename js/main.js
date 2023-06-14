let logo = document.querySelector("#logo");
let btnStart = document.querySelector("#btnStart");
let main = document.querySelector("main");
let body = document.body;

//   let savedScores = JSON.parse(localStorage.getItem("scores"));

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
    console.log(levels);

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
    new Level(1, 6, 5, 3, false),
    new Level(2, 10, 5, 3, false),
    new Level(3, 14, 5, 7, false),
    new Level(4, 18, 5, 19, false),
    new Level(5, 22, 6, 37, false),
    new Level(6, 26, 7, 11, false)
]

console.log(levels);

let createBtnSound = (music) => {
    let header = createDivId("header", main);
    let btnMusic = createDivId("btnMusic", header);
    soundOn = createImage("./imgs/sound_on.webp", "soundOn", btnMusic);
    soundOn.style.display = "block";
    soundOff = createImage("./imgs/sound_off.webp", "soundOff", btnMusic);
    soundOff.style.display = "none";
    let sound = createImage("./imgs/sound.webp", "sound", btnMusic);
    btnMusic.addEventListener("click", () => { playPauseMusic(music) });
    verifySoundPreference(music);
}

let createLevels = (level, parent) => {
    console.log(levels);
    let btnScore = createDivClass("btnScore", parent);
    // let btnLevel = createDivId(`level${level.number}`, btnScore);
    // Aparentmente não estávamos usando esse ID
    let btnLevel = createDivClass("btnLevel", btnScore);
    let bestScore = createDivClass("bestScore", btnScore);
    let starsWon = createDivClass("starsWon", btnScore);


    // let imgEarnedStars = document.createElement("img");
    // imgEarnedStars.setAttribute("class", "starScoreMenu");
    // imgEarnedStars.setAttribute("src", "./imgs/star_score.webp");
    // bestScore.appendChild(imgEarnedStars);

    // let imgEarnedStars2 = document.createElement("img");
    // imgEarnedStars2.setAttribute("class", "starScoreMenu");
    // imgEarnedStars2.setAttribute("src", "./imgs/star_score.webp");
    // bestScore.appendChild(imgEarnedStars2);

    // let imgEarnedStars3 = document.createElement("img");
    // imgEarnedStars3.setAttribute("class", "starScoreMenu");
    // imgEarnedStars3.setAttribute("src", "./imgs/star_score.webp");
    // bestScore.appendChild(imgEarnedStars3);

    // let imgEarnedStars4 = document.createElement("img");
    // imgEarnedStars4.setAttribute("class", "starScoreMenu");
    // imgEarnedStars4.setAttribute("src", "./imgs/star_score.webp");
    // bestScore.appendChild(imgEarnedStars4);

    // let imgEarnedStars5 = document.createElement("img");
    // imgEarnedStars5.setAttribute("class", "starScoreMenu");
    // imgEarnedStars5.setAttribute("src", "./imgs/star_score.webp");
    // bestScore.appendChild(imgEarnedStars5);

    //daqui

    let savedScores = JSON.parse(localStorage.getItem("scores"));
    // ? JSON.parse(localStorage.getItem("scores"))
    // : [];

    // let savedScores = localStorage.getItem("scores")
    // ? JSON.parse(localStorage.getItem("scores"))
    // : [];

    let starsAcquired = JSON.parse(localStorage.getItem("stars"));

    if (savedScores) {
        level.score = (Object.values(savedScores)[level.number - 1]);
        level.starsWon = (Object.values(starsAcquired)[level.number - 1]);
        // console.log(savedScores);
        // let starsAcquired = `starsWonLevel${level.number}`;
        // console.log(starsAcquired);
        // level.starsWon = `savedScores.${starsAcquired}`;
        // console.log(savedScores.starsWonLevel1);
        // console.log(level.starsWon);
    }

    if (level.score > 0) {
        bestScore.innerText = level.score;
        for (let i = 0; i < level.starsWon; i++) {
            let imgStarAcquired = document.createElement("img");
            imgStarAcquired.setAttribute("class", "starsAcquired");
            imgStarAcquired.setAttribute("src", "./imgs/star_score.webp");
            starsWon.appendChild(imgStarAcquired);
        }
        // let imgEarnedStars = document.createElement("img");
        // imgEarnedStars.setAttribute("class", "imgEarnedStars");
        // imgEarnedStars.setAttribute("src", "./imgs/star_score.webp");
        // starsWon.appendChild(imgEarnedStars);

    } else {
        bestScore.innerText = "";
        starsWon.innerText = "";
    }

    //ate aqui

    // btnLevel.setAttribute("class", "btnLevel");
    btnLevel.innerText = level.number;
    if (!level.blocked) {
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
    console.log(levels);

    createBtnSound(introMusic);

    let menu = createDivId("menu", main);
    let btnsLevels = createDivId("btnsLevels", menu);

    for (i = 0; i <= 5; i++) { createLevels(levels[i], btnsLevels) };

    // let message = createDivId("message", menu);
    // message.innerHTML = "Complete levels to unlock new ones";
    let btnInstructions = createButton("btnInstructions", "Instructions", menu);
    btnInstructions.addEventListener("click", () => openInstructions());
}

let openInstructions = () => {
    clearMain();

    createBtnSound(introMusic);

    let instructions = createDivId("instructions", main);

    instructions.innerHTML = "Complete levels to unlock new ones";

    let btnLevelsMenu = createButton("btnLevelsMenu", "Back to menu", instructions);
    btnLevelsMenu.addEventListener("click", () => openMenu());
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

    let btnTryAgain = createButton("btnTryAgain", "Try again", gameOver);
    let btnLevelsMenu = createButton("btnLevelsMenu", "Back to menu", gameOver);

    btnTryAgain.addEventListener("click", () => {
        openLevel(levels[currentLevelIndex]);
    });
    btnLevelsMenu.addEventListener("click", () => openMenu());
}

let youWin = (level) => {
    gameMusic.pause();
    if (soundPreference) { gameOverSound.play() };
    // verifySoundPreference(gameOverSound);

    levels[currentLevelIndex + 1].blocked = false;
    // console.log(levels[currentLevelIndex+1].blocked);

    let opaqueBackground = createDivId("opaqueBackground", main);
    let youWin = createDivId("youWin", opaqueBackground);
    let imgYouWin = document.createElement("img");
    imgYouWin.setAttribute("id", "imgYouWin");
    imgYouWin.setAttribute("src", "./imgs/you_win.webp");
    youWin.appendChild(imgYouWin);

    let scoreboard = createDivId("scoreboard", youWin);
    let starContainer = createDivId("starContainer", scoreboard);

    // let imgStarScore = document.createElement("img");
    // imgStarScore.setAttribute("class", "starScore");
    // imgStarScore.setAttribute("src", "./imgs/star_score.webp");
    // starContainer.appendChild(imgStarScore);

    for (let i = 0; i < level.starsWon; i++) {
        let imgStarScore = document.createElement("img");
        imgStarScore.setAttribute("class", "starScore");
        imgStarScore.setAttribute("src", "./imgs/star_score.webp");
        starContainer.appendChild(imgStarScore);
    }

    // let imgStarScore2 = document.createElement("img");
    // imgStarScore2.setAttribute("class", "starScore");
    // imgStarScore2.setAttribute("src", "./imgs/star_score.webp");
    // starContainer.appendChild(imgStarScore2);

    // let imgStarScore3 = document.createElement("img");
    // imgStarScore3.setAttribute("class", "starScore");
    // imgStarScore3.setAttribute("src", "./imgs/star_score.webp");
    // starContainer.appendChild(imgStarScore3);

    // let imgStarScore4 = document.createElement("img");
    // imgStarScore4.setAttribute("class", "starScore");
    // imgStarScore4.setAttribute("src", "./imgs/star_score.webp");
    // starContainer.appendChild(imgStarScore4);

    // let imgStarScore5 = document.createElement("img");
    // imgStarScore5.setAttribute("class", "starScore");
    // imgStarScore5.setAttribute("src", "./imgs/star_score.webp");
    // starContainer.appendChild(imgStarScore5);

    let scoreContainer = createDivId("scoreContainer", scoreboard);
    scoreContainer.innerHTML = level.score;


    let btns = createDivId("btnsEndLevel", youWin)
    let btnNextLevel = createButton("btnNextLevel", "Next level", btns);
    let btnPlayAgain = createButton("btnPlayAgain", "Play again", btns);
    let btnLevelsMenu = createButton("btnLevelsMenu", "Back to menu", btns);

    btnNextLevel.addEventListener("click", () => {
        openLevel(levels[currentLevelIndex + 1]);
    });
    btnLevelsMenu.addEventListener("click", () => openMenu());

    btnPlayAgain.addEventListener("click", () => {
        openLevel(levels[currentLevelIndex]);
    });
}

// let firstSelectedCard;
// let secondSelectedCard;
// let cardCount = 1;
// let allow = true;
// let matchingCards = 0;
let clickCountScore;


let calculateScore = (level) => {

    let score = (((minutesLeft * 60) + secondsLeft) / clickCountScore).toFixed(3);
    level.score = score;
    console.log(level.score);
    console.log(score);
    if (score <= 1.000) {
        level.starsWon = 1;
    } else if (score <= 2.000) {
        level.starsWon = 2;
    } else if (score <= 3.000) {
        level.starsWon = 3;
    } else if (score <= 4.000) {
        level.starsWon = 4;
    } else if (score > 4.000) {
        level.starsWon = 5;
    }

    // Parece que isso não está sendo usado, culpa da Carol
    //    level1 =  2000

    let scores = {
        scoreLevel1: levels[0].score,
        scoreLevel2: levels[1].score,
        scoreLevel3: levels[2].score,
        scoreLevel4: levels[3].score,
        scoreLevel5: levels[4].score,
        scoreLevel6: levels[5].score,
        scoreTotal: 0
    }


    let stars = {
        starsWonLevel1: levels[0].starsWon,
        starsWonLevel2: levels[1].starsWon,
        starsWonLevel3: levels[2].starsWon,
        starsWonLevel4: levels[3].starsWon,
        starsWonLevel5: levels[4].starsWon,
        starsWonLevel6: levels[5].starsWon
    }

    let savedScores = JSON.parse(localStorage.getItem("scores"));

    if (!savedScores) {
        localStorage.setItem("scores", JSON.stringify(scores));
        localStorage.setItem("stars", JSON.stringify(stars));
    } else if (score > Object.values(savedScores)[level.number - 1]) {
        localStorage.setItem("scores", JSON.stringify(scores));
        localStorage.setItem("stars", JSON.stringify(stars));
    }
}

let openLevel = (level) => {

    clearMain();
    let firstSelectedCard;
    let secondSelectedCard;
    let cardCount = 1;
    let allow = true;
    let matchingCards = 0;
    clickCountScore = 1;

    introMusic.pause();
    createBtnSound(gameMusic);
    let goBack = createDivId("goBack", header)
    let btnGoBack = createImage("./imgs/level_btn.webp", "btnGoBack", goBack);
    btnGoBack.addEventListener("click", () => {
        clearInterval(timer);
        gameMusic.pause();
        openMenu();
    });

    // verifySoundPreference(gameMusic);
    // let btnMusic = createButton("btnMusic", "play/pause", main);
    // btnMusic.addEventListener("click", () => {
    //     playPauseMusic(gameMusic);
    // })

    currentLevelIndex = levels.indexOf(level);
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
// bordinha da carta
// alinhar coisas - paramos no nivel 6 (finalizado) -> só o tamanho das cartas
// Para os níveis estamos focando no tamanho dos cards primeiro, só depois vamos ajustar o tamanho das imagens (.cardFront)
// olhinho piscar
