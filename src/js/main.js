const gameElements = ["Scissors", "Spock", "Lizard", "Rock", "Paper"];
const gameRulesBtn = document.querySelector(".game__rulesBtn");
const gameCurtain = document.querySelector(".game__curtain");
const gameStart = document.querySelector(".game__start");
const gameFinal = document.querySelector(".game__final");
const gameFinalResult = document.querySelector(".game__finalResult");
const gameFinalBtn = document.querySelector(".game__finalBtn");
const gameCheck = document.querySelector(".game__check");
const userPickInfo = document.querySelector(".game__checkInfoUserPick");
const userPickInfoImg = getElementGrandChild(userPickInfo);
const computerPickInfoNone = document.querySelector(".game__checkInfoNone");
const computerPickInfo = document.querySelector(".game__checkInfoComputerPick");
const computerPickInfoImg = getElementGrandChild(computerPickInfo);
const scoreValue = document.querySelector(".score__value");
const rulesModal = document.querySelector(".rulesModal");
const closeModalBtn = document.querySelector(".rulesModal__closeBtn");
const startGameBtns = document.querySelectorAll(".game__startBtn");
const allBtns = document.querySelectorAll("button");
const allAnchors = document.querySelectorAll("a");

let points = localStorage.getItem("points");

if (!points) {
  points = 0;
  localStorage.setItem("points", points);
}
scoreValue.textContent = points;

startGameBtns.forEach((btn) =>
  btn.addEventListener("click", () => {
    const randomNumberFrom0To4 = Math.floor(Math.random() * 5);
    const userChoice = btn.dataset.pick;
    const computerChoice = gameElements[randomNumberFrom0To4];
    const result = getResult(userChoice, computerChoice);
    const userPickInfoImgSrc = getElementGrandChild(btn).src;
    const gameBtnChosenByComputer = document.querySelector(
      `.gameBtn${computerChoice}`
    );
    const computerPickInfoImgSrc = getElementGrandChild(
      gameBtnChosenByComputer
    ).src;

    userPickInfoImg.src = userPickInfoImgSrc;
    userPickInfoImg.alt = `${userChoice} symbol`;
    userPickInfo.classList.add(`gameBtn${userChoice}`);

    computerPickInfoImg.src = computerPickInfoImgSrc;
    computerPickInfoImg.alt = `${computerChoice} symbol`;
    computerPickInfo.classList.add(`gameBtn${computerChoice}`);

    gameFinalResult.textContent = result;

    setTimeout(() => {
      hideElement(gameStart);
      showElement(gameCheck);
    }, 500);

    setTimeout(() => {
      hideElement(computerPickInfoNone);
      showElement(computerPickInfo);
    }, 1500);

    setTimeout(() => {
      if (result === "YOU WIN") {
        points++;
        userPickInfo.classList.add("game__checkInfoPick--active");
      } else if (result === "YOU LOSE") {
        points--;
        computerPickInfo.classList.add("game__checkInfoPick--active");
      }
      scoreValue.textContent = points;
      localStorage.setItem("points", points);

      showElement(gameFinal);
    }, 2000);
  })
);

gameRulesBtn.addEventListener("click", () => {
  showModal();

  window.addEventListener("click", (e) => {
    const targetClassList = e.target.classList;

    if (
      !targetClassList.contains("rulesModal") &&
      !targetClassList.contains("rulesModal__title") &&
      !targetClassList.contains("rulesModal__img") &&
      !targetClassList.contains("game__rulesBtn")
    ) {
      closeModal();
    }
  });
});

gameFinalBtn.addEventListener("click", () => {
  document.location.reload();
});

function getElementGrandChild(element) {
  return element.childNodes[1].childNodes[1];
}

function changeElementsTabindex(element, tabindexValue) {
  element.forEach((el) => el.setAttribute("tabindex", tabindexValue));
}

function hideElement(element) {
  element.classList.add(`${element.classList[0]}--hide`);
}

function showElement(element) {
  element.classList.remove(`${element.classList[0]}--hide`);
}

function closeModal() {
  hideElement(rulesModal);
  hideElement(gameCurtain);
  changeElementsTabindex(allBtns, "0");
  changeElementsTabindex(allAnchors, "0");
}

function showModal() {
  showElement(rulesModal);
  showElement(gameCurtain);
  changeElementsTabindex(allBtns, "-1");
  changeElementsTabindex(allAnchors, "-1");
  closeModalBtn.setAttribute("tabindex", "0");
  closeModalBtn.addEventListener("click", closeModal);
}

function getResult(player1, player2) {
  let result = "DRAW";
  switch (player1) {
    case "Scissors":
      switch (player2) {
        case "Scissors":
          break;
        case "Spock":
          result = "YOU LOSE";
          break;
        case "Lizard":
          result = "YOU WIN";
          break;
        case "Rock":
          result = "YOU LOSE";
          break;
        case "Paper":
          result = "YOU WIN";
          break;
      }
      break;
    case "Spock":
      switch (player2) {
        case "Spock":
          break;
        case "Lizard":
          result = "YOU LOSE";
          break;
        case "Rock":
          result = "YOU WIN";
          break;
        case "Paper":
          result = "YOU LOSE";
          break;
        case "Scissors":
          result = "YOU WIN";
          break;
      }
      break;
    case "Lizard":
      switch (player2) {
        case "Lizard":
          break;
        case "Rock":
          result = "YOU LOSE";
          break;
        case "Paper":
          result = "YOU WIN";
          break;
        case "Scissors":
          result = "YOU LOSE";
          break;
        case "Spock":
          result = "YOU WIN";
          break;
      }
      break;
    case "Rock":
      switch (player2) {
        case "Rock":
          break;
        case "Paper":
          result = "YOU LOSE";
          break;
        case "Scissors":
          result = "YOU WIN";
          break;
        case "Spock":
          result = "YOU LOSE";
          break;
        case "Lizard":
          result = "YOU WIN";
          break;
      }
      break;
    case "Paper":
      switch (player2) {
        case "Paper":
          break;
        case "Scissors":
          result = "YOU LOSE";
          break;
        case "Spock":
          result = "YOU WIN";
          break;
        case "Lizard":
          result = "YOU LOSE";
          break;
        case "Rock":
          result = "YOU WIN";
          break;
      }
      break;
  }
  return result;
}
