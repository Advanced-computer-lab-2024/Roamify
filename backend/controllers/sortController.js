const itinerary = require('../models/ItineraryModel.js');
const activity =require('../models/activityModel.js');

const getSortedUpcomingActivitesItinerary=async(req,res) =>{
    try{
        const today=new Date();
        today.setHours(0,0,0,0);
        const sortBy=req.query.sortBy
        const sortOrder=1;
        
        const upcomingActivites=await activity.find({date:{$gte:today}})
        .sort({[sortBy]:sortOrder});
        const upcomingItineries = await itinerary.find({
            availableDates: { $elemMatch: { $gte: today } }
          }).sort({[sortBy]:sortOrder});

        const results={
            upcomingActivites,
            upcomingItineries

        }
        return res.status(200).json(results);
    }catch(error){
        return res.status(500).json({message:'Error',error:error.message});
    }



    };

module.exports={getSortedUpcomingActivitesItinerary};