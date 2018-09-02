// get the express library
const express = require('express');
// get the object router
const router = express.Router();
// get the object of ninja model
const PointSchema = require('../models/point');
// get the object of monggosedb
const mongoose = require('mongoose');

//=================================================================================

// get latest points 2
// parameters: id, limit, level (minute,hour,day,month and year)
// sort: date descending
router.get('/points_per_time', function(req, res, next){

	var Point = set_db_point_name(req.query.id);
	var limit = parseInt(req.query.limit);
	var level = req.query.level;		

	var grouping_rules = {};
	switch(level){
		case 'minute':
			grouping_rules.date_year = '$date_year';
			grouping_rules.date_month = '$date_month';
			grouping_rules.date_day = '$date_day';
			grouping_rules.date_hour = '$date_hour';
			grouping_rules.date_minute = '$date_minute';
			break;
		case 'hour':
			grouping_rules.date_year = '$date_year';
			grouping_rules.date_month = '$date_month';
			grouping_rules.date_day = '$date_day';
			grouping_rules.date_hour = '$date_hour';
			break;
		case 'day':
			grouping_rules.date_year = '$date_year';
			grouping_rules.date_month = '$date_month';
			grouping_rules.date_day = '$date_day';
			break;
		case 'month':
			grouping_rules.date_year = '$date_year';
			grouping_rules.date_month = '$date_month';
			break;
		case 'year':
		default:
			grouping_rules.date_year = '$date_year';
			break;
	}

	Point.aggregate(
		[			
			{$sort:
				{
					date_complete: -1
				}
			},
			{$limit:limit},
			{$group:
				{
					"_id":grouping_rules,
					"avg": {$avg: "$point_value"},
					"max" : {$max: "$point_value"},
					"min" : {$min: "$point_value"},
					"count" : {$sum: 1}
				}
			},
			{$sort: {
					'_id.date_year':-1,
					'_id.date_month':-1,
					'_id.date_day':-1,
					'_id.date_hour':-1,
					'_id.date_minute':-1
				}
			}
		]
	)
	.then(function(ninja){
                res.send(ninja);
        }).catch(next);
});

//=================================================================================

// get latest points
// parameters: id, limit
// sort: date descending
router.get('/points_basic', function(req, res, next){

	var Point = set_db_point_name(req.query.id);
	var limit = parseInt(req.query.limit);


	Point.find()
		.sort({'date_complete': -1})
		.limit(limit)
		.then(function(ninja){
                	res.send(ninja);
        }).catch(next);
});

//=================================================================================

// post new point data
router.post('/point', function(req, res, next){

	var Point = set_db_point_name(req.body.id);

 	var date = new Date();

	// get UTC hours the +0 time zone
	var full_data = {
		point_value: req.body.point_value,
		date_complete: date,
		date_year: date.getFullYear(),
		date_month: date.getMonth() + 1,
 		date_day: date.getDate(),
		date_hour: date.getUTCHours(),
		date_minute: date.getMinutes(),
		date_second: date.getSeconds()
	}

	// saving the request, then return the result
	Point.create(full_data).then(function(point){		
		res.send(point);
	}).catch(next);

});

//=================================================================================

// put response
router.put('/ninjas/:id', function(req, res, next){
	Ninja.findByIdAndUpdate({_id:req.params.id},req.body).then(function(){
		// get the updated version
		Ninja.findOne({_id:req.params.id}).then(function(ninja){
			res.send(ninja);
		}).catch(next);
	}).catch(next);

});


//=================================================================================

//delete response
router.delete('/ninjas/:id', function(req, res, next){
	Ninja.findByIdAndRemove({_id:req.params.id}).then(function(ninja){
		res.send(ninja);
	}).catch(next);
});

function set_db_point_name(table_id){
	// creating document object named ninja with NinjaSchema
 	return mongoose.model('tbl_point_' + table_id , PointSchema);
}

// store the response setting
module.exports=router;
