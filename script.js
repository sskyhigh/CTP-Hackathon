// urls to images
const IMAGE_URLS = [
  // consider adding to Github directory with uniform dimensions
  "https://tractive.com/blog/wp-content/uploads/2021/11/section_image_cat_hunting_02-768x576.jpg", // cat
  "https://img.freepik.com/premium-vector/cat-hand-drawing-style_54889-764.jpg", // dog
  "https://clipartix.com/wp-content/uploads/2016/05/Moving-bunny-clip-art-cartoon-bunny-rabbits-clip-art-images-2.jpg", // rabbit
  "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/510af88a-7baf-4004-9694-a89166f0baa4/d1nzz36-041294b4-b038-4421-b682-7cdf84fc6ef2.jpg/v1/fill/w_600,h_686,q_75,strp/bird_drawing_by_conbatiente_d1nzz36-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9Njg2IiwicGF0aCI6IlwvZlwvNTEwYWY4OGEtN2JhZi00MDA0LTk2OTQtYTg5MTY2ZjBiYWE0XC9kMW56ejM2LTA0MTI5NGI0LWIwMzgtNDQyMS1iNjgyLTdjZGY4NGZjNmVmMi5qcGciLCJ3aWR0aCI6Ijw9NjAwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.WECAY6ZlDmuwtOF75BBigWb2B4jeHF4PM-ajEGAVi2o", // bird
  "https://media.istockphoto.com/id/1254985253/vector/cartoon-water-turtle-on-a-blue-background.jpg?s=612x612&w=0&k=20&c=uQJSUWEiVRiLRq6mwIRiMPqob1_SanVvSnM5QzXZpmM=", // small turtle
];
// array that holds correct answers, each right answer +=2 points
const CORRECT_ANSWERS = [
  "A cat",
  "A dog",
  "A rabbit",
  "A bird",
  "Small Turtle",
];
// Partial credit answers
const PARTIAL_ANSWERS = [
  ["cat", "kitten"],
  ["dog", "puppy"],
  ["rabbit", "hare"],
  ["pigeon", "eagle"],
  ["turtle"],
];

// Magic number array
let questions = [0, 1, 2, 3, 4];

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
  while (characterIndex < input.length && charcterIndex < answer.length){
      if (input[characterIndex] === answer[characterIndexndex]){
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
    playerScore.textContent = points.toString();
    
    // after 3 seconds, the text disappears
    setTimeout(() => {
      result.textContent = "";
    }, 3000);
    // if user guesses the right answer, then the screen will auto reload
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
  // fetch new question
  questionIndex = Math.floor(Math.random() * questions.length);
  showImage();
  guessed = false;
  attempts = 0;
}

// if the person can't guess the image, reload to another image
function reloadImage() {
  questionIndex = Math.floor(Math.random() * questions.length);
  showImage();
}

window.addEventListener("load", showImage);
document.getElementById("guess-form").addEventListener("submit", checkGuess);
document.getElementById("next-button").addEventListener("click", nextImage);
document.getElementById("reload-button").addEventListener("click", reloadImage);
