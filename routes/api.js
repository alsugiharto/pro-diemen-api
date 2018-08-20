// get the express library
const express = require('express');
// get the object router
const router = express.Router();
// get the object of ninja model
const PointSchema = require('../models/point');
// get the object of monggosedb
const mongoose = require('mongoose');

//delete response
router.get('/points', function(req, res, next){

	var Point = set_db_point_name(req.query.id);
	var limit = parseInt(req.query.limit);


	Point.find().limit(limit).then(function(ninja){
                res.send(ninja);
        }).catch(next);
});

// post response
router.post('/point', function(req, res, next){

	var Point = set_db_point_name(req.body.id);

	// saving the request, then return the result
	Point.create(req.body).then(function(point){		
		res.send(point);
	}).catch(next);

});


// put response
router.put('/ninjas/:id', function(req, res, next){
	Ninja.findByIdAndUpdate({_id:req.params.id},req.body).then(function(){
		// get the updated version
		Ninja.findOne({_id:req.params.id}).then(function(ninja){
			res.send(ninja);
		}).catch(next);
	}).catch(next);

});

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
