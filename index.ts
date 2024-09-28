import express from "express";
import config from "./src/config/config";
import path from "path";
import { fetcher } from "./fetcher";
import { seSchema } from "./src/schemas/seSchema";

const app = express();
const port = 8080;

app.get("/", (req, res) => {
	// res.send("Hello World!");
	res.sendFile(path.join(config.viewsPath, "index.html"));
});

app.get("/api/se", async (req, res) => {
	const response = await fetcher("", {}, seSchema);
	res.json(response?.results);
})

app.use(express.static(config.viewsPath))

// Serve htmx.js from node_modules
app.get('/htmx.js', (req, res) => {
	res.sendFile(path.join(__dirname, '.', 'node_modules', 'htmx.org', 'dist', 'htmx.js'));
});


app.listen(port, () => {
	console.log(`Listening on port ${port}...`);
});
