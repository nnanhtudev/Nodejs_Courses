const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const handleBars = require("express-handlebars");
const methodOverride = require("method-override");
const path = require("path"); // Import the path module
const route = require("./routes/routes.js");
const db = require("./config/db");

dotenv.config();

db.connect();
//Call app
const app = express();
//Using port .env
const port = process.env.PORT || 3001;

//set method GET POST PUT PATCH
app.use(methodOverride("_method"));
//Loading logo
app.use(express.static(path.join(__dirname, "public")));
// use middleware
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
// HTTP Logger
// app.use(morgan("combined"));

// Templates engine handlebars
app.engine(
  "hbs",
  handleBars.engine({
    defaultLayout: "main", // Specify the default layout
    extname: ".hbs",
    helpers: {
      sum: (a, b) => a + b,
    },
  })
);
app.set("view engine", "hbs");

// Set the 'views' directory using path.join
app.set("views", path.join(__dirname, "resource", "views"));

//Route init
route(app);

//Running app listening port .env
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
