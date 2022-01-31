const playerGuesses = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const guessRemainElement = document.querySelector(".remaining");
const guessRemainSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playButton = document.querySelector(".play-again");

let remainingGuesses = 8;
let word = "magnolia";
let guessedLetters = [];

const getWord = async function () {
  const response = await fetch(
    "https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt"
  );
  const words = await response.text();
  const wordsArray = words.split("\n");
  console.log(wordsArray);
  const randomIndex = Math.floor(Math.random() * wordsArray.length);
  word = wordsArray[randomIndex].trim();
  placeholder(word);
};

getWord();
// Display symbols as placeholders for the chosen word's letters
const placeholder = (word) => {
  const placeholderLetters = [];
  for (const letter of word) {
    console.log(letter);
    placeholderLetters.push("●");
  }
  wordInProgress.innerText = placeholderLetters.join("");
};

// Display our symbols as placeholders for the chosen word's letters
guessButton.addEventListener("click", function (e) {
  e.preventDefault();
  message.innerText = "";
  const guess = letterInput.value;
  console.log(guess);
  const goodGuess = validateInput(guess);

  if (goodGuess) {
    makeGuess(guess);
  }
  letterInput.value = "";
});

// Checks player Input
const validateInput = (input) => {
  const acceptedLetters = /[a-zA-Z]/;
  if (input.length === 0) {
    message.innerText = "Please enter a letter, ex. A";
  } else if (input.length > 1) {
    message.innerText = "Please input a single letter.";
  } else if (!input.match(acceptedLetters)) {
    message.innerText = "Please enter a letter from A to Z.";
  } else {
    return input;
  }
};

const makeGuess = (guess) => {
  guess = guess.toUpperCase();
  if (guessedLetters.includes(guess)) {
    message.innerText = "You've already guessed that letter :), Try again.";
  } else {
    guessedLetters.push(guess);
    console.log(guessedLetters);
    updatedGuessInput(guess);
    showGuessedLetters();
    updateWordInProgress(guessedLetters);
  }
};

const showGuessedLetters = () => {
  playerGuesses.innerHTML = "";
  for (const letter of guessedLetters) {
    const li = document.createElement("li");
    li.innerText = letter;
    playerGuesses.append(li);
  }
};

const updateWordInProgress = (guessedLetters) => {
  let wordUpper = word.toUpperCase();
  const wordArray = wordUpper.split("");
  const showWord = [];
  for (const letter of wordArray) {
    if (guessedLetters.includes(letter)) {
      showWord.push(letter.toUpperCase());
    } else {
      showWord.push("●");
    }
  }
  console.log(showWord);
  wordInProgress.innerText = showWord.join("");
  checkWin();
};

const updatedGuessInput = (guess) => {
  const upperCaseWord = word.toUpperCase();
  if (!upperCaseWord.includes(guess)) {
    message.innerText = `Sorry, the word has no ${guess}.`;
    remainingGuesses -= 1;
  } else {
    message.innerText = `Good guess! The word has the letter ${guess}.`;
  }

  if (remainingGuesses === 0) {
    message.innerHTML = `Game over! The word was <span class="highlight">${word}</span>.`;
    startOver();
  } else if (remainingGuesses === 1) {
    guessRemainSpan.innerHTML = `${remainingGuesses} guess`;
  } else {
    guessRemainSpan.innerHTML = `${remainingGuesses} guesses`;
  }
};

const checkWin = () => {
  if (word.toUpperCase() === wordInProgress.innerText) {
    message.classList.add("win");
    message.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;
    startOver();
  }
};

const startOver = () => {
  guessButton.classList.add("hide");
  guessRemainElement.classList.add("hide");
  playerGuesses.classList.add("hide");
  playButton.classList.remove("hide");
};

playButton.addEventListener("click", function () {
  message.classList.remove("win");
  guessedLetters = [];
  remainingGuesses = 8;
  guessRemainSpan.innerHTML = `${remainingGuesses} guesses`;
  playerGuesses.innerHTML = "";
  message.innerText = "";
  getWord();

  guessButton.classList.remove("hide");
  guessRemainElement.classList.remove("hide");
  playerGuesses.classList.remove("hide");
  playButton.classList.add("hide");
});
