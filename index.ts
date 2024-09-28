import express from "express";
import config from "./src/config/config";
import path from "path";

const app = express();
const port = 8080;

app.use(express.static(config.viewsPath))

// Serve htmx.js from node_modules
app.get('/htmx.js', (req, res) => {
	res.sendFile(path.join(__dirname, '.', 'node_modules', 'htmx.org', 'dist', 'htmx.js'));
});

app.get("/", (req, res) => {
	// res.send("Hello World!");
	res.sendFile(path.join(config.viewsPath, "index.html"));
});

// TODO: remove this test use
app.get('/data', (req, res) => {
	res.send('<p>This is the fetched data from the server!</p>');
});

app.listen(port, () => {
	console.log(`Listening on port ${port}...`);
});
