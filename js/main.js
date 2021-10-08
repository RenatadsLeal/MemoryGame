let logo = document.querySelector("#logo");
let btnStart = document.querySelector("#btnStart");
let main = document.querySelector("main");

btnStart.onclick = function() {
    logo.style.display = "none";
    btnStart.style.display = "none";

    openBoard();
}

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
    level1.onclick = () => openLevel1();
    
    let level2 = createLevels("level2", 2);
    levels.appendChild(level2);

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
"./imgs/orange.png"];

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
    let index = cards.indexOf(element);
    let card = document.createElement("div");
    card.setAttribute("class", `card card${index}`);
    let image = document.createElement("img");
    image.setAttribute("src", element);
    card.appendChild(image);
    return card;
}

let firstSelectedCard;
let secondSelectedCard;
let count = 0;

let openLevel1 = () => {
    initialBoard.style.display = "none";

    let gameBoard = createDiv("boardLevel1");
    gameBoard.setAttribute("class", "gameBoard");
    main.appendChild(gameBoard);

    let doubledCards = duplicateCards(6);
    
    shuffle(doubledCards);

    let cards = [];

    for (let element of doubledCards) {
        let card = createCard(element);
        gameBoard.appendChild(card);
        cards.push(card);
    }

    cards.forEach(card => {
        card.onclick = () => {
            card.style.transform = "rotateY(360deg)";
            count++;
            if(count == 1) {
                firstSelectedCard = card;
            }
            if(count == 2) {
                secondSelectedCard = card;

                if(firstSelectedCard.innerHTML == secondSelectedCard.innerHTML) {
                    firstSelectedCard.remove();
                    secondSelectedCard.remove();
                    count = 0;
                    window.navigator.vibrate(200);
                } else {
                    count = 0;
                }
            }
        }
    })
}

// fazer cartas virarem
// olhinho piscar
// cartas pulando no fim
