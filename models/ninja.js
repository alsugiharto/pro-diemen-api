const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create geolocation Schema
const GeoSchema = new Schema({	
		type:{
			type: String,
			default: "Point",
			required: [true, 'type field is required']
		},
		coordinates:{
			type:[Number],
			index:"2dsphere",
			required: [true, 'coordinates field is required']
		}
});

//create ninja schema & model
const NinjaSchema = new Schema({

	name:{
		type: String,
		required: [true, 'Name field is required']
	},
	rank:{
		type: String
	},
	available:{
		type: Boolean,
		default: false
	},
	geometry: GeoSchema
});

// creating document object named ninja with NinjaSchema
// update ninja in database
const Ninja = mongoose.model('the_ninja', NinjaSchema);

// put the ninja in global object
module.exports = Ninja;


