// http://quotes.stormconsultancy.co.uk/random.json
// http://quotes.stormconsultancy.co.uk/quotes.json
// https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json

const quoteScreen = document.querySelector('.quote-screen p');
const btn = document.querySelector('.btn i');
const loader = document.querySelector('.loader');
const timeLi = document.querySelector('ul li:last-child');
let currentQuotePlace = 0;
let quotesArr = [];
const fetchData = async () => {
  try {
    quoteScreen.style.display = 'none';
    quoteScreen.classList.remove('error');
    loader.style.display = 'block';
    const req = await fetch(
      'https://cors.bridged.cc/https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json'
    );

    const jsonData = await req.json();
    return jsonData;
  } catch (r) {
    quoteScreen.style.display = 'block';
    loader.style.display = 'none';
    quoteScreen.textContent = 'There was an Error,try again later';
    quoteScreen.classList.add('error');
  }
};

const getTime = () => {
  var date = new Date();
  let hours = date.getHours();
  let minutes = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
  timeLi.textContent = `${hours}:${minutes}`;
};

const renderNewQuote = async () => {
  const quote = await fetchData();
  quoteScreen.style.display = 'block';
  loader.style.display = 'none';
  quoteScreen.innerHTML = `${quote.quoteText} <span>Author: ${
    quote.quoteAuthor || 'Not Available'
  } </span>`;
};

window.addEventListener('load', async () => {
  getTime();

  await renderNewQuote();
});

btn.addEventListener('click', renderNewQuote);

setInterval(getTime, 1000);
