const businessUserModel = require('../models/businessUserModel');

const createBusinessUser = async (req, res) => {
    try {
        const { fName, lName, userName, email, password, role } = req.body;
        const newBUser = new BusinessUser({
            fName,
            lName,
            userName,
            email,
            password,
            role,
        });
        await newBUser.save();
        
        
        

        res.status(201).json({ message: 'success', user: newBUser });
    } catch (e) {
        res.status(404).json({ message: 'failed',error:e});
    }
};
const getProfile = async (req,res)=>{
    try{
        const id = req.params.id;
        const details = await businessUserModel.findById(id);
        if(details)
            res.status(200).json(details);


        
    }
    catch(e){
        res.status(400).json({message:'failed',error:e});
    }
}
module.exports = { createBusinessUser,getProfile }; 