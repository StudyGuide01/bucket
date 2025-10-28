import UserModel from "../model/user.model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
export const register = async(req, res)=>{
    try {
       const {name,email,password} = req.body;
       
       let  user = await UserModel.findOne({email});
       if(user){
        return res.status(409).json({message:'User is already exist',success:false});
       }

       const hashPassword = await bcrypt.hash(password,10);
      
       user =  new UserModel({
        name,
        email,
        password:hashPassword
       });
       
       await user.save();

       return res.status(201).json({message:'User register successfully',success:true,user});

  
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:'Enternal server error',success:false});
    }
}

//login api

export const login = async(req, res)=>{
    try {
        const {email,password} = req.body;
        
        const existUser = await UserModel.findOne({email});
        if(!existUser){
            return res.status(404).json({message:'user is not exist, please do login',success:false});
        }
        const isPasswordMatch = await bcrypt.compare(password,existUser.password);
        if(!isPasswordMatch){
            return res.status(401).json({message:'Password is invalid, please check',success:false});
        }

        const token = jwt.sign({"userId":existUser._id},process.env.SECRET_KEY,{expiresIn:'1d'});
        const user = {
            name:existUser.name,
            email:existUser.email,
        }
        return res.status(200).cookie('token',token,{maxAge:1*24*60*60*1000,httpOnly:true,secure:false,sameSite:'Strict'}).json({message:'User login successfully',success:true,user})
        
        
    } catch (error) {
         console.log(error);
        return res.status(500).json({message:'Enternal server error',success:false});
    }
}