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
	date_complete:{
		type: Date,
		default: Date.now
	},
	date_year:{
		type: Number
	},
	date_month:{
		type: Number
	},
	date_day:{
		type: Number
	},
	date_hour:{
		type: Number
	},
	date_minute:{
		type: Number
	},
	date_second:{
		type: Number
	}
});

// put the ninja in global object
module.exports = PointSchema;


