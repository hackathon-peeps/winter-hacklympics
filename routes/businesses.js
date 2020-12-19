const express = require("express");
const router = express.Router();
const { ensureAuth } = require("../middleware/auth");

const Business = require("../models/Business");

// add business
// GET /businesses/add
router.get("/add", ensureAuth, (req, res) => {
	res.render("businesses/add");
});

// add business
// GET /businesses/add
router.post("/", ensureAuth, async (req, res) => {
	try {
		req.body.user = req.user.id;
		await Business.create(req.body);
		res.redirect("/account");
	} catch (error) {
		console.error(error);
		res.render("error/500");
	}
});

// edit business
// GET /businesses/edit/:id
router.get("/edit/:id", ensureAuth, async (req, res) => {
	const business = await Business.findOne({
		_id: req.params.id,
	}).lean();

	if (!business) {
		return res.render("error/404");
	}

	if (business.user != req.user.id) {
		res.redirect("/");
	} else {
		res.render("/businesses/edit", {
			business,
		});
	}
});

module.exports = router;
