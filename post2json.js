const fs = require('fs');
const puppeteer = require("puppeteer");
var nextLink="goodlyrics1.html";
var filename=1;
download();


async function download() {
	if(filename>33)
		return;
	const browser = await puppeteer.launch();	
	const page = await browser.newPage();
	await page.goto("file:///Users/dpkpnm/Documents/GitHub/puppet/goodlyrics"+filename+".html");
	await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.2.1.min.js'});

	const obj = await page.evaluate(() => {
	  	const $ = window.$;
	  	var a=[];
	  	console.log($(".post-outer").length);
	  	$(".post-outer").each(function(k,v) {
	  		a.push({title:$(v).find(".post-title").text(),txt:$(v).find(".post-body").html().replace(/\<br\>/g,""),labels:$(v).find(".post-labels").text()});
	  	})
	  	return  {text:JSON.stringify(a)};
	});

	fs.writeFile('cleaned' + filename +".html", obj.text, function(err) {
    if(err)
      return console.log(err);
  	
  	filename++;
  	console.log("goodlyrics"+filename);
    download();
	
	}); 
	await browser.close();
}
