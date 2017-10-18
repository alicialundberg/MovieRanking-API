var scraper = require('./bio');
var url = 'https://www.moviezine.se/streamingtips';

scraper.streamingList(url)
  .then((data) => {
    console.log('data from scraper received');
  })
  .catch((error) => {
    console.log('error scrapping data');
  })
