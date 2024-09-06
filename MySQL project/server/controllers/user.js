import User from "../models/User.js";
export const getUser= async (req,res)=>{
    try {
        const {userId}= req.params;
        const user= await User.findById(userId).populate('orderHistory');
        if(!user) return res.status(404).json("User does not exist");
        delete (user.password);
        console.log(user);
         res.status(200).json(user);
        
    } catch (error) {
        res.status(404).json({error:error});
    }

}
export const updateUser= async(req,res)=>{
    const {userId}=req.params;
    const user= User.findById(userId);
    const {firstName,lastName}= req.body;
    if(firstName&&lastName){
    const updatedUser = User.findByIdAndUpdate(userId,{firstName:firstName,lastName:lastName});
}
    else return res.status(403).json({error:"FirstName and LastName cannot be null"});
}
