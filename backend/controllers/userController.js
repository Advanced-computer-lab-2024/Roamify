const userModel = require('../models/userModel');
const createProfile = async (req, res) => {
    try {
        const {   userName, email, password, role } = req.body;
        const status = (role === 'tourist' || role === 'tourismGovernor') ? 'active' : 'pending';
        const newBUser = new userModel({
           
            userName,
            email,
            password,
            status,
            role
        });
        await newBUser.save();
        
        
        

        res.status(201).json({ message: 'success', user: newBUser });
    } catch (e) {
        console.log(e);
    }
};
const getProfile = async (req,res)=>{
    try{
        const id = req.params.id;
        const details = await userModel.findById(id);
        if(details)
            res.status(200).json(details);


        
    }
    catch(e){
        res.status(400).json({message:'failed',error:e});
    }
}
module.exports = { createProfile,getProfile }; 