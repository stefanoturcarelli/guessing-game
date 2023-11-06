'use strict';

/**
 * Utility functions
 * OnEvent
 * getElement (by id)
 * select
 * selectAll
 * print
 * sleep
 * randomNumber
 * filterArray
 * create
 */

// Add event listener
function onEvent(event, selector, callback) {
  return selector.addEventListener(event, callback);
}

// Remove event Listener
function removeEvent(event, selector, callback) {
  return selector.removeEventListener(event, callback);
}

// Get HTML element by id
function getElement(selector, parent = document) {
  return parent.getElementById(selector);
}

// Select HTML element
function select(selector, parent = document) {
  return parent.querySelector(selector);
}

// Get a (node) list of HTML elements as array
function selectAll(selector, parent = document) {
  return [...parent.querySelectorAll(selector)];
}

// Print
function print(arg) {
  console.log(arg);
}

// Sleep
function sleep(duration) {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
}

// Generate random number between - and including - 'min' and 'max'
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Filter array
function filterArray(array, callback) {
  return array.filter(callback);
}

// Create an HTML element
function create(element, parent = document) {
  return parent.createElement(element);
}

const input = select('#input');
const output = select('#output');
const guessQty = select('#guess-qty');
const resetBtn = select('#reset-button');
const guessBtn = select('#guess-button');
const instructions = select('.instructions');
let count = 5;
let randomNum = randomNumber(1, 10);

// print(`Random Number: ${randomNum}`);

function validateInput(number) {
  const inputNum = parseInt(number.trim());

  if (isNaN(inputNum)) {
    return (output.innerText = `Please enter a number`);
  }
  return inputNum;
}

function getHint(number) {
  const inputNum = parseInt(number.trim());
  if (count > 1) {
    if (inputNum > randomNum) {
      output.innerText = `Try a lower number`;
    } else if (inputNum < randomNum) {
      output.innerText = `Try a higher number`;
    } else if (inputNum > 10) {
      output.innerText = `Please enter a number between 1 and 10`;
    } else if (inputNum === randomNum) {
      output.innerText = `Correct! The secret number was: ${randomNum}`;
      resetBtn.style.display = 'block';
    }
  } else {
    output.innerText = `Out of attempts! The secret number was ${randomNum}`;
    guessBtn.style.display = 'none';
    resetBtn.style.display = 'block';
  }
}

onEvent('load', window, () => {
  resetBtn.style.display = 'none';
  output.style.display = 'none';
  input.value = '';
  guessQty.innerText = `${count}`;
  // print(`Count: ${count}`);
});

onEvent('click', guessBtn, () => {
  instructions.style.display = 'none';
  output.style.display = 'block';
  let guessNumber = input.value;
  validateInput(guessNumber);
  getHint(guessNumber);
  count--;
  guessQty.innerText = `${count}`;
  // print(`Count: ${count}`);
});

onEvent('click', resetBtn, () => {
  input.value = '';
  guessBtn.style.display = 'block';
  output.innerText = `Please enter a number between 1 and 10`;
  count = 5;
  guessQty.innerText = `${count}`;
  resetBtn.style.display = 'none';
  // print(`Count: ${count}`);
});
