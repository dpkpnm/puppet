const fs = require('fs');
const puppeteer = require("puppeteer");
var nextLink="https://swaraala-pallaki.blogspot.com/search?updated-max=2018-07-01T23:59:00-07:00&max-results=100";
download();
var fileName=1;

async function download() {
	if(nextLink == null)
		return;

	const browser = await puppeteer.launch();	
	const page = await browser.newPage();
	await page.goto(nextLink);
	await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.2.1.min.js'});

	const obj = await page.evaluate(() => {
	  	const $ = window.$;
	  	return  {text:$(".blog-posts").html(),url:$("#blog-pager-older-link a").attr("href")};
	});
	fs.writeFile("swaralu"+fileName+".html", obj.text, function(err) {
	    if(err)
	      return console.log(err);
	  	nextLink = obj.url;
	  	fileName++;
	 	download();

	    console.log(obj.url);
	}); 
	await browser.close();
}
