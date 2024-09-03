import puppeteer from "puppeteer";

async function parseURL(url: string) {
	const decodedUrl = decodeURIComponent(url);

	// Create a URL object
	const urlObj = new URL(decodedUrl);

	// Extract the 'json' parameter and decode it
	const jsonParam = urlObj.searchParams.get("json");
	let jsonObject: Record<string, string> = {};
	if (jsonParam) {
		try {
			// Parse the JSON parameter
			jsonObject = await JSON.parse(jsonParam);
			// console.log('Extracted JSON Object:', jsonObject);
		} catch (error) {
			console.error("Error parsing JSON:", error);
		}
	} else {
		console.error("No JSON parameter found in the URL.");
	}

	// extract token
	const token = urlObj.searchParams.get("token");
	console.log("token: ", token);
	return {
		jsonObject,
		token,
	};
}

(async () => {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();

	// Set up request interception
	await page.setRequestInterception(true);
	page.on("request", async (request) => {
		console.log("Captured Request:", request.url());
		if (
			process.env.NO_EVENT_REQ_PART &&
			request.url().includes(process.env.NO_EVENT_REQ_PART)
		) {
			console.log(await parseURL(request.url()));
		}
		await request.continue();
	});

	// Navigate to the website
	const url = process.env.NO_URL;
	if (url) {
		await page.goto(url);

		setTimeout(async () => {
			await browser.close();
		}, 10000);
	}
	await browser.close();
})();
