const touristModel = require('../models/touristModel');
const userModel = require('../models/userModel');

const createProfile = async (req,res)=>{

    const id = req.params.id;
    const {
      fName,
      lName,
      mobileNumber,
      nationality,
      dateofBirth,
      occupation,

      } = req.body;
      try{
        const tourist = new touristModel({
        user:id,
        fName,
        lName,
        mobileNumber,
        nationality,
        dateofBirth,
        occupation

        });
        await tourist.save();
        res.status(201).json({tourist:tourist})

      }
      catch(e){
        res.status(401).json({error:e});
        console.log(e);

      }
      
}
module.exports = {createProfile};