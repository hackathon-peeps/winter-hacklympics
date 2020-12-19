const express = require("express");
const router = express.Router();
const { ensureAuth, ensureGuest } = require("../middleware/auth");

const Business = require("../models/Business");

// home page
// GET /
router.get("/", (req, res) => {
	res.render("index", {
		title: "Home",
		style: "styles",
	});
});

router.get("/aboutus", (req, res) => {
	res.render("aboutus", {
		title: "About Us",
		style: "about",
	});
});

router.get("/login", (req, res) => {
	res.render("signin", {
		title: "Log In",
		style: "signin",
	});
});

router.get("/businesses", async (req, res) => {
	const businesses = await Business.find().lean();
	res.render("business", {
		title: "Find",
		style: "business",
		businesses,
	});
});

// account page
// GET /account
router.get("/account", ensureAuth, async (req, res) => {
	try {
		const businesses = await Business.find({ user: req.user.id }).lean();
		res.render("myinfo", {
			title: "My Account",
			style: "myinfo",
			name: req.user.firstName,
			businesses,
		});
	} catch (error) {
		console.error(error);
		res.render("error/500");
	}
});

module.exports = router;
