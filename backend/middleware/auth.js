import jwt from "jsonwebtoken"
import bcyrpt from "bcryptjs"
import {  PrismaClient } from "@prisma/client";
import nodemailer from "nodemailer"

const prisma = new PrismaClient();

const authMiddleWare = async(req,res,next)=>{
    const token = req.headers.authorization.split(" ")[1];
    console.log("token"+token)
    try{
        const token_decode = jwt.verify(token,process.env.JWT_SECRET);
        console.log("Token:"+token_decode.id);
        req.headers.id = token_decode.id;
        console.log("hello "+req.headers.id);
        next();
    }
    catch(err){
        console.log(err);
        return res.json({success:false,message:"Error in jwt"});
    }
}

let transporter = nodemailer.createTransport({
    host:process.env.HOST,
    service:process.env.SERVICE,
    port:Number(process.env.EMAIL_PORT),
    secure:Boolean(process.env.SECURE),
    auth: {
      user: process.env.FROM_EMAIL,
      pass: process.env.FROM_PASSWORD,
    },
  });
const sendOTP = async(req,res) =>{
    const email = req.body.email;
    console.log(email)
    console.log(process.env.FROM_PASSWORD)
    try{
        const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
        const mail = {
            from:process.env.FROM_EMAIL,
            to:email,
            subject:"Verify your Email",
            html: `<p>Enter <b>${otp}</b> in the website to verify your email</p><br><p>This otp works for 5 minutes.</p>`
        };
        const salt = 10;
        const hashedOtp = await bcyrpt.hash(otp,salt);
        const newOtp = await prisma.oTPVerification.create({
            data:{
                email:email,
                otp:hashedOtp,
                createdAt:new Date(Date.now()),
                expiresAt:new Date(Date.now() + 2 * 60 * 1000)
            }
        })
        await transporter.sendMail(mail);
        res.json({status:"Pending",message:"Verification otp sent",data:{email:email}})
    }catch(err){
        console.log(err);
        res.json({status:"Failed",message:err})
    }
}

const verifyotp = async(req,res) =>{
    const email = req.body.email
    const otp = req.body.otp
    console.log(email)
    console.log(otp)
    try{
        const verifyEmail = await prisma.oTPVerification.findUnique({
            where:{
                email:email,
            },select:{
                email:true,
                expiresAt:true,otp:true
            }
        })
        if(!verifyEmail){
            res.json({success:false,message:"The Email is not Verified"})
        }
        const hashedOtp = verifyEmail.otp;
        console.log(hashedOtp)
        if(new Date() > verifyEmail.expiresAt){
            await prisma.oTPVerification.delete({
                where:{
                    email:email
                }
            })
            return res.json({success:false,message:"Time elapsed"})
        }
        const otpverfiy = await bcyrpt.compare(otp,hashedOtp)
        if(!otpverfiy){
            res.josn({success:false,message:"Otp is invalid"})
        }
        await prisma.oTPVerification.delete({
            where:{
                email:email
            }
        })
        res.json({success:true,message:"OTP verified"})
    }catch(err){
        console.log(err);
        res.json({success:false,message:err})
    }
}

export {authMiddleWare,sendOTP,verifyotp}