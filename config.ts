import merge from "lodash/merge";
import { Logger } from "./server/logger";

if (typeof document !== "undefined") {
	throw new Error(
		"Do not import config.js from inside the client-side code. !!!!!!"
	);
}

const isDev = process.env.ENVIRONMENT !== "prod";

const prodConfig = {
	dev: isDev,
	baseUrl: process.env.BASE_URL,
	apiUrl: process.env.API_STRING,
	database: process.env.DB_NAME!,
	username: process.env.DB_USER!,
	password: process.env.DB_PASS!,
	host: process.env.DB_HOST!,
	dialect: "mysql",
	port: Number(process.env.DB_PORT),
};

let localConfig = {};

if (isDev) {
	try {
		// eslint-disable-next-line @typescript-eslint/no-require-imports
		localConfig = require("./config.local.ts");
	} catch (ex) {
		Logger.error(ex);
		Logger.error("config.local does not exist.");
	}
}

export default merge(prodConfig, localConfig ?? {});
