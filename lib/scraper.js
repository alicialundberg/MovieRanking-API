var request = require('request');
var cheerio = require('cheerio');

exports.newReleased = (url) => {  //Promises
  return new Promise((resolve, reject) => {
    request(url,(error, resp, body) => {
      if(error) {
        reject(error);
      }
      let $ = cheerio.load(body);
      let $url = url;
      let $title = $('td h4').find('a').text();
    //  let $genre = $('p').find('span').text();
    //  let $rating = $('.titleColumn').find('span').text();

    let topList = {
      url: $url,
      title: $title,
    }

    console.log('scraped from scraper.js');
    resolve(topList);
  });
 })
}
