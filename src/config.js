import { dirname } from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);
import dotenv from "dotenv";

export const entorno = { MODE: process.argv[2] };

if (process.argv[2] != "DEV" && process.argv[2] != "PROD") {
  console.log("por favor inidique prod o dev");
  process.exit();
}

dotenv.config({
  path: process.argv[2] === "DEV" ? "./.env.development" : "./.env.production",
});

entorno.PORT = process.env.PORT;
entorno.MONGO_URL = process.env.MONGO_URL;
entorno.ADMIN_NAME = process.env.ADMIN_NAME;
entorno.ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
