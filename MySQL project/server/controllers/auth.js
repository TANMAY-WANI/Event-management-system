import bcrypt from "bcrypt";
import  jwt  from "jsonwebtoken";
import User from "../models/User.js";
import Token from "../models/TokenSchema.js";
// Register User
export const register= async(req,res)=>{
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            walletBalance,
            savedStores,
            orderHistory,
            webSocketId
        } = req.body;

        const salt = await bcrypt.genSalt();
        const passwordHash=await bcrypt.hash(password,salt);
        // console.log();
        const newUser= new User({
            firstName,
            lastName,
            email,
            password:passwordHash,
            walletBalance,
            savedStores,
            orderHistory,
            webSocketId
        })

        const savedUser= await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}

//change password
export const changePassword= async(req,res)=>{
    console.log("change password");
    try {
        const {email,oldPassword,newPassword}= req.body;
        const user= await User.findOne({email:email});
        console.log(user._id);
        if(!user) return res.status(400).json({msg:"Invalid Credentials."});
        const isValidPassword= await bcrypt.compare(oldPassword,user.password);
        if(!isValidPassword) return res.status(400).json({msg:"Invalid Credentials."});
        const salt = await bcrypt.genSalt();
        const passwordHash=await bcrypt.hash(newPassword,salt);
        User.findByIdAndUpdate(user._id,{password:passwordHash},{new:true},(err,doc)=>{
            if(err) return res.status(500).json({error:err});
        });
        console.log("user: "+passwordHash);
        
        res.status(200).json({msg:"Password Changed Successfully."});
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}

//forgot password mail
export const forgotPassword= async(req,res)=>{
    try {
        const {email}= req.body;
        const user= User.findOne({email:email});
        if(!user) return res.status(400).json({msg:"User Does not exist with email: "+email});
        let token = await Token.findOne({ userId: user._id });
        if (token) await token.deleteOne();
        let resetToken = crypto.randomBytes(32).toString("hex");
        const genSalt= await bcrypt.genSalt();
        let hash = await bcrypt.hash(resetToken, genSalt);
        const newToken= await new Token({
            userId:user._id,
            token:hash,
            createdAt:Date.now()
        }).save();
        //send email using nodemailer
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}

//reset password
export const resetPassword = async (userId, token, password) => {
    let passwordResetToken = await Token.findOne({ userId });
    if (!passwordResetToken) {
      throw new Error("Invalid or expired password reset token");
    }
    const isValid = await bcrypt.compare(token, passwordResetToken.token);
    if (!isValid) {
      throw new Error("Invalid or expired password reset token");
    }
    const hash = await bcrypt.hash(password, Number(bcryptSalt));
    await User.updateOne(
      { _id: userId },
      { $set: { password: hash } },
      { new: true }
    );
    const user = await User.findById({ _id: userId });
    await passwordResetToken.deleteOne();
    return true;
  };

//logging in

export const login= async(req,res)=>{
    try {
        const {email,password}= req.body;
        const user= await User.findOne({email:email});
        if(!user) return res.status(400).json({msg:"User Does not exist with email: "+email});

        const isValidPassword= await bcrypt.compare(password,user.password);
        if(!isValidPassword) return res.status(400).json({msg:"Invalid Credentials."})

        const accessToken= jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"30m"});
        const refreshToken= jwt.sign({id:user._id},process.env.JWT_REFRESH_SECRET,{expiresIn:"30d"})
        
        refreshTokens.push(refreshToken);
        user.password=null;
        res.status(200).json({accessToken,refreshToken,user});

    } catch (error) {
        res.status(500).json({error:error.message});
    }
}
function generateRefreshToken(user){
    return jwt.sign({id:user._id},process.env.JWT_REFRESH_SECRET,{expiresIn:"7d"})
}
let refreshTokens=[];
export function handleRefreshToken(req,res){
    const refreshToken= req.body.refreshToken;
    console.log(refreshToken);
    if(refreshToken===null) return res.status(401).json({error:'refreshToken is null'});

    else if(!(refreshTokens.includes(refreshToken))){
        console.log('refreshToken is not included in refreshTokens');
        return res.status(401).json({error:'refreshToken expired' });
    }

    jwt.verify(refreshToken,process.env.JWT_REFRESH_SECRET,(err,user)=>{
       if(err) return res.status(401).json({error:'refreshToken expired'});
        const accessToken= jwt.sign({id:user._id},process.env.JWT_SECRET);
        res.status(200).json({accessToken:accessToken});
    })
}