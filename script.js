// urls to images
const ENDING_GIF_URL = "https://cdn.discordapp.com/attachments/1142599118401843210/1144438090862170142/f8891ef65e086abc67e5b448acb8bc12.gif"

const IMAGE_URLS = [
  // consider adding to Github directory with uniform dimensions
  "https://img.freepik.com/premium-vector/cat-hand-drawing-style_54889-764.jpg", // cat
  "https://clipartix.com/wp-content/uploads/2016/05/Moving-bunny-clip-art-cartoon-bunny-rabbits-clip-art-images-2.jpg", // rabbit
  "https://media.istockphoto.com/id/1254985253/vector/cartoon-water-turtle-on-a-blue-background.jpg?s=612x612&w=0&k=20&c=uQJSUWEiVRiLRq6mwIRiMPqob1_SanVvSnM5QzXZpmM=", // small turtle
  "https://cdn.discordapp.com/attachments/1142599118401843210/1144417787578691634/7993623-WCRKWPCM-7.jpg"
];
// array that holds correct answers, each right answer +=2 points
const CORRECT_ANSWERS = [
  "A cat",
  "A rabbit",
  "Small Turtle",
  "funny giraffe"
];
// Partial credit answers
const PARTIAL_ANSWERS = [
  ["cat", "kitten"],
  ["rabbit", "hare"],
  ["turtle"],
  ["funny pony", "spotty"]
];

// Magic number array
let questions = [0, 1, 2, 3];

// Set the initial points to 0
let points = 0;
const playerScore = document.getElementById("player-score");
playerScore.textContent = points.toString();
// Random pictures
let questionIndex = Math.floor(Math.random() * questions.length);
// Set the initial guess state to false
let guessed = false;
// Set the initial number of attempts to 0
let attempts = 0;

// algorithm to calculate points earned
function calculatePoints(input, answer){
  let numCorrect = 0;
  let numIncorrect = 0;
  let characterIndex = 0;
  let pointsAccumulated = 0;
  // handles parts of strings that line-up w/ each other; can be correct or incorrect
  while (characterIndex < input.length && characterIndex < answer.length){
      if (input[characterIndex] === answer[characterIndex]){
          numCorrect += 1;
      }
      else {
          numIncorrect += 1
      }
      index++; 
  }
  // handles parts of strings that don't line-up w/ each other; all incorrect
  while (characterIndex < input.length || characterIndex < answer.length){
    numIncorrect += 1;
  }
  pointsAccumulated = 2*numCorrect - numIncorrect;
  return pointsAccumulated;
}

// display images on screen
function showImage() {
  const imageUrl = IMAGE_URLS[questions[questionIndex]];
  const imageContainer = document.getElementById("image-container");
  const img = document.createElement("img");
  img.src = imageUrl;
  img.alt = "Displayed image";
  imageContainer.innerHTML = "";
  imageContainer.appendChild(img);
}

function checkGuess(event) {
  event.preventDefault();
  // user has three attempts to write the right answer
  if (!guessed && attempts < 3) {
    const guess = document.getElementById("guess").value.toLowerCase();
    const result = document.getElementById("result");
    // if user gets the right answer, then user gets 2 points
    if (guess === CORRECT_ANSWERS[questions[questionIndex]].toLowerCase()) {
      if (attempts === 0) {
        result.textContent = "Correct! You win!";
        points += 2;
      } else {
        result.textContent = "Correct!";
        points += 1;
      }
      guessed = true;
      // if user guesses partial answer,
      // say `right answer was.. turtle in sea` and
      // user only inputs `turtle` user only gets 1 point
    } else if (PARTIAL_ANSWERS[questions[questionIndex]].includes(guess)) {
      result.textContent = "Close! You get partial credit.";
      points += 0.5;
      attempts += 1;
      // no right answer
    } else {
      result.textContent = "Sorry, that is incorrect.";
      attempts += 1;
    }
    // updates player score
    guess.value = "";
    playerScore.textContent = points.toString();
    
    // after 3 seconds, the text disappears
    setTimeout(() => {
      result.textContent = "";
    }, 3000);
    // if user guesses the right answer, then the screen will auto reload
    // timer is set to 3 seconds. 
    if (guessed) {
      setTimeout(() => {
        nextImage();
      }, 3000);
    }
  }
}

// displays the next image if user gets the correct answer
function nextImage() {
  // remove current question from available questions
  questions.splice(questionIndex, 1);
  if (questions.length === 0){
    endGame();
  }
  else {
    // fetch new question
    questionIndex = Math.floor(Math.random() * questions.length);
    showImage();
    guessed = false;
    attempts = 0;
  }
}

// if the person can't guess the image, reload to another image
function reloadImage() {
  questionIndex = Math.floor(Math.random() * questions.length);
  showImage();
}

function endGame() {
  document.getElementById("guess-form").hidden = true;
  document.getElementById("next-button").hidden = true;
  document.getElementById("reload-button").hidden = true;
  document.getElementById("result").textContent = "Game Over!";
  const imageContainer = document.getElementById("image-container");
  const img = document.createElement("img");
  img.src = ENDING_GIF_URL;
  img.alt = "Game Over";
  imageContainer.innerHTML = "";
  imageContainer.appendChild(img);
  return;
}

window.addEventListener("load", showImage);
document.getElementById("guess-form").addEventListener("submit", checkGuess);
document.getElementById("next-button").addEventListener("click", nextImage);
document.getElementById("reload-button").addEventListener("click", reloadImage);
