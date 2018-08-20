const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create point schema & model
const PointSchema = new Schema({

	point_value:{
		type: Number,
		required: [true, 'point_value field is required'],
		validate: {
			validator: Number.isInteger,
			message: 'value is not an integer value' 
		}
	},
	time:{
		type: Date,
		default: Date.now
	}
});

// put the ninja in global object
module.exports = PointSchema;


