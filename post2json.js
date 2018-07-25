const fs = require('fs');
const puppeteer = require("puppeteer");
var nextLink="swaralu1.html";
var filename=1;
download();


async function download() {
	if(filename>99)
		return;
	const browser = await puppeteer.launch();	
	const page = await browser.newPage();
	await page.goto("file:///Users/bobby/Documents/GitHub/puppet/swaralu"+filename+".html");
	await page.addScriptTag({url: 'https://code.jquery.com/jquery-3.2.1.min.js'});

	const obj = await page.evaluate(() => {
	  	const $ = window.$;
	  	var a=[];
	  	console.log($(".post-outer").length);
	  	$(".post-outer").each(function(k,v) {
	  		var txt=[]
			$(v).find(".post-body span").each(function(i,v) { txt.push(v.textContent);});
	  		a.push({title:$(v).find(".post-title").text(),txt:txt.join("\n"),labels:$(v).find(".post-labels").text()});
	  	})
	  	return  {text:JSON.stringify(a)};
	});

	fs.writeFile('cleaned' + filename +".html", obj.text, function(err) {
    if(err)
      return console.log(err);
  	
  	filename++;
  	console.log("swaralu"+filename);
    download();
	
	}); 
	await browser.close();
}
