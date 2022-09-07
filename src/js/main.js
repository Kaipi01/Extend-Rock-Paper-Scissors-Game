const gameRulesBtn = document.querySelector(".game__rulesBtn");
const rulesModal = document.querySelector(".rulesModal");
const gameCurtain = document.querySelector(".game__curtain");
const allBtns = document.querySelectorAll("button");
const allAnchors = document.querySelectorAll("a");
const startGameBtns = document.querySelectorAll(".game__startBtn");

const gameElements = ['Scissors', 'Spock', 'Lizard', 'Rock', 'Paper']

let userChoice;
let computerChoice;

startGameBtns.forEach((btn) => btn.addEventListener("click", () => {
    const randomNumberFrom0To4 = Math.floor(Math.random()*5);
    const btnClassNameEnding = btn.classList[1].slice(14)

    userChoice = btnClassNameEnding;
    computerChoice = gameElements[randomNumberFrom0To4]
    console.log(userChoice)
    console.log(computerChoice)
}));

gameRulesBtn.addEventListener("click", () => {
  showModal();

  const closeBtn = document.querySelector(".rulesModal__closeBtn");
  closeBtn.setAttribute("tabindex", "0");
  closeBtn.addEventListener("click", closeModal);

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
  }
});

function changeElementsTabindex(element, tabindexValue) {
  element.forEach((el) => el.setAttribute("tabindex", tabindexValue));
}

function hideElement(element) {
  element.classList.add(`${element.classList[0]}--hide`);
}

function showElement(element) {
  element.classList.remove(`${element.classList[0]}--hide`);
}
