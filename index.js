// http://quotes.stormconsultancy.co.uk/random.json
// http://quotes.stormconsultancy.co.uk/quotes.json
// https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json

const quoteScreen = document.querySelector('.quote-screen span');
const btn = document.querySelector('.btn i');
const loader = document.querySelector('.loader');
const timeLi = document.querySelector('ul li:last-child');
let currentQuotePlace = 0;
let quotesArr = [];
const fetchData = async () => {
 try{
     quoteScreen.style.display = 'none';
     loader.style.display = 'block';
     const req = await fetch('https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json&key=4');
  const jsonData = await req.json();
  return jsonData;
 }
 catch(r){
     quoteScreen.style.display = 'block';
     loader.style.display = 'none';
     quoteScreen.textContent = 'There was an Error,try again later';
     quoteScreen.style.color = 'red'
     quoteScreen.style.backgroundColor = 'white'
 }
};

const getTime = () => {
  var date = new Date();
  let hours = date.getHours();
  let minutes = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
  timeLi.textContent = `${hours}:${minutes}`;
};

const renderNewQuote =  async () => {
    const quote =   await fetchData()
     quoteScreen.style.display = 'block';
     loader.style.display = 'none';
    quoteScreen.textContent = quote.quoteText;
}

window.addEventListener('load', async () => {
  await getTime();
  await renderNewQuote()
});


  btn.addEventListener('click', renderNewQuote);


setInterval(getTime, 1000);
