const playerGuesses = document.querySelector(".guessed-letters");
const button = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const emptyParagraph = document.querySelector(".word-in-progress");
const guessRemain = document.querySelector(".remaining");
const guessDisplay = document.querySelector(".remaining span");
const playerGuess = document.querySelector(".message");
const playButton = document.querySelector(".play-again");

const word = "magnolia";

const placeholder = (word) => {
  const placeholderLetters = [];
  for (const letter of word) {
    console.log(letter);
    placeholderLetters.push("●");
  }
  emptyParagraph.innerText = placeholderLetters.join("");
};

placeholder(word);

// Display our symbols as placeholders for the chosen word's letters
button.addEventListener("click", (e) => {
  e.preventDefault();
  const guess = letterInput.value;
  console.log(guess);
  letterInput.value = "";
});
