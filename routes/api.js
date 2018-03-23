// get the express library
const express = require('express');
// get the object router
const router = express.Router();
// get the object of ninja model
const Ninja = require('../models/ninja');

// get response
router.get('/ninjas', function(req, res, next){
	Ninja.aggregate().near({
      near: { type: "Point", coordinates: [parseFloat(req.query.lng) , parseFloat(req.query.lat)] },
                  distanceField: "dist.calculated",
                  maxDistance: 100000,
                  spherical: true
      }).then(function(ninjas){
          res.send(ninjas);
      }).catch(next);
});

// post response
router.post('/ninjas', function(req, res, next){

	// saving the request, then return the result
	Ninja.create(req.body).then(function(ninja){		
		res.send(ninja);
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

// store the response setting
module.exports=router;
