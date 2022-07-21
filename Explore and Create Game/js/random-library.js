//Random Library

//Return random decimbal between low (inclusive) and high (exclusive)
function randomDec(low, high) {
  return Math.random() * (high - low) + low;
}

//Return a random integer between low (inclusive) and high (exclusive)
function randomInt(low, high) {
  return Math.floor(randomDec(low, high));
}

//Return a random rgb color - 'rgb( , , ,)'
function randomRGB() {
  return `rgb(${randomInt(0, 256)}, ${randomInt(0, 256)}, ${randomInt(
    0,
    256
  )})`;
}
