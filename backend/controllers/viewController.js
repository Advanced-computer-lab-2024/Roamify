const place = require('../models/placeModel.js');
const itinerary = require('../models/ItineraryModel.js');
const activity =require('../models/activityModel.js');



const viewUpcoming=async(req,res) =>{
    try{
        const today=new Date();
        const upcomingActivites=await activity.find({ date: { $gte: today } });
        const upcomingItineraries = await itinerary.find({
            availableDates: { $elemMatch: { $gte: today } }
          });
        const upcomingPlaces=await place.find({ date: { $gte: today } }); //ana msh moktn3
        const results={
            upcomingActivites,
            upcomingItineraries,
            upcomingPlaces
        };

        return res.status(200).json(results);
    }catch(error){
        return res.status(500).json({message:'Error Occured',error:error.message});
    }
    };
module.exports = { viewUpcoming };