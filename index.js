// http://quotes.stormconsultancy.co.uk/random.json
// http://quotes.stormconsultancy.co.uk/quotes.json
// https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json

const quoteScreen = document.querySelector('.quote-screen span');
const btns = document.querySelectorAll('.btn i');
const loader = document.querySelector('.loader');
const timeLi = document.querySelector('ul li:last-child');
let currentQuotePlace = 0;
let quotesArr = [];
const fetchData = async () => {
  const req = await fetch('http://quotes.stormconsultancy.co.uk/quotes.json');
  const jsonData = await req.json();
  return jsonData;
};

const getTime = () => {
  var date = new Date();
  let hours = date.getHours();
  let minutes = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
  timeLi.textContent = `${hours}:${minutes}`;
};

window.addEventListener('load', async () => {
  await getTime();
  quotesArr = await fetchData();
  quoteScreen.style.display = 'block';
  loader.style.display = 'none';
  quoteScreen.textContent = quotesArr[currentQuotePlace].quote;
});

btns.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    if (e.target.classList.contains('fa-caret-left')) {
      if (currentQuotePlace === 0) {
        currentQuotePlace = quotesArr.length - 1;
        quoteScreen.textContent = quotesArr[currentQuotePlace].quote;
      } else {
        currentQuotePlace -= 1;
        quoteScreen.textContent = quotesArr[currentQuotePlace].quote;
      }
    } else if (e.target.classList.contains('fa-caret-right')) {
      if (currentQuotePlace === quotesArr.length - 1) {
        currentQuotePlace = 0;
        quoteScreen.textContent = quotesArr[currentQuotePlace].quote;
      } else {
        currentQuotePlace += 1;
        quoteScreen.textContent = quotesArr[currentQuotePlace].quote;
      }
    } else {
      currentQuotePlace = 0;
      quoteScreen.textContent = quotesArr[currentQuotePlace].quote;
    }
  });
});

setInterval(getTime, 1000);
