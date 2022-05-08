const res = require('express/lib/response')
const Users = require ('../models/userModel')
const UserProfile= require('../models/userProfileModel')
const bcrypt = require ('bcrypt')
const jwt = require ('jsonwebtoken')
const crypto = require ('crypto')
const nodemailer = require('nodemailer');
const ResetToken = require("../models/resetToken")
const {sendError,createRandomBytes} = require('../utils/helper')
const{generateOTP,mailTransport}=require('../utils/mail');




const userProfileController ={
    register:async(req, res, next) => {
        try{
            const{email,name,password,passwordConfirm,gender,birthday,tel,category}=req.body
            //if( !email ||   !aboutme || !adress || !occupation || !skill || !job|| !status)
            if( !email ||   !name || !password || !passwordConfirm || !gender || !birthday|| !tel|| !category)
            return res.status(400).json({msg: "please fill in all the fields "})
            //const user = await UserProfile.findOne({email});
           // if (!user) return res.status(400).send('user not fount to continue adding other fields');
            let newprofile_user = new UserProfile ({
                
                name:req.body.name,
                email:req.body.email,
               
                gender:req.body.gender,
                birthday:req.body.birthday,
                tel:req.body.tel,
                category:req.body.category,
                password:req.body.password,
                passwordConfirm:req.body.passwordConfirm,
                aboutme:"",
                adress:"",
                occupation:"",
                skill:"",
                job:"",
                status:""
                
               
               
        });
        await newprofile_user.save()
            
            
        res.json({msg:"profile user sucess success please activate your account"})



        }catch(err)
        {
            return res.status(400).json({msg:err.message})
        }


    },
    get:async (req, res,next)=>{
        try{
            // const {email}=req.body
           // await UserProfile.findOneAndUpdate(
             
             //   { email:req.params.email})
             
            
            const userprofile = await UserProfile.findOne({email:req.params.email}).then((result)=>{
                res.send(result);
            });
            if (!userprofile) return res.status(400).send('user profile not found ');
            




            

        }catch(err){
            console.log(err);
        }
    },
    put:async (req, res)=>{
        try{
            const email= req.params.email
            const userprofile = await UserProfile.findOne({email})
            await UserProfile.findOneAndUpdate({email:userprofile.email},{
                gender:req.body.gender,
                birthday:req.body.birthday,
                aboutme:req.body.aboutme,
                category:req.body.category,
                occupation:req.body.occupation,
                skill:req.body.skill,
                job:req.body.job,
                adress:req.body.adress,
                tel:req.body.tel,
               
                status:req.body.status
            } )
            res.json({msg:"profile updated successufully"})
        
        }
        catch(err){
            res.send(err)

        }
    },
    login:async (req, res,next)=>{
        try {
            const user = await UserProfile.findOne({email:req.params.email});
           
            if (!user) return res.status(400).send('email is not found');
            
            if (req.params.password!=user.password)return res.status(400).send('invalid password');
            //res.send('logged in');
            ///create and assign a token 
            const token = jwt .sign({_id:user._id},process.env.TOKEN_SECRET);
           // res.header('auth-token',token).send(token);
           if (!token)return res.status(401).send('access denied');
           const verified =jwt.verify(token,process.env.TOKEN_SECRET);
            req.user = verified;
            ////
            const {email}=req.params
            const userprofile = await UserProfile.findOne({email:req.params.email});
            await UserProfile.find({email}).then((result)=>{
                res.send(result);
            })
            ////
           // res.json('welcome to you');
            next();
        }catch(err){
            return res.status(500).json({msg:err.msg})

        } 
    },
    forgotPassword:async(req, res) =>{
        const {email} = req.body;
        if(!email) return res.status(400).json({msg: "watch error please provide a valid email "})
        const user= await UserProfile.findOne({email});
        if(!user) return sendError(res,"User not found , invalid resquest");
    
        const token =await ResetToken.findOne({owner:user._id})
        if(token) return sendError(res,"only after one hour you can request for another token");
        const randomBytes = await createRandomBytes();
        const OTP =generateOTP()
        const resetToken = new ResetToken({owner:user._id,token:randomBytes});
        await resetToken.save();
        ////////
        
    
    
    
    
        //////////    
        mailTransport().sendMail({
            from:"security@email.com",
            to: user.email,
            subject:"password Reset",
            //html:generatePasswordResetTemplate(`http://localhost:5000/userRouter?token=${token}&id=${user._id}`),
            html:`<h1>${OTP}</h1>`
            
        });
        res.json({success:true,message:'password reset link is sent to your mail'})  
    },
    resetpassword:async(req, res) =>{
        const {password} = req.body;
        
     //const user = await Users.findById(req.user._id)
    try{
        const user = await UserProfile.findOne({email:req.body.email});
        if(!user) return("user not found");
        
        await UserProfile.findOneAndUpdate(
             
            {email:user.email},
             {password:req.body.password},
            
        );
        await ResetToken.findOneAndDelete({owner:user._id});
        mailTransport().sendMail({
            from:"security@email.com",
            to: user.email,
            subject:"password Reset successfully",
            //html:generatePasswordResetTemplate(`http://localhost:5000/userRouter?token=${token}&id=${user._id}`),
            html:`<h1>password reset successfully now you can login with your new password</h1>`
            
        });  
        res.json({succes:true,message:"password Reset successfully"}) 
    }catch (err){
        return res.status(500).json({msg:err.message})
    }

     
     
     
    

    }
    
    

}
module.exports =userProfileController