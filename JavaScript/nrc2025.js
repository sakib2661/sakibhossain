const botImages = [
  "../IMAGES/nrc2025/bots1.jpg",
  "../IMAGES/nrc2025/bots2.jpg",
  "../IMAGES/nrc2025/bots3.jpg",
  "../IMAGES/nrc2025/workingOnCollegeLab.jpg"
];

let currentBotIndex = 0;

function updateBotImage() {
  document.getElementById("botDisplay").src = botImages[currentBotIndex];
}

function nextBotImage() {
  currentBotIndex = (currentBotIndex + 1) % botImages.length;
  updateBotImage();
}

function prevBotImage() {
  currentBotIndex = (currentBotIndex - 1 + botImages.length) % botImages.length;
  updateBotImage();
}