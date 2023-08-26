// urls to images
const ENDING_GIF_URL =
  "https://cdn.discordapp.com/attachments/1142599118401843210/1144438090862170142/f8891ef65e086abc67e5b448acb8bc12.gif";

const IMAGE_URLS = [
  // consider adding to Github directory with uniform dimensions
  "https://img.freepik.com/premium-vector/cat-hand-drawing-style_54889-764.jpg", // cat
  "https://clipartix.com/wp-content/uploads/2016/05/Moving-bunny-clip-art-cartoon-bunny-rabbits-clip-art-images-2.jpg", // rabbit
  "https://media.istockphoto.com/id/1254985253/vector/cartoon-water-turtle-on-a-blue-background.jpg?s=612x612&w=0&k=20&c=uQJSUWEiVRiLRq6mwIRiMPqob1_SanVvSnM5QzXZpmM=", // small turtle
  "https://cdn.discordapp.com/attachments/1142599118401843210/1144417787578691634/7993623-WCRKWPCM-7.jpg", // funny giraffe

  "https://easydrawingguides.com/wp-content/uploads/2022/04/Easy-Rainbow-Scenery-step-by-step-drawing-tutorial-step-10.png", // rainbow
  "https://img.freepik.com/premium-vector/8k-colorful-book-transparent-eps-dog-playful-puppy_960911-2497.jpg?w=826", //colorful puppy
  "https://img.freepik.com/premium-vector/abstract-grunge-urban-pattern-with-monster-character-super-drawing-graffiti-style_40453-1643.jpg?w=740", // smiles
  "https://previews.123rf.com/images/dualororua/dualororua1703/dualororua170300282/74232776-cartoon-rabbit-with-easter-eggs-in-the-grass.jpg", // bunnies
  "https://img.freepik.com/free-vector/brown-cow-cartoon-character_1308-107049.jpg?w=996&t=st=1693013872~exp=1693014472~hmac=0be829790999ee27ce1c93e6840a814a2ceccfe4bb3a28912f63b927e65b6885", // cow swing
  "https://ih1.redbubble.net/image.1732243603.2412/st,small,845x845-pad,1000x1000,f8f8f8.jpg", // strawberry milk
];
// array that holds correct answers, each right answer +=2 points
const CORRECT_ANSWERS = [
  "A cat",
  "A rabbit",
  "Small Turtle",
  "funny giraffe",
  // "scenery",
  "rainbow",
  "colorful puppy",
  // "gold",
  // ["friends", "monsters"],
  "smiles",
  "bunny on grass",
  "cow swing",
  "strawberry milk",
];
// Partial credit answers
const PARTIAL_ANSWERS = [
  ["cat", "kitten"],
  ["rabbit", "hare"],
  ["turtle"],
  ["funny pony", "spotty"]["banana mouse"],
  ["colorful drawing"],
  ["diversity"],
  ["bunny"],
  ["pink cow", "stripes cow"],
  ["cow", "milk"],
];

// Magic number array
let questions = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

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

// Add a variable to keep track of the number of hearts remaining
let heartsRemaining = 3;

// algorithm to calculate points earned
function calculatePoints(input, answer) {
  let numCorrect = 0;
  let numIncorrect = 0;
  let characterIndex = 0;
  let pointsAccumulated = 0;
  // handles parts of strings that line-up w/ each other; can be correct or incorrect
  while (characterIndex < input.length && characterIndex < answer.length) {
    if (input[characterIndex] === answer[characterIndex]) {
      numCorrect += 1;
    } else {
      numIncorrect += 1;
    }
    characterIndex++;
  }
  // handles parts of strings that don't line-up w/ each other; all incorrect
  while (characterIndex < input.length || characterIndex < answer.length) {
    numIncorrect += 1;
    characterIndex++;
  }
  pointsAccumulated = 2 * numCorrect - numIncorrect;
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
      document.getElementById("guess").value = "";
      const result = document.getElementById("result");
      // if user gets the right answer, then user gets two points
      if (guess === CORRECT_ANSWERS[questions[questionIndex]].toLowerCase()) {
          if (attempts === 0) {
              result.textContent = "Correct! You win!";
              points += 2;
          } else {
              result.textContent = "Correct!";
              points += 1;
          }
          guessed = true;
          heartsRemaining = 3; // Reset the number of hearts remaining
          // if user guesses partial answer,
          // say `right answer was.. turtle in sea` and
          // user only inputs `turtle` user only gets one point
      } else if (PARTIAL_ANSWERS[questions[questionIndex]].includes(guess)) {
          result.textContent = "Close! You get partial credit.";
          points += 0.5;
          attempts += 1;
          heartsRemaining -= 1; // Decrement the number of hearts remaining
          // no right answer
      } else {
          result.textContent = "Sorry, that is incorrect.";
          attempts += 1;
          heartsRemaining -= 1; // Decrement the number of hearts remaining
      }
      // updates player score
      guess.value = "";
      playerScore.textContent = points.toString();

      // after three seconds, the text disappears
      setTimeout(() => {
          result.textContent = "";
      },3000);
      // if user guesses the right answer, then the screen will auto reload
      // timer is set to three seconds.
      if (guessed) {
          setTimeout(() => {
              nextImage();
          },3000);
      }

      // Update the heart-bar div to display the correct number of hearts
      const heartBar=document.querySelector(".heart-bar");
      heartBar.innerHTML="";
      for (let i=0; i<heartsRemaining; i++) {
          const img=document.createElement("img");
          img.src="Images/heart.png"; // Replace with the path to your heart image
          heartBar.appendChild(img);
      }
  }
}

// Add code to display three hearts initially when the page loads
const heartBar = document.querySelector(".heart-bar");
for (let i = 0; i < heartsRemaining; ++i) {
  const img = document.createElement("img");
  img.src = "Images/heart_cora.png";
  heartBar.appendChild(img);
}

// displays the next image if user gets the correct answer
function nextImage() {
  // remove current question from available questions
  questions.splice(questionIndex, 1);
  if (questions.length === 0) {
    endGame();
  } else {
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
