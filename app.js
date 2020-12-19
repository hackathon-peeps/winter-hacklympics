const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const connection = require("./config/database");
const morgan = require("morgan");
const handlebars = require("express-handlebars");
const cors = require("cors");
const bodyParser = require("body-parser");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
dotenv.config({ path: "./config/.env" });
const PORT = process.env.PORT || 8080;

const app = new express();

// Passport config
require("./config/passport")(passport);

// Logging
if (process.env.NODE_ENV === "development") {
	app.use(morgan("dev"));
}

// Handlebars template engine
app.engine(".hbs", handlebars({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", ".hbs");

// Static folder
app.use(express.static(path.join(__dirname, "public")));

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
// Session
app.use(
	session({
		secret: "potato",
		resave: false,
		saveUninitialized: false,
		store: new MongoStore({ mongooseConnection: mongoose.connection }),
	})
);
// Passport
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/", require("./routes/index"));
app.use("/auth", require("./routes/auth"));
app.use("/businesses", require("./routes/businesses"));

// create connection
connection();

app.listen(PORT, () => {
	console.log(`Server is running on port: ${PORT}`);
});
