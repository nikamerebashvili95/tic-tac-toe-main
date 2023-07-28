const choiceButtons = document.querySelectorAll(".btn-box");
const playButtons = document.querySelectorAll(".play-btn");
const home = document.querySelector("#home");
const board = document.querySelector("#board");
const xScoreText = document.querySelector("#x-score-text");
const oScoreText = document.querySelector("#o-score-text");
const xScoreElement = document.querySelector("#x-score");
const oScoreElement = document.querySelector("#o-score");
const tieScoreElement = document.querySelector("#tie-score");
const turnInfoImage = document.querySelector(".turn-box img");
const modal = document.querySelector("#modal");
const modalTie = document.querySelector("#modal-tie");
const modalInfoText = document.querySelector(".result-info-text");
const modalIcon = document.querySelector(".modal-box img");
const modalResultText = document.querySelector(".result-text");
const modalRestart = document.querySelector("#modal-restart");

let player1 = "x";

let turn = "x";
let freeButtons = [0, 1, 2, 3, 4, 5, 6, 7, 8];
let xArray = [];
let oArray = [];
let xScore = 0;
let tieScore = 0;
let oScore = 0;
let winnerCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const activateChoice = (icon) => {
  if (icon === "x") {
    choiceButtons[0].classList.add("active");
    choiceButtons[1].classList.remove("active");
    player1 = "x";
  } else {
    choiceButtons[1].classList.add("active");
    choiceButtons[0].classList.remove("active");
    player1 = "0";
  }
};

const checkXwin = () => {
  return winnerCombinations.find((combination) =>
    combination.every((button) => xArray.includes(button))
  );
};

const checkOwin = () => {
  return winnerCombinations.find((combination) =>
    combination.every((button) => oArray.includes(button))
  );
};

const onWinX = () => {
  modal.style.display = "flex";
  modalIcon.src = "./assets/icon-x.svg";
  modalResultText.style.color = "#31C3BD";
  xScore++;
  xScoreElement.textContent = xScore;
  if (player1 === "x") {
    modalInfoText.textContent = "you won!";
  } else {
    modalInfoText.textContent = "OH NO, YOU LOST…";
  }
};
const onWinO = () => {
  modal.style.display = "flex";
  modalIcon.src = "./assets/icon-o.svg";
  modalResultText.style.color = "#F2B137";
  oScore++;
  oScoreElement.textContent = oScore;
  if (player1 !== "x") {
    modalInfoText.textContent = "you won!";
  } else {
    modalInfoText.textContent = "OH NO, YOU LOST…";
  }
};

const onHoverEffects = () => {
  for (let i = 0; i < freeButtons.length; i++) {
    const playButtonIndex = freeButtons[i];
    if (turn === "x") {
      playButtons[playButtonIndex].classList.add("xHover");
      playButtons[playButtonIndex].classList.remove("oHover");
    } else {
      playButtons[playButtonIndex].classList.add("oHover");
      playButtons[playButtonIndex].classList.remove("xHover");
    }
  }
};

const createClickedFunctions = () => {
  for (let i = 0; i < playButtons.length; i++) {
    playButtons[i].style.background = "#1f3641";
    playButtons[i].innerHTML = "";
    playButtons[i].onclick = (e) => {
      e.target.classList.remove("xHover");
      e.target.classList.remove("oHover");

      const spliceIndex = freeButtons.indexOf(i);
      freeButtons.splice(spliceIndex, 1);

      const icon = document.createElement("img");
      icon.classList.add("play-icon");
      if (turn === "x") {
        icon.src = "./assets/icon-x.svg";
        e.target.append(icon);
        xArray.push(i);
        const win = checkXwin();
        if (win) {
          winningStyle(win);
          onWinX();
          return;
        }
        if (xArray.length === 5) {
          modalTie.style.display = "flex";
          tieScore++;
          tieScoreElement.textContent = tieScore;
        }
        turn = "o";
        turnInfoImage.src = "./assets/icon-o-gray.svg";
      } else {
        icon.src = "./assets/icon-o.svg";
        e.target.append(icon);
        oArray.push(i);
        const win = checkOwin();
        if (win) {
          onWinO();
          winningStyle(win);
          return;
        }
        turn = "x";
        turnInfoImage.src = "./assets/icon-x-gray.svg";
      }
      onHoverEffects();
      e.target.onclick = null;
    };
  }
};

const winningStyle = (array) => {
  if (turn === "x") {
    playButtons[array[0]].style.background = "#31c3bd";
    playButtons[array[1]].style.background = "#31c3bd";
    playButtons[array[2]].style.background = "#31c3bd";
    playButtons[array[0]].firstElementChild.src = "./assets/icon-x-win.svg";
    playButtons[array[1]].firstElementChild.src = "./assets/icon-x-win.svg";
    playButtons[array[2]].firstElementChild.src = "./assets/icon-x-win.svg";
  } else {
    playButtons[array[0]].style.background = "#f2b137";
    playButtons[array[1]].style.background = "#f2b137";
    playButtons[array[2]].style.background = "#f2b137";
    playButtons[array[0]].firstElementChild.src = "./assets/icon-o-win.svg";
    playButtons[array[1]].firstElementChild.src = "./assets/icon-o-win.svg";
    playButtons[array[2]].firstElementChild.src = "./assets/icon-o-win.svg";
  }
};

const startGame = (modeParam) => {
  home.style.display = "none";
  board.style.display = "flex";
  document.body.style.alignItems = "flex-start";
  onHoverEffects();
  createClickedFunctions();
  if (modeParam === "player") {
    if (player1 === "x") {
      xScoreText.textContent = "X (P1)";
      oScoreText.textContent = "O (P2)";
    } else {
      xScoreText.textContent = "X (P2)";
      oScoreText.textContent = "O (P1)";
    }
  } else {
    if (player1 === "x") {
      xScoreText.textContent = "X (YOU)";
      oScoreText.textContent = "O (CPU)";
    } else {
      xScoreText.textContent = "X (CPU)";
      oScoreText.textContent = "O (YOU)";
    }
  }
};

const reset = () => {
  player1 = "x";
  turn = "x";
  freeButtons = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  xArray = [];
  oArray = [];
  modal.style.display = "none";
  modalTie.style.display = "none";
};

const quit = () => {
  reset();
  xScore = 0;
  tieScore = 0;
  oScore = 0;
  board.style.display = "none";
  home.style.display = "flex";
  oScoreElement.textContent = 0;
  xScoreElement.textContent = 0;
  tieScoreElement.textContent = 0;
};

const nextRound = () => {
  reset();
};

const openRestartModal = () => {
  modalRestart.style.display = "flex";
};

const closeModal = () => {
  modalRestart.style.display = "none";
};

const restartFc = () => {
  xScore = 0;
  tieScore = 0;
  oScore = 0;
  oScoreElement.textContent = 0;
  xScoreElement.textContent = 0;
  tieScoreElement.textContent = 0;
  reset();
  modalRestart.style.display = "none";
};
