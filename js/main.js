let logo = document.querySelector("#logo");
let btnStart = document.querySelector("#btnStart");
let body = document.body;

let openGame = () => {
    let gameBoard = document.createElement("div");
    gameBoard.setAttribute("id", "gameBoard");
    body.appendChild(gameBoard);
}

btnStart.onclick = function() {
    logo.style.display = "none";
    btnStart.style.display = "none";

    openGame();
}