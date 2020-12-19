const mongoose = require("mongoose");

const BusinessSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	location: {
		type: String,
		required: true,
	},
	hours: {
		type: String,
		required: true,
	},
	content: {
		type: String,
		required: true,
	},
	tags: [
		{
			type: String,
		},
	],
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
});

module.exports = mongoose.model("Business", BusinessSchema);
