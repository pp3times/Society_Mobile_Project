import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
dotenv.config();

import route from "./routes";

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api", route);

const PORT = process.env.API_PORT || 8080;

// var whitelist = ["*"];
// var corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
// };

// app.use(cors(corsOptions));

app.listen(PORT, () => console.log(`🚀 Listening on port ${PORT}`));
