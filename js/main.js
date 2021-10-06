let logo = document.querySelector("#logo");
let btnStart = document.querySelector("#btnStart");
let main = document.querySelector("main");

let createDiv = () => document.createElement("div");

let addClassLevelBtn = (div) => div.setAttribute("class", "levelBtn");

let openGame = () => {
    let gameBoard = createDiv();
    gameBoard.setAttribute("id", "gameBoard");
    main.appendChild(gameBoard);

    let levels = createDiv();
    levels.setAttribute("id", "levels");
    gameBoard.appendChild(levels);

    let level1 = createDiv();
    level1.setAttribute("id", "level1");
    addClassLevelBtn(level1);
    level1.innerText = "1";
    levels.appendChild(level1);

    let level2 = createDiv();
    level2.setAttribute("id", "level2");
    addClassLevelBtn(level2);
    level2.innerText = "2";
    levels.appendChild(level2);

    let level3 = createDiv();
    level3.setAttribute("id", "level3");
    addClassLevelBtn(level3);
    level3.innerText = "3";
    levels.appendChild(level3);

    let level4 = createDiv();
    level4.setAttribute("id", "level4");
    addClassLevelBtn(level4);
    level4.innerText = "4";
    levels.appendChild(level4);

    let level5 = createDiv();
    level5.setAttribute("id", "level5");
    addClassLevelBtn(level5);
    level5.innerText = "5";
    levels.appendChild(level5);

    let level6 = createDiv();
    level6.setAttribute("id", "level6");
    addClassLevelBtn(level6);
    level6.innerText = "6";
    levels.appendChild(level6);

    let message = createDiv();
    message.setAttribute("id", "message");
    message.innerHTML = "Complete levels to unlock new ones";
    gameBoard.appendChild(message);
}

btnStart.onclick = function() {
    logo.style.display = "none";
    btnStart.style.display = "none";

    openGame();
}