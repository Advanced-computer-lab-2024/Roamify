const place=require('./models/Place');
const activity =require('./models/activity');
const itinerary=require('./models/itinerary');



const search = async (req, res) => {
    try {
      const { query, type } = req.query;
  
      
      const searchFilter = {
        $or: [
          { name: new RegExp(query, 'i') },       // Case-insensitive name search
          { category: new RegExp(query, 'i') },   // Case-insensitive category search
          { tags: new RegExp(query, 'i') }        // Case-insensitive tag search
        ]
      };
      let results;
      switch(type){
        case 'place':
            results=await place.find(searchFilter);
        break;
        case 'activity':
        results=await activity.find(searchFilter);
        break;
        case 'itinerary':
        results=await itinerary.find(searchFilter);
        break;
        default:
            return res.status(400).json({message:'Invalid type '});

      }
      return res.status(200).json(results);
    }catch(error){
        return res.status(500).json({message:'Error Occured',error});
    }


    };

module.exports={search};