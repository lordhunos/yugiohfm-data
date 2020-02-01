const puppeteer = require('puppeteer');

const scraper = async (mode, cardID) => {

	let data;
	const modVersionEl = '[data-tooltip="Mod Beta U2"]';
	const homeUrl = "https://www.basededatostea.xyz/home";
	const reqUrl = [`https://www.basededatostea.xyz/result/cards?card=${cardID}`, `https://www.basededatostea.xyz/result/npc?id=${cardID}`];
	const reqHeader = ['rcarta', 'roponente'];

	const browser = await puppeteer.launch({
    	//userDataDir: './data',
    	//headless: false,
    	//devtools: true
    });

	const page = await browser.newPage();
	const navigationPromise = page.waitForNavigation();
	const selectorPromise = page.waitForSelector(modVersionEl);

    try{

    	page.on('response', async (response) => {
			if (response.request().headers()["t2"] === reqHeader[mode]) {
				let resJson = await response.json();
				data = resJson.resultados;      	
			}	       
		});
		
		await page.setViewport({ width: 1280, height: 800 });
		await page.goto(homeUrl, { waitUntil: 'networkidle2', timeout: 0 });
		await selectorPromise;
		await page.click(modVersionEl);
		await navigationPromise;
		await page.goto(reqUrl[mode], { waitUntil: 'networkidle2', timeout: 0 });
		await browser.close();

    }
    catch(e){
    	console.log('[PUPPET_SCRAPER-ERROR]', e);
	}
	
	return data;

};

module.exports = scraper;