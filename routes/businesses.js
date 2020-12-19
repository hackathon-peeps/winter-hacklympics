const express = require("express");
const router = express.Router();
const { ensureAuth } = require("../middleware/auth");

const Business = require("../models/Business");

// show edit business page
// GET /account/edit/:id
router.get("/businesses/search/:name", ensureAuth, async (req, res) => {
	try {
		const business = await Business.findOne({
			name: req.params.name,
		}).lean();

		if (!business) {
			return res.render("error/404");
		}

		if (business.user != req.user.id) {
			res.redirect("/");
		} else {
			res.render("account/edit", {
				business,
			});
        }
        res.render("/businesses")
	} catch (error) {
		console.log(error);
		return res.render("error/500");
	}
});

module.exports = router;