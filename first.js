const fs = require('fs');
const puppeteer = require("puppeteer");
var nextLink="http://telugu-good-lyrics.blogspot.com/search?updated-max=2011-11-01T15:21:00%2B05:30&max-results=100";
download();

async function download() {
	const browser = await puppeteer.launch();	
	const page = await browser.newPage();
	await page.goto(nextLink);
	await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.2.1.min.js'});

	const obj = await page.evaluate(() => {
  	const $ = window.$;
  	nextLink = $("#blog-pager-older-link a").attr("href");
  	return  {text:$(".blog-posts").html(),url:nextLink};
	});
	fs.writeFile("data.html", obj.text, function(err) {
    if(err)
      return console.log(err);
    console.log(obj.url);
	}); 
	await browser.close();
}
