const EXPRESS = require("express");
const APP = EXPRESS();
const PORT = 8080;

let bodyParser = require("body-parser");
let session = require("express-session");
APP.use(bodyParser.urlencoded({ extended: true }));

APP.use(
	session({
		secret: "secret",
		resave: false,
		saveUninitialized: true,
		cookie: { maxAge: 600000 },
	})
);

// for image/js/css
APP.use(EXPRESS.static(__dirname + "/static"));
// This sets the location where express will look for the ejs views
APP.set("views", __dirname + "/views");
// Now lets set the view engine itself so that express knows that we are using ejs as opposed to another templating engine like jade
APP.set("view engine", "ejs");
// use app.get method and pass it the base route '/' and a callback

APP.get("/", (req, res) => {
	res.render("index");
});

APP.post("/process_form", (req, res) => {
	console.log(req.body);
	req.session.survey_information = req.body;
	res.redirect("/result");
});

APP.get("/result", (req, res) => {
	if (req.session.survey_information === undefined) res.redirect("/");
	res.render("result", { user: req.session.survey_information });
});

APP.listen(PORT, (req, res) => {
	console.log(`Server is listening to ${PORT}`);
});
