export const utilService = {
  makeId,
  makeLorem,
  getRandomIntInclusive,
  getRandomColor,
  padNum,
  getDayName,
  getMonthName,
  getRandomDate,
  loadFromStorage,
  saveToStorage,
  getCurrDate,
  getRandName,
  convertDate,
  getRandomYear,
  getRandomPageCount,
  getOneOfTheTwo,
  getRandomAmount,
  getRandomAuthor,
  getCurrencySymbol,
};
function saveToStorage(key, val) {
  localStorage.setItem(key, JSON.stringify(val));
}

function loadFromStorage(key) {
  var val = localStorage.getItem(key);
  return JSON.parse(val);
}
function makeId(length = 6) {
  var txt = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return txt;
}

function makeLorem(size = 100) {
  var words = [
    "sky",
    "above",
    "the port",
    "was",
    "the color of television",
    "tuned",
    "to",
    "a dead channel",
    "All",
    "this happened",
    "more or less",
    "I",
    "had",
    "the story",
    "bit by bit",
    "from various people",
    "and",
    "as generally",
    "happens",
    "in such cases",
    "each time",
    "it",
    "was",
    "a different story",
    "It",
    "was",
    "a pleasure",
    "to",
    "burn",
  ];
  var txt = "";
  while (size > 0) {
    size--;
    txt += words[Math.floor(Math.random() * words.length)] + " ";
  }
  return txt;
}

function getRandName() {
  const firstNames = [
    "Emma",
    "Liam",
    "Olivia",
    "Noah",
    "Ava",
    "Isabella",
    "Sophia",
    "Mia",
    "Charlotte",
    "Amelia",
    "Alexander",
    "Benjamin",
    "Jackson",
    "Samuel",
    "Daniel",
    "Matthew"
  ]
  return firstNames[Math.floor(Math.random() * firstNames.length)];
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

function padNum(num) {
  return num > 9 ? num + "" : "0" + num;
}

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  var color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function getDayName(date, locale) {
  date = new Date(date);
  return date.toLocaleDateString(locale, { weekday: "long" });
}

function getMonthName(date) {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return monthNames[date.getMonth()];
}

function getRandomDate(startDate, endDate) {
  const timeDiff = endDate.getTime() - startDate.getTime();
  const randomTime = Math.random() * timeDiff;
  const randomDate = new Date(startDate.getTime() + randomTime);
  return randomDate.toISOString().slice(0, 10);
}
function getCurrDate() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

function convertDate(date) {
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ]
  const dateObject = new Date(date)
  const month = monthNames[dateObject.getMonth()]
  const day = dateObject.getDate()

  return `${month} ${day}`

}

function getRandomYear() {
  return getRandomIntInclusive(1900, 2023);
}
function getRandomPageCount() {
  return getRandomIntInclusive(80, 700);
}
function getRandomAmount() {
  return getRandomIntInclusive(80, 200);
}

function getOneOfTheTwo(option1, option2) {
  return Math.random() < 0.5 ? option1 : option2;
}

function getRandomAuthor(authors) {
  return authors[getRandomIntInclusive(1, 7)];
}

function getCurrencySymbol(currencyCode) {
  switch (currencyCode) {
    case "EUR":
      return "€";
    case "ILS":
      return "₪";
    case "USD":
      return "$";
  }
}
