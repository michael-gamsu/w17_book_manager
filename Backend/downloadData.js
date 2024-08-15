require("dotenv").config();
const { execSync } = require("child_process");

function downloadDataset() {
	console.log("Starting dataset download...");
	try {
		execSync("kaggle datasets download -d jealousleopard/goodreadsbooks -p ./data", { stdio: "inherit" });
		console.log("Dataset download completed.");
	} catch (error) {
		console.error("Error downloading dataset:", error.message);
		process.exit(1);
	}
}

downloadDataset();
