const express = require("express");
const cors = require("cors");

const app = express();

let corsOptions = {
  origin: "http://localhost:8080"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json({ limit: "50mb" }));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// simple route
app.get("/api-db", (req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  let message = 'Welcome to BookSum!',
    version = 'NodeJS ' + process.versions.node + '\n',
    response = [message, version].join('\n');
  res.end(response);
});

const base_url = "/home/skylabs/public_html/demo/booksum/app_db/";
require(base_url + "routes/token.routes.js")(app);
//require(base_url + "routes/user.routes.js")(app);
//require(base_url + "routes/auth.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});