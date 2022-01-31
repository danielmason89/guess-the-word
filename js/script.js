const playerGuesses = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const guessRemainElement = document.querySelector(".remaining");
const guessRemainSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playButton = document.querySelector(".play-again");

const word = "magnolia";
const guessedLetters = [];

// Display symbols as placeholders for the chosen word's letters
const placeholder = (word) => {
  const placeholderLetters = [];
  for (const letter of word) {
    console.log(letter);
    placeholderLetters.push("●");
  }
  wordInProgress.innerText = placeholderLetters.join("");
};

placeholder(word);

// Display our symbols as placeholders for the chosen word's letters
guessButton.addEventListener("click", (e) => {
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

const checkWin = () => {
  if (word.toUpperCase() === wordInProgress.innerText) {
    message.classList.add("win");
    message.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;
  }
};
