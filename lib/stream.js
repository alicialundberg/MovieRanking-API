var request = require('request');
var cheerio = require('cheerio');

exports.streamingList = (url) => {  //Promises
  return new Promise((resolve, reject) => {
    request(url,(error, resp, body) => {
      if(error) {
        reject(error);
      }
      let $ = cheerio.load(body);
      let $url = url;
      let $title = $('.streamingtip_title').find('a').text();

    let streamList = {
      url: $url,
      title: $title,
    }

    console.log('scraped from scraper.js');
    resolve(streamList);
  });
 })
}
