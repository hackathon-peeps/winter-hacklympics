const express = require("express");
const router = express.Router();

const Business = require("../models/Business");

// show edit business page
// GET /businesses/search/:name
router.get("/search", async (req, res) => {
	try {
		const businesses = await Business.find({
			name: req.query.name,
		}).lean();
		res.render("business", {
			businesses,
		});
	} catch (error) {
		console.log(error);
		return res.render("error/500");
	}
});

module.exports = router;
